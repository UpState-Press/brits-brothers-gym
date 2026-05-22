import { Target, Trophy, Users, Zap } from 'lucide-react';
import communityImg from 'figma:asset/3799d12cd62241866262f9f9287858c1d8c05e9a.png';
import precisionImg from 'figma:asset/9aefc74dc7c086183afb398675c3364d683a0d55.png';
import intensityImg from 'figma:asset/7e7d8fcece4ef15465008a2479b849299d2b5f73.png';
import excellenceImg from 'figma:asset/dec401c7b51859c231f91797f3cd149d61e2dfb7.png';
import quoteBackgroundImg from 'figma:asset/7f1fd8efb037ca257503c74b0292f712144d1b51.webp';
import bulldogIcon from 'figma:asset/523e93d18273d7b5d4a5c061c39e8a0a9c62b496.png';

export function Philosophy() {
  return (
    <section id="philosophy" className="relative pt-48 pb-32 bg-[#1c1c1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Our Foundation
          </span>
          
          <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>THE BRITS METHOD</h2>
          
          <p className="text-[#a7a7ad] text-xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            Rooted in discipline, heritage, and an unyielding commitment to excellence. 
            We don't do trends. We do transformation.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#121214] overflow-hidden transition-all group hover:bg-[#121214]/80">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={communityImg} 
                alt="Community" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="p-8 relative">
              <div className="w-16 h-16 bg-[#cc1e23]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#cc1e23]/30 transition-colors">
                <Users className="text-[#cc1e23]" size={32} />
              </div>
              <h3 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                COMMUNITY
              </h3>
              <p className="text-[#a7a7ad] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                Train alongside warriors who push you to be better every single day.
              </p>
            </div>
          </div>

          <div className="bg-[#121214] overflow-hidden transition-all group hover:bg-[#121214]/80">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={excellenceImg} 
                alt="Precision" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="p-8 relative">
              <div className="w-16 h-16 bg-[#cc1e23]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#cc1e23]/30 transition-colors">
                <Target className="text-[#cc1e23]" size={32} />
              </div>
              <h3 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                PRECISION
              </h3>
              <p className="text-[#a7a7ad] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                Every rep matters. Every set counts. No wasted movement, no wasted effort.
              </p>
            </div>
          </div>

          <div className="bg-[#121214] overflow-hidden transition-all group hover:bg-[#121214]/80">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={intensityImg} 
                alt="Intensity" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="p-8 relative">
              <div className="w-16 h-16 bg-[#cc1e23]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#cc1e23]/30 transition-colors">
                <Zap className="text-[#cc1e23]" size={32} />
              </div>
              <h3 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                INTENSITY
              </h3>
              <p className="text-[#a7a7ad] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                We don't train comfortable. We train champions who crave discomfort.
              </p>
            </div>
          </div>

          <div className="bg-[#121214] overflow-hidden transition-all group hover:bg-[#121214]/80">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={precisionImg} 
                alt="Excellence" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="p-8 relative">
              <div className="w-16 h-16 bg-[#cc1e23]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#cc1e23]/30 transition-colors">
                <Trophy className="text-[#cc1e23]" size={32} />
              </div>
              <h3 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                EXCELLENCE
              </h3>
              <p className="text-[#a7a7ad] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                9 years running as Best Trainer. Results speak louder than promises.
              </p>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#121214]">
            {/* Quote mark and Bulldog Icon - Top Row */}
            <div className="flex justify-between items-start p-6 pb-4">
              <div className="text-[#cc1e23] text-6xl leading-none" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
                "
              </div>
              <img
                src={bulldogIcon}
                alt="Brits Bros"
                className="h-12 w-auto grayscale opacity-60"
              />
            </div>

            {/* Full Width Image */}
            <div className="relative">
              <img
                src={quoteBackgroundImg}
                alt=""
                className="w-full h-auto grayscale"
              />
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#121214] to-transparent"></div>
            </div>

            {/* Text Content - Bottom */}
            <div className="p-8">
              <p className="text-[#fdfdff] text-xl leading-snug mb-6" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
                Strength isn't given. It's earned through sweat, sacrifice, and the refusal to quit.
              </p>
              <div className="h-1 w-20 bg-[#cc1e23] mb-3"></div>
              <p className="text-[#a7a7ad] text-xs tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                THE BRITS BROTHERS WAY
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}