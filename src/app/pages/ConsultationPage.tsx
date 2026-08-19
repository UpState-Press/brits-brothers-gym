import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Dumbbell, Target, Clock } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SEO } from '../components/SEO';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import heroImage from 'figma:asset/b9998cd4dac15b527e6a0d9dcc4f633747e64dd4.webp';
import { FinalCTA } from '../components/FinalCTA';
import { Location } from '../components/Location';
import jakeOdumImg from '../../imports/jake-odum.jpg';
import lilyWikoffImg from '../../imports/lily-wikoff.jpg';
import ollyImg from '../../assets/olly-pierce.webp';
import floorImg from '../../imports/banner-12.jpg';

const FORM_SUBJECT = "New free evaluation request from Brit's Brothers Gym";
// Same Formspree endpoint the contact form uses (never hardcode it).
// TODO(Duncan): swap this section's <form> block for the GHL embed once the
// snippet is provided. GHL form redirects to the booking calendar itself,
// so the success/error state below becomes unnecessary at that point.
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

const SUCCESS_MESSAGE = 'Thanks. Your evaluation request is in. We will reach out soon to set a time.';
const ERROR_MESSAGE = `Something went wrong. Please call ${siteConfig.contact.phone.main} to book your free evaluation.`;

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const whatYouGet = [
  {
    icon: Users,
    title: 'Time with the owner',
    description:
      "You sit down with Olly Pierce himself. Thirty years on this floor, not a front desk rep reading off a script.",
  },
  {
    icon: Dumbbell,
    title: 'A walk of the whole gym',
    description:
      'See the floor and the equipment you would actually be training on, strongman gear and specialty bars included.',
  },
  {
    icon: Target,
    title: 'An honest read on your goals',
    description:
      "Tell Olly what you are after. He tells you straight what it takes to get there and whether this is the right room for it.",
  },
  {
    icon: Clock,
    title: 'Thirty minutes, no strings',
    description:
      'In and out in about half an hour. No cost, no contract, and nothing to sign unless you decide you want to.',
  },
];

const proofTestimonials = [
  {
    name: 'Jake Odum',
    quote:
      "Olly Pierce and the guys at Brit's Brothers Gym have a top-notch organization. They provide one-on-one personalized service that is tailored to your individual needs, and they do that at an unbeatable value! I am stronger than I've ever been and they showed me techniques that I had been doing wrong for years and didn't even know it!",
    image: jakeOdumImg,
  },
  {
    name: 'Lily Wikoff',
    quote:
      "My experience training with Olly at Brit's Brothers has been the most incredible experience I've ever had with a personal trainer, and the results I've seen in the amount of time I've been training have far exceeded my expectations.",
    image: lilyWikoffImg,
  },
];

