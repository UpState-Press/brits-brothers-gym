import { Dumbbell, Activity, TrendingDown, Gauge, Sparkles, TrendingUp, Brain } from 'lucide-react';
import ollyImg from '../assets/olly-pierce.webp';
import jakeImg from '../assets/jake-henderson.webp';
import guyImg from 'figma:asset/13b8ec6f8c11f6da3a5235a58d7b6129f0e111a6.png';
import ryanImg from '../assets/ryan-mccaffery.webp';
import haleyImg from '../assets/haley-peterson.webp';
import heatherImg from '../assets/heather-hetegar.webp';
import jakeBanner from '../imports/banner-12.jpg';
import guyBanner from '../imports/banner-10.jpg';

export interface TrainerCard {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Trainer {
  name: string;
  title: string;
  bio: string;
  image: string;
  slug: string | null;
  quote?: string;
  bannerImage?: string;
  cards?: TrainerCard[];
}

// Centralized trainer data - single source of truth
export const trainersData: Trainer[] = [
  {
    name: 'Olly Pierce',
    title: 'Owner & Head Coach',
    bio: "Olly Pierce is the owner and head coach of Brit's Brothers Gym in Greenville, SC. Operating in the area for over 30 years, Pierce and his facility have been widely recognized, winning Best Trainer of the Upstate for nine consecutive years. A bodybuilder since 18, Olly is a resource for lifters of all levels. Olly's primary focus is training bodybuilders and fighters with a specialization in post injury recovery.",
    image: ollyImg,
    slug: null,
  },
  {
    name: 'Jake Henderson',
    title: 'Strength & Conditioning Coach, Owner of Carolina Barbell Club',
    bio: "Jake Henderson is a strength and conditioning coach and owner of Carolina Barbell Club at Brits Brothers Gym. With over 11 years of experience and a Bachelor's degree in Exercise and Sports Science, he specializes in training strength athletes, such as powerlifters and strongman competitors, alongside lifestyle clients. Jake's coaching focuses on practical strength principles to improve athletic performance, long-term health, and daily functionality. Jake works with individuals aged 15 to 75, creating custom programs for goals ranging from competitive lifting to weight loss and mobility. He is dedicated to helping people use fitness for physical and mental self-improvement while fostering a disciplined community at Carolina Barbell Club.",
    image: jakeImg,
    slug: 'jake-henderson',
    quote: "Strength isn't just physical—it's mental, emotional, and spiritual. I help you build all four.",
    bannerImage: jakeBanner,
    cards: [
      {
        title: 'Power',
        description: 'Power refers to the ability to generate force quickly. Powerlifting requires explosive strength to perform the lifts effectively.',
        icon: Dumbbell
      },
      {
        title: 'Strength',
        description: 'Incorporate resistance training exercises that focus on compound movements and target multiple muscle groups.',
        icon: Activity
      },
      {
        title: 'Weight Loss',
        description: 'Gradually increase the weight or intensity over time to continually challenge your muscles and follow the nutrition advice given by your trainer.',
        icon: TrendingDown
      }
    ]
  },
  {
    name: 'Guy Mosley',
    title: 'Personal Trainer & Mo Better Fit Coach',
    bio: "Guy Mosley worked for many years as the strength coach at Wade Hampton High School and won the Wade Hampton Coach of the Year Award in 2010. From 1999–2013 he worked with the Greenville Fire Department, training firefighters and police officers in strength and conditioning. Over the course of his career he has become a World Champion Power Lifter, Pan-Am Games Champion, and Battle of the Countries Champion.",
    image: guyImg,
    slug: 'guy-mosley',
    quote: "Your limits are just stories you tell yourself. Let's rewrite them.",
    bannerImage: guyBanner,
    cards: [
      {
        title: 'Speed',
        description: 'speed drills, interval training, and agility exercises to improve your overall speed and acceleration',
        icon: Gauge
      },
      {
        title: 'Power',
        description: 'plyometrics, Olympic lifts, medicine ball throws, and resistance training to enhance your power output',
        icon: Dumbbell
      },
      {
        title: 'Explosion',
        description: 'box jumps, kettlebell swings, jump squats, or medicine ball slams, to improve your explosive capabilities',
        icon: Sparkles
      },
      {
        title: 'Weight Gain',
        description: 'lifting weights, performing compound exercises, and optimizing your nutrition to support muscle growth',
        icon: TrendingUp
      },
      {
        title: 'Strength',
        description: 'squats, deadlifts, bench presses, and pull-ups, ensuring proper form and technique to maximize your results',
        icon: Activity
      },
      {
        title: 'Mental Focus',
        description: 'incorporate mindfulness techniques, visualization exercises, and specific training protocols to improve your mental focus',
        icon: Brain
      }
    ]
  },
  {
    name: 'Ryan Mccaffery',
    title: 'Personal Trainer',
    bio: "Ryan is passionate about helping people build muscle and improve body composition through personalized training. He works with clients of all experience levels and creates programs based on their goals and abilities to make training effective and sustainable. Ryan is committed to providing a high level of coaching and continuously expands his knowledge of biomechanics and proven training principles to help clients train with intent, work hard, stay consistent, and achieve long-term results.",
    image: ryanImg,
    slug: null,
  },
  {
    name: 'Haley Peterson',
    title: 'Personal Trainer',
    bio: "Haley has been a trainer at Brits for two years. With a focus on wellness and nutrition she works with women to achieve their strength and physique goals.",
    image: haleyImg,
    slug: null,
  },
  {
    name: 'Heather Hetegar',
    title: 'Personal Trainer',
    bio: "Heather is a NASM and Yoga Certified personal trainer with a focus on helping women over 35 age gracefully with strength training and yoga. Heather's clients gain longevity, confidence and strength as they work in a comfortable environment to achieve their goals.",
    image: heatherImg,
    slug: null,
  },
];

// Helper to get trainer by slug for detail pages
export const getTrainerBySlug = (slug: string): Trainer | undefined => {
  return trainersData.find(trainer => trainer.slug === slug);
};

// Helper to get all trainers with detail pages
export const getTrainersWithDetailPages = (): Trainer[] => {
  return trainersData.filter(trainer => trainer.slug !== null);
};
