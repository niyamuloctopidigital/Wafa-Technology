'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', description: 'Across 12 countries' },
  { value: 30, suffix: '+', label: 'Enterprise Clients', description: 'Long-term partnerships' },
  { value: 99.9, suffix: '%', label: 'Uptime Guaranteed', description: 'SLA-backed reliability' },
  { value: 5, suffix: '+', label: 'Years of Innovation', description: 'Since founding' },
];

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle divider line */}
      <div className="section-divider max-w-5xl mx-auto mb-20" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center group"
            >
              {/* Vertical divider (not on first item) */}
              {i > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/[0.06]" />
              )}

              <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    suffix={stat.suffix}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <div className="mt-2 text-sm font-medium text-white/60">{stat.label}</div>
              <div className="mt-1 text-xs text-white/25">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
