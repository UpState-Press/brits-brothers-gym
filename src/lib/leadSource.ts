// First-touch lead source, so a booking can be credited to the email that sent it.
// UpState nurture links carry utm_source=upstate. We remember that for 30 days in
// this browser, and a later non-UpState visit never overwrites an UpState touch.

const KEY = 'brits_lead_source';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export interface LeadSource {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  at: number;
}

export function readLeadSource(): LeadSource | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as LeadSource;
    return Date.now() - v.at > TTL_MS ? null : v;
  } catch {
    return null;
  }
}

export function captureLeadSource(search: string): void {
  try {
    const p = new URLSearchParams(search);
    const source = p.get('utm_source');
    if (!source) return;
    const current = readLeadSource();
    if (current?.source === 'upstate' && source !== 'upstate') return;
    const v: LeadSource = {
      source,
      medium: p.get('utm_medium') ?? undefined,
      campaign: p.get('utm_campaign') ?? undefined,
      content: p.get('utm_content') ?? undefined,
      at: Date.now(),
    };
    window.localStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    // Storage blocked (private mode etc.): attribution is best effort.
  }
}

export function leadSourceLabel(v: LeadSource | null): string {
  if (!v) return '';
  if (v.source === 'upstate') {
    const detail = [v.campaign, v.content].filter(Boolean).join(', ');
    return `UpState email nurture${detail ? ` (${detail})` : ''}`;
  }
  return [v.source, v.medium, v.campaign].filter(Boolean).join(' / ');
}
