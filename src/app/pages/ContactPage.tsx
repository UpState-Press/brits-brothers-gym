import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { formatAddressLines, siteConfig } from '../../config/siteConfig';
import { SEO } from '../components/SEO';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import { FinalCTA } from '../components/FinalCTA';
import { FacilityHours } from '../components/FacilityHours';
import { Location } from '../components/Location';

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Brit's Brothers Gym in Greenville, SC. Visit us at 301 Airport Rd, call (864) 553-3821, or send us a message. Start your fitness journey today."
        keywords="contact gym Greenville SC, gym location, gym phone number, visit gym Greenville"
      />
      {/* Hero */}
      <section className="relative pt-40 pb-40 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Get In Touch
          </span>

          <h1 className="text-[#fdfdff] text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            CONTACT US
          </h1>

          <p className="text-[#a7a7ad] text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            Ready to start your transformation? Reach out today.
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

      {/* Contact Info & Form */}
      <section className="relative py-32 bg-[#1c1c1e]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-[#fdfdff] text-4xl md:text-5xl mb-10 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                VISIT THE GYM
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#cc1e23] p-3 flex-shrink-0">
                    <MapPin size={24} className="text-[#fdfdff]" />
                  </div>
                  <div>
                    <h3 className="text-[#fdfdff] text-xl mb-2 tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                      LOCATION
                    </h3>
                    <p className="text-[#a7a7ad] text-lg" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                      {formatAddressLines().map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#cc1e23] p-3 flex-shrink-0">
                    <Phone size={24} className="text-[#fdfdff]" />
                  </div>
                  <div>
                    <h3 className="text-[#fdfdff] text-xl mb-2 tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                      PHONE
                    </h3>
                    <a href={`tel:${siteConfig.contact.phone.mainRaw}`} className="text-[#a7a7ad] text-lg hover:text-[#cc1e23] transition-colors" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                      {siteConfig.contact.phone.main}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#cc1e23] p-3 flex-shrink-0">
                    <Mail size={24} className="text-[#fdfdff]" />
                  </div>
                  <div>
                    <h3 className="text-[#fdfdff] text-xl mb-2 tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                      EMAIL
                    </h3>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-[#a7a7ad] text-lg hover:text-[#cc1e23] transition-colors" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#cc1e23] p-3 flex-shrink-0">
                    <Clock size={24} className="text-[#fdfdff]" />
                  </div>
                  <div>
                    <h3 className="text-[#fdfdff] text-xl mb-2 tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                      HOURS
                    </h3>
                    <div className="text-[#a7a7ad] text-lg space-y-1" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                      <p>Monday - Friday: 5am - 12am</p>
                      <p>Saturday: 7am - 10pm</p>
                      <p>Sunday: 8am - 8pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1c1c1e] p-8">
              <h2 className="text-[#fdfdff] text-3xl md:text-4xl mb-8 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                SEND A MESSAGE
              </h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#fdfdff] text-sm mb-2 tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-[#121214] text-[#fdfdff] px-4 py-3 border border-[#fdfdff]/20 focus:border-[#cc1e23] focus:outline-none transition-colors"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#fdfdff] text-sm mb-2 tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-[#121214] text-[#fdfdff] px-4 py-3 border border-[#fdfdff]/20 focus:border-[#cc1e23] focus:outline-none transition-colors"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[#fdfdff] text-sm mb-2 tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-[#121214] text-[#fdfdff] px-4 py-3 border border-[#fdfdff]/20 focus:border-[#cc1e23] focus:outline-none transition-colors"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#fdfdff] text-sm mb-2 tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full bg-[#121214] text-[#fdfdff] px-4 py-3 border border-[#fdfdff]/20 focus:border-[#cc1e23] focus:outline-none transition-colors resize-none"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#cc1e23] text-[#fdfdff] px-8 py-4 hover:bg-[#a01419] transition-all hover:scale-105 tracking-wider text-lg"
                  style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
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

          <FacilityHours />
        </div>
      </section>

      <Location topPadding="py-32" />

      <FinalCTA />
    </>
  );
}
