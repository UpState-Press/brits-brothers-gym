import { Check } from 'lucide-react';

export function GymAccessPricing() {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
      {/* Open Gym - Featured */}
      <div className="relative bg-gradient-to-br from-[#cc1e23] to-[#a01419] p-8 transform hover:scale-105 transition-all">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#fdfdff] text-[#121214] px-6 py-2 text-sm tracking-widest" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
          BEST VALUE
        </div>

        <div className="text-center mb-6">
          <h4 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            Open Gym
          </h4>
          <div className="mb-2">
            <span className="text-[#fdfdff] text-5xl" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              $49
            </span>
            <sup className="text-2xl">.95</sup>
          </div>
          <p className="text-[#fdfdff]/80 line-through text-sm mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            Normally $59.95
          </p>
          <p className="text-[#fdfdff] text-sm" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            per month
          </p>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0" />
            Unlimited gym access
          </li>
          <li className="flex items-center text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0" />
            5am - 12am daily
          </li>
          <li className="flex items-center text-[#fdfdff]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0" />
            Premium equipment
          </li>
        </ul>

        <a
          href="https://websales.webfdm.com/websales/sign/britsbrothersgym/b136"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#fdfdff] text-[#121214] px-8 py-4 hover:bg-[#e0e0e2] transition-all tracking-wider font-bold"
          style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
        >
          Join Now
        </a>
      </div>

      {/* PT Add-On */}
      <div className="bg-[#1c1c1e] p-8 hover:bg-[#1c1c1e]/80 transition-all">
        <div className="text-center mb-6">
          <h4 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            PT Add-On
          </h4>
          <div className="mb-2">
            <span className="text-[#fdfdff] text-5xl" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              $24
            </span>
            <sup className="text-2xl">.95</sup>
          </div>
          <p className="text-[#a7a7ad] text-sm" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            per month
          </p>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center text-[#a7a7ad]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0 text-[#cc1e23]" />
            With personal training
          </li>
          <li className="flex items-center text-[#a7a7ad]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0 text-[#cc1e23]" />
            Limited gym access
          </li>
          <li className="flex items-center text-[#a7a7ad]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0 text-[#cc1e23]" />
            Additional savings
          </li>
        </ul>

        <a
          href="https://websales.webfdm.com/websales/sign/britsbrothersgym/b136"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#fdfdff]/10 text-[#fdfdff] px-8 py-4 hover:bg-[#cc1e23] transition-all tracking-wider"
          style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
        >
          Get Started
        </a>
      </div>

      {/* Day Pass */}
      <div className="bg-[#1c1c1e] p-8 hover:bg-[#1c1c1e]/80 transition-all">
        <div className="text-center mb-6">
          <h4 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            Day Pass
          </h4>
          <div className="mb-2">
            <span className="text-[#fdfdff] text-5xl" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              $10
            </span>
          </div>
          <p className="text-[#a7a7ad] text-sm" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            one time
          </p>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center text-[#a7a7ad]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0 text-[#cc1e23]" />
            Single day access
          </li>
          <li className="flex items-center text-[#a7a7ad]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0 text-[#cc1e23]" />
            Try before you commit
          </li>
          <li className="flex items-center text-[#a7a7ad]" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            <Check size={20} className="mr-3 flex-shrink-0 text-[#cc1e23]" />
            Perfect for visitors
          </li>
        </ul>

        <a
          href="https://app.moonclerk.com/pay/1wx71ob86e56"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#fdfdff]/10 text-[#fdfdff] px-8 py-4 hover:bg-[#cc1e23] transition-all tracking-wider"
          style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
        >
          Buy Pass
        </a>
      </div>
    </div>
  );
}
