import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { getPublicSiteOrigin } from '../../config/siteConfig';
import { SEO } from '../components/SEO';

const bodyStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 500 } as const;
const headingStyle = { fontFamily: "'poster-gothic-atf', sans-serif" } as const;

function ArticleSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2
        className="text-[#fdfdff] text-2xl md:text-3xl mb-4 tracking-wider"
        style={headingStyle}
      >
        {title}
      </h2>
      <div className="text-[#a7a7ad] text-lg leading-relaxed space-y-4" style={bodyStyle}>
        {children}
      </div>
    </section>
  );
}

export function PowerliftingBlogPage() {
  const canonicalUrl = `${getPublicSiteOrigin()}/blog/powerlifting.html`;

  return (
    <>
      <SEO
        title="Powerlifting Training in Greenville SC"
        description="Powerlifting training in Greenville, SC at Brit's Brothers Gym. Beginner-friendly coaching, smart strength progression, technique-focused programming, and expert trainers since 1994."
        keywords="powerlifting Greenville SC, powerlifting gym Greenville, strength training Greenville, squat bench deadlift coaching, beginner powerlifting"
        canonicalUrl={canonicalUrl}
      />

      <article className="bg-[#121214]">
        <header className="pt-40 pb-16 border-b border-[#2a2a2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4"
              style={{ ...bodyStyle, fontWeight: 700 }}
            >
              Strength Training · Greenville, SC
            </p>
            <h1
              className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
              style={headingStyle}
            >
              Powerlifting Training in Greenville SC
            </h1>
            <p className="text-[#a7a7ad] text-xl leading-relaxed" style={bodyStyle}>
              Whether you are preparing for your first meet or rebuilding after time away from
              the bar, Brit&apos;s Brothers Gym offers disciplined powerlifting coaching in an
              old-school training environment built for real strength.
            </p>
          </div>
        </header>

        <div className="py-16 bg-[#1c1c1e]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleSection title="Who Powerlifting Is For">
              <p>
                Powerlifting is for anyone who wants to get measurably stronger using the
                squat, bench press, and deadlift. Our members include first-time lifters,
                experienced competitors, athletes cross-training for sport, and adults who
                simply want a proven system for building muscle and confidence.
              </p>
              <p>
                You do not need a perfect background or an elite starting point. You need
                consistency, coachable technique, and a gym culture that respects hard work.
              </p>
            </ArticleSection>

            <ArticleSection title="Beginner-Friendly Coaching">
              <p>
                Every lifter starts with fundamentals: bracing, bar path, foot placement, and
                safe loading progressions. Our trainers teach you how to train—not just what
                to lift—so you build habits that last beyond a single program cycle.
              </p>
              <p>
                Beginners work at a pace that matches recovery capacity and movement quality.
                That approach reduces injury risk and creates faster long-term progress than
                copying advanced programming too early.
              </p>
            </ArticleSection>

            <ArticleSection title="Strength Progression Philosophy">
              <p>
                We prioritize progressive overload with intention. That means tracking your
                work, adjusting volume and intensity thoughtfully, and training the main lifts
                often enough to improve skill—not chasing random PR attempts every session.
              </p>
              <p>
                Strength is built through repeated quality reps, appropriate deloads, and
                patient accumulation of work capacity. Our coaching model favors steady
                improvement over hype-driven training that burns people out.
              </p>
            </ArticleSection>

            <ArticleSection title="Recovery and Technique">
              <p>
                Technique is the foundation of sustainable powerlifting. Better positions
                produce better force transfer, safer joints, and more reliable meet-day
                performance. We coach setup, tempo, and consistency on every rep that matters.
              </p>
              <p>
                Recovery is part of training—not an afterthought. Sleep, nutrition, mobility,
                and managing training stress are discussed as seriously as your weekly squat
                and deadlift work. Strong lifters recover on purpose.
              </p>
            </ArticleSection>

            <ArticleSection title="Why Brit's Brothers Is Different">
              <p>
                Since 1994, Brit&apos;s Brothers has been known for no-nonsense personal
                training, serious equipment, and a community that shows up to work. This is not
                a glossy franchise floor—it is a training home for people who want results.
              </p>
              <p>
                You train with experienced coaches—including strength specialists with
                competition and high-performance backgrounds—inside a facility designed for
                powerlifting and general strength development.{' '}
                <Link to="/trainers" className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors underline">
                  Meet our trainers
                </Link>
                .
              </p>
            </ArticleSection>

            <section className="bg-[#121214] p-8 md:p-10 border border-[#2a2a2c]">
              <h2
                className="text-[#fdfdff] text-2xl md:text-3xl mb-4 tracking-wider"
                style={headingStyle}
              >
                Start Powerlifting Training in Greenville
              </h2>
              <p className="text-[#a7a7ad] text-lg leading-relaxed mb-6" style={bodyStyle}>
                Ready to train with a plan? Explore membership options, talk with our team,
                or schedule a visit to tour the gym.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/membership"
                  className="inline-flex justify-center bg-[#cc1e23] text-[#fdfdff] px-8 py-4 hover:bg-[#a01419] transition-colors tracking-wider"
                  style={headingStyle}
                >
                  View Membership
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex justify-center bg-transparent text-[#fdfdff] px-8 py-4 border border-[#fdfdff]/30 hover:border-[#cc1e23] transition-colors tracking-wider"
                  style={headingStyle}
                >
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
