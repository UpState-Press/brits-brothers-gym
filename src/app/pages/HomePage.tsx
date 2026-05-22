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
        title="Brits Brothers Gym | Strength & Fitness"
        description="Elite Strength and fitness training in Greenville SC. Book your first session today."
        ogImage="/images/og-home.svg"
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