const faqItems = [
  {
    q: 'I have never trained before.',
    a: 'Good. Olly starts everyone where they are, and most people who walk in here started exactly the same way.',
  },
  {
    q: 'Do I have to sign anything?',
    a: 'No. The evaluation is free and there is no contract attached to it. You leave when it is done and decide on your own time.',
  },
  {
    q: 'I am not in shape yet.',
    a: 'That is the reason to come in, not a reason to wait. Nobody here expects you to arrive already fit.',
  },
  {
    q: 'What should I bring?',
    a: 'Just yourself. Wear training clothes if you want to put your hands on something while you are here.',
  },
];

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
        title="Book a Free Evaluation"
        description="Book a free evaluation with Olly Pierce at Brit's Brothers Gym in Greenville, SC. Meet the owner, tour the gym, and talk through your goals, no cost, no obligation."
        keywords="free evaluation, meet Olly Pierce, personal training evaluation Greenville SC, book gym tour"
      />

      {/* Hero — modeled on the trainer detail page pattern.
          Owns the Hero -> Why Olly seam (#121214 -> #1c1c1e) with a bottom splatterDivider. */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121214] pt-24 pb-48">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Training atmosphere"
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/70 via-[#121214]/60 to-[#121214]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] bg-[#1c1c1e] overflow-hidden">
                <img
                  src={ollyImg}
                  alt="Olly Pierce"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                Owner &amp; Head Coach
              </span>

              <h1 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                OLLY PIERCE
              </h1>

              <p className="text-[#a7a7ad] text-lg md:text-xl mb-10 leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Thirty years running Brit's Brothers Gym. Voted Best Trainer of the Upstate, nine years in a row.
              </p>

              <a
                href="#evaluation-form"
                className="inline-block bg-[#cc1e23] text-[#fdfdff] px-8 sm:px-12 py-4 sm:py-5 hover:bg-[#a01419] transition-all hover:scale-105 tracking-wider text-base sm:text-lg w-full sm:w-auto text-center"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                Book Your Free Evaluation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider — owns Hero -> Why Olly */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-0">
          <img src={splatterDivider} alt="" className="w-full h-auto block" />
        </div>
      </section>

      {/* Why Olly */}
      <section className="relative py-32 bg-[#1c1c1e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Thirty Years On This Floor
          </span>
          <h2 className="text-[#fdfdff] text-4xl md:text-5xl mb-8 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            WHY OLLY
          </h2>
          <p className="text-[#a7a7ad] text-lg md:text-xl leading-relaxed mb-12" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            Olly Pierce built Brit's Brothers Gym thirty years ago and still runs the floor every day. Best Trainer of the Upstate, nine years in a row. A bodybuilder since 18, he's trained bodybuilders, fighters, and lifters coming back from injury.
          </p>

          <blockquote className="text-[#fdfdff] text-2xl md:text-3xl leading-relaxed italic border-l-4 border-[#cc1e23] pl-6 text-left max-w-2xl mx-auto" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
            "The key to success is connecting your body to your mind."
          </blockquote>
          <p className="text-[#a7a7ad] text-sm mt-4 tracking-wide uppercase text-left max-w-2xl mx-auto pl-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            — Olly Pierce, Owner &amp; Head Coach
          </p>
        </div>
      </section>

      {/* What You Get — owns Why Olly -> here (top) and here -> Proof (bottom) */}
      <section className="relative pt-48 pb-48 bg-[#121214]">
        {/* Top Divider — owns Why Olly (#1c1c1e) -> What You Get (#121214) */}
        <div className="absolute top-0 left-0 right-0 w-full z-10">
          <img src={splatterDivider} alt="" className="w-full h-auto block rotate-180" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              Your Free Evaluation
            </span>
            <h2 className="text-[#fdfdff] text-4xl md:text-5xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              WHAT YOU GET
            </h2>
            <p className="text-[#a7a7ad] text-lg max-w-3xl mx-auto" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Half an hour on the floor with the man who built this place.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Photo */}
            <div className="relative aspect-[4/5] bg-[#1c1c1e] overflow-hidden">
              <img
                src={floorImg}
                alt="Training floor at Brit's Brothers Gym"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            {/* Items */}
            <div className="space-y-10">
              {whatYouGet.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-[#cc1e23]/20 rounded-full flex items-center justify-center">
                      <IconComponent className="text-[#cc1e23]" size={28} />
                    </div>
                    <div>
                      <h3 className="text-[#fdfdff] text-xl md:text-2xl mb-2 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                        {item.title.toUpperCase()}
                      </h3>
                      <p className="text-[#a7a7ad] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Divider — owns What You Get (#121214) -> Proof (#1c1c1e) */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-10">
          <img src={splatterDivider} alt="" className="w-full h-auto block" />
        </div>
      </section>

      {/* Proof */}
      <section className="relative py-32 bg-[#1c1c1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              Real Results
            </span>
            <h2 className="text-[#fdfdff] text-4xl md:text-5xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              MEMBERS ON OLLY
            </h2>
          </div>

          <div className="space-y-8">
            {proofTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#121214] overflow-hidden grid md:grid-cols-[300px_1fr] gap-0">
                <div className="relative overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-[#cc1e23] text-[#cc1e23]" />
                    ))}
                  </div>
                  <blockquote className="text-[#a7a7ad] text-lg mb-6 leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="text-[#fdfdff] text-xl tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-10">
            <Link to="/testimonials" className="text-[#a7a7ad] text-sm underline hover:text-[#cc1e23] transition-colors" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
              See more stories →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ — owns Proof -> here (top) and here -> Form (bottom) */}
      <section className="relative pt-48 pb-48 bg-[#121214]">
        {/* Top Divider — owns Proof (#1c1c1e) -> FAQ (#121214) */}
        <div className="absolute top-0 left-0 right-0 w-full z-10">
          <img src={splatterDivider} alt="" className="w-full h-auto block rotate-180" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              Before You Book
            </span>
            <h2 className="text-[#fdfdff] text-4xl md:text-5xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              STRAIGHT ANSWERS
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-[#1c1c1e] p-8 border-l-4 border-[#cc1e23]">
                <h3 className="text-[#fdfdff] text-xl md:text-2xl mb-4 tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                  {item.q.toUpperCase()}
                </h3>
                <p className="text-[#a7a7ad] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider — owns FAQ (#121214) -> Form (#1c1c1e) */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-10">
          <img src={splatterDivider} alt="" className="w-full h-auto block" />
        </div>
      </section>

      {/* Intake Form */}
      <section id="evaluation-form" className="relative py-32 bg-[#1c1c1e]">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#121214] p-8 md:p-12">
            <span className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              No Cost, No Contract
            </span>

            <h2 className="text-[#fdfdff] text-3xl md:text-4xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              BOOK YOUR EVALUATION
            </h2>

            {/* Secondary option: phone */}
            <p className="text-[#a7a7ad] text-sm mb-8" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Prefer to talk?{' '}
              <a href={`tel:${siteConfig.contact.phone.mainRaw}`} className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors">
                Call {siteConfig.contact.phone.main}
              </a>{' '}
              and we will set up your free evaluation.
            </p>

            {/* NOTE: this is the existing Formspree form, held over temporarily.
                Swap for the GHL embed (redirects to booking calendar) once provided. */}
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
                {formStatus === 'sending' ? 'Sending...' : 'Book My Evaluation'}
              </button>
            </form>

            {/* Award trust line */}
            <p className="text-[#a7a7ad] text-sm mt-8 text-center tracking-wide" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
              Voted "Best Trainer of the Upstate" 9 years in a row.
            </p>

            {/* Secondary path to pricing */}
            <p className="text-[#a7a7ad] text-sm mt-4 text-center" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Want to see prices first?{' '}
              <Link to="/membership" className="text-[#fdfdff] underline hover:text-[#cc1e23] transition-colors">
                View membership and training options
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Find Us section is #1c1c1e and the form section above it is
          also #1c1c1e, so its top divider uses the matching #1c1c1e shade. */}
      <Location topPadding="py-32" topDividerShade="light" />

      <FinalCTA />
    </>
  );
}
