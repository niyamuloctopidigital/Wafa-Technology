'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Globe, Lock, Zap, Users, HeadphonesIcon } from 'lucide-react';

const reasons = [
  {
    icon: Cpu,
    title: 'AI-First Approach',
    description:
      'We embed artificial intelligence into every solution, not as an afterthought but as a core architectural decision.',
  },
  {
    icon: Globe,
    title: 'Global Delivery',
    description:
      'Distributed engineering teams working across time zones to deliver faster without compromising quality.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description:
      'SOC 2 compliant processes, encrypted pipelines, and security-first development practices built into our DNA.',
  },
  {
    icon: Zap,
    title: 'Rapid Iteration',
    description:
      'Agile sprints, continuous delivery, and fast feedback loops mean your product evolves at market speed.',
  },
  {
    icon: Users,
    title: 'Dedicated Teams',
    description:
      'Senior engineers assigned to your project full-time. No outsourcing, no juggling between clients.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description:
      'Post-launch support with guaranteed SLAs, proactive monitoring, and rapid incident response.',
  },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
            Why Wafa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Where Innovation Meets{' '}
            <span className="gradient-text">Execution</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            We don&apos;t just build software &mdash; we engineer competitive advantages.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-emerald-500/15 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-5">
                <reason.icon size={20} className="text-emerald-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{reason.title}</h3>
              <p className="text-sm text-white/35 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
