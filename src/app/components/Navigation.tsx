import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import logo from 'figma:asset/4094adf8e330be671acfe499d0c85e8a6240fa34.png';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrainersOpen, setIsTrainersOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121214]/98 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden p-1 bg-[#121214]">
              <img src={logo} alt="Brits Brothers" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="text-[#fdfdff] text-lg md:text-2xl tracking-widest leading-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                BRITS BROTHERS
              </div>
              <div className="text-[#a7a7ad] text-[10px] md:text-xs tracking-widest" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
                Est. Greenville
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Trainers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsTrainersOpen(true)}
              onMouseLeave={() => setIsTrainersOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase py-2" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Trainers
                <ChevronDown size={16} className={`transition-transform ${isTrainersOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTrainersOpen && (
                <div className="absolute top-full left-0 bg-[#1c1c1e] border border-[#fdfdff]/10 min-w-[200px] py-2">
                  <Link
                    to="/trainers"
                    className="block px-6 py-3 text-[#a7a7ad] hover:text-[#cc1e23] hover:bg-[#121214] transition-colors text-sm tracking-wide uppercase"
                    style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}
                  >
                    All Trainers
                  </Link>
                  <Link
                    to="/trainers/jake-henderson"
                    className="block px-6 py-3 text-[#a7a7ad] hover:text-[#cc1e23] hover:bg-[#121214] transition-colors text-sm tracking-wide uppercase"
                    style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}
                  >
                    Jake Henderson
                  </Link>
                  <Link
                    to="/trainers/guy-mosley"
                    className="block px-6 py-3 text-[#a7a7ad] hover:text-[#cc1e23] hover:bg-[#121214] transition-colors text-sm tracking-wide uppercase"
                    style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}
                  >
                    Guy Mosley
                  </Link>
                </div>
              )}
            </div>

            <Link to="/programs/boxing" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
              Boxing
            </Link>
            <Link to="/testimonials" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
              Testimonials
            </Link>
            <Link to="/membership" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
              Membership
            </Link>
            <Link to="/contact" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
              Contact
            </Link>
            <a href="tel:1-864-553-3821" className="flex items-center gap-2 text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
              <Phone size={16} />
              (864) 553-3821
            </a>
            <Link to="/consultation" className="bg-[#cc1e23] text-[#fdfdff] px-8 py-3 hover:bg-[#a01419] transition-all hover:scale-105 tracking-wider text-sm" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              Free Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#fdfdff] p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-[#fdfdff]/10">
            <div className="flex flex-col gap-6">
              {/* Trainers Dropdown */}
              <div>
                <button
                  onClick={() => setIsTrainersOpen(!isTrainersOpen)}
                  className="flex items-center gap-1 text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase w-full"
                  style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}
                >
                  Trainers
                  <ChevronDown size={16} className={`transition-transform ${isTrainersOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTrainersOpen && (
                  <div className="pl-4 mt-2 flex flex-col gap-2">
                    <Link
                      to="/trainers"
                      onClick={() => setIsOpen(false)}
                      className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase"
                      style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}
                    >
                      All Trainers
                    </Link>
                    <Link
                      to="/trainers/jake-henderson"
                      onClick={() => setIsOpen(false)}
                      className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase"
                      style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}
                    >
                      Jake Henderson
                    </Link>
                    <Link
                      to="/trainers/guy-mosley"
                      onClick={() => setIsOpen(false)}
                      className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase"
                      style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}
                    >
                      Guy Mosley
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/programs/boxing" onClick={() => setIsOpen(false)} className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Boxing
              </Link>
              <Link to="/testimonials" onClick={() => setIsOpen(false)} className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Testimonials
              </Link>
              <Link to="/membership" onClick={() => setIsOpen(false)} className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Membership
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Contact
              </Link>
              <a href="tel:1-864-553-3821" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm tracking-wide uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                (864) 553-3821
              </a>
              <Link to="/consultation" onClick={() => setIsOpen(false)} className="bg-[#cc1e23] text-[#fdfdff] px-6 py-3 hover:bg-[#a01419] transition-colors tracking-wider text-sm w-full text-center block" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                Book a Free Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}