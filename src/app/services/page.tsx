'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Brain,
  Code2,
  Smartphone,
  Server,
  Cloud,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  Check,
} from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Automation',
    description:
      'Custom AI solutions, machine learning pipelines, and intelligent process automation that transform how your business operates.',
    features: [
      'LLM & ChatBot Integration',
      'Predictive Analytics & ML Models',
      'Workflow & Process Automation',
      'Computer Vision Solutions',
      'NLP & Text Processing',
      'AI-Powered Decision Systems',
    ],
    technologies: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'FastAPI', 'n8n'],
    accent: 'emerald',
  },
  {
    icon: Code2,
    title: 'Software Development',
    description:
      'Full-stack engineering of scalable web applications, enterprise platforms, and SaaS products using modern architectures.',
    features: [
      'Custom Web Applications',
      'SaaS Platform Development',
      'API Design & Development',
      'E-Commerce Solutions',
      'CMS & Admin Dashboards',
      'Real-Time Applications',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],
    accent: 'blue',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Cross-platform and native mobile applications for iOS, Android, and tablets with pixel-perfect UI and seamless performance.',
    features: [
      'iOS & Android Apps',
      'Cross-Platform (Flutter)',
      'Tablet Applications',
      'App Store Optimization',
      'Push Notifications & Analytics',
      'Offline-First Architecture',
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Dart'],
    accent: 'purple',
  },
  {
    icon: Server,
    title: 'Backend & Infrastructure',
    description:
      'Robust backend systems, microservices architecture, database engineering, and DevOps for enterprise-grade reliability.',
    features: [
      'Microservices Architecture',
      'Database Design & Optimization',
      'CI/CD Pipeline Setup',
      'Server & Cloud Management',
      'Performance Optimization',
      'Security & Compliance',
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Redis', 'GraphQL', 'Terraform'],
    accent: 'orange',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description:
      'Cloud migration, infrastructure design, and managed cloud services that scale with your business and reduce costs.',
    features: [
      'Cloud Migration Strategy',
      'Multi-Cloud Architecture',
      'Serverless Solutions',
      'Cost Optimization',
      'Disaster Recovery',
      'Auto-Scaling Systems',
    ],
    technologies: ['AWS', 'GCP', 'Azure', 'Vercel', 'Cloudflare', 'Supabase'],
    accent: 'cyan',
  },
  {
    icon: BarChart3,
    title: 'Data Engineering',
    description:
      'Data pipeline design, analytics infrastructure, and business intelligence solutions that turn raw data into strategic advantage.',
    features: [
      'Data Pipeline Architecture',
      'ETL & Data Warehousing',
      'Business Intelligence Dashboards',
      'Real-Time Data Streaming',
      'Data Quality & Governance',
      'Custom Analytics Platforms',
    ],
    technologies: ['Python', 'Apache Spark', 'BigQuery', 'Snowflake', 'Airflow', 'dbt'],
    accent: 'pink',
  },
];

const accentMap: Record<string, { iconBg: string; iconText: string; border: string }> = {
  emerald: { iconBg: 'bg-emerald-500/10', iconText: 'text-emerald-400', border: 'hover:border-emerald-500/20' },
  blue: { iconBg: 'bg-blue-500/10', iconText: 'text-blue-400', border: 'hover:border-blue-500/20' },
  purple: { iconBg: 'bg-purple-500/10', iconText: 'text-purple-400', border: 'hover:border-purple-500/20' },
  orange: { iconBg: 'bg-orange-500/10', iconText: 'text-orange-400', border: 'hover:border-orange-500/20' },
  cyan: { iconBg: 'bg-cyan-500/10', iconText: 'text-cyan-400', border: 'hover:border-cyan-500/20' },
  pink: { iconBg: 'bg-pink-500/10', iconText: 'text-pink-400', border: 'hover:border-pink-500/20' },
};

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We analyze your requirements, goals, and technical landscape.' },
  { num: '02', title: 'Architecture', desc: 'We design the solution, select technologies, and plan the roadmap.' },
  { num: '03', title: 'Engineering', desc: 'Agile development with weekly demos, code reviews, and QA testing.' },
  { num: '04', title: 'Delivery', desc: 'Staged deployment, monitoring setup, and ongoing support.' },
];

export default function ServicesPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link href="/" className="hover:text-white/50 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-emerald-400">Services</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              What We Build
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Engineering{' '}
              <span className="gradient-text">Solutions</span>
              <br />That Scale
            </h1>
            <p className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed">
              From AI-powered automation to cloud-native platforms &mdash; we offer
              end-to-end engineering services that help businesses build, launch,
              and grow their technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const colors = accentMap[service.accent];
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`group p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] ${colors.border} transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.iconBg} mb-6`}>
                    <service.icon size={22} className={colors.iconText} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed mb-6">{service.description}</p>

                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5">
                        <Check size={13} className="text-emerald-400/50 flex-shrink-0" />
                        <span className="text-xs text-white/40">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.04]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-emerald-400 transition-colors group/link"
                  >
                    Get Started
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-white/[0.04]">
        <div ref={processRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our <span className="gradient-text">Process</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02]"
              >
                <span className="text-3xl font-bold text-white/[0.04] font-mono">{step.num}</span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-white/30">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-divider max-w-xs mx-auto mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Build
              <br />
              <span className="gradient-text">Something Great?</span>
            </h2>
            <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
              Tell us about your project and get a free consultation with our engineering team.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="glow-button px-10 py-4 font-semibold rounded-full inline-flex items-center gap-2 group text-lg"
              >
                Start Your Project
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
