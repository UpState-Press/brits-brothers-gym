import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { Philosophy } from '../components/Philosophy';
import { Trainers } from '../components/Trainers';
import { Programs } from '../components/Programs';
import { Hours } from '../components/Hours';
import { Pricing } from '../components/Pricing';
import { Location } from '../components/Location';
import { FinalCTA } from '../components/FinalCTA';

export function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Greenville's premier personal training gym. Expert trainers, state-of-the-art equipment, and proven results since 1994. Open gym access and personalized training programs."
        keywords="personal training Greenville SC, gym Greenville, fitness center, strength training, powerlifting, Brit's Brothers Gym"
      />
      <Hero />
      <Philosophy />
      <Trainers />
      <Programs />
      <Hours />
      <Pricing />
      <Location />
      <FinalCTA />
    </>
  );
}
