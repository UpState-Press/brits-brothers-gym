import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import greyDivider from 'figma:asset/d15eda18ea41e9b4c6d7c8d24a445decb714d367.png';
import { FinalCTA } from '../components/FinalCTA';
import { getTrainerBySlug } from '../../data/trainers';

export function TrainerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const trainer = slug ? getTrainerBySlug(slug) : undefined;

  if (!trainer || !trainer.quote || !trainer.bannerImage || !trainer.cards) {
    return <Navigate to="/trainers" replace />;
  }

  return (
    <>
      <SEO
        title={`${trainer.name} - ${trainer.title}`}
        description={`${trainer.bio.substring(0, 155)}...`}
        keywords={`${trainer.name}, personal trainer Greenville SC, ${trainer.title.toLowerCase()}`}
      />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121214] pt-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={trainer.bannerImage}
            alt={trainer.name}
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/70 via-[#121214]/60 to-[#121214]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] bg-[#1c1c1e] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                {trainer.title}
              </span>

              <h1 className="text-[#fdfdff] text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                {trainer.name.toUpperCase()}
              </h1>

              <blockquote className="text-[#fdfdff] text-2xl md:text-3xl mb-10 leading-relaxed italic border-l-4 border-[#cc1e23] pl-6" style={{ fontFamily: "'ltc-goudy-text-pro-shaded', serif" }}>
                "{trainer.quote}"
              </blockquote>

              <Link
                to="/membership"
                className="inline-block bg-[#cc1e23] text-[#fdfdff] px-8 sm:px-12 py-4 sm:py-5 hover:bg-[#a01419] transition-all hover:scale-105 tracking-wider text-base sm:text-lg w-full sm:w-auto text-center"
                style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
              >
                Train With {trainer.name.split(' ')[0]}
              </Link>
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

      {/* Training Focus Cards */}
      <section className="relative py-32 bg-[#1c1c1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainer.cards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div key={index} className="bg-[#121214] transition-all group hover:bg-[#121214]/80">
                  <div className="p-8 relative">
                    <div className="w-16 h-16 bg-[#cc1e23]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#cc1e23]/30 transition-colors">
                      <IconComponent className="text-[#cc1e23]" size={32} />
                    </div>
                    <h3 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                      {card.title.toUpperCase()}
                    </h3>
                    <p className="text-[#a7a7ad] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative pt-40 pb-20 bg-[#121214]">
        {/* Top Divider */}
        <div className="absolute top-0 left-0 right-0 w-full z-10">
          <img
            src={splatterDivider}
            alt=""
            className="w-full h-auto block rotate-180"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-[#cc1e23]"></div>
            <h2 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wider text-center" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              ABOUT {trainer.name.split(' ')[0].toUpperCase()}
            </h2>
            <div className="h-px w-16 bg-[#cc1e23]"></div>
          </div>

          <p className="text-[#a7a7ad] text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            {trainer.bio}
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
