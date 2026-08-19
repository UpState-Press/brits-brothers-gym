import { Dumbbell, Activity, TrendingDown, Gauge, Sparkles, TrendingUp, Brain, Zap, Apple, HeartPulse, Leaf } from 'lucide-react';
import ollyImg from '../assets/olly-pierce.webp';
import jakeImg from '../assets/jake-henderson.webp';
import guyImg from '../assets/guy-mosley.webp';
import ryanImg from '../assets/ryan-mccaffery.webp';
import haileyImg from '../assets/hailey-peterson.webp';
import heatherImg from '../assets/heather-hetager.webp';
import jakeBanner from '../imports/banner-12.jpg';
import guyBanner from '../imports/banner-10.jpg';
import ryanBanner from '../assets/banner-ryan-mccaffery.webp';
import haileyBanner from '../assets/banner-hailey-peterson.webp';
import heatherBanner from '../assets/banner-heather-hetager.webp';

export interface TrainerCard {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface TrainerTestimonial {
  quote: string;
  name: string;
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
  testimonials?: TrainerTestimonial[];
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
    quote: "Strength isn't just physical—it's mental, emotional, and psychological. I help you build all four.",
    bannerImage: jakeBanner,
    cards: [
      {
        title: 'Powerlifting & Strongman',
        description: 'Develop maximum strength through structured programming for the squat, bench press, deadlift, loaded carries, and strongman-specific events.',
        icon: Dumbbell
      },
      {
        title: 'Athletic Performance',
        description: 'Improve power, work capacity, movement quality, and overall athletic ability through practical, performance-driven training.',
        icon: Gauge
      },
      {
        title: 'Wellness & Lifestyle',
        description: 'Build strength that carries into everyday life with personalized training designed to support long-term health, confidence, and functionality.',
        icon: HeartPulse
      },
      {
        title: 'Mobility & Longevity',
        description: 'Improve joint function, movement quality, and resilience so you can continue training hard and moving well for years to come.',
        icon: Leaf
      }
    ],
    testimonials: [
      {
        quote: "Programming is always specific to your ability. Programs always arrived on time. Not only did I build my strength but his guidance also gave me confidence in every day tasks. His approach is simple, clear and effective.",
        name: 'Mauricio Reyes'
      },
      {
        quote: "Jake helped me take my strongman training to the next level and corrected some bad forms I had. I've enjoyed getting to progress in the sport with Jake's help.",
        name: 'Tobius Jameson'
      },
      {
        quote: "He didn't just hand me a generic program, he identifies your specific weak points and builds training that actually addresses them. That attention to detail made a real difference in hitting my goals on meet day.",
        name: 'Jordan E.'
      },
      {
        quote: "I was hesitant at first because I went to school to be a personal trainer and figured I could just do it myself. I decided to work with Jake because he has a lot of experience I did not have. He has been everything I could have hoped for in a coach and mentor, and now I consider him a big brother. Forever grateful for Jake and the whole Brits Brothers family.",
        name: 'Mike Thompson'
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
    slug: 'ryan-mccaffery',
    quote: "Powerful physiques nurture powerful minds",
    bannerImage: ryanBanner,
    cards: [
      {
        title: 'Hypertrophy',
        description: 'Build muscle through intentional exercise selection, progressive overload, proper technique, and programming tailored to your experience level.',
        icon: Dumbbell
      },
      {
        title: 'Aesthetics',
        description: 'Develop a stronger, more balanced physique with training focused on muscular development, definition, symmetry, and sustainable progress.',
        icon: Sparkles
      },
      {
        title: 'Power',
        description: 'Increase explosive strength and force production through purposeful resistance training and performance-focused programming.',
        icon: Zap
      },
      {
        title: 'Fat Transformation',
        description: 'Improve body composition through consistent strength training, increased activity, and sustainable habits that support lasting results.',
        icon: TrendingDown
      }
    ]
  },
  {
    name: 'Hailey Peterson',
    title: 'Personal Trainer',
    bio: "Hailey has been a trainer at Brits for two years. With a focus on wellness and nutrition she works with women to achieve their strength and physique goals.",
    image: haileyImg,
    slug: 'hailey-peterson',
    quote: "Strength is for all, heavy weights build beautiful and powerful women.",
    bannerImage: haileyBanner,
    cards: [
      {
        title: 'Aesthetics',
        description: 'Build a strong, confident physique with training focused on muscle development, definition, balance, and sustainable body-composition goals.',
        icon: Sparkles
      },
      {
        title: 'Hypertrophy',
        description: 'Develop lean muscle through progressive resistance training, intentional exercise selection, and personalized programming.',
        icon: Dumbbell
      },
      {
        title: 'Nutrition',
        description: 'Create sustainable progress through strength training, practical nutrition guidance, and habits that support your goals beyond the gym.',
        icon: Apple
      },
      {
        title: 'Hormone Balance',
        description: 'Support the changing needs of the body through thoughtful strength training, recovery, nutrition, and sustainable wellness habits.',
        icon: HeartPulse
      }
    ],
    testimonials: [
      {
        quote: "I love training with Hailey. Her connection to the gym and its members helped me feel like part of the community more easily. Hailey knows how to push me just that little bit more. She holds me accountable. And she has coached me through pretty major changes in my body composition. I'm so happy I walked through the door last year!",
        name: 'Laurie McGranahan'
      },
      {
        quote: "Working out with Hailey has been the best experience I've had with a personal trainer. I have never seen faster results in the gym than I have in the past 2 years. She helped me achieve my dream body. I would and have recommended her to everyone I know.",
        name: 'Isabella Sforza'
      },
      {
        quote: "Hailey is super helpful. She definitely pushes you to do better while also making sure it's nothing you can't handle. I've noticed a huge difference in myself and definitely in my strength.",
        name: 'Denae'
      },
      {
        quote: "Hailey is a great trainer. I really have enjoyed her training me. I look forward to our sessions.",
        name: 'Mercedes Calderon'
      },
      {
        quote: "Amazing! Hailey is great. Love her and the gym as well.",
        name: 'Amyra Lay'
      }
    ]
  },
  {
    name: 'Heather Hetager',
    title: 'Personal Trainer',
    bio: "Heather is a NASM and Yoga Certified personal trainer with a focus on helping women over 35 age gracefully with strength training and yoga. Heather's clients gain longevity, confidence and strength as they work in a comfortable environment to achieve their goals.",
    image: heatherImg,
    slug: 'heather-hetager',
    quote: "Iron Sharpens Iron",
    bannerImage: heatherBanner,
    cards: [
      {
        title: 'Yoga & Longevity',
        description: 'Improve flexibility, balance, joint health, and movement quality through a combination of strength training and yoga-based practices.',
        icon: Leaf
      },
      {
        title: 'Strength',
        description: 'Build functional strength through approachable resistance training tailored to your experience, comfort level, and individual goals.',
        icon: Activity
      },
      {
        title: 'Nutrition',
        description: 'Support healthy body composition with sustainable training, practical nutrition habits, and consistent lifestyle improvements.',
        icon: Apple
      }
    ],
    testimonials: [
      {
        quote: "I've learned so much about how important weight training is and how it benefits my body. Heather has a wide range of knowledge of what the body needs no matter your age. I'm a 64 year old grandmother and my goal is to lose the limp I have from a hip replacement. She has helped me learn I need strength in many areas to get there, and more importantly what my body needs for overall longevity so I can live an active life as I age and chase these grand babies.",
        name: 'Kathy'
      },
      {
        quote: "I have never had a personal trainer before but now I understand the importance of having one. Heather has been very caring and professional at the same time. She is so good at explaining what muscles we are working as well as why we need to strengthen them. I look forward to getting stronger and improving my balance with Heather's help.",
        name: 'Cathy Butler'
      },
      {
        quote: "It's really a workout! My trainer Heather is awesome. She's patient with me and very encouraging during my workouts.",
        name: 'Ellen Hanks'
      }
    ]
  },
];

// Where a roster card should point, used by BOTH the homepage grid and the
// /trainers page so the two can never drift apart. A trainer with a detail
// page goes to it; Olly has no page yet, so his card goes to the free
// evaluation rather than being the one dead card. Giving him a slug in the
// data below automatically switches his card to his detail page.
export const getTrainerCardLink = (
  trainer: Pick<Trainer, 'name' | 'slug'>,
): { to: string; cue: string } | null => {
  if (trainer.slug) return { to: `/trainers/${trainer.slug}`, cue: 'View Profile' };
  if (trainer.name === 'Olly Pierce') return { to: '/consultation', cue: 'Book a Free Evaluation' };
  return null;
};

// Helper to get trainer by slug for detail pages
export const getTrainerBySlug = (slug: string): Trainer | undefined => {
  return trainersData.find(trainer => trainer.slug === slug);
};

// Helper to get all trainers with detail pages
export const getTrainersWithDetailPages = (): Trainer[] => {
  return trainersData.filter(trainer => trainer.slug !== null);
};
