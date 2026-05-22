import { ArrowRight } from 'lucide-react';
import heroImage from 'figma:asset/b9998cd4dac15b527e6a0d9dcc4f633747e64dd4.webp';

export function FinalCTA() {
  return (
    <section className="relative py-32 bg-[#121214] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Training atmosphere"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/70 via-[#121214]/60 to-[#121214]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Quote */}
          <div className="mb-12">
            <div className="text-[#cc1e23] text-7xl md:text-8xl leading-none mb-8" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
              "
            </div>
            <p className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl leading-tight mb-8" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
              The iron doesn't lie. Your body will tell the truth about your dedication.
            </p>
            <div className="h-1 w-32 bg-[#cc1e23] mx-auto"></div>
          </div>

          {/* Main CTA */}
          <div className="mb-12">
            <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              READY TO START?
            </h2>
            <p className="text-[#a7a7ad] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>Stop thinking about it. Stop making excuses. Your transformation starts the moment you walk through our doors.</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
            <a
              href="#pricing"
              className="group bg-[#cc1e23] text-[#fdfdff] px-8 sm:px-12 py-4 sm:py-6 hover:bg-[#a01419] transition-all hover:scale-105 flex items-center justify-center gap-3 tracking-wider text-base sm:text-xl w-full sm:w-auto"
              style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
            >
              Join Brits Brothers
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a
              href="tel:1-864-553-3821"
              className="bg-transparent text-[#fdfdff] px-8 sm:px-12 py-4 sm:py-6 hover:bg-[#cc1e23]/10 transition-all flex items-center justify-center gap-3 tracking-wider text-base sm:text-xl w-full sm:w-auto"
              style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
            >
              (864) 553-3821
            </a>
          </div>

          {/* Bottom Statement */}
          <div className="pt-12">
            <p className="text-[#cc1e23] text-lg tracking-[0.3em] uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              Built British. Built Different.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}