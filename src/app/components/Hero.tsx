import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from 'figma:asset/b9998cd4dac15b527e6a0d9dcc4f633747e64dd4.webp';
import quoteBoxImage from 'figma:asset/4b3a5063dfc3a839ebe8422ee2fd3f5827333cde.webp';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121214] pt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Training atmosphere"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/70 via-[#121214]/60 to-[#121214]"></div>
      </div>

      {/* Decorative Elements */}
      
      

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <div className="mb-8">
              <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                Greenville's Premier Training Facility
              </span>
              
              <h1 className="text-[#fdfdff] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-[0.9] tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>BUILT<br />BRITS.<br />BUILT<br /><span className="text-[#cc1e23]">DIFFERENT.</span></h1>
            </div>

            <p className="text-[#a7a7ad] text-lg md:text-xl mb-8 leading-relaxed max-w-xl" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>Proven training that delivers results.<span className="text-[#fdfdff] font-bold"> Voted "Best Trainer of the Upstate" 9 years running.</span></p>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link
                to="/consultation"
                className="group bg-[#cc1e23] text-[#fdfdff] px-10 py-5 hover:bg-[#a01419] transition-all hover:scale-105 flex items-center justify-center gap-3 tracking-wider text-lg"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                Book a Free Consultation
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <a
                href="tel:1-864-553-3821"
                className="bg-transparent text-[#fdfdff] px-10 py-5 hover:bg-[#cc1e23]/10 transition-all flex items-center justify-center gap-3 tracking-wider text-lg"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                Call Now
              </a>
            </div>

            <div className="mb-8">
              <a href="#pricing" className="text-[#a7a7ad] hover:text-[#fdfdff] text-sm tracking-wide uppercase transition-colors" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                View membership and pricing →
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-8 max-w-md">
              <div>
                <div className="text-[#cc1e23] text-2xl md:text-3xl lg:text-4xl mb-1" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                  9
                </div>
                <div className="text-[#a7a7ad] text-[10px] md:text-xs lg:text-sm tracking-wide" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                  Years Best<br />Trainer Award
                </div>
              </div>
              <div>
                <div className="text-[#cc1e23] text-2xl md:text-3xl lg:text-4xl mb-1" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                  6
                </div>
                <div className="text-[#a7a7ad] text-[10px] md:text-xs lg:text-sm tracking-wide" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                  Expert<br />Trainers
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Decorative Quote */}
          <div className="hidden lg:block">
            <div className="relative">
              
              <div className="relative bg-[#1c1c1e] p-12 min-h-[600px] flex flex-col justify-between overflow-hidden">
                {/* Background Image - Full height, right aligned */}
                <img 
                  src={quoteBoxImage} 
                  alt="" 
                  className="absolute bottom-0 right-0 h-full w-auto object-contain grayscale"
                />
                
                {/* Quote at top */}
                <div className="relative z-10">
                  <div className="text-[#cc1e23] text-8xl leading-none" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
                    "
                  </div>
                </div>
                
                {/* Text at bottom */}
                <div className="relative z-10">
                  <p className="text-[#fdfdff] text-2xl md:text-3xl leading-tight ml-[0px] mr-[50px] mt-[0px] mb-[32px]" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
                    Discipline is doing what needs to be done, even when you don't want to do it.
                  </p>
                  <div className="h-1 w-24 bg-[#cc1e23] mb-4"></div>
                  <p className="text-[#a7a7ad] text-sm tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                    THE BRITS BROTHERS WAY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full flex justify-center pt-2 opacity-50">
          <div className="w-1 h-3 bg-[#cc1e23] rounded-full"></div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-0">
        <img 
          src={splatterDivider} 
          alt="" 
          className="w-full h-auto block"
        />
      </div>
    </section>
  );
}