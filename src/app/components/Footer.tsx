import { Link } from 'react-router-dom';
import image_37021cebd2b33050505f81cf47d1c80f523c66e3 from 'figma:asset/37021cebd2b33050505f81cf47d1c80f523c66e3.png'
import { Instagram, Youtube, Mail } from 'lucide-react';
import footerDivider from 'figma:asset/b1023ee0a637f630e98d4d95adbf46604fca23d0.png';

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0c] py-8 md:py-12">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full z-20">
        <img 
          src={image_37021cebd2b33050505f81cf47d1c80f523c66e3} 
          alt="" 
          className="w-full h-auto block -translate-y-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-[#fdfdff] text-2xl tracking-wider" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
                BB
              </span>
              <span className="ml-2 text-[#fdfdff] text-lg tracking-widest" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                BRITS BROTHERS
              </span>
            </div>
            <p className="text-[#a7a7ad] text-sm leading-relaxed max-w-md" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Voted "Best Trainer of the Upstate" 9 years in a row. Personal training and fitness for strength, stamina, endurance, performance, and health.
            </p>
            <div className="mt-6">
              <p className="text-[#a7a7ad] text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                301 Airport Rd, Suite K
              </p>
              <p className="text-[#a7a7ad] text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                Greenville, SC
              </p>
              <a href="tel:1-864-553-3821" className="text-[#fdfdff] hover:text-[#a7a7ad] text-sm transition-colors" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                (864) 553-3821
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#fdfdff] text-lg mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/trainers" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  Trainers
                </Link>
              </li>
              <li>
                <Link to="/programs/boxing" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  Boxing
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#a7a7ad] hover:text-[#cc1e23] transition-colors text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#fdfdff] text-lg mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              Connect
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-[#a7a7ad] hover:text-[#fdfdff] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[#a7a7ad] hover:text-[#fdfdff] transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-[#a7a7ad] hover:text-[#fdfdff] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2a2a2c] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#a7a7ad] text-xs" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            © 2026 Brits Brothers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#a7a7ad] hover:text-[#fdfdff] text-xs transition-colors" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Privacy Policy
            </a>
            <a href="#" className="text-[#a7a7ad] hover:text-[#fdfdff] text-xs transition-colors" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}