import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BlackAndWhiteImage } from '../components/BlackAndWhiteImage';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import { FinalCTA } from '../components/FinalCTA';
import { trainersData } from '../../data/trainers';

export function TrainersPage() {
  const trainers = trainersData;

  return (
    <>
      <SEO
        title="Expert Personal Trainers"
        description="Meet our award-winning personal trainers in Greenville, SC. Certified professionals with decades of experience in strength training, powerlifting, and fitness coaching."
        keywords="personal trainers Greenville SC, certified fitness trainers, strength coaches, powerlifting coaches, ACSM certified trainers"
      />
      {/* Hero */}
      <section className="relative pt-40 pb-40 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[#fdfdff] text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            OUR TRAINERS
          </h1>

          <p className="text-[#a7a7ad] text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            Brit's Brothers: it's not your typical fitness club
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

      {/* Trainers Section */}
      <section className="relative py-32 bg-[#1c1c1e]">
        {/* Top Divider */}
        <div className="absolute top-0 left-0 right-0 w-full z-10">
          <img
            src={splatterDivider}
            alt=""
            className="w-full h-auto block"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => {
              const CardWrapper = trainer.slug ? Link : 'div';
              const cardProps = trainer.slug ? { to: `/trainers/${trainer.slug}` } : {};

              return (
                <CardWrapper
                  key={index}
                  {...cardProps}
                  className={`group block ${trainer.slug ? 'cursor-pointer' : ''}`}
                >
                  <div className="bg-[#121214]">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <BlackAndWhiteImage
                        src={trainer.image}
                        alt={trainer.name}
                        className="h-[400px]"
                      />

                      {/* Overlay with Name & Title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/50 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-[#fdfdff] text-3xl mb-2 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                            {trainer.name}
                          </h3>
                          <p className="text-[#cc1e23] text-sm tracking-widest uppercase" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                            {trainer.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bio Box */}
                    <div className="p-6">
                      <p className="text-[#a7a7ad] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                        {trainer.bio}
                      </p>
                      {trainer.slug && (
                        <span className="text-[#fdfdff] text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                          View Profile →
                        </span>
                      )}
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>

        </div>
      </section>

      <FinalCTA />
    </>
  );
}
