import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import greyDivider from 'figma:asset/d15eda18ea41e9b4c6d7c8d24a445decb714d367.png';
import { FinalCTA } from '../components/FinalCTA';
import jakeOdumImg from '../../imports/jake-odum.jpg';
import lilyWikoffImg from '../../imports/lily-wikoff.jpg';
import joshNorrisImg from '../../imports/josh-norris.jpg';
import jayByarsImg from '../../imports/jay-bayers.jpg';

export function TestimonialsPage() {
  const videoTestimonials = [
    {
      id: 1,
      name: 'Mallory Morris',
      description: "We sat down with Mallory, star of the Shoulder Health series videos, and talked about her history with the gym and fitness, what brought her to Brit's, and how her training experience has been with Olly.",
      videoUrl: 'https://www.youtube.com/embed/-ptw7IgTPjQ?si=um3ujc-autluTrz1'
    },
    {
      id: 2,
      name: 'Connie Dimick',
      description: "We sat down with Connie, the owner of White Duck Taco, and talked about the partnership we've been privileged to share with her and her experience training at Brit's Brothers Gym.",
      videoUrl: 'https://www.youtube.com/embed/1Gwtl6kviPU?si=NHw7boj7pjIMvOuG'
    },
    {
      id: 3,
      name: 'Alex Kassalias',
      description: "We sat down with Dr. Alex Kassalias and discussed his background and how he met Olly and got started at Brit's Brothers Gym.",
      videoUrl: 'https://www.youtube.com/embed/VtTvhtjIDS8?si=Qs1QfAuAIQF2CPXe'
    }
  ];

  const testimonials = [
    {
      name: 'Jake Odum',
      quote: "Olly Pierce and the guys at Brit's Brothers Gym have a top-notch organization. They provide one-on-one personalized service that is tailored to your individual needs, and they do that at an unbeatable value! You just cannot get the same level of attention at one of those Jumbo Warehouse Gyms. I am stronger than I've ever been and they showed me techniques that I had been doing wrong for years and didn't even know it! The Brit's Brothers training staff provides the motivation to push you to be your best, all while maintaining the utmost level of professionalism. The best thing about it is that anyone can benefit from coming to Brit's Brothers no matter who you are or what your fitness level may be!",
      image: jakeOdumImg
    },
    {
      name: 'Lily Wikoff',
      quote: "My experience training with Olly at Brit's Brothers has been the most incredible experience I've ever had with a personal trainer, and the results I've seen in the amount of time I've been training have far exceeded my expectations. As an athlete, and former marathon runner, I've had many personal trainers and joined numerous gyms in the past, but this is the first gym I've been 100% satisfied with. Olly and the trainers at Brit's Brothers take the time to understand your personal fitness objectives and tailor each workout to target and achieve your specific goals. This incredible team will provide you with expert training and empowering knowledge to help you sculpt and achieve the body you've always wanted.",
      image: lilyWikoffImg
    },
    {
      name: 'Josh Norris',
      quote: "Olly knew exactly how to help me achieve my fitness goals. He customized the perfect workout schedule for me and I actually look forward to working out now. The Brit's Brothers trainers taught me the importance of stretching before and after each workout. Working as a photographer and traveling a lot, it is an extra bonus to have a trainer who understands my hectic schedule and is able to create a perfect workout program that is both flexible and efficient. I recommend Olly and Brit's Brothers Gym to anyone looking to achieve their highest fitness goals.",
      image: joshNorrisImg
    },
    {
      name: 'Jay Byars',
      quote: "For the past five years I have spent countless hours in the gym, I've done every fitness program under the sun. Usually I was the trainer and never thought that I could benefit from being personally trained by someone else. But for 2011 I needed something or someone to get me to the next level physically. I found the Brit's Brothers ad in a magazine, stopped in to meet Olly and the staff, and have felt at home ever since. Working in the modeling/entertainment industry on a national level demands that my physique be at its best at all times. With the one-on-one training I receive from Brit's Brothers I have seen results that I didn't think were genetically possible. The best part about the training is the knowledge and passion the crew puts into each session. I've had several sports injuries in the past that have limited my training, but Brit's Brothers has pushed me to supersede my fitness goals in a way that has allowed my body to be healthier than ever. These guys rock! Period.",
      image: jayByarsImg
    }
  ];

  return (
    <>
      <SEO
        title="Success Stories & Testimonials"
        description="Real transformation stories from Brit's Brothers Gym members. Watch video testimonials and read success stories from clients who achieved their fitness goals."
        keywords="gym testimonials Greenville SC, fitness success stories, personal training reviews, transformation stories"
      />
      {/* Hero */}
      <section className="relative pt-40 pb-40 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-6" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Real Results
          </span>

          <h1 className="text-[#fdfdff] text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            SUCCESS STORIES
          </h1>

          <p className="text-[#a7a7ad] text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            Hear from the warriors who've transformed their lives at Brit's Brothers.
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

      {/* Video Testimonials */}
      <section className="relative py-32 bg-[#1c1c1e]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#fdfdff] text-4xl md:text-5xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              TRANSFORMATION STORIES
            </h2>
            <p className="text-[#a7a7ad] text-lg" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
              Watch their journeys unfold
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {videoTestimonials.map((video) => (
              <div key={video.id} className="bg-[#121214] max-w-full">
                {/* Video Embed */}
                <div className="relative aspect-video bg-[#121214] overflow-hidden w-full">
                  <iframe
                    src={video.videoUrl}
                    title={`${video.name} testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-[#fdfdff] text-xl mb-3 tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    {video.name}
                  </h3>
                  <p className="text-[#a7a7ad] text-sm leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="relative pt-40 pb-20 bg-[#121214]">
        {/* Top Divider */}
        <div className="absolute top-0 left-0 right-0 w-full z-10">
          <img
            src={splatterDivider}
            alt=""
            className="w-full h-auto block rotate-180"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#1c1c1e] overflow-hidden grid md:grid-cols-[300px_1fr] gap-0">
                {/* Portrait Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quote Box */}
                <div className="p-8 flex flex-col justify-center">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-[#cc1e23] text-[#cc1e23]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[#a7a7ad] text-lg mb-6 leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Name */}
                  <p className="text-[#fdfdff] text-xl tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
