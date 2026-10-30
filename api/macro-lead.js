// POST /api/macro-lead
// Sends a macro calculator lead into the Brits Brothers GHL sub-account so the
// UpState nurture (from info@britsbrothersgym.com) can email the results card
// and follow up. Formspree still gets its own copy for Olly; this is separate.
//
// The GHL token lives only in Vercel env (GHL_WEBSITE_TOKEN, contacts scope).
// If it is missing this returns 204 and does nothing, so the site never breaks.
// Field IDs below are not secrets; they were created Oct 30, 2026.

const LOCATION_ID = 'vmfZgRdAoZXbZA38iuln';
const API = 'https://services.leadconnectorhq.com';
const FIELDS = {
  macro_calories: 'tp7B0cFbCKNnaHdG2sLG',
  macro_protein: 'UWoO8986li4WVpv0CdCL',
  macro_carbs: 'CfTXI6WaqfTsV1GBVn18',
  macro_fat: '9IaXUJ4tidedKpRXKPCU',
  macro_protein_pct: 'ZVMl93QfJVpqLflsGZbo',
  macro_carbs_pct: 'zarvG9BTqUhubHuiT0FI',
  macro_fat_pct: 'RJ5BWMsb6J6OkcOAiavv',
  macro_protein_per_meal: '8ZzshSgKIZvlscSJirXM',
  macro_goal: 'RAmfHax29x6s3QV8mWnq',
  macro_training: '4bpW9sDoMMCCHDlpClpO',
};
const TAGS = ['macro-calculator', 'upstate-nurture', 'email-consent'];
const GOALS = {
  cut: 'Lean out, hold strength',
  hold: 'Hold weight, get stronger',
  slow: 'Slow gain',
  push: 'Push size',
};
const STYLES = { '4': 'heavy, long rests', '5.5': 'main lift + accessories', '8': 'strongman events' };
const ALLOWED_ORIGIN = /^https:\/\/(www\.)?britsbrothersgym\.com$|^https:\/\/brits-brothers-[a-z0-9-]+\.vercel\.app$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const num = (v, lo, hi) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= lo && n <= hi ? n : null;
};

export function buildFields(p) {
  const kcal = num(p.calories, 800, 8000);
  const pG = num(p.protein_g, 0, 700);
  const cG = num(p.carbs_g, 0, 1500);
  const fG = num(p.fat_g, 0, 500);
  if (kcal === null || pG === null || cG === null || fG === null) return null;
  const tot = pG * 4 + cG * 4 + fG * 9 || 1;
  const sessions = num(p.sessions_per_week, 0, 14) ?? 0;
  const style = STYLES[String(Number(p.session_style_met))] || 'mixed training';
  return {
    macro_calories: Math.round(kcal),
    macro_protein: Math.round(pG),
    macro_carbs: Math.round(cG),
    macro_fat: Math.round(fG),
    macro_protein_pct: `${Math.round(((pG * 4) / tot) * 100)}% of calories`,
    macro_carbs_pct: `${Math.round(((cG * 4) / tot) * 100)}% of calories`,
    macro_fat_pct: `${Math.round(((fG * 9) / tot) * 100)}% of calories`,
    macro_protein_per_meal: Math.round(pG / 4),
    macro_goal: GOALS[p.goal] || 'Not set',
    macro_training: sessions > 0 ? `${sessions}x a week, ${style}` : 'No sessions logged yet',
  };
}

async function ghl(path, token, body, method = 'POST') {
  const res = await fetch(API + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: '2021-07-28',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const origin = req.headers.origin || '';
  if (origin && !ALLOWED_ORIGIN.test(origin)) return res.status(403).json({ ok: false });

  const token = process.env.GHL_WEBSITE_TOKEN;
  if (!token) {
    console.warn('macro-lead: GHL_WEBSITE_TOKEN not set, skipping');
    return res.status(204).end();
  }

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = String(b.name || '').trim().slice(0, 80);
  const email = String(b.email || '').trim().toLowerCase().slice(0, 200);
  if (!name || !EMAIL.test(email) || b.consent !== true) return res.status(400).json({ ok: false });

  const fields = buildFields(b.payload || {});
  if (!fields) return res.status(400).json({ ok: false });

  const up = await ghl('/contacts/upsert', token, {
    locationId: LOCATION_ID,
    firstName: name.split(/\s+/)[0],
    lastName: name.split(/\s+/).slice(1).join(' ') || undefined,
    email,
    source: 'Website: Macro Calculator',
    customFields: Object.entries(fields).map(([k, v]) => ({ id: FIELDS[k], field_value: v })),
  });
  const id = up.data?.contact?.id;
  if (!up.ok || !id) {
    console.error('macro-lead: upsert failed', up.status, JSON.stringify(up.data).slice(0, 300));
    return res.status(502).json({ ok: false });
  }

  // Tags go on in a separate call so the "tag added" trigger fires the workflow.
  const tg = await ghl(`/contacts/${id}/tags`, token, { tags: TAGS });
  if (!tg.ok) console.error('macro-lead: tag failed', tg.status, JSON.stringify(tg.data).slice(0, 300));

  return res.status(200).json({ ok: true, new: Boolean(up.data?.new) });
}
