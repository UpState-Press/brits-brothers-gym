import image_d15eda18ea41e9b4c6d7c8d24a445decb714d367 from 'figma:asset/d15eda18ea41e9b4c6d7c8d24a445decb714d367.png'
import { MapPin, Phone, Navigation as NavIcon } from 'lucide-react';
import topDivider from 'figma:asset/31fcf544b442943636aba42ea48f9a04dfca2658.png';
import { formatAddressLines, siteConfig } from '../../config/siteConfig';

interface LocationProps {
  phoneNumber?: string;
  topPadding?: 'pt-48' | 'py-32';
}

export function Location({ phoneNumber = '(864) 553-3821', topPadding = 'pt-48' }: LocationProps) {
  const paddingClass = topPadding === 'pt-48' ? 'pt-48 pb-32' : 'py-32';

  return (
    <section id="location" className={`relative ${paddingClass} bg-[#1c1c1e]`}>
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full z-20">
        <img 
          src={image_d15eda18ea41e9b4c6d7c8d24a445decb714d367} 
          alt="" 
          className="w-full h-auto block"
        />
      </div>

      {/* Blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#24186e]/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[#a7a7ad] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Come Visit
          </span>
          
          <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            FIND US
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Map - 2/3 width */}
          <div className="lg:col-span-2 max-w-full">
            <div className="relative aspect-[4/3] bg-[#121214] overflow-hidden w-full">
              <iframe
                src={siteConfig.maps.embedUrl}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Brit's Brothers Gym Location"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Location Info - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-[#121214] p-10">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-14 h-14 bg-[#24186e]/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#fdfdff]" size={24} />
                </div>
                <div>
                  <h3 className="text-[#fdfdff] text-2xl mb-3 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    ADDRESS
                  </h3>
                  <p className="text-[#a7a7ad] text-lg leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    {formatAddressLines(true).map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 mb-8">
                <div className="w-14 h-14 bg-[#24186e]/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-[#fdfdff]" size={24} />
                </div>
                <div>
                  <h3 className="text-[#fdfdff] text-2xl mb-3 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    CONTACT
                  </h3>
                  <a
                    href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
                    className="text-[#a7a7ad] hover:text-[#fdfdff] text-lg transition-colors"
                    style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>

              <a 
                href={siteConfig.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#24186e]/40 text-[#fdfdff] px-8 py-4 hover:bg-[#24186e]/60 transition-all tracking-wider w-full"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                <NavIcon size={20} />
                Get Directions
              </a>
            </div>

            <div className="mt-8">
              <p className="text-[#a7a7ad] text-lg leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                Come tour the facility. See the equipment. Meet the team. No pressure, no gimmicks—just an honest look at where champions are made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}