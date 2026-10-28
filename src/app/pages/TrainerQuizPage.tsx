import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig, getPublicSiteOrigin } from '../../config/siteConfig';
import { SEO } from '../components/SEO';
import { getTrainerBySlug } from '../../data/trainers';
import { MarketingConsentCheckbox, applyMarketingEmailConsent } from '../components/MarketingConsentCheckbox';
import { AXES, QUESTIONS, MATCH_TRAINERS, scoreAnswers, listify, type MatchResult } from '../../data/trainerMatch';

const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const POOL_SIZE = MATCH_TRAINERS.filter((t) => t.active).length;

// Trainer match quiz. Scoring lives in src/data/trainerMatch.ts.
// Capture: the match is shown after name and email, posted to the same
// Formspree endpoint the contact and evaluation forms use. The quiz answers
// and the match ride along in the submission so Olly's follow-up can open
// with the trainer's name. GHL wiring is the next step, not this one.

const bodyStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 500 } as const;
const headingStyle = { fontFamily: "'poster-gothic-atf', sans-serif" } as const;

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
const FORM_SUBJECT = "New trainer match from the Brit's Brothers quiz";

type Stage = 'intro' | 'quiz' | 'capture' | 'result';
type FormStatus = 'idle' | 'sending' | 'error';

const btn =
  'inline-block bg-[#cc1e23] hover:bg-[#a8181d] disabled:opacity-40 disabled:hover:bg-[#cc1e23] text-[#fdfdff] px-8 py-4 text-sm tracking-[0.2em] uppercase transition-colors';
const ghost =
  'inline-block border border-[#2a2a2c] hover:border-[#fdfdff]/40 text-[#a7a7ad] hover:text-[#fdfdff] px-8 py-4 text-sm tracking-[0.2em] uppercase transition-colors';
const fieldCls =
  'w-full bg-[#121214] text-[#fdfdff] px-4 py-3 border border-[#fdfdff]/20 focus:border-[#cc1e23] focus:outline-none transition-colors';
const labelCls = 'block text-[#fdfdff] text-sm mb-2 tracking-wide uppercase';

