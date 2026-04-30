import { FacilityHours } from './FacilityHours';

export function Hours() {
  return (
    <section id="hours" className="relative py-32 bg-[#1c1c1e]">
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
  );
}