export const MARKETING_EMAIL_CONSENT_LABEL =
  "Send me tips and offers from Brit's Brothers by email. Unsubscribe anytime.";

const FIELD_NAME = 'marketing_email_consent';

// A native unchecked checkbox sends nothing, so always set both fields explicitly.
export function applyMarketingEmailConsent(data: FormData) {
  data.set(FIELD_NAME, data.has(FIELD_NAME) ? 'Yes' : 'No');
  data.set(`${FIELD_NAME}_label`, MARKETING_EMAIL_CONSENT_LABEL);
}

export function MarketingConsentCheckbox({ id }: { id: string }) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        name={FIELD_NAME}
        value="Yes"
        defaultChecked={false}
        className="mt-3 h-5 w-5 shrink-0 cursor-pointer accent-[#cc1e23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc1e23]"
      />
      <label
        htmlFor={id}
        className="cursor-pointer py-2.5 text-[#a7a7ad] text-sm leading-relaxed"
        style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}
      >
        {MARKETING_EMAIL_CONSENT_LABEL}
      </label>
    </div>
  );
}
