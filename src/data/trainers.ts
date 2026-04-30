import { Dumbbell, Activity, TrendingDown, Gauge, Sparkles, TrendingUp, Brain } from 'lucide-react';
import ollyImg from 'figma:asset/71a3fd745eb94c945f4ce406e85a1001d15858cb.png';
import kevinImg from 'figma:asset/ab3f53723c71c7e29118780eb4e3efa77482789f.png';
import jakeImg from 'figma:asset/235044001bd16873d0adc2ca67bded26e497e0ef.png';
import guyImg from 'figma:asset/13b8ec6f8c11f6da3a5235a58d7b6129f0e111a6.png';
import evanImg from 'figma:asset/9ff16f64cc6a43ca988b5db2965c1c52efe2df2e.png';
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
    bio: "I have been the owner and operator of Brit's Brothers Gym since 1994. Brit's Brothers Gym has an \"Old School\" environment, coupled with the best personal trainers in Greenville and variety of equipment designed to help you achieve your fitness goals.",
    image: ollyImg,
    slug: null,
  },
  {
    name: 'Kevin Bain',
    title: 'Personal Trainer',
    bio: "As a full time fitness trainer at Brit's Brothers Gym since 1998, I've been fortunate to help a variety of people reach their fitness goals. 30 years of weight training experience has given me the ability to absorb and apply the correct principles needed for any individual to progress to meet their fitness goals.",
    image: kevinImg,
    slug: null,
  },
  {
    name: 'Jake Henderson',
    title: 'Personal Trainer',
    bio: "Jake, who holds a bachelors degree in exercise and sports science, focusing on strength and conditioning from University of South Carolina Upstate, is also an ACSM certified personal trainer. As a competitive powerlifter and strongman for the last ten years, strength training and strength in general has been a passion of Jake's for as long as he can remember.",
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
    name: 'Evan Pierce',
    title: 'Cardio Boxing & Yoga',
    bio: "Being born Olly Pierce's oldest son allowed me to grow up around martial arts and weightlifting. I began consistently training at Killer Bee's Boxing in 2016 and am training to compete in amateur events. I recently became a Level 1 Yoga Fit instructor trainee and am working toward my certification. I look to offer cardio boxing classes and donation only yoga for beginners.",
    image: evanImg,
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
