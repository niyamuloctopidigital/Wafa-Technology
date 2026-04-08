'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import CountUp from 'react-countup';
import {
  ArrowRight,
  Brain,
  Code2,
  Globe,
  Shield,
  Zap,
  Users,
  Target,
  Lightbulb,
  Award,
  MapPin,
} from 'lucide-react';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Enterprise Clients' },
  { value: 15, suffix: '+', label: 'Engineers' },
  { value: 5, suffix: '+', label: 'Years of Innovation' },
];

const values = [
  {
    icon: Brain,
    title: 'AI-First Thinking',
    description: 'We approach every challenge with intelligent solutions, embedding AI as a core architectural decision.',
  },
  {
    icon: Award,
    title: 'Engineering Excellence',
    description: 'Production-ready code with 98%+ test coverage, automated deployments, and enterprise-grade reliability.',
  },
  {
    icon: Users,
    title: 'Dedicated Partnership',
    description: 'Senior engineers assigned full-time to your project. No outsourcing, no context switching.',
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    description: 'Agile sprints with continuous delivery. Your product evolves at the speed of your market.',
  },
  {
    icon: Shield,
    title: 'Security by Default',
    description: 'SOC 2 compliant processes, encrypted pipelines, and security-first development practices.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Distributed teams across time zones delivering around the clock for clients worldwide.',
  },
];

const milestones = [
  {
    year: '2019',
    title: 'Founded',
    description: 'Wafa Technology launched with a mission to bring enterprise-grade engineering to businesses of all sizes.',
  },
  {
    year: '2020',
    title: 'AI Division',
    description: 'Opened a dedicated AI & automation practice, delivering ML pipelines and intelligent process automation.',
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'Extended operations to serve clients across North America, Europe, and Asia-Pacific.',
  },
  {
    year: '2023',
    title: 'Mobile Studio',
    description: 'Launched cross-platform mobile development practice with Flutter and React Native.',
  },
  {
    year: '2024',
    title: '50th Project',
    description: 'Crossed 50 successful project deliveries with a 100% client retention rate.',
  },
  {
    year: '2025',
    title: 'Scale Up',
    description: 'Growing the team and expanding into new verticals including healthcare and fintech.',
  },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'Flutter', 'AWS', 'GCP', 'Docker', 'Kubernetes',
  'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'TensorFlow',
];

export default function AboutPage() {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: timelineRef, inView: timelineInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6"
            >
              About Us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              We Engineer{' '}
              <span className="gradient-text">the Future</span>{' '}
              of Software
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed"
            >
              Wafa Technology is a software engineering company specializing in
              AI automation, full-stack development, and mobile applications. We
              help businesses worldwide build intelligent, scalable technology
              that drives real results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center gap-3 text-sm text-white/25"
            >
              <MapPin size={14} className="text-emerald-400/50" />
              <span>Albuquerque, NM 87110, USA</span>
              <span className="text-white/10">|</span>
              <span>Remote teams worldwide</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="section-divider max-w-5xl mx-auto mb-16" />
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-white">
                  {statsInView ? (
                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <div className="mt-2 text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03]"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6">
                <Target size={20} className="text-emerald-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/40 leading-relaxed">
                To deliver exceptional technology solutions that empower businesses
                to innovate, scale, and achieve their strategic goals &mdash; combining
                deep engineering expertise with AI-first thinking to create
                software that makes a measurable impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 lg:p-10 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03]"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                <Lightbulb size={20} className="text-blue-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/40 leading-relaxed">
                To be the most trusted engineering partner for businesses seeking
                to leverage AI, modern development practices, and strategic
                innovation to create meaningful, lasting impact in their industries
                and communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div ref={valuesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our <span className="gradient-text">Core Values</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-emerald-500/15 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-5">
                  <value.icon size={20} className="text-emerald-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-sm text-white/35 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div ref={timelineRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Building Since <span className="gradient-text">2019</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-white/[0.06]" />

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-[47px] h-[47px] rounded-full border border-white/[0.06] bg-[#0a0a0a] flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {milestone.year.slice(2)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <div className="text-xs text-white/20 mb-1">{milestone.year}</div>
                    <h3 className="text-lg font-semibold text-white mb-1">{milestone.title}</h3>
                    <p className="text-sm text-white/35 leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our <span className="gradient-text">Stack</span>
            </h2>
            <p className="mt-4 text-white/30 max-w-lg mx-auto">
              We use best-in-class tools and frameworks to build reliable, scalable software.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          >
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm font-mono text-white/40 hover:text-emerald-400/60 hover:border-emerald-500/15 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
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
              Ready to Work With
              <br />
              <span className="gradient-text">Our Team?</span>
            </h2>
            <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
              Tell us about your project and let&apos;s explore how we can help
              you build something exceptional.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="glow-button px-10 py-4 font-semibold rounded-full inline-flex items-center gap-2 group text-lg"
              >
                Start a Project
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="outline-button px-8 py-4 font-medium rounded-full inline-flex items-center justify-center"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
