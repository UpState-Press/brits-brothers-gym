import { SEO } from '../components/SEO';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import { FinalCTA } from '../components/FinalCTA';
import { FacilityHours } from '../components/FacilityHours';
import { GymAccessPricing } from '../components/pricing/GymAccessPricing';
import { PersonalTrainingPricing } from '../components/pricing/PersonalTrainingPricing';
import { StudentProgramPricing } from '../components/pricing/StudentProgramPricing';

export function MembershipPage() {
  return (
    <>
      <SEO
        title="Membership & Pricing"
        description="Flexible gym membership options at Brit's Brothers. Open gym access, personal training packages, and student programs. No long-term contracts, no activation fees."
        keywords="gym membership Greenville SC, personal training prices, fitness membership, gym pricing, open gym access"
      />
      {/* Hero */}
      <section className="relative pt-40 pb-40 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Join the Brotherhood
          </span>

          <h1 className="text-[#fdfdff] text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            MEMBERSHIP
          </h1>

          <p className="text-[#a7a7ad] text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            No long-term contracts. No activation fees. No nonsense.
          </p>
          <p className="text-[#a7a7ad] text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            Just results.
          </p>
        </div>

        {/* Bottom Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-10">
          <img
            src={splatterDivider}
            alt=""
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 bg-[#1c1c1e]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gym Membership */}
          <div className="mb-20">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-[#cc1e23]"></div>
              <h3 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                GYM ACCESS
              </h3>
              <div className="h-px w-16 bg-[#cc1e23]"></div>
            </div>

            <GymAccessPricing />
          </div>

          {/* Personal Training */}
          <div className="mb-20">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-[#cc1e23]"></div>
              <h3 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                PERSONAL TRAINING
              </h3>
              <div className="h-px w-16 bg-[#cc1e23]"></div>
            </div>

            <PersonalTrainingPricing />
          </div>

          {/* Student Training */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-[#cc1e23]"></div>
              <h3 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                STUDENT PROGRAMS
              </h3>
              <div className="h-px w-16 bg-[#cc1e23]"></div>
            </div>

            <StudentProgramPricing />
          </div>
        </div>

      </section>

      {/* Facility Hours */}
      <section className="relative py-32 bg-[#121214]">
        {/* Top Divider */}
        <div className="absolute top-0 left-0 right-0 w-full z-10">
          <img
            src={splatterDivider}
            alt=""
            className="w-full h-auto block rotate-180"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-[#a7a7ad] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              When We Train
            </span>

            <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              FACILITY HOURS
            </h2>
          </div>

          <FacilityHours membershipLink="#pricing" />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
