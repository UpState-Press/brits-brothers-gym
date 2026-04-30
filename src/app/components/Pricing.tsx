import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import { GymAccessPricing } from './pricing/GymAccessPricing';
import { PersonalTrainingPricing } from './pricing/PersonalTrainingPricing';
import { StudentProgramPricing } from './pricing/StudentProgramPricing';

export function Pricing() {
  return (
    <section id="pricing" className="relative pt-48 pb-20 bg-[#121214]">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full z-0">
        <img 
          src={splatterDivider} 
          alt="" 
          className="w-full h-auto block rotate-180"
        />
      </div>

      {/* Decorative Elements */}
      
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Investment in Yourself
          </span>
          
          <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            MEMBERSHIP OPTIONS
          </h2>
          
          <p className="text-[#a7a7ad] text-xl max-w-3xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            No long-term contracts. No activation fees. No nonsense. Just results.
          </p>
        </div>

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
  );
}