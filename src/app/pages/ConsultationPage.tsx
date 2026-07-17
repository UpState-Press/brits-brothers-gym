import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { SEO } from '../components/SEO';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import { FinalCTA } from '../components/FinalCTA';
import { Location } from '../components/Location';

const FORM_SUBJECT = "New free consultation request from Brit's Brothers Gym";
// Same Formspree endpoint the contact form uses (never hardcode it).
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

const SUCCESS_MESSAGE = 'Thanks. Your consultation request is in. We will reach out soon to set a time.';
const ERROR_MESSAGE = `Something went wrong. Please call ${siteConfig.contact.phone.main} to book your free consultation.`;

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ConsultationPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  async function handleConsultSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      console.error(
        'VITE_CONTACT_FORM_ENDPOINT is not configured. Set it in Vercel (or .env) to your Formspree form URL.',
      );
      setFormStatus('error');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('_subject', FORM_SUBJECT);

    setFormStatus('sending');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        setFormStatus('success');
        return;
      }

      setFormStatus('error');
    } catch {
      setFormStatus('error');
    }
  }

  const fieldClass =
    'w-full bg-[#121214] text-[#fdfdff] px-4 py-3 border border-[#fdfdff]/20 focus:border-[#cc1e23] focus:outline-none transition-colors';
  const labelClass =
    'block text-[#fdfdff] text-sm mb-2 tracking-wide uppercase';

  return (
    <>
      <SEO
        title="Book a Free Consultation"
        description="Book a free consultation at Brit's Brothers Gym in Greenville, SC. Tell us your goals and our coaches will build a plan to get you there."
        keywords="free consultation, personal training consultation Greenville SC, book training session"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-40 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Start Here
          </span>

          <h1 className="text-[#fdfdff] text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            BOOK A FREE CONSULTATION
          </h1>

          <p className="text-[#a7a7ad] text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            Tell us your goals. We will build the plan and show you how to get there.
          </p>
        </div>

        {/* Bottom Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-10">
          <img src={splatterDivider} alt="" className="w-full h-auto block" />
        </div>
      </section>

      {/* Intake Form */}
      <section className="relative py-32 bg-[#1c1c1e]">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1c1c1e] p-8">
            <h2 className="text-[#fdfdff] text-3xl md:text-4xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              TELL US ABOUT YOU
            </h2>

            {/* Secondary option: phone */}
            <p className="text-[#a7a7ad] text-sm mb-8" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Prefer to talk?{' '}
              <a href={`tel:${siteConfig.contact.phone.mainRaw}`} className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors">
                Call {siteConfig.contact.phone.main}
              </a>{' '}
              and we will set up your free consultation.
            </p>

            <form className="space-y-6" onSubmit={handleConsultSubmit} noValidate>
              {/* Formspree honeypot */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                defaultValue=""
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
              />

              <div>
                <label htmlFor="name" className={labelClass} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                  Name
                </label>
                <input type="text" id="name" name="name" required className={fieldClass} style={{ fontFamily: "'Work Sans', sans-serif" }} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                  Phone
                </label>
                <input type="tel" id="phone" name="phone" required className={fieldClass} style={{ fontFamily: "'Work Sans', sans-serif" }} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                  Email
                </label>
                <input type="email" id="email" name="email" required className={fieldClass} style={{ fontFamily: "'Work Sans', sans-serif" }} />
              </div>

              <div>
                <label htmlFor="goals" className={labelClass} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                  Tell us about your goals
                </label>
                <textarea id="goals" name="goals" rows={5} required className={`${fieldClass} resize-none`} style={{ fontFamily: "'Work Sans', sans-serif" }} />
              </div>

              <div>
                <label htmlFor="preferred_contact" className={labelClass} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                  Preferred contact method
                </label>
                <select id="preferred_contact" name="preferred_contact" defaultValue="Phone" className={fieldClass} style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <option value="Phone">Phone</option>
                  <option value="Text">Text</option>
                  <option value="Email">Email</option>
                </select>
              </div>

              {formStatus === 'success' ? (
                <p className="text-[#fdfdff] text-sm leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }} role="status">
                  {SUCCESS_MESSAGE}
                </p>
              ) : null}

              {formStatus === 'error' ? (
                <p className="text-[#a7a7ad] text-sm leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }} role="alert">
                  {ERROR_MESSAGE}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-[#cc1e23] text-[#fdfdff] px-8 py-4 hover:bg-[#a01419] transition-all hover:scale-105 tracking-wider text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Request My Consultation'}
              </button>
            </form>

            {/* Secondary path to pricing */}
            <p className="text-[#a7a7ad] text-sm mt-8 text-center" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Want to see prices first?{' '}
              <Link to="/membership" className="text-[#fdfdff] underline hover:text-[#cc1e23] transition-colors">
                View membership and training options
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Location topPadding="py-32" />

      <FinalCTA />
    </>
  );
}