export function TrainerQuizPage() {
  const canonicalUrl = `${getPublicSiteOrigin()}/find-your-trainer`;
  const [stage, setStage] = useState<Stage>('intro');
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUESTIONS.map(() => null));
  const [result, setResult] = useState<MatchResult | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const go = (s: Stage) => {
    setStage(s);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pick = (n: number) => {
    const next = [...answers];
    next[i] = n;
    setAnswers(next);
  };

  const nextQ = () => {
    if (answers[i] === null) return;
    if (i < QUESTIONS.length - 1) {
      setI(i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setResult(scoreAnswers(answers));
      go('capture');
    }
  };

  const reset = () => {
    setI(0);
    setAnswers(QUESTIONS.map(() => null));
    setResult(null);
    setFormStatus('idle');
    go('intro');
  };

  async function submitCapture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('_subject', FORM_SUBJECT);
    applyMarketingEmailConsent(data);
    data.set('trainer_match', result.ranked[0]?.t.name ?? '');
    data.set('trainer_match_fit', `${Math.round((result.ranked[0]?.fit ?? 0) * 100)}%`);
    data.set('runner_up', result.ranked[1]?.t.name ?? '');
    data.set('goal_profile', result.leading.map((k) => AXES.find((a) => a.key === k)?.label ?? k).join(' + '));
    QUESTIONS.forEach((q, n) => {
      const a = answers[n];
      data.set(`q_${q.id}`, a === null ? '' : q.a[a].t);
    });

    if (!FORM_ENDPOINT) {
      console.error('VITE_CONTACT_FORM_ENDPOINT is not configured.');
      // Still show the match. Losing the lead is worse than losing the log line.
      go('result');
      return;
    }

    setFormStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) {
        setFormStatus('error');
        return;
      }
      go('result');
    } catch {
      setFormStatus('error');
    }
  }

  const top = result?.ranked[0];
  const second = result?.ranked[1];
  const topTrainer = top ? getTrainerBySlug(top.t.slug) : undefined;
  const leadLabels = result ? result.leading.map((k) => AXES.find((a) => a.key === k)!.label.toLowerCase()) : [];
  const reasons = result && top ? result.leading.filter((k) => top.t.hit[k]).map((k) => top.t.hit[k] as string) : [];
  const max = result ? Math.max(1, ...AXES.map((a) => result.user[a.key])) : 1;

  return (
    <>
      <SEO
        title="Find Your Trainer"
        description="A 90-second quiz that matches you with the right personal trainer at Brit's Brothers Gym in Greenville, SC, based on your goals, experience, and how you like to train."
        keywords="find a personal trainer Greenville SC, trainer match quiz, which trainer is right for me, Brit's Brothers Gym"
        canonicalUrl={canonicalUrl}
      />

      <div className="bg-[#121214] min-h-screen" style={bodyStyle}>
        {/* INTRO */}
        {stage === 'intro' && (
          <section className="pt-40 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4" style={{ fontWeight: 700 }}>
                {WORDS[POOL_SIZE] ?? POOL_SIZE} coaches. One of them is yours.
              </p>
              <h1 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6" style={headingStyle}>
                Find Your Trainer
              </h1>
              <p className="text-[#a7a7ad] text-xl leading-relaxed mb-10">
                {WORDS[QUESTIONS.length] ?? QUESTIONS.length} questions about what you want and where you are. You get a read on your goals and the coach on
                this floor built for them.
              </p>
              <button type="button" className={btn} onClick={() => go('quiz')} style={{ fontWeight: 700 }}>
                Start
              </button>
              <dl className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-12 border-t border-[#2a2a2c] pt-8">
                {[
                  ['Questions', String(QUESTIONS.length)],
                  ['Takes about', '90 sec'],
                  ['Cost', 'Nothing'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[#a7a7ad] text-xs tracking-[0.2em] uppercase">{k}</dt>
                    <dd className="text-[#fdfdff] text-2xl mt-1" style={headingStyle}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* QUIZ */}
        {stage === 'quiz' && (
          <section className="pt-36 pb-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-1 bg-[#2a2a2c] mb-6" aria-hidden="true">
                <div className="h-1 bg-[#cc1e23] transition-all" style={{ width: `${(i / QUESTIONS.length) * 100}%` }} />
              </div>
              <p className="text-[#a7a7ad] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontWeight: 700 }}>
                Question {i + 1} of {QUESTIONS.length}
              </p>
              <h2 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wide mb-3" style={headingStyle}>
                {QUESTIONS[i].q}
              </h2>
              <p className="text-[#a7a7ad] text-base leading-relaxed mb-8">{QUESTIONS[i].sub}</p>

              <div className="space-y-3" role="radiogroup" aria-label={QUESTIONS[i].q}>
                {QUESTIONS[i].a.map((opt, n) => {
                  const on = answers[i] === n;
                  return (
                    <button
                      key={opt.t}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => pick(n)}
                      className={`w-full text-left px-5 py-4 border transition-colors ${
                        on
                          ? 'border-[#cc1e23] bg-[#1c1c1e] text-[#fdfdff]'
                          : 'border-[#2a2a2c] bg-[#1c1c1e]/60 text-[#fdfdff] hover:border-[#fdfdff]/40'
                      }`}
                    >
                      <span className="block text-base" style={{ fontWeight: 600 }}>{opt.t}</span>
                      {opt.d && <span className="block text-[#a7a7ad] text-sm mt-1">{opt.d}</span>}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-10">
                <button
                  type="button"
                  className={ghost}
                  style={{ visibility: i === 0 ? 'hidden' : 'visible', fontWeight: 700 }}
                  onClick={() => {
                    setI(Math.max(0, i - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Back
                </button>
                <button type="button" className={btn} disabled={answers[i] === null} onClick={nextQ} style={{ fontWeight: 700 }}>
                  {i === QUESTIONS.length - 1 ? 'See my match' : 'Next'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* CAPTURE */}
        {stage === 'capture' && result && (
          <section className="pt-36 pb-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4" style={{ fontWeight: 700 }}>
                Your match is ready
              </p>
              <h2 className="text-[#fdfdff] text-4xl md:text-5xl tracking-wide mb-4" style={headingStyle}>
                Who should we send it to?
              </h2>
              <p className="text-[#a7a7ad] text-lg leading-relaxed mb-8">
                You scored highest on {listify(leadLabels)}. Drop your name and email and we show you the coach that
                lines up with it. Olly gets a copy so the free evaluation starts with the right person already in mind.
              </p>

              <form onSubmit={submitCapture} className="bg-[#1c1c1e] p-6 md:p-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="tq-name" className={labelCls}>Name</label>
                    <input id="tq-name" name="name" type="text" required autoComplete="name" className={fieldCls} />
                  </div>
                  <div>
                    <label htmlFor="tq-email" className={labelCls}>Email</label>
                    <input id="tq-email" name="email" type="email" required autoComplete="email" className={fieldCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="tq-phone" className={labelCls}>
                    Phone <span className="text-[#a7a7ad] normal-case tracking-normal">(optional, if you want a call)</span>
                  </label>
                  <input id="tq-phone" name="phone" type="tel" autoComplete="tel" className={fieldCls} />
                </div>
                <MarketingConsentCheckbox id="tq-marketing-email-consent" />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <button type="submit" className={btn} disabled={formStatus === 'sending'} style={{ fontWeight: 700 }}>
                    {formStatus === 'sending' ? 'Sending' : 'Show my match'}
                  </button>
                  <button type="button" className="text-[#a7a7ad] hover:text-[#fdfdff] text-sm underline underline-offset-4" onClick={reset}>
                    Start over
                  </button>
                </div>
                {formStatus === 'error' && (
                  <p className="text-[#cc1e23] text-sm" role="alert" style={{ fontWeight: 600 }}>
                    That did not go through. Try again, or call {siteConfig.contact.phone.main} and we will match you by hand.
                  </p>
                )}
                <p className="text-[#5a5a61] text-xs leading-relaxed">
                  No spam, no list. Your answers go to the gym so the right coach can reach out.
                </p>
              </form>
            </div>
          </section>
        )}

        {/* RESULT */}
        {stage === 'result' && result && top && (
          <section className="pt-36 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Match */}
              <div className="bg-[#1c1c1e] border border-[#2a2a2c] p-6 md:p-10 mb-8">
                <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
                  {topTrainer && (
                    <div className="aspect-[4/5] bg-[#121214] overflow-hidden">
                      <img src={topTrainer.image} alt={topTrainer.name} className="w-full h-full object-cover grayscale" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase" style={{ fontWeight: 700 }}>Your match</p>
                      <p className="text-[#fdfdff] text-3xl leading-none" style={headingStyle}>
                        {Math.round(top.fit * 100)}%<span className="text-[#a7a7ad] text-xs tracking-[0.2em] uppercase ml-2">fit</span>
                      </p>
                    </div>
                    <h2 className="text-[#fdfdff] text-4xl md:text-5xl tracking-wide leading-none mb-2" style={headingStyle}>
                      {top.t.name}
                    </h2>
                    <p className="text-[#a7a7ad] text-sm tracking-wide uppercase mb-5">{top.t.title}</p>
                    <p className="text-[#a7a7ad] text-base leading-relaxed mb-5">
                      {reasons.length
                        ? `You lined up with their work in ${listify(reasons)}. That is the overlap the scoring found.`
                        : 'Across all six measures they came out closest to your answers.'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {top.t.cards.map((c) => (
                        <span
                          key={c}
                          className={`px-3 py-1 text-xs tracking-wide uppercase border ${
                            reasons.includes(c) ? 'border-[#cc1e23] text-[#fdfdff]' : 'border-[#2a2a2c] text-[#a7a7ad]'
                          }`}
                          style={{ fontWeight: 600 }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <Link to={`/trainers/${top.t.slug}`} className={btn} style={{ fontWeight: 700 }}>
                      See their page
                    </Link>
                  </div>
                </div>
                {second && (
                  <div className="border-t border-[#2a2a2c] mt-8 pt-5 grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#a7a7ad] text-xs tracking-[0.2em] uppercase block">Also a strong fit</span>
                      <Link to={`/trainers/${second.t.slug}`} className="text-[#fdfdff] hover:text-[#cc1e23] text-lg" style={{ fontWeight: 700 }}>
                        {second.t.name}
                      </Link>
                    </div>
                    <div>
                      <span className="text-[#a7a7ad] text-xs tracking-[0.2em] uppercase block">Why</span>
                      <span className="text-[#a7a7ad]">
                        {(result.leading.filter((k) => second.t.hit[k]).map((k) => second.t.hit[k])[0] ?? second.t.cards[0])},{' '}
                        {Math.round(second.fit * 100)}% fit
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-[#1c1c1e] p-6 md:p-8">
                  <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-2" style={{ fontWeight: 700 }}>Your goal profile</p>
                  <p className="text-[#a7a7ad] text-sm leading-relaxed mb-6">
                    You scored highest on {listify(leadLabels)}. That is what drives the match.
                  </p>
                  <div className="space-y-4">
                    {AXES.map((a) => {
                      const pc = Math.round((result.user[a.key] / max) * 100);
                      const lead = result.leading.includes(a.key);
                      return (
                        <div key={a.key}>
                          <div className="flex justify-between text-xs tracking-wide uppercase mb-1">
                            <span className={lead ? 'text-[#fdfdff]' : 'text-[#a7a7ad]'} style={{ fontWeight: lead ? 700 : 500 }}>{a.label}</span>
                            <span className="text-[#a7a7ad]">{pc}</span>
                          </div>
                          <div className="h-1.5 bg-[#121214]">
                            <div className={`h-1.5 ${lead ? 'bg-[#cc1e23]' : 'bg-[#5a5a61]'}`} style={{ width: `${pc}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#1c1c1e] border border-[#2a2a2c] p-6 md:p-8 flex flex-col justify-center text-center">
                  <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-2" style={{ fontWeight: 700 }}>Step two</p>
                  <h3 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wide mb-4" style={headingStyle}>Meet them in person</h3>
                  <p className="text-[#a7a7ad] text-base leading-relaxed mb-6">
                    Book the free evaluation. Olly walks you through the floor, looks at where you are, and confirms the
                    match before you commit to anything.
                  </p>
                  <Link to="/consultation" className={btn} style={{ fontWeight: 700 }}>
                    Book Your Free Evaluation
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <button type="button" className={ghost} onClick={reset} style={{ fontWeight: 700 }}>
                  Start over
                </button>
              </div>

              <p className="text-[#5a5a61] text-xs leading-relaxed mt-10 max-w-2xl mx-auto text-center">
                This is a starting point, not a verdict. Every coach here trains outside their headline specialties, and
                the evaluation is where the real fit gets decided.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
