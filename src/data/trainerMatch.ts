// Trainer match quiz: scoring data. Ported from the Aug 26 prototype and
// extended Oct 22 for Juliette, Evan, and the Heather-forward rules Olly asked
// for. Every number that someone might want to argue about lives in this file.
//
// Six axes. Each answer adds points to axes. Each trainer is scored on the same
// six from their specialty cards in trainers.ts. Match = cosine similarity, so
// a generalist with many cards does not out-mass a specialist on every result.
// On top of cosine, an answer can carry a per-trainer bonus. That is how
// Heather gets pushed toward older adults without routing a 24-year-old
// powerlifter to her, and how Juliette picks up pregnancy and postpartum.

export type Axis = 'strength' | 'size' | 'lean' | 'athletic' | 'longevity' | 'support';

export const AXES: { key: Axis; label: string }[] = [
  { key: 'strength', label: 'Maximal strength' },
  { key: 'size', label: 'Muscle and size' },
  { key: 'lean', label: 'Body composition' },
  { key: 'athletic', label: 'Speed and power' },
  { key: 'longevity', label: 'Mobility and longevity' },
  { key: 'support', label: 'Nutrition and support' },
];

export type Vec = Record<Axis, number>;

export interface MatchTrainer {
  slug: string;
  name: string;
  title: string;
  group: 'm' | 'f';
  active: boolean;
  v: Vec;
  cards: string[];
  hit: Partial<Record<Axis, string>>;
}

export const MATCH_TRAINERS: MatchTrainer[] = [
  {
    slug: 'jake-henderson', name: 'Jake Henderson', group: 'm', active: true,
    title: 'Strength & Conditioning Coach, Owner of Carolina Barbell Club',
    v: { strength: 3, size: 1, lean: 1, athletic: 2, longevity: 2, support: 1 },
    cards: ['Powerlifting & Strongman', 'Athletic Performance', 'Wellness & Lifestyle', 'Mobility & Longevity'],
    hit: { strength: 'Powerlifting & Strongman', athletic: 'Athletic Performance', longevity: 'Mobility & Longevity' },
  },
  {
    slug: 'guy-mosley', name: 'Guy Mosley', group: 'm', active: true,
    title: 'Personal Trainer & Mo Better Fit Coach',
    v: { strength: 2, size: 2, lean: 0, athletic: 3, longevity: 0, support: 1 },
    cards: ['Speed', 'Power', 'Explosion', 'Weight Gain', 'Strength', 'Mental Focus'],
    hit: { athletic: 'Speed, Power and Explosion', strength: 'Strength', size: 'Weight Gain' },
  },
  {
    slug: 'ryan-mccaffery', name: 'Ryan Mccaffery', group: 'm', active: true,
    title: 'Personal Trainer',
    v: { strength: 1, size: 3, lean: 3, athletic: 2, longevity: 0, support: 1 },
    cards: ['Hypertrophy', 'Aesthetics', 'Power', 'Fat Transformation'],
    hit: { size: 'Hypertrophy', lean: 'Fat Transformation', athletic: 'Power' },
  },
  {
    slug: 'hailey-peterson', name: 'Hailey Peterson', group: 'f', active: true,
    title: 'Personal Trainer',
    v: { strength: 1, size: 3, lean: 2, athletic: 0, longevity: 1, support: 3 },
    cards: ['Aesthetics', 'Hypertrophy', 'Nutrition', 'Hormone Balance'],
    hit: { size: 'Hypertrophy', lean: 'Aesthetics', support: 'Nutrition', longevity: 'Hormone Balance' },
  },
  {
    slug: 'heather-hetager', name: 'Heather Hetager', group: 'f', active: true,
    title: 'Personal Trainer',
    v: { strength: 1, size: 0, lean: 1, athletic: 0, longevity: 3, support: 2 },
    cards: ['Yoga & Longevity', 'Strength', 'Nutrition'],
    hit: { longevity: 'Yoga & Longevity', strength: 'Strength', support: 'Nutrition' },
  },
  {
    slug: 'juliette-pierce', name: 'Juliette Pierce', group: 'f', active: true,
    title: 'IFBB Pro Athlete & Personal Trainer',
    v: { strength: 1, size: 2, lean: 3, athletic: 0, longevity: 1, support: 3 },
    cards: ["Women's Strength, Health & Fitness", 'Nutrition & Diet', 'Pageant & Competition Prep', 'Posing & Stage Presentation'],
    hit: { lean: "Women's Strength, Health & Fitness", size: 'Pageant & Competition Prep', support: 'Nutrition & Diet' },
  },
  // Evan is held out of the pool until Josiah rules on boxing as an offering.
  // Flip active to true and add a boxing answer in Q "style" when he does.
  {
    slug: 'evan-pierce', name: 'Evan Pierce', group: 'm', active: false,
    title: 'Professional Boxer & Coach',
    v: { strength: 0, size: 0, lean: 2, athletic: 3, longevity: 0, support: 1 },
    cards: ['Boxing Fundamentals & Technique', 'Footwork, Defense & Ring IQ', 'Conditioning & Athletic Development', 'Sparring & Fight Preparation'],
    hit: { athletic: 'Conditioning & Athletic Development', lean: 'Conditioning & Athletic Development' },
  },
];

