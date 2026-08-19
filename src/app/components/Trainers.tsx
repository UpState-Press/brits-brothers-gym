import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BlackAndWhiteImage } from './BlackAndWhiteImage';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import { trainersData } from '../../data/trainers';

export function Trainers() {
  // Single source of truth so the homepage grid stays in sync with the roster.
  const trainers = trainersData.map(({ name, title, image, slug }) => ({ name, title, image, slug }));

  // Where a card points. A trainer with a detail page goes to it. Olly has no
  // detail page, so his card sends people to the free evaluation instead of
  // being the one dead card in the grid. If he ever gets a page, adding his
  // slug in trainers.ts takes precedence automatically.
  function linkFor(trainer: { name: string; slug: string | null }) {
    if (trainer.slug) return { to: `/trainers/${trainer.slug}`, cue: 'View Profile' };
    if (trainer.name === 'Olly Pierce') return { to: '/consultation', cue: 'Book a Free Evaluation' };
    return null;
  }

  return (
    <section id="trainers" className="relative pt-48 pb-20 bg-[#121214]">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full z-0">
        <img 
          src={splatterDivider} 
          alt="" 
          className="w-full h-auto block rotate-180"
        />
      </div>

      {/* Decorative Elements */}
      
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Meet The Squad
          </span>
          
          <h2 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            ELITE COACHING STAFF
          </h2>
          
          <p className="text-[#a7a7ad] text-xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            Award-winning trainers who've transformed thousands. They don't just teach—they lead by example.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {trainers.map((trainer, index) => {
            const link = linkFor(trainer);
            const card = (
              <div className="relative overflow-hidden bg-[#1c1c1e]">
                {/* Image */}
                <BlackAndWhiteImage
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-[350px] md:h-[400px]"
                />

                {/* Overlay with Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/50 to-transparent opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-[#fdfdff] text-2xl md:text-3xl mb-2 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                      {trainer.name}
                    </h3>
                    <p className="text-[#cc1e23] text-xs md:text-sm tracking-widest uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                      {trainer.title}
                    </p>

                    {link && (
                      <span
                        className="mt-3 inline-flex items-center gap-2 text-[#a7a7ad] group-hover:text-[#fdfdff] text-xs tracking-[0.2em] uppercase transition-colors"
                        style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}
                      >
                        {link.cue}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return link ? (
              <Link
                key={index}
                to={link.to}
                aria-label={`${trainer.name}, ${trainer.title}. ${link.cue}.`}
                className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cc1e23] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121214]"
              >
                {card}
              </Link>
            ) : (
              <div key={index} className="group relative">
                {card}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-[#fdfdff] text-xl md:text-2xl mb-6" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
            Ready to work with the best?
          </p>
          <a
            href="#pricing"
            className="inline-block bg-[#cc1e23] text-[#fdfdff] px-8 md:px-12 py-4 md:py-5 hover:bg-[#a01419] transition-all hover:scale-105 tracking-wider text-base md:text-lg"
            style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
          >
            Book Your Session
          </a>
        </div>
      </div>
    </section>
  );
}
