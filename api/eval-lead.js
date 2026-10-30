// POST /api/eval-lead
// Records a free evaluation request in the Brits GHL sub-account. Tags every one
// eval-requested. Also tags upstate-sourced when the visitor arrived from an
// UpState nurture link, or is already a contact in the UpState nurture. That tag
// is how a booking gets credited to UpState. Formspree still emails Olly as before.
// Token: Vercel env GHL_WEBSITE_TOKEN only. Missing token means 204 and no-op.

const LOCATION_ID = 'vmfZgRdAoZXbZA38iuln';
const API = 'https://services.leadconnectorhq.com';
const ALLOWED_ORIGIN = /^https:\/\/(www\.)?britsbrothersgym\.com$|^https:\/\/brits-brothers-[a-z0-9-]+\.vercel\.app$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function ghl(path, token, body, method = 'POST') {
  const res = await fetch(API + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: '2021-07-28',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
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
    console.warn('eval-lead: GHL_WEBSITE_TOKEN not set, skipping');
    return res.status(204).end();
  }

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = String(b.name || '').trim().slice(0, 80);
  const email = String(b.email || '').trim().toLowerCase().slice(0, 200);
  const phone = String(b.phone || '').replace(/[^\d+]/g, '').slice(0, 20);
  if (!name || !EMAIL.test(email)) return res.status(400).json({ ok: false });
  const fromUpstateLink = b.leadSource?.source === 'upstate';

  const up = await ghl('/contacts/upsert', token, {
    locationId: LOCATION_ID,
    firstName: name.split(/\s+/)[0],
    lastName: name.split(/\s+/).slice(1).join(' ') || undefined,
    email,
    phone: phone || undefined,
    source: fromUpstateLink ? 'UpState email nurture' : 'Website: Free Evaluation',
  });
  const id = up.data?.contact?.id;
  if (!up.ok || !id) {
    console.error('eval-lead: upsert failed', up.status, JSON.stringify(up.data).slice(0, 300));
    return res.status(502).json({ ok: false });
  }

  // Read current tags: an existing nurture contact counts as UpState-sourced even
  // if they typed the URL instead of clicking our link.
  const cur = await ghl(`/contacts/${id}`, token, undefined, 'GET');
  const existing = cur.data?.contact?.tags || [];
  const upstate = fromUpstateLink || existing.includes('upstate-nurture');
  const tags = ['eval-requested', ...(upstate ? ['upstate-sourced'] : [])];

  const tg = await ghl(`/contacts/${id}/tags`, token, { tags });
  if (!tg.ok) console.error('eval-lead: tag failed', tg.status, JSON.stringify(tg.data).slice(0, 300));

  return res.status(200).json({ ok: true, upstate });
}
