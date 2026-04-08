'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GitBranch, Check, Clock, Activity } from 'lucide-react';

const terminalOutput = [
  { type: 'command', text: '$ wafa deploy --env production' },
  { type: 'info', text: 'Compiling TypeScript...' },
  { type: 'info', text: 'Running 847 tests...' },
  { type: 'success', text: 'All tests passed (847/847)' },
  { type: 'info', text: 'Building Docker containers...' },
  { type: 'info', text: 'Pushing to registry...' },
  { type: 'success', text: 'Deployed to 3 regions in 42s' },
  { type: 'success', text: 'Health checks: ALL PASSING' },
  { type: 'command', text: '$ _' },
];

const metrics = [
  { icon: GitBranch, label: 'Deployments', value: '2,847', change: '+12%' },
  { icon: Check, label: 'Test Coverage', value: '98.2%', change: '+3.1%' },
  { icon: Clock, label: 'Avg. Deploy Time', value: '42s', change: '-18%' },
  { icon: Activity, label: 'Uptime', value: '99.99%', change: 'stable' },
];

export default function CodeShowcase() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background grid accent */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(rgba(74,222,128,0.8) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-emerald-500/[0.02] blur-2xl" />
              <div className="relative rounded-xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                  </div>
                  <span className="text-xs text-white/25 font-mono ml-2">terminal</span>
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-sm space-y-1">
                  {terminalOutput.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      className={`${
                        line.type === 'command'
                          ? 'text-white/70'
                          : line.type === 'success'
                          ? 'text-emerald-400/80'
                          : 'text-white/30'
                      }`}
                    >
                      {line.type === 'success' && (
                        <span className="text-emerald-400 mr-1">&#10003;</span>
                      )}
                      {line.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.02]"
                >
                  <metric.icon size={14} className="text-white/20 mb-2" />
                  <div className="text-sm font-semibold text-white">{metric.value}</div>
                  <div className="text-[10px] text-white/25 mt-0.5">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              Engineering Excellence
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Built for{' '}
              <span className="gradient-text">Production</span>
            </h2>

            <p className="mt-6 text-white/40 text-lg leading-relaxed">
              Every line of code we write is production-ready. Automated testing,
              continuous deployment, and real-time monitoring ensure your software
              runs flawlessly at any scale.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  title: 'Automated CI/CD Pipelines',
                  desc: 'Zero-downtime deployments with rollback capability and multi-region distribution.',
                },
                {
                  title: 'Comprehensive Test Coverage',
                  desc: 'Unit, integration, and end-to-end testing with 98%+ coverage targets.',
                },
                {
                  title: 'Real-Time Observability',
                  desc: 'Full-stack monitoring, alerting, and performance optimization from day one.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="flex gap-4"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-white/30 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
