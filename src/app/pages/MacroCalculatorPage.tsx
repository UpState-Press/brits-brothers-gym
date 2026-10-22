import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicSiteOrigin } from '../../config/siteConfig';
import { SEO } from '../components/SEO';

// Macro calculator. Ported from the Aug 26 standalone prototype. Public page,
// no gate, nothing leaves the browser. Mifflin-St Jeor by default, Katch-McArdle
// when body fat is supplied. Burn is built in parts: daily life sets the
// baseline, training is added from real session volume with resting metabolism
// netted out so it is not counted twice.

const bodyStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 500 } as const;
const headingStyle = { fontFamily: "'poster-gothic-atf', sans-serif" } as const;

type Units = 'imperial' | 'metric';
type Sex = 'm' | 'f';
type Goal = 'cut' | 'hold' | 'slow' | 'push';
type Cond = 'none' | 'easy' | 'mod' | 'hard';

const GOALS: Record<Goal, number> = { cut: 0.8, hold: 1.0, slow: 1.1, push: 1.18 };

// Strongman Corporation classes. From 2026 every sanctioned event weighs in
// kilograms. Women 57kg and Men 120kg are amateur-only this season.
const CLASSES: Record<Sex, number[]> = { m: [80, 90, 105, 120], f: [57, 64, 73, 82] };
const AMATEUR_ONLY: Record<Sex, number> = { m: 120, f: 57 };

// conditioning: [sessions per week, minutes each, MET]
const COND: Record<Cond, [number, number, number]> = {
  none: [0, 0, 0],
  easy: [1.5, 25, 3.8],
  mod: [3.5, 25, 7.0],
  hard: [4.5, 22, 9.0],
};

export function nearestClass(kg: number, s: Sex) {
  const list = CLASSES[s];
  const top = list[list.length - 1];
  for (const c of list) {
    if (kg <= c) {
      const under = c - kg;
      return {
        label: `${c}kg`,
        gap: under < 0.05 ? 'right on the line' : `${under.toFixed(1)}kg under`,
        amateur: c === AMATEUR_ONLY[s],
      };
    }
  }
  return { label: 'Heavyweight', gap: `${(kg - top).toFixed(1)}kg over ${top}kg`, amateur: false };
}

export interface MacroInput {
  units: Units;
  sex: Sex;
  age: number;
  weight: number;
  ft?: number;
  inch?: number;
  cm?: number;
  bf?: number | null;
  neat: number;
  sessions: number;
  minutes: number;
  styleMet: number;
  cond: Cond;
  goal: Goal;
}

export interface MacroResult {
  kcal: number;
  pG: number;
  cG: number;
  fG: number;
  pp: number;
  cp: number;
  fp: number;
  bmr: number;
  lifeBurn: number;
  trainBurn: number;
  tdee: number;
  kg: number;
  basis: string;
  floored: boolean;
  wc: ReturnType<typeof nearestClass>;
}

