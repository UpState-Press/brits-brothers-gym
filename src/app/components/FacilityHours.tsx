import { Clock, Calendar } from 'lucide-react';
import bulldogLogo from 'figma:asset/523e93d18273d7b5d4a5c061c39e8a0a9c62b496.png';

interface FacilityHoursProps {
  membershipLink?: string;
  showContactSection?: boolean;
}

export function FacilityHours({ membershipLink = '/membership', showContactSection = true }: FacilityHoursProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Personal Training Hours */}
        <div className="bg-[#121214] p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-[#24186e]/30 rounded-full flex items-center justify-center">
              <Calendar className="text-[#fdfdff]" size={24} />
            </div>
            <h3 className="text-[#fdfdff] text-3xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              PERSONAL TRAINING
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4">
              <span className="text-[#a7a7ad] text-lg" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Monday - Thursday
              </span>
              <span className="text-[#fdfdff] text-xl" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                6am - 8pm
              </span>
            </div>
            <div className="flex justify-between items-center pb-4">
              <span className="text-[#a7a7ad] text-lg" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Friday
              </span>
              <span className="text-[#fdfdff] text-xl" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                6am - 7pm
              </span>
            </div>
            <div className="flex justify-between items-center pb-4">
              <span className="text-[#a7a7ad] text-lg" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Saturday
              </span>
              <span className="text-[#fdfdff] text-xl" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                8am - 12pm
              </span>
            </div>
          </div>

          {/* Bulldog Logo */}
          <div className="flex justify-center my-8">
            <img
              src={bulldogLogo}
              alt="Brits Bros Gym"
              className="w-48 h-auto"
            />
          </div>

          <div className="mt-8">
            <a
              href="tel:1-864-553-3821"
              className="block text-center bg-[#24186e] text-[#fdfdff] px-8 py-4 hover:bg-[#24186e]/80 transition-all tracking-wider"
              style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Open Gym Hours */}
        <div className="bg-gradient-to-br from-[#24186e]/40 to-[#121214] p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-[#24186e]/30 rounded-full flex items-center justify-center">
              <Clock className="text-[#fdfdff]" size={24} />
            </div>
            <h3 className="text-[#fdfdff] text-3xl tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              OPEN GYM
            </h3>
          </div>

          <div className="mb-8">
            <div className="text-center py-12">
              <p className="text-[#fdfdff] text-4xl mb-6" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                UNRESTRICTED ACCESS
              </p>
              <p className="text-[#a7a7ad] text-lg" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                Sunday - Saturday<br />5am - 12am
              </p>
            </div>
          </div>

          <div>
            <a
              href={membershipLink}
              className="block text-center bg-[#24186e] text-[#fdfdff] px-8 py-4 hover:bg-[#24186e]/80 transition-all tracking-wider"
              style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
            >
              Get Membership
            </a>
          </div>
        </div>
      </div>

      {showContactSection && (
        <div className="mt-20 text-center">
          <p className="text-[#a7a7ad] text-xl mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            Questions about our hours?
          </p>
          <a
            href="tel:1-864-553-3821"
            className="text-[#fdfdff] text-3xl md:text-4xl hover:text-[#a7a7ad] transition-colors inline-block"
            style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
          >
            (864) 553-3821
          </a>
        </div>
      )}
    </div>
  );
}
