'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Enterprise AI Analytics Platform',
    category: 'AI & Automation',
    description: 'ML-powered analytics platform processing 10M+ events daily with predictive insights and real-time dashboards.',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/10',
    result: '300% efficiency increase',
  },
  {
    id: 2,
    title: 'Cross-Platform Fintech App',
    category: 'Mobile Apps',
    description: 'iOS & Android financial management app with real-time portfolio tracking, AI-driven insights, and secure transactions.',
    technologies: ['Flutter', 'Firebase', 'Node.js', 'Stripe'],
    gradient: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/10',
    result: '50K+ downloads in Q1',
  },
  {
    id: 3,
    title: 'Healthcare SaaS Platform',
    category: 'Software',
    description: 'HIPAA-compliant patient management system with telemedicine, scheduling, and electronic health records.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    gradient: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/10',
    result: '120+ hospitals onboarded',
  },
  {
    id: 4,
    title: 'E-Commerce Marketplace',
    category: 'Software',
    description: 'Multi-vendor marketplace with AI-powered recommendations, real-time inventory, and integrated payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Stripe'],
    gradient: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/10',
    result: '$2M+ monthly transactions',
  },
  {
    id: 5,
    title: 'Logistics Fleet Management',
    category: 'Mobile Apps',
    description: 'Real-time fleet tracking with route optimization AI, driver management, and automated dispatch system.',
    technologies: ['React Native', 'Python', 'Google Maps', 'AWS'],
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/10',
    result: '40% fuel cost reduction',
  },
  {
    id: 6,
    title: 'Intelligent Process Automation',
    category: 'AI & Automation',
    description: 'End-to-end workflow automation for a manufacturing company, integrating IoT sensors with ML-based quality control.',
    technologies: ['Python', 'n8n', 'OpenAI', 'Docker', 'MQTT'],
    gradient: 'from-pink-500/20 to-pink-600/5',
    border: 'border-pink-500/10',
    result: '40+ hours saved weekly',
  },
  {
    id: 7,
    title: 'Cloud Migration & DevOps',
    category: 'Infrastructure',
    description: 'Migrated legacy on-premise infrastructure to AWS with zero downtime, achieving 99.99% uptime and 60% cost reduction.',
    technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD'],
    gradient: 'from-yellow-500/20 to-yellow-600/5',
    border: 'border-yellow-500/10',
    result: '60% infrastructure cost saved',
  },
  {
    id: 8,
    title: 'Real-Time Collaboration Tool',
    category: 'Software',
    description: 'Slack-alternative workspace app with video conferencing, real-time document editing, and AI meeting summaries.',
    technologies: ['Next.js', 'WebRTC', 'WebSocket', 'OpenAI', 'Redis'],
    gradient: 'from-indigo-500/20 to-indigo-600/5',
    border: 'border-indigo-500/10',
    result: '15K+ daily active users',
  },
  {
    id: 9,
    title: 'EdTech Learning Platform',
    category: 'Mobile Apps',
    description: 'Adaptive learning platform with AI-personalized curricula, live classes, and progress analytics for K-12 students.',
    technologies: ['Flutter', 'Firebase', 'Python', 'TensorFlow'],
    gradient: 'from-teal-500/20 to-teal-600/5',
    border: 'border-teal-500/10',
    result: '200K+ students enrolled',
  },
];

const categories = ['All', 'AI & Automation', 'Software', 'Mobile Apps', 'Infrastructure'];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link href="/" className="hover:text-white/50 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-emerald-400">Projects</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Projects That{' '}
              <span className="gradient-text">Deliver</span>
              <br />Results
            </h1>
            <p className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed">
              Real solutions for real businesses. Explore how we&apos;ve helped companies
              across industries build technology that drives measurable impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-[70px] z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'text-emerald-400'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="projectFilter"
                    className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div
                    className={`h-full p-6 rounded-2xl border ${project.border} bg-gradient-to-b ${project.gradient} hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1 flex flex-col`}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-medium text-white/40 bg-white/[0.06] border border-white/[0.04]">
                        {project.category}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-white/15 group-hover:text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/30 leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-emerald-400/80 font-medium">{project.result}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono text-white/25 bg-white/[0.03] border border-white/[0.03]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Have a Project in
              <br />
              <span className="gradient-text">Mind?</span>
            </h2>
            <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
              Let&apos;s discuss how we can build something impactful together.
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
