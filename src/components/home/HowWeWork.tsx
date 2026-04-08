'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Map, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description:
      'We deep-dive into your business, technical landscape, and objectives to define the right solution architecture.',
    details: ['Stakeholder Interviews', 'Technical Audit', 'Requirement Mapping'],
  },
  {
    icon: Map,
    number: '02',
    title: 'Strategy',
    description:
      'Architecture decisions, technology selection, sprint planning, and milestone definition for predictable delivery.',
    details: ['System Design', 'Tech Stack Selection', 'Roadmap Planning'],
  },
  {
    icon: Code2,
    number: '03',
    title: 'Engineering',
    description:
      'Agile development with continuous integration, code reviews, and weekly demos to keep you in the loop.',
    details: ['Sprint Development', 'Code Reviews', 'QA Testing'],
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch & Scale',
    description:
      'Staged rollout, performance optimization, monitoring setup, and ongoing support to ensure long-term success.',
    details: ['Staged Deployment', 'Performance Tuning', 'Ongoing Support'],
  },
];

export default function HowWeWork() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            From Concept to{' '}
            <span className="gradient-text">Production</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            A proven methodology refined over hundreds of successful projects.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-emerald-500/15 transition-all duration-500 h-full">
                  {/* Number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <step.icon size={18} className="text-emerald-400" strokeWidth={1.5} />
                    </div>
                    <span className="text-3xl font-bold text-white/[0.04] font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-400/40" />
                        <span className="text-xs text-white/25">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
