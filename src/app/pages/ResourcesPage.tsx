import { getPublicSiteOrigin } from '../../config/siteConfig';
import { SEO } from '../components/SEO';
import { Resources } from '../components/Resources';

const bodyStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 500 } as const;
const headingStyle = { fontFamily: "'poster-gothic-atf', sans-serif" } as const;

export function ResourcesPage() {
  const canonicalUrl = `${getPublicSiteOrigin()}/resources`;

  return (
    <>
      <SEO
        title="Training & Nutrition Resources"
        description="Free training and nutrition resources from Brit's Brothers Gym in Greenville, SC. Download the 20-day nutrition plan PDF and watch instructional videos from owner Olly Pierce."
        keywords="gym nutrition plan Greenville, fitness resources, training videos, Brit's Brothers nutrition PDF, workout education"
        canonicalUrl={canonicalUrl}
      />

      <div className="bg-[#121214]">
        <header className="pt-40 pb-8 border-b border-[#2a2a2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p
              className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4"
              style={{ ...bodyStyle, fontWeight: 700 }}
            >
              Education · Greenville, SC
            </p>
            <h1
              className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
              style={headingStyle}
            >
              Training & Nutrition Resources
            </h1>
            <p className="text-[#a7a7ad] text-xl leading-relaxed" style={bodyStyle}>
              Brit&apos;s Brothers is committed to your health on and off the gym floor. Explore
              our nutrition guide and training tutorials to support smarter workouts, better
              recovery, and habits that match your goals.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2
            className="text-[#fdfdff] text-2xl md:text-3xl mb-4 tracking-wider text-center"
            style={headingStyle}
          >
            What You&apos;ll Find Here
          </h2>
          <ul
            className="text-[#a7a7ad] text-lg leading-relaxed space-y-3 list-disc list-inside max-w-2xl mx-auto"
            style={bodyStyle}
          >
            <li>
              <strong className="text-[#fdfdff] font-semibold">Nutrition:</strong> our
              Brit&apos;s Brothers Gym 20-Day Nutrition Plan (PDF download)
            </li>
            <li>
              <strong className="text-[#fdfdff] font-semibold">Training videos:</strong>{' '}
              instructional tutorials with owner Olly Pierce
            </li>
            <li>
              <strong className="text-[#fdfdff] font-semibold">Coaching support:</strong>{' '}
              resources complement personal training and open gym membership—not a substitute
              for individualized programming
            </li>
          </ul>
        </div>

        <Resources includeSectionHeader={false} />
      </div>
    </>
  );
}
