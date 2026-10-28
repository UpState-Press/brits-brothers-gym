import { type FormEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { MARKETING_EMAIL_CONSENT_LABEL } from './MarketingConsentCheckbox';

// Shared by every gated tool: one visitor fills this in once, then all tools
// that use <ToolGate /> open for them on this browser.
export const TOOLS_UNLOCKED_KEY = 'brits_tools_unlocked';

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

const ERROR_MESSAGE = `We could not send that just now. Try again, or call ${siteConfig.contact.phone.main} or email ${siteConfig.contact.email}.`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bodyStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 500 } as const;
const headingStyle = { fontFamily: "'poster-gothic-atf', sans-serif" } as const;

const labelCls = 'block text-[#fdfdff] text-sm tracking-wide mb-2';
const inputCls =
  'w-full bg-[#121214] border border-[#2a2a2c] text-[#fdfdff] px-4 py-3 text-base focus:outline-none focus:border-[#cc1e23] placeholder:text-[#5a5a61] aria-[invalid=true]:border-[#cc1e23]';
const fieldErrorCls = 'text-[#cc1e23] text-sm mt-2';

// Fields the gate owns. A payload entry with one of these keys is ignored.
const RESERVED_FIELDS = new Set([
  'name',
  'email',
  'source',
  'marketing_email_consent',
  'marketing_email_consent_label',
  '_subject',
]);

function readUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(TOOLS_UNLOCKED_KEY) === '1';
  } catch {
    return false;
  }
}

function writeUnlocked() {
  try {
    window.localStorage.setItem(TOOLS_UNLOCKED_KEY, '1');
  } catch {
    // Storage can be blocked. The visitor still sees this tool for the session.
  }
}

export type ToolGatePayload = Record<string, string | number | boolean | null | undefined>;

export interface ToolGateProps {
  source: string;
  payload?: ToolGatePayload;
  children: ReactNode;
  heading?: string;
  description?: string;
}

type Status = 'idle' | 'sending' | 'error';

export function ToolGate({
  source,
  payload,
  children,
  heading = 'See Your Results',
  description = 'Add your first name and email to see them.',
}: ToolGateProps) {
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const consentId = `${uid}-consent`;

  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const justSubmitted = useRef(false);

  useEffect(() => {
    if (unlocked && justSubmitted.current) {
      justSubmitted.current = false;
      revealRef.current?.focus();
    }
  }, [unlocked]);

  if (unlocked) {
    return (
      <div ref={revealRef} tabIndex={-1} className="outline-none">
        {children}
      </div>
    );
  }

  const nameError = name.trim() ? '' : 'Enter your first name.';
  const emailError = !email.trim()
    ? 'Enter your email.'
    : !EMAIL_PATTERN.test(email.trim())
      ? 'Enter a valid email, like name@example.com.'
      : '';
  const consentError = consent ? '' : 'Check the box to continue.';
  const valid = !nameError && !emailError && !consentError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    setAttempted(true);

    if (!valid) {
      const first = nameError ? nameRef : emailError ? emailRef : consentRef;
      first.current?.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      console.error(
        'VITE_CONTACT_FORM_ENDPOINT is not configured. Set it in Vercel (or .env) to your Formspree form URL.',
      );
      setStatus('error');
      return;
    }

    const data = new FormData();
    for (const [key, value] of Object.entries(payload ?? {})) {
      if (value === null || value === undefined || RESERVED_FIELDS.has(key)) continue;
      data.set(key, String(value));
    }
    data.set('_subject', `New website lead (${source}) from Brit's Brothers Gym`);
    data.set('name', name.trim());
    data.set('email', email.trim());
    data.set('marketing_email_consent', 'Yes');
    data.set('marketing_email_consent_label', MARKETING_EMAIL_CONSENT_LABEL);
    data.set('source', source);

    setStatus('sending');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        writeUnlocked();
        justSubmitted.current = true;
        setUnlocked(true);
        return;
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  const showNameError = attempted && nameError;
  const showEmailError = attempted && emailError;
  const showConsentError = attempted && consentError;
  const sending = status === 'sending';

  return (
    <div className="bg-[#1c1c1e] p-6 md:p-8" style={bodyStyle}>
      <span className="block text-[#cc1e23] text-xs tracking-[0.3em] uppercase mb-3" style={{ fontWeight: 700 }}>
        One quick step
      </span>
      <h2 className="text-[#fdfdff] text-2xl md:text-3xl tracking-wider mb-2" style={headingStyle}>
        {heading}
      </h2>
      <p className="text-[#a7a7ad] text-sm mb-6 leading-relaxed">{description}</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label htmlFor={nameId} className={labelCls}>First name</label>
          <input
            ref={nameRef}
            id={nameId}
            type="text"
            name="name"
            autoComplete="given-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={showNameError ? true : undefined}
            aria-describedby={showNameError ? `${nameId}-error` : undefined}
            className={inputCls}
          />
          {showNameError && (
            <p id={`${nameId}-error`} className={fieldErrorCls} role="alert">
              {nameError}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor={emailId} className={labelCls}>Email</label>
          <input
            ref={emailRef}
            id={emailId}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={showEmailError ? true : undefined}
            aria-describedby={showEmailError ? `${emailId}-error` : undefined}
            className={inputCls}
          />
          {showEmailError && (
            <p id={`${emailId}-error`} className={fieldErrorCls} role="alert">
              {emailError}
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-start gap-3">
            <input
              ref={consentRef}
              type="checkbox"
              id={consentId}
              name="marketing_email_consent"
              value="Yes"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={showConsentError ? true : undefined}
              aria-describedby={showConsentError ? `${consentId}-error` : undefined}
              className="mt-3 h-5 w-5 shrink-0 cursor-pointer accent-[#cc1e23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc1e23]"
            />
            <label htmlFor={consentId} className="cursor-pointer py-2.5 text-[#a7a7ad] text-sm leading-relaxed">
              {MARKETING_EMAIL_CONSENT_LABEL}
            </label>
          </div>
          {showConsentError && (
            <p id={`${consentId}-error`} className={fieldErrorCls} role="alert">
              {consentError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          aria-disabled={!valid || sending}
          className={`w-full bg-[#cc1e23] hover:bg-[#a8181d] text-[#fdfdff] py-4 text-sm tracking-[0.2em] uppercase transition-colors ${
            !valid || sending ? 'opacity-60' : ''
          }`}
          style={{ fontWeight: 700 }}
        >
          {sending ? 'Sending...' : 'Show My Results'}
        </button>

        <div aria-live="polite">
          {status === 'error' && (
            <p className="text-[#cc1e23] text-sm mt-4" style={{ fontWeight: 600 }}>
              {ERROR_MESSAGE}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