export interface Answer {
  t: string;
  d?: string;
  s: Partial<Vec>;
  filter?: 'm' | 'f';
  bonus?: Record<string, number>; // slug -> added to fit score (0..1 scale)
}

export interface Question {
  id: string;
  w: number;
  q: string;
  sub: string;
  a: Answer[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'goal', w: 2,
    q: 'What are you actually after?',
    sub: 'Pick the one that would make the year feel worth it.',
    a: [
      { t: 'Get as strong as I can', d: 'Squat, bench, deadlift, or the events', s: { strength: 3 } },
      { t: 'Build muscle and look it', d: 'Size, shape, filling out a shirt', s: { size: 3 } },
      { t: 'Lean down', d: 'Change my body composition, drop fat', s: { lean: 3 } },
      { t: 'Get faster and more athletic', d: 'Speed, power, work capacity', s: { athletic: 3 } },
      { t: 'Move well and stay in it', d: 'Feel good at 60 the way I did at 30', s: { longevity: 3 }, bonus: { 'heather-hetager': 0.04 } },
    ],
  },
  {
    id: 'stage', w: 1,
    q: 'Where are you in life?',
    sub: 'Training at 25 and training at 65 are different jobs. We match accordingly.',
    a: [
      { t: 'Under 30', d: '', s: { size: 1, athletic: 1 } },
      { t: '30 to 44', d: '', s: { lean: 1 } },
      { t: '45 to 59', d: '', s: { longevity: 2, support: 1 }, bonus: { 'heather-hetager': 0.08 } },
      { t: '60 and up', d: '', s: { longevity: 3, support: 1 }, bonus: { 'heather-hetager': 0.12 } },
    ],
  },
  {
    id: 'exp', w: 1,
    q: 'Where are you starting from?',
    sub: 'No wrong answer. It changes who teaches you, not whether you belong here.',
    a: [
      { t: 'Never really trained', d: 'Or it has been years', s: { longevity: 1, support: 1 }, bonus: { 'heather-hetager': 0.03 } },
      { t: 'Under a year in', d: 'Still learning the lifts', s: { size: 1, support: 1 } },
      { t: 'One to three years', d: 'Comfortable, want more', s: { size: 1, strength: 1 } },
      { t: 'Three years plus', d: 'I know my numbers', s: { strength: 2, athletic: 1 } },
    ],
  },
  {
    id: 'style', w: 1,
    q: 'What kind of training do you actually enjoy?',
    sub: 'Not what you think you should say. What gets you in the door.',
    a: [
      { t: 'Heavy barbell work', d: 'Low reps, long rests, big numbers', s: { strength: 3 } },
      { t: 'Bodybuilding style', d: 'Higher reps, chase the pump', s: { size: 3 } },
      { t: 'Mixed and sweaty', d: 'Lifting plus conditioning', s: { athletic: 2, lean: 2 } },
      { t: 'Controlled and low impact', d: 'Mobility, technique, no wrecking me', s: { longevity: 3 }, bonus: { 'heather-hetager': 0.05 } },
    ],
  },
  {
    id: 'block', w: 1,
    q: 'What has been getting in the way?',
    sub: 'The honest one.',
    a: [
      { t: 'I do not know what to do', d: 'Need a plan and someone to teach it', s: { support: 2, longevity: 1 } },
      { t: 'I stall out on my own', d: 'Accountability is the missing piece', s: { support: 2 } },
      { t: 'I am stuck at a plateau', d: 'Progress dried up', s: { strength: 2, size: 1 } },
      { t: 'Something hurts', d: 'Old injury, joint pain, a bad back', s: { longevity: 3 }, bonus: { 'heather-hetager': 0.05 } },
      { t: 'Eating is the weak link', d: 'Training is fine, food is not', s: { support: 3, lean: 2 } },
    ],
  },
  {
    id: 'nutrition', w: 1,
    q: 'Do you want nutrition coaching too?',
    sub: 'Some coaches here build it in. Some just train you.',
    a: [
      { t: 'Yes, that is half the problem', d: '', s: { support: 3 } },
      { t: 'Some guidance would help', d: '', s: { support: 1 } },
      { t: 'No, just program my training', d: '', s: {} },
    ],
  },
  {
    id: 'compete', w: 1,
    q: 'Any interest in competing?',
    sub: 'Plenty of people here never do. It is a real option if you want it.',
    a: [
      { t: 'None at all', d: '', s: {} },
      { t: 'Curious, maybe someday', d: '', s: { strength: 1 } },
      { t: 'A powerlifting or strongman meet', d: '', s: { strength: 3, athletic: 1 } },
      { t: 'A physique or bodybuilding show', d: '', s: { size: 3, lean: 3 }, bonus: { 'juliette-pierce': 0.06 } },
      { t: 'A pageant or fit model stage', d: '', s: { lean: 3, support: 2 }, bonus: { 'juliette-pierce': 0.15 } },
    ],
  },
  {
    id: 'around', w: 1,
    q: 'Anything we should train around?',
    sub: 'Optional. It helps us point you at the right person the first time.',
    a: [
      { t: 'Nothing worth mentioning', d: '', s: {} },
      { t: 'Joint pain or stiffness', d: 'Knees, shoulders, back, hips', s: { longevity: 3 }, bonus: { 'heather-hetager': 0.05 } },
      { t: 'Coming back from a break', d: 'Injury, illness, or life', s: { longevity: 1, support: 1 } },
      { t: 'Pregnancy or postpartum', d: 'Training through it or coming back after', s: { lean: 1, support: 2, longevity: 1 }, bonus: { 'juliette-pierce': 0.15 } },
      { t: 'Perimenopause or menopause', d: 'Training and food need to account for it', s: { support: 2, longevity: 2 }, bonus: { 'heather-hetager': 0.05, 'juliette-pierce': 0.03 } },
    ],
  },
  {
    id: 'pref', w: 0,
    q: 'Any preference on who you work with?',
    sub: 'Some people have one, some do not. Either is fine and it changes nothing else about the result.',
    a: [
      { t: 'No preference', d: 'Match me on the training', s: {} },
      { t: 'A male trainer', d: '', s: {}, filter: 'm' },
      { t: 'A female trainer', d: '', s: {}, filter: 'f' },
    ],
  },
];