export function calculateMacros(i: MacroInput): MacroResult {
  const cm = i.units === 'imperial' ? ((i.ft ?? 0) * 12 + (i.inch ?? 0)) * 2.54 : (i.cm ?? 0);
  const kg = i.units === 'imperial' ? i.weight / 2.2046226 : i.weight;
  const lb = kg * 2.2046226;
  const bf = i.bf ?? null;

  let bmr: number;
  let basis: string;
  if (bf !== null) {
    bmr = 370 + 21.6 * (kg * (1 - bf / 100));
    basis = 'Resting burn from Katch-McArdle, which works off your lean mass. Macros are set against lean mass too.';
  } else {
    bmr = 10 * kg + 6.25 * cm - 5 * i.age + (i.sex === 'm' ? 5 : -161);
    basis = 'Resting burn from Mifflin-St Jeor. Add a body fat number and it switches to Katch-McArdle, which reads muscle better.';
  }

  const lifeBurn = bmr * i.neat;
  const netPerMin = (met: number) => ((met - 1) * 3.5 * kg) / 200;
  const liftBurn = (i.sessions * i.minutes * netPerMin(i.styleMet)) / 7;
  const c = COND[i.cond];
  const condBurn = (c[0] * c[1] * netPerMin(c[2])) / 7;
  const trainBurn = liftBurn + condBurn;
  const tdee = lifeBurn + trainBurn;
  let target = tdee * GOALS[i.goal];

  const hardFloor = i.sex === 'm' ? 1500 : 1200;
  const floor = Math.max(bmr, hardFloor);
  let floored = false;
  if (target < floor) {
    target = floor;
    floored = true;
  }

  let pG = bf !== null ? lb * (1 - bf / 100) * 1.4 : lb * (i.goal === 'cut' ? 1.1 : 1.0);
  const fMin = (target * 0.2) / 9;
  const fMax = (target * 0.35) / 9;
  let fG = Math.min(Math.max(lb * 0.4, fMin), fMax);
  let cG = (target - pG * 4 - fG * 9) / 4;
  if (cG < 60) {
    fG = fMin;
    cG = (target - pG * 4 - fG * 9) / 4;
  }
  if (cG < 60) {
    pG = Math.max(lb * 0.8, (target - fG * 9 - 60 * 4) / 4);
    cG = (target - pG * 4 - fG * 9) / 4;
  }
  if (cG < 0) cG = 0;

  pG = Math.round(pG);
  fG = Math.round(fG);
  cG = Math.round(cG);
  const kcal = Math.round(target / 10) * 10;
  const tot = pG * 4 + cG * 4 + fG * 9;

  return {
    kcal,
    pG,
    cG,
    fG,
    pp: (pG * 4) / tot * 100,
    cp: (cG * 4) / tot * 100,
    fp: (fG * 9) / tot * 100,
    bmr,
    lifeBurn,
    trainBurn,
    tdee,
    kg,
    basis,
    floored,
    wc: nearestClass(kg, i.sex),
  };
}

const labelCls = 'block text-[#fdfdff] text-sm tracking-wide mb-2';
const inputCls =
  'w-full bg-[#121214] border border-[#2a2a2c] text-[#fdfdff] px-4 py-3 text-base focus:outline-none focus:border-[#cc1e23] placeholder:text-[#5a5a61]';
const hintCls = 'text-[#a7a7ad] text-sm mt-2 leading-relaxed';
const eyebrowCls = 'block text-[#cc1e23] text-xs tracking-[0.3em] uppercase mb-3';

