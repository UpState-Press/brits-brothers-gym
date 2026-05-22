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

export function WeightLossBlogPage() {
  const canonicalUrl = `${getPublicSiteOrigin()}/blog/weight-loss.html`;

  return (
    <>
      <SEO
        title="Sustainable Weight Loss Coaching in Greenville SC"
        description="Sustainable weight loss coaching in Greenville, SC at Brit's Brothers Gym. Accountability, strength training, nutrition consistency, and beginner-friendly fat loss without crash dieting."
        keywords="weight loss Greenville SC, fat loss coaching Greenville, personal training weight loss, sustainable weight loss gym, fitness accountability Greenville"
        canonicalUrl={canonicalUrl}
      />

      <article className="bg-[#121214]">
        <header className="pt-40 pb-16 border-b border-[#2a2a2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4"
              style={{ ...bodyStyle, fontWeight: 700 }}
            >
              Fat Loss · Greenville, SC
            </p>
            <h1
              className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
              style={headingStyle}
            >
              Sustainable Weight Loss Coaching in Greenville SC
            </h1>
            <p className="text-[#a7a7ad] text-xl leading-relaxed" style={bodyStyle}>
              Lasting fat loss is built on habits you can keep—not extreme restrictions that
              reset every few weeks. At Brit&apos;s Brothers Gym, we coach Greenville members
              with strength training, nutrition consistency, and accountability that fits real
              life.
            </p>
          </div>
        </header>

        <div className="py-16 bg-[#1c1c1e]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleSection title="Why Most Weight Loss Programs Fail">
              <p>
                Many programs promise fast results but skip the fundamentals: sustainable
                eating, resistance training, sleep, and recovery. When progress stalls, people
                blame willpower instead of the plan—so they restart with another aggressive
                diet or endless cardio.
              </p>
              <p>
                Crash approaches often cut calories too low, drop muscle, and leave you hungry
                and tired. That cycle makes maintenance harder and can slow metabolism over
                time. Real change requires a system you can follow for months, not days.
              </p>
            </ArticleSection>

            <ArticleSection title="Sustainable Fat Loss vs Crash Dieting">
              <p>
                Sustainable fat loss means a moderate calorie deficit, adequate protein, and
                training that preserves lean mass. You lose weight at a pace that supports
                energy, performance, and adherence—usually slower than social media timelines
                suggest, but far more reliable.
              </p>
              <p>
                Crash dieting trades short-term scale drops for long-term rebound. We focus on
                behaviors you can repeat: consistent meals, planned training, and adjustments
                based on how you feel, sleep, and recover—not panic when the scale fluctuates
                a pound or two.
              </p>
            </ArticleSection>

            <ArticleSection title="Accountability and Coaching">
              <p>
                Accountability is not guilt—it is structure. Scheduled sessions, check-ins,
                and honest feedback keep you showing up when motivation dips. A coach helps
                you interpret plateaus, adjust training load, and stay on track without
                abandoning the whole plan after one tough week.
              </p>
              <p>
                Personal training gives you a clear path: what to do in the gym, how hard to
                push, and when to recover.{' '}
                <Link to="/trainers" className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors underline">
                  Meet our trainers
                </Link>{' '}
                and find coaching that matches your experience level and schedule.
              </p>
            </ArticleSection>

            <ArticleSection title="Strength Training for Weight Loss">
              <p>
                Resistance training is one of the most effective tools for fat loss because it
                builds and protects muscle while you lean out. Muscle supports metabolism,
                improves body composition, and makes everyday movement easier—not just gym
                performance.
              </p>
              <p>
                Cardio has a place, but strength work is the foundation. Our members use
                barbells, machines, and progressive programming suited to beginners and
                experienced lifters. For muscle-building context, see our{' '}
                <Link
                  to="/blog/bodybuilding.html"
                  className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors underline"
                >
                  bodybuilding basics guide
                </Link>
                ; for strength-focused training, explore our{' '}
                <Link
                  to="/blog/powerlifting.html"
                  className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors underline"
                >
                  powerlifting training guide
                </Link>
                .
              </p>
            </ArticleSection>

            <ArticleSection title="Nutrition Consistency">
              <p>
                Nutrition consistency beats perfection. That means enough protein, portions
                that match your goals, hydration, and eating patterns you can maintain around
                work, family, and weekends—not eliminating entire food groups because a trend
                said so.
              </p>
              <p>
                We help align training with eating habits that support fat loss without
                burnout. For a practical starting point, download our{' '}
                <Link to="/resources" className="text-[#fdfdff] hover:text-[#cc1e23] transition-colors underline">
                  20-day nutrition plan and training resources
                </Link>
                —free educational material from Brit&apos;s Brothers Gym.
              </p>
            </ArticleSection>

            <ArticleSection title="Beginner-Friendly Approach">
              <p>
                You do not need to already be fit to start. Beginners learn safe movement
                patterns, appropriate volume, and how to progress without copying advanced
                workouts from the internet. Sessions are scaled to your current capacity so
                you build confidence and consistency first.
              </p>
              <p>
                The goal is a routine you can keep: two to four training days per week,
                manageable nutrition changes, and gradual increases in challenge as technique
                and recovery improve.
              </p>
            </ArticleSection>

            <ArticleSection title="Why Brit's Brothers Gym Is Different">
              <p>
                Since 1994, Brit&apos;s Brothers has been known for no-nonsense personal
                training in an old-school gym environment—real equipment, experienced coaches,
                and members who show up to work. This is not a franchise floor with gimmicks;
                it is a training home for people who want measurable results.
              </p>
              <p>
                Voted &quot;Best Trainer of the Upstate&quot; nine years in a row, our team
                combines strength coaching, fat-loss programming, and nutrition guidance without
                selling unrealistic timelines. You get direct attention, honest feedback, and a
                culture built for long-term health—not quick fixes.
              </p>
            </ArticleSection>

            <section className="bg-[#121214] p-8 md:p-10 border border-[#2a2a2c]">
              <h2
                className="text-[#fdfdff] text-2xl md:text-3xl mb-4 tracking-wider"
                style={headingStyle}
              >
                Start Sustainable Weight Loss Coaching in Greenville
              </h2>
              <p className="text-[#a7a7ad] text-lg leading-relaxed mb-6" style={bodyStyle}>
                Ready to lose fat with a plan you can maintain? View membership options,
                contact our team, or tour the gym and see how Greenville lifters train here.
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
