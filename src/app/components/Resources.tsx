import { FileText } from 'lucide-react';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import nutritionPdf from '../../imports/20-Day-Nutrition-Plan.pdf';

export function Resources() {
  return (
    <section className="relative py-20 bg-[#121214] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Learn More
          </span>

          <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            RESOURCES
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 overflow-hidden">
          {/* Video 1 */}
          <div className="bg-[#1c1c1e] min-w-0">
            <div className="relative aspect-video bg-[#121214] overflow-hidden">
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/67156563?h=45b1fa85f8"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>

          {/* Video 2 */}
          <div className="bg-[#1c1c1e] min-w-0">
            <div className="relative aspect-video bg-[#121214] overflow-hidden">
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/67156564?h=b78126b9c8"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>

          {/* PDF Download Card */}
          <a
            href={nutritionPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1c1c1e] transition-all group hover:bg-[#1c1c1e]/80 flex flex-col items-center justify-center p-8 aspect-video"
          >
            <div className="w-20 h-20 bg-[#cc1e23]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#cc1e23]/30 transition-colors">
              <FileText className="text-[#cc1e23]" size={40} />
            </div>
            <h3 className="text-[#fdfdff] text-2xl mb-4 tracking-wider text-center" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              20-DAY NUTRITION PLAN
            </h3>
            <p className="text-[#a7a7ad] text-sm tracking-widest uppercase text-center" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
              Download PDF
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