function Seg<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { v: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid grid-cols-2 border border-[#2a2a2c]">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          aria-pressed={value === o.v}
          onClick={() => onChange(o.v)}
          className={`py-3 text-sm tracking-wide transition-colors ${
            value === o.v ? 'bg-[#cc1e23] text-[#fdfdff]' : 'bg-[#121214] text-[#a7a7ad] hover:text-[#fdfdff]'
          }`}
          style={{ ...bodyStyle, fontWeight: 700 }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const num = (v: string): number | null => {
  const n = parseFloat(v);
  return Number.isNaN(n) ? null : n;
};

export function MacroCalculatorPage() {
  const canonicalUrl = `${getPublicSiteOrigin()}/macro-calculator`;

  const [units, setUnits] = useState<Units>('imperial');
  const [sex, setSex] = useState<Sex>('m');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [ft, setFt] = useState('');
  const [inch, setInch] = useState('');
  const [cm, setCm] = useState('');
  const [bf, setBf] = useState('');
  const [neat, setNeat] = useState('1.30');
  const [sessions, setSessions] = useState('');
  const [minutes, setMinutes] = useState('75');
  const [styleMet, setStyleMet] = useState('5.5');
  const [cond, setCond] = useState<Cond>('none');
  const [goal, setGoal] = useState<Goal>('hold');
  const [err, setErr] = useState('');
  const [result, setResult] = useState<MacroResult | null>(null);
  const [sessionsUsed, setSessionsUsed] = useState(0);

  const calculate = () => {
    setErr('');
    const a = num(age);
    const w = num(weight);
    if (a === null || w === null) return setErr('Age and bodyweight are required.');
    if (a < 18) return setErr('Under 18? Talk to Olly or your trainer. We do not hand teenagers a calorie target off a web form.');
    if (a > 90) return setErr('Check the age.');

    let heightCm: number;
    let f: number | undefined;
    let n: number | undefined;
    if (units === 'imperial') {
      const fv = num(ft);
      if (fv === null) return setErr('Height is required.');
      f = fv;
      n = num(inch) ?? 0;
      heightCm = (f * 12 + n) * 2.54;
    } else {
      const cv = num(cm);
      if (cv === null) return setErr('Height is required.');
      heightCm = cv;
    }
    if (heightCm < 120 || heightCm > 230) return setErr('Check the height.');

    const kg = units === 'imperial' ? w / 2.2046226 : w;
    if (kg < 27 || kg > 275) return setErr('Check the bodyweight.');

    const bfv = num(bf);
    if (bfv !== null && (bfv < 4 || bfv > 60)) return setErr('Body fat should be between 4 and 60, or leave it blank.');

    const s = num(sessions) ?? 0;
    if (s < 0 || s > 14) return setErr('Sessions per week should be between 0 and 14.');

    setSessionsUsed(s);
    setResult(
      calculateMacros({
        units,
        sex,
        age: a,
        weight: w,
        ft: f,
        inch: n,
        cm: units === 'metric' ? heightCm : undefined,
        bf: bfv,
        neat: parseFloat(neat),
        sessions: s,
        minutes: parseFloat(minutes),
        styleMet: parseFloat(styleMet),
        cond,
        goal,
      }),
    );
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => document.getElementById('macro-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  return (
    <>
      <SEO
        title="Macro Calculator"
        description="Free macro calculator from Brit's Brothers Gym in Greenville, SC. Get a daily calorie target and protein, carb, and fat split built around how you actually train."
        keywords="macro calculator, calorie calculator lifters, strongman weight class, Brit's Brothers Gym Greenville"
        canonicalUrl={canonicalUrl}
      />

      <div className="bg-[#121214]">
        <header className="pt-40 pb-10 border-b border-[#2a2a2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4" style={{ ...bodyStyle, fontWeight: 700 }}>
              Free Tool · Greenville, SC
            </p>
            <h1 className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6" style={headingStyle}>
              Macro Calculator
            </h1>
            <p className="text-[#a7a7ad] text-xl leading-relaxed" style={bodyStyle}>
              Your starting numbers for eating around the bar. Fill it out, get a target, then adjust off what the
              scale and your lifts actually do over the next three weeks.
            </p>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Inputs */}
            <div className="bg-[#1c1c1e] p-6 md:p-8" style={bodyStyle}>
              <h2 className="text-[#fdfdff] text-2xl md:text-3xl tracking-wider mb-2" style={headingStyle}>
                Your Numbers
              </h2>
              <p className="text-[#a7a7ad] text-sm mb-8">Everything here stays in your browser. Nothing is sent anywhere.</p>

              <div className="mb-6">
                <span className={labelCls}>Units</span>
                <Seg value={units} onChange={setUnits} options={[{ v: 'imperial', label: 'lb / ft' }, { v: 'metric', label: 'kg / cm' }]} />
              </div>

              <div className="mb-6">
                <span className={labelCls}>Sex</span>
                <Seg value={sex} onChange={setSex} options={[{ v: 'm', label: 'Male' }, { v: 'f', label: 'Female' }]} />
                <p className={hintCls}>Used only for the formula. It changes the resting burn estimate by about 160 calories.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="mc-age" className={labelCls}>Age</label>
                  <input id="mc-age" type="number" inputMode="numeric" min={18} max={90} placeholder="32" value={age} onChange={(e) => setAge(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="mc-weight" className={labelCls}>
                    Bodyweight <span className="text-[#a7a7ad]">({units === 'imperial' ? 'lb' : 'kg'})</span>
                  </label>
                  <input id="mc-weight" type="number" inputMode="decimal" step={0.5} placeholder={units === 'imperial' ? '185' : '84'} value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} />
                </div>
              </div>

              {units === 'imperial' ? (
                <div className="mb-6">
                  <span className={labelCls}>Height</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input type="number" inputMode="numeric" min={4} max={7} placeholder="5" aria-label="Feet" value={ft} onChange={(e) => setFt(e.target.value)} className={inputCls} />
                      <p className={hintCls}>Feet</p>
                    </div>
                    <div>
                      <input type="number" inputMode="numeric" min={0} max={11} placeholder="10" aria-label="Inches" value={inch} onChange={(e) => setInch(e.target.value)} className={inputCls} />
                      <p className={hintCls}>Inches</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <label htmlFor="mc-cm" className={labelCls}>Height (cm)</label>
                  <input id="mc-cm" type="number" inputMode="numeric" min={120} max={230} placeholder="178" value={cm} onChange={(e) => setCm(e.target.value)} className={inputCls} />
                </div>
              )}

              <div className="mb-8">
                <label htmlFor="mc-bf" className={labelCls}>
                  Body fat <span className="text-[#a7a7ad]">(optional)</span>
                </label>
                <input id="mc-bf" type="number" inputMode="decimal" min={4} max={60} step={0.5} placeholder="18" value={bf} onChange={(e) => setBf(e.target.value)} className={inputCls} />
                <p className={hintCls}>If you know it, we use a formula built on lean mass instead. More accurate for anyone carrying real muscle.</p>
              </div>

              <div className="border-t border-[#2a2a2c] pt-6 mb-6">
                <span className={eyebrowCls} style={{ fontWeight: 700 }}>Outside the gym</span>
                <label htmlFor="mc-neat" className={labelCls}>A normal day, gym not included</label>
                <select id="mc-neat" value={neat} onChange={(e) => setNeat(e.target.value)} className={inputCls}>
                  <option value="1.20">Seated most of the day, not much walking</option>
                  <option value="1.30">Desk work, but up and moving regularly</option>
                  <option value="1.42">On your feet most of the shift</option>
                  <option value="1.58">Physical trade, lifting and hauling all day</option>
                </select>
                <p className={hintCls}>This is your life before training gets added. A framer and an accountant who lift the same still eat differently.</p>
              </div>

              <div className="border-t border-[#2a2a2c] pt-6 mb-6">
                <span className={eyebrowCls} style={{ fontWeight: 700 }}>In the gym</span>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="mc-sessions" className={labelCls}>Sessions per week</label>
                    <input id="mc-sessions" type="number" inputMode="numeric" min={0} max={14} placeholder="4" value={sessions} onChange={(e) => setSessions(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="mc-minutes" className={labelCls}>Typical length</label>
                    <select id="mc-minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} className={inputCls}>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="75">1 hour 15</option>
                      <option value="90">1 hour 30</option>
                      <option value="120">2 hours or more</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="mc-style" className={labelCls}>How the session runs</label>
                  <select id="mc-style" value={styleMet} onChange={(e) => setStyleMet(e.target.value)} className={inputCls}>
                    <option value="4.0">Heavy singles and triples, long rests</option>
                    <option value="5.5">Main lift then accessories, moderate rests</option>
                    <option value="8.0">Strongman events, carries, medleys, short rests</option>
                  </select>
                  <p className={hintCls}>Rest time matters more than how hard the set felt. Three minutes between heavy squats burns less across the hour than a yoke medley does, even when the squats are harder.</p>
                </div>

                <div>
                  <label htmlFor="mc-cond" className={labelCls}>
                    Conditioning on top <span className="text-[#a7a7ad]">(optional)</span>
                  </label>
                  <select id="mc-cond" value={cond} onChange={(e) => setCond(e.target.value as Cond)} className={inputCls}>
                    <option value="none">None</option>
                    <option value="easy">Walks or easy sled, once or twice a week</option>
                    <option value="mod">Real conditioning, three or four times a week</option>
                    <option value="hard">Hard intervals, four or more times a week</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-[#2a2a2c] pt-6 mb-8">
                <label htmlFor="mc-goal" className={labelCls}>Goal</label>
                <select id="mc-goal" value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className={inputCls}>
                  <option value="cut">Lean out, hold strength</option>
                  <option value="hold">Hold weight, get stronger</option>
                  <option value="slow">Slow gain</option>
                  <option value="push">Push size</option>
                </select>
              </div>

              <button
                type="button"
                onClick={calculate}
                className="w-full bg-[#cc1e23] hover:bg-[#a8181d] text-[#fdfdff] py-4 text-sm tracking-[0.2em] uppercase transition-colors"
                style={{ ...bodyStyle, fontWeight: 700 }}
              >
                Calculate
              </button>
              {err && (
                <p className="text-[#cc1e23] text-sm mt-4" style={{ fontWeight: 600 }} role="alert">
                  {err}
                </p>
              )}
            </div>

            {/* Results */}
            <div id="macro-results" className="lg:sticky lg:top-28" style={bodyStyle}>
              {!result ? (
                <div className="bg-[#1c1c1e] p-8 md:p-12 text-center">
                  <span className={eyebrowCls} style={{ fontWeight: 700 }}>Waiting on you</span>
                  <p className="text-[#a7a7ad] mt-4">Fill in the left side and hit calculate.</p>
                </div>
              ) : (
                <div className="bg-[#1c1c1e] p-6 md:p-8">
                  <div className="text-center mb-8">
                    <span className={eyebrowCls} style={{ fontWeight: 700 }}>Daily target</span>
                    <span className="block text-[#fdfdff] text-6xl md:text-7xl leading-none" style={headingStyle}>
                      {result.kcal.toLocaleString()}
                    </span>
                    <span className="block text-[#a7a7ad] text-sm tracking-[0.2em] uppercase mt-2">Calories</span>
                  </div>

                  <div className="flex h-3 w-full overflow-hidden mb-6" aria-hidden="true">
                    <span className="bg-[#cc1e23]" style={{ width: `${result.pp}%` }} />
                    <span className="bg-[#fdfdff]" style={{ width: `${result.cp}%` }} />
                    <span className="bg-[#5a5a61]" style={{ width: `${result.fp}%` }} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      ['Protein', result.pG, result.pp, '#cc1e23'],
                      ['Carbs', result.cG, result.cp, '#fdfdff'],
                      ['Fat', result.fG, result.fp, '#5a5a61'],
                    ].map(([k, g, pct, color]) => (
                      <div key={k as string}>
                        <span className="flex items-center gap-2 text-[#a7a7ad] text-xs tracking-[0.2em] uppercase mb-1">
                          <i className="inline-block w-2.5 h-2.5" style={{ background: color as string }} />
                          {k}
                        </span>
                        <span className="block text-[#fdfdff] text-3xl md:text-4xl leading-none" style={headingStyle}>
                          {g as number}
                          <em className="not-italic text-lg text-[#a7a7ad]">g</em>
                        </span>
                        <span className="block text-[#a7a7ad] text-sm mt-1">{Math.round(pct as number)}%</span>
                      </div>
                    ))}
                  </div>

                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#2a2a2c] pt-6 mb-6 text-sm">
                    {[
                      ['Resting burn', Math.round(result.bmr).toLocaleString()],
                      ['Daily life adds', `+${Math.round(result.lifeBurn - result.bmr).toLocaleString()}`],
                      ['Training adds', `+${Math.round(result.trainBurn).toLocaleString()}`],
                      ['Total burn', Math.round(result.tdee).toLocaleString()],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[#a7a7ad] text-xs tracking-wide uppercase">{k}</dt>
                        <dd className="text-[#fdfdff] text-lg" style={{ fontWeight: 700 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#2a2a2c] pt-6 mb-4 text-sm">
                    <div>
                      <dt className="text-[#a7a7ad] text-xs tracking-wide uppercase">Bodyweight in kg</dt>
                      <dd className="text-[#fdfdff] text-lg" style={{ fontWeight: 700 }}>{result.kg.toFixed(1)}</dd>
                    </div>
                    <div>
                      <dt className="text-[#a7a7ad] text-xs tracking-wide uppercase">Nearest strongman class</dt>
                      <dd className="text-[#fdfdff] text-lg" style={{ fontWeight: 700 }}>
                        {result.wc.label} <span className="text-[#a7a7ad] text-sm font-medium">({result.wc.gap})</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#a7a7ad] text-xs tracking-wide uppercase">Protein per meal, 4 meals</dt>
                      <dd className="text-[#fdfdff] text-lg" style={{ fontWeight: 700 }}>{Math.round(result.pG / 4)}g</dd>
                    </div>
                  </dl>

                  <p className="text-[#a7a7ad] text-sm leading-relaxed mb-4">
                    Strongman Corporation classes. Since 2026 every sanctioned event weighs in kilograms, with no rounding and
                    no conversion from pounds, so the kilogram number above is the one that counts on the scale.
                    {result.wc.amateur && ` Heads up: ${result.wc.label} is an amateur-only class this season, with no pro card attached to it.`}
                    {' '}The open shows, World&apos;s Strongest Man and the Arnold Strongman Classic, run open weight with no classes at all.
                  </p>

                  {result.floored ? (
                    <div className="border-l-4 border-[#cc1e23] bg-[#121214] p-4 text-sm text-[#a7a7ad] leading-relaxed mb-4">
                      <strong className="text-[#fdfdff]">We floored this at your resting burn.</strong> The deficit you asked for would have
                      put you under what your body uses lying still. Eating less than that is not a faster cut, it is a slower one
                      with worse lifts. Bring this to a trainer before you go lower.
                    </div>
                  ) : sessionsUsed === 0 ? (
                    <div className="border-l-4 border-[#cc1e23] bg-[#121214] p-4 text-sm text-[#a7a7ad] leading-relaxed mb-4">
                      <strong className="text-[#fdfdff]">You logged zero sessions.</strong> These numbers cover your life outside the gym
                      and nothing else. Add your training and the target moves, usually by two to five hundred calories.
                    </div>
                  ) : goal === 'push' ? (
                    <div className="border-l-4 border-[#cc1e23] bg-[#121214] p-4 text-sm text-[#a7a7ad] leading-relaxed mb-4">
                      <strong className="text-[#fdfdff]">Push size is the aggressive setting.</strong> Expect some fat with the weight.
                      If the scale climbs faster than about a pound a week, pull 200 calories off the carbs.
                    </div>
                  ) : null}

                  <p className="text-[#a7a7ad] text-sm leading-relaxed mb-3">{result.basis}</p>
                  <p className="text-[#a7a7ad] text-sm leading-relaxed">
                    Run these for three weeks before you judge them. If bodyweight is not moving the way you want and your lifts
                    are flat, bring the numbers to your trainer instead of cutting another 300 calories on your own.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-[#1c1c1e] border border-[#2a2a2c] p-8 md:p-10 text-center">
            <span className={eyebrowCls} style={{ ...bodyStyle, fontWeight: 700 }}>Not sure what to do with these</span>
            <h2 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wider mb-4" style={headingStyle}>
              Sit Down With Olly
            </h2>
            <p className="text-[#a7a7ad] text-lg leading-relaxed mb-6" style={bodyStyle}>
              Thirty minutes on the floor with the owner. He will look at your numbers, your training, and tell you straight
              what needs to change. No cost, no contract.
            </p>
            <Link
              to="/consultation"
              className="inline-block bg-[#cc1e23] hover:bg-[#a8181d] text-[#fdfdff] px-8 py-4 text-sm tracking-[0.2em] uppercase transition-colors"
              style={{ ...bodyStyle, fontWeight: 700 }}
            >
              Book Your Free Evaluation
            </Link>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-[#5a5a61] text-xs leading-relaxed" style={bodyStyle}>
            These are estimates from published formulas, not medical or nutrition advice. Brit&apos;s Brothers Gym is not a
            medical provider. If you are pregnant, managing a health condition, taking medication that affects appetite or
            metabolism, or you have a history of disordered eating, talk to your doctor or a registered dietitian before
            changing how you eat. Members under 18 should work with a coach and a parent rather than a calculator.
          </p>
        </div>
      </div>
    </>
  );
}
