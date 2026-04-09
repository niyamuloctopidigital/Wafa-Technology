'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const fallbackTestimonials = [
  {
    quote: 'Wafa Technology transformed our entire operations with their AI automation platform. We saw a 300% efficiency increase within three months.',
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'FinanceCore',
    initials: 'SC',
    rating: 5,
  },
  {
    quote: 'The mobile app they built for us reached 50,000 users in the first quarter. Their engineering quality is unmatched.',
    author: 'Marcus Webb',
    role: 'CEO',
    company: 'HealthSync',
    initials: 'MW',
    rating: 5,
  },
  {
    quote: 'Their backend team re-architected our entire platform. Zero downtime migration, 10x throughput improvement. Exceptional work.',
    author: 'Aisha Patel',
    role: 'VP Engineering',
    company: 'LogiTrack',
    initials: 'AP',
    rating: 5,
  },
  {
    quote: 'We needed a team that could handle complex AI integration at scale. Wafa delivered beyond our expectations, on time and on budget.',
    author: 'James Morrison',
    role: 'Founder',
    company: 'DataPulse',
    initials: 'JM',
    rating: 5,
  },
  {
    quote: 'Professional, responsive, and technically brilliant. They saved us 40+ hours weekly through intelligent process automation.',
    author: 'Elena Rodriguez',
    role: 'COO',
    company: 'ScaleOps',
    initials: 'ER',
    rating: 5,
  },
  {
    quote: 'The cross-platform app they delivered works flawlessly on iOS, Android, and tablets. Our customers love the seamless experience.',
    author: 'David Kim',
    role: 'Product Lead',
    company: 'NexGen',
    initials: 'DK',
    rating: 5,
  },
];

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company?: string;
  initials: string;
  rating: number;
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <div className="flex-shrink-0 w-[380px] p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 mx-2">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < testimonial.rating ? 'text-emerald-400 fill-emerald-400' : 'text-white/10'}
          />
        ))}
      </div>
      <div className="relative">
        <Quote size={20} className="text-white/[0.04] absolute -top-1 -left-1" />
        <p className="text-sm text-white/50 leading-relaxed pl-3">{testimonial.quote}</p>
      </div>
      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/[0.04]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/10">
          <span className="text-[10px] font-semibold text-emerald-400">{testimonial.initials}</span>
        </div>
        <div>
          <div className="text-sm font-medium text-white">{testimonial.author}</div>
          <div className="text-xs text-white/30">
            {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(fallbackTestimonials);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials?isActive=true');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data.map((t: any) => ({
            quote: t.quote,
            author: t.author,
            role: t.role,
            company: t.company,
            initials: t.initials,
            rating: t.rating,
          })));
        }
      } catch (error) {
        // Keep fallback data
      }
    };
    fetchTestimonials();
  }, []);

  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Trusted by{' '}
            <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            Real results from real partnerships.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 marquee-fade-left" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 marquee-fade-right" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex animate-marquee hover:[animation-play-state:paused]"
        >
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 marquee-fade-left" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 marquee-fade-right" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex"
          style={{ animation: 'marquee 30s linear infinite reverse' }}
        >
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
