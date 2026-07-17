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
        fullTitle="Brit's Brothers Gym | Personal Training & Old School Strength in Greenville, SC"
        description="Greenville's old school gym since 1994. Personal training, open gym access, boxing, and serious strongman and powerlifting equipment at Brit's Brothers Gym."
        ogImage="/images/og-home.jpg"
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
