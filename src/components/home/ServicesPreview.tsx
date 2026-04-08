'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Code2,
  Brain,
  Smartphone,
  Server,
  ArrowUpRight,
  Workflow,
  Database,
} from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Automation',
    description:
      'Custom AI solutions, machine learning pipelines, and intelligent automation that streamline operations and unlock new capabilities.',
    features: ['LLM Integration', 'Predictive Analytics', 'Process Automation', 'Computer Vision'],
    href: '/services',
    accent: 'emerald',
  },
  {
    icon: Code2,
    title: 'Software Development',
    description:
      'Full-stack engineering of scalable web applications, enterprise platforms, and SaaS products built with modern architectures.',
    features: ['Web Applications', 'API Development', 'Cloud Native', 'Microservices'],
    href: '/services',
    accent: 'blue',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Cross-platform and native mobile applications for iOS, Android, and tablets with seamless performance and elegant UX.',
    features: ['iOS & Android', 'Cross-Platform', 'Tablet Apps', 'App Store Optimization'],
    href: '/services',
    accent: 'purple',
  },
  {
    icon: Server,
    title: 'Backend & Infrastructure',
    description:
      'Robust backend systems, cloud architecture, DevOps pipelines, and database engineering for enterprise-grade reliability.',
    features: ['Cloud Architecture', 'DevOps & CI/CD', 'Database Design', 'System Scaling'],
    href: '/services',
    accent: 'orange',
  },
];

const accentColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  emerald: {
    border: 'group-hover:border-emerald-500/20',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/5',
  },
  blue: {
    border: 'group-hover:border-blue-500/20',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    glow: 'group-hover:shadow-blue-500/5',
  },
  purple: {
    border: 'group-hover:border-purple-500/20',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    glow: 'group-hover:shadow-purple-500/5',
  },
  orange: {
    border: 'group-hover:border-orange-500/20',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    glow: 'group-hover:shadow-orange-500/5',
  },
};

export default function ServicesPreview() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            End-to-End{' '}
            <span className="gradient-text">Engineering</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            We build complete technology solutions &mdash; from concept to deployment and beyond.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const colors = accentColors[service.accent];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={service.href} className="block group">
                  <div
                    className={`relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 ${colors.border} ${colors.glow} hover:shadow-2xl`}
                  >
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} mb-6`}
                    >
                      <service.icon size={22} className={colors.text} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="text-white/20 group-hover:text-white/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 mt-1"
                      />
                    </div>

                    <p className="text-white/40 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-white/40 border border-white/[0.04]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
