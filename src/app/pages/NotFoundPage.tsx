import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

// Catch-all for any URL without a route. Before this existed, a mistyped URL
// rendered the header and footer with nothing between them.

const bodyStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 500 } as const;
const headingStyle = { fontFamily: "'poster-gothic-atf', sans-serif" } as const;

const LINKS = [
  { to: '/trainers', label: 'Meet the Trainers' },
  { to: '/find-your-trainer', label: 'Find Your Trainer' },
  { to: '/macro-calculator', label: 'Macro Calculator' },
  { to: '/membership', label: 'Membership' },
];

export function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="That page does not exist at Brit's Brothers Gym." noindex />
      <section className="bg-[#121214] pt-40 pb-24 min-h-[70vh]" style={bodyStyle}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4" style={{ fontWeight: 700 }}>
            404
          </p>
          <h1 className="text-[#fdfdff] text-5xl md:text-6xl tracking-tight mb-6" style={headingStyle}>
            Wrong Turn
          </h1>
          <p className="text-[#a7a7ad] text-lg leading-relaxed mb-10">
            That page does not exist. Try one of these instead.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="border border-[#2a2a2c] hover:border-[#cc1e23] text-[#fdfdff] px-6 py-4 text-sm tracking-[0.15em] uppercase transition-colors"
                style={{ fontWeight: 700 }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/"
            className="inline-block bg-[#cc1e23] hover:bg-[#a8181d] text-[#fdfdff] px-8 py-4 text-sm tracking-[0.2em] uppercase transition-colors"
            style={{ fontWeight: 700 }}
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
