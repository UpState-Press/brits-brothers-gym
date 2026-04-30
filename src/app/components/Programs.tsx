import image_d15eda18ea41e9b4c6d7c8d24a445decb714d367 from 'figma:asset/d15eda18ea41e9b4c6d7c8d24a445decb714d367.png'
import { Dumbbell, Heart, Clock, Users, Target, Apple, BarChart, Key, Award, CheckCircle, Zap, TrendingUp, Tag } from 'lucide-react';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import topDivider from 'figma:asset/31fcf544b442943636aba42ea48f9a04dfca2658.png';
import bulldogMascot from 'figma:asset/fcf2bd2670737bae9b314ede17a4de33a52ce5da.png';
import personalTrainingImg from 'figma:asset/b4bbfbf96606cca832238db9347aac290d11a353.png';
import openGymImg from 'figma:asset/29728ec5260733f5709698e77aae569591079af1.png';
import cardioBoxingImg from 'figma:asset/4f1ee81107c52d3eb227759e2ca2b63d0a92ee3d.png';
import studentTrainingImg from 'figma:asset/3cf5703f5951b4cab7113203f083c9ecdf17699f.png';

export function Programs() {
  return (
    <section id="programs" className="relative pt-48 pb-20 bg-[#121214]">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full z-10">
        <img
          src={image_d15eda18ea41e9b4c6d7c8d24a445decb714d367}
          alt=""
          className="w-full h-auto block"
        />
      </div>

      {/* Blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#24186e]/20 to-transparent"></div>

      {/* Bulldog Mascot Background */}
      <div className="absolute inset-y-0 left-0 w-full opacity-10 pointer-events-none overflow-hidden" style={{ mixBlendMode: 'lighten' }}>
        <img 
          src={bulldogMascot} 
          alt="" 
          className="h-full object-contain object-left md:object-left object-top md:object-center"
          style={{ transform: 'rotate(-8deg) scale(1.3)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[#a7a7ad] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            What We Offer
          </span>
          
          <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            TRAINING PROGRAMS
          </h2>
          
          <p className="text-[#a7a7ad] text-xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            From strength to stamina, endurance to performance. Every goal. Every level. One mission: Make you unstoppable.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Personal Training */}
          <div className="relative overflow-hidden group cursor-pointer">
            {/* Top Section - Image with Icon & Title */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={personalTrainingImg} 
                alt="" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Icon & Title Overlay */}
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-[#121214]/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#24186e]/40 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#24186e]/60 transition-colors backdrop-blur-sm">
                    <Dumbbell className="text-[#fdfdff]" size={28} />
                  </div>
                  <h3 className="text-[#fdfdff] text-3xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    PERSONAL TRAINING
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Section - Content */}
            <div className="bg-[#1c1c1e]/90 p-8">
              <p className="text-[#a7a7ad] leading-relaxed text-lg mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                One-on-one sessions tailored to your goals. Our trainers build custom programs for strength, muscle gain, fat loss, and athletic performance.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Target className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Customized programming
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Apple className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Nutrition guidance
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Progress tracking & accountability
                  </span>
                </div>
              </div>
              <a href="#pricing" className="text-[#fdfdff] hover:text-[#a7a7ad] font-bold tracking-wide transition-colors" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                VIEW PLANS →
              </a>
            </div>
          </div>

          {/* Open Gym */}
          <div className="relative overflow-hidden group cursor-pointer">
            {/* Top Section - Image with Icon & Title */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={openGymImg} 
                alt="" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Icon & Title Overlay */}
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-[#121214]/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#24186e]/40 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#24186e]/60 transition-colors backdrop-blur-sm">
                    <Clock className="text-[#fdfdff]" size={28} />
                  </div>
                  <h3 className="text-[#fdfdff] text-3xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    OPEN GYM ACCESS
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Section - Content */}
            <div className="bg-[#1c1c1e]/90 p-8">
              <p className="text-[#a7a7ad] leading-relaxed text-lg mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                Unrestricted access to premium equipment. Train on your schedule with everything you need to build strength and power.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Key className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Unrestricted facility access
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Premium equipment
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    No long-term contracts
                  </span>
                </div>
              </div>
              <a href="#pricing" className="text-[#fdfdff] hover:text-[#a7a7ad] font-bold tracking-wide transition-colors" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                VIEW PLANS →
              </a>
            </div>
          </div>

          {/* Cardio Boxing */}
          <div className="relative overflow-hidden group cursor-pointer">
            {/* Top Section - Image with Icon & Title */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={cardioBoxingImg} 
                alt="" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Icon & Title Overlay */}
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-[#121214]/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#24186e]/40 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#24186e]/60 transition-colors backdrop-blur-sm">
                    <Heart className="text-[#fdfdff]" size={28} />
                  </div>
                  <h3 className="text-[#fdfdff] text-3xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    CARDIO BOXING
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Section - Content */}
            <div className="bg-[#1c1c1e]/90 p-8">
              <p className="text-[#a7a7ad] leading-relaxed text-lg mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                High-intensity boxing sessions for conditioning, agility, and mental toughness. Learn fundamentals while burning serious calories.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Target className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Proper boxing fundamentals
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Agility & focus mitt drills
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    All ages 10+
                  </span>
                </div>
              </div>
              <a href="tel:1-864-553-3821" className="text-[#fdfdff] hover:text-[#a7a7ad] font-bold tracking-wide transition-colors" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                LEARN MORE →
              </a>
            </div>
          </div>

          {/* Student Programs */}
          <div className="relative overflow-hidden group cursor-pointer">
            {/* Top Section - Image with Icon & Title */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={studentTrainingImg} 
                alt="" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Icon & Title Overlay */}
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-[#121214]/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#24186e]/40 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#24186e]/60 transition-colors backdrop-blur-sm">
                    <Users className="text-[#fdfdff]" size={28} />
                  </div>
                  <h3 className="text-[#fdfdff] text-3xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    STUDENT TRAINING
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Section - Content */}
            <div className="bg-[#1c1c1e]/90 p-8">
              <p className="text-[#a7a7ad] leading-relaxed text-lg mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                Build young athletes with proper form, discipline, and work ethic. Middle and high school programs designed for results.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Age-appropriate training
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Athletic development focus
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="text-[#fdfdff] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    Special student pricing
                  </span>
                </div>
              </div>
              <a href="#pricing" className="text-[#fdfdff] hover:text-[#a7a7ad] font-bold tracking-wide transition-colors" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                VIEW PLANS →
              </a>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[#fdfdff] text-6xl leading-none mb-4" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
            "
          </div>
          <p className="text-[#fdfdff] text-3xl md:text-4xl leading-tight" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
            Every program is built for one purpose: To make you stronger, faster, and more capable than you were yesterday.
          </p>
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