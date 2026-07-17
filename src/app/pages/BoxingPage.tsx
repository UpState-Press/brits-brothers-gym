import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import evanImg from 'figma:asset/9ff16f64cc6a43ca988b5db2965c1c52efe2df2e.png';
import boxingHeroImage from '../../imports/boxing_page_banner.webp';
import boxing1 from '../../imports/boxing-1.jpg';
import boxing2 from '../../imports/boxing-2.jpg';
import boxing3 from '../../imports/boxing-3.jpg';
import boxing4 from '../../imports/boxing-4.jpg';
import boxing5 from '../../imports/boxing-5.jpeg';
import boxing6 from '../../imports/boxing-6.jpeg';
import boxing7 from '../../imports/boxing-7.jpeg';
import boxing8 from '../../imports/boxing-8.jpeg';
import boxing9 from '../../imports/boxing-9.jpeg';
import boxing10 from '../../imports/boxing-10.jpeg';
import { FinalCTA } from '../components/FinalCTA';
import { Location } from '../components/Location';

export function BoxingPage() {
  return (
    <>
      <SEO
        title="Boxing & Yoga Classes"
        description="Boxing and yoga classes in Greenville, SC. Train with experienced instructors for improved fitness, strength, and flexibility. All skill levels welcome."
        keywords="boxing Greenville SC, boxing classes, yoga classes Greenville, fitness boxing, beginner boxing"
      />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121214] pt-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={boxingHeroImage}
            alt="Boxing training"
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/70 via-[#121214]/60 to-[#121214]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                Boxing Classes & Training
              </span>

              <h1 className="text-[#fdfdff] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-[0.95] tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                BRIT'S BROTHERS<br />BOXING
              </h1>

              <h2 className="text-[#a7a7ad] text-2xl md:text-3xl mb-8 tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                In Greenville, SC
              </h2>
            </div>

            <p className="text-[#a7a7ad] text-lg md:text-xl mb-8 leading-relaxed max-w-3xl" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Boxing classes are 60-minute high-intensity group sessions including stretching, agility drills, strength training, heavy bag work, and focus mitt training. Designed for full-body conditioning and proper boxing fundamentals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/membership"
                className="group bg-[#cc1e23] text-[#fdfdff] px-8 sm:px-10 py-4 sm:py-5 hover:bg-[#a01419] transition-all hover:scale-105 flex items-center justify-center gap-3 tracking-wider text-base sm:text-lg"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                GET STARTED
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <a
                href="tel:1-864-607-4025"
                className="bg-transparent text-[#fdfdff] px-8 sm:px-10 py-4 sm:py-5 hover:bg-[#cc1e23]/10 transition-all flex items-center justify-center gap-3 tracking-wider text-base sm:text-lg"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                Call Now
              </a>
            </div>
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

      {/* Trainer Spotlight */}
      <section className="relative py-32 bg-[#1c1c1e]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              OUR TRAINER
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[3/4] bg-[#121214] overflow-hidden">
                <img
                  src={evanImg}
                  alt="Evan Pierce"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[#fdfdff] text-4xl md:text-5xl mb-6 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                EVAN PIERCE
              </h3>

              <div className="space-y-4 text-[#a7a7ad] text-lg leading-relaxed mb-8" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                <p className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#cc1e23] flex-shrink-0"></span>
                  Former EMT
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#cc1e23] flex-shrink-0"></span>
                  Lost 60+ lbs through boxing
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#cc1e23] flex-shrink-0"></span>
                  Yoga instructor
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#cc1e23] flex-shrink-0"></span>
                  Helps others transform body + mind
                </p>
              </div>

              <p className="text-[#a7a7ad] text-lg leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                Evan worked as an EMT for several years after high school. During that time he began Boxing with Berry Butler at Killer B Boxing. Evan found boxing to be a healthy way to deal with the stress of working in Emergency medicine and was able to transform his body losing over 60 lbs in just over a year. Evan completed Soul Yoga's 200 Hour Teacher Training program in April of 2019. He looks to help others transform their body and mind with Boxing and Yoga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative pt-48 pb-20 bg-[#121214]">
        {/* Top Divider */}
        <div className="absolute top-0 left-0 right-0 w-full z-10">
          <img
            src={splatterDivider}
            alt=""
            className="w-full h-auto block rotate-180"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              GALLERY
            </h2>
          </div>

          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2 }}>
            <Masonry gutter="24px">
              <img src={boxing1} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing2} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing3} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing4} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing5} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing6} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing7} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing8} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing9} alt="Boxing training" className="w-full h-auto" />
              <img src={boxing10} alt="Boxing training" className="w-full h-auto" />
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </section>

      <Location phoneNumber="(864) 607-4025" topPadding="py-32" />

      <FinalCTA />
    </>
  );
}
