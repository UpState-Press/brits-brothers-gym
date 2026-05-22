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

export function BodybuildingBlogPage() {
  const canonicalUrl = `${getPublicSiteOrigin()}/blog/bodybuilding.html`;

  return (
    <>
      <SEO
        title="Bodybuilding Basics in Greenville SC"
        description="Bodybuilding basics and muscle-building coaching in Greenville, SC at Brit's Brothers Gym. Learn strength vs hypertrophy training, smart progression, nutrition habits, and expert personal training since 1994."
        keywords="bodybuilding Greenville SC, bodybuilding gym Greenville, muscle building Greenville, hypertrophy training, personal training bodybuilding"
        canonicalUrl={canonicalUrl}
      />

      <article className="bg-[#121214]">
        <header className="pt-40 pb-16 border-b border-[#2a2a2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4"
              style={{ ...bodyStyle, fontWeight: 700 }}
            >
              Muscle Building · Greenville, SC
            </p>
            <h1
              className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
              style={headingStyle}
            >
              Bodybuilding Basics in Greenville SC
            </h1>
            <p className="text-[#a7a7ad] text-xl leading-relaxed" style={bodyStyle}>
              Bodybuilding is about building muscle with purpose—through consistent training,
              sound nutrition, and coaching that keeps you progressing without burning out.
              At Brit&apos;s Brothers Gym, we help Greenville lifters train smarter in a serious,
              old-school environment.
            </p>
          </div>
        </header>

        <div className="py-16 bg-[#1c1c1e]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleSection title="Bodybuilding Basics">
              <p>
                Bodybuilding training focuses on muscle growth (hypertrophy) using resistance
                exercises, controlled volume, and recovery that supports adaptation. Unlike
                random gym workouts, effective bodybuilding follows a plan: exercise selection,
                rep ranges, progression, and rest days that match your goals and schedule.
              </p>
              <p>
                Basics include compound lifts for overall development, isolation work for
                weaker areas, and tracking sets, reps, and load so you know when to push and
                when to recover. You do not need extreme volume on day one—you need a
                sustainable structure you can repeat week after week.
              </p>
            </ArticleSection>

            <ArticleSection title="Strength Training vs Bodybuilding">
              <p>
                Strength training prioritizes getting stronger on key lifts, often with lower
                rep ranges and longer rest. Bodybuilding prioritizes muscle size and shape,
                often with moderate reps, more total sets, and emphasis on time under tension
                and exercise variety.
              </p>
              <p>
                The two overlap: stronger lifters can handle more productive hypertrophy work,
                and bodybuilding training builds strength over time. Many members blend both
                approaches. If your primary goal is maximal strength on squat, bench, and
                deadlift, see our{' '}
                <Link
                  to="/blog/powerlifting.html"
                  className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors underline"
                >
                  powerlifting training guide
                </Link>
                .
              </p>
            </ArticleSection>

            <ArticleSection title="Who Bodybuilding-Style Training Is For">
              <p>
                This style of training suits adults who want to add muscle, improve physique,
                support fat-loss goals with resistance work, or rebuild after time away from
                the gym. It works for beginners learning proper form and for experienced
                lifters who need accountability and programming adjustments.
              </p>
              <p>
                You do not need to compete or live in the gym. You need consistency, honest
                effort, and guidance that matches your recovery, equipment access, and
                lifestyle outside the gym.
              </p>
            </ArticleSection>

            <ArticleSection title="Muscle Building, Consistency, Nutrition, and Progression">
              <p>
                Muscle is built through repeated stimulus plus recovery. That means showing up
                on schedule, progressing load or reps when ready, and deloading when fatigue
                accumulates. Random intensity spikes without a plan usually stall progress.
              </p>
              <p>
                Nutrition supports training: adequate protein, enough calories to grow or a
                controlled deficit to lean out, hydration, and sleep. Our trainers help you
                align training stress with eating habits you can maintain—not extreme diets
                that collapse after a few weeks.
              </p>
              <p>
                Progression might mean adding weight, adding sets, improving technique, or
                extending a rep range. The right next step depends on your training history
                and how you recover between sessions.
              </p>
            </ArticleSection>

            <ArticleSection title="Why Coaching Matters">
              <p>
                Bodybuilding looks simple on social media; in practice, exercise selection,
                joint-friendly technique, and volume management make the difference between
                steady gains and plateaus or injury. A coach helps you train hard where it
                counts and recover where it matters.
              </p>
              <p>
                Personal training provides custom programming, form feedback, and accountability.
                That is especially valuable when you are learning new movements or returning
                after a layoff.{' '}
                <Link to="/trainers" className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors underline">
                  Meet our trainers
                </Link>{' '}
                to find the right fit for your goals.
              </p>
            </ArticleSection>

            <ArticleSection title="Why Brit's Brothers Is Different">
              <p>
                Since 1994, Brit&apos;s Brothers has offered serious personal training in an
                old-school gym culture—real equipment, experienced coaches, and members who
                show up to work. This is not a trend-driven studio; it is a place built for
                lifters who want measurable results.
              </p>
              <p>
                Our trainers bring decades of combined experience in strength, hypertrophy,
                and general fitness coaching. You get direct attention, honest feedback, and a
                facility designed for barbells, machines, and focused training—not distractions.
              </p>
            </ArticleSection>

            <section className="bg-[#121214] p-8 md:p-10 border border-[#2a2a2c]">
              <h2
                className="text-[#fdfdff] text-2xl md:text-3xl mb-4 tracking-wider"
                style={headingStyle}
              >
                Start Bodybuilding Training in Greenville
              </h2>
              <p className="text-[#a7a7ad] text-lg leading-relaxed mb-6" style={bodyStyle}>
                Ready to build muscle with a plan? View membership options, contact our team,
                or tour the gym and see why Greenville lifters train here.
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