export interface MatchResult {
  user: Vec;
  leading: Axis[];
  ranked: { t: MatchTrainer; fit: number; cosine: number }[];
}

// Heather wins a near tie. Olly asked for her to be the default when it is
// close, and "close" is within this many fit points.
const HEATHER_TIE_WINDOW = 0.03;

export function scoreAnswers(answers: (number | null)[]): MatchResult {
  const user: Vec = { strength: 0, size: 0, lean: 0, athletic: 0, longevity: 0, support: 0 };
  const bonus: Record<string, number> = {};
  let filter: 'm' | 'f' | null = null;

  QUESTIONS.forEach((q, n) => {
    const idx = answers[n];
    if (idx === null || idx === undefined) return;
    const pick = q.a[idx];
    if (!pick) return;
    if (pick.filter) filter = pick.filter;
    (Object.keys(pick.s) as Axis[]).forEach((k) => {
      user[k] += (pick.s[k] ?? 0) * q.w;
    });
    if (pick.bonus) {
      Object.entries(pick.bonus).forEach(([slug, b]) => {
        bonus[slug] = (bonus[slug] ?? 0) + b;
      });
    }
  });

  const cosine = (t: MatchTrainer) => {
    let dot = 0;
    let ma = 0;
    let mb = 0;
    AXES.forEach(({ key }) => {
      const u = user[key];
      const v = t.v[key];
      dot += u * v;
      ma += u * u;
      mb += v * v;
    });
    return ma && mb ? dot / (Math.sqrt(ma) * Math.sqrt(mb)) : 0;
  };

  const pool = MATCH_TRAINERS.filter((t) => t.active && (!filter || t.group === filter));
  const ranked = pool
    .map((t) => {
      const c = cosine(t);
      return { t, cosine: c, fit: Math.min(0.98, c + (bonus[t.slug] ?? 0)) };
    })
    .sort((a, b) => b.fit - a.fit);

  // Heather tie-break: if she is second and within the window, she goes first.
  if (ranked.length > 1 && ranked[1].t.slug === 'heather-hetager' && ranked[0].fit - ranked[1].fit <= HEATHER_TIE_WINDOW) {
    [ranked[0], ranked[1]] = [ranked[1], ranked[0]];
  }

  const order = [...AXES].sort((a, b) => user[b.key] - user[a.key]);
  const max = user[order[0].key] || 1;
  const leading = order.filter((a) => user[a.key] >= max * 0.6 && user[a.key] > 0).slice(0, 2).map((a) => a.key);

  return { user, leading, ranked };
}

export function listify(a: string[]): string {
  if (a.length === 1) return a[0];
  if (a.length === 2) return `${a[0]} and ${a[1]}`;
  return `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`;
}
