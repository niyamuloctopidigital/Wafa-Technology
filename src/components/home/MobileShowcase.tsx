'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Monitor,
  Smartphone,
  Tablet,
  Star,
  TrendingUp,
  Wifi,
  Battery,
  Signal,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';

type Platform = 'web' | 'mobile' | 'tablet';

const platforms: { id: Platform; label: string; Icon: typeof Monitor }[] = [
  { id: 'web', label: 'Web Apps', Icon: Monitor },
  { id: 'mobile', label: 'Mobile Apps', Icon: Smartphone },
  { id: 'tablet', label: 'Tablet Apps', Icon: Tablet },
];

const platformData: Record<Platform, {
  title: string;
  subtitle: string;
  description: string;
  screens: { label: string; accent: string }[];
  techStack: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
}> = {
  web: {
    title: 'Enterprise Dashboard',
    subtitle: 'analytics.wafa.io',
    description: 'Responsive web applications built with modern frameworks, optimized for speed and scalability across all browsers.',
    screens: [
      { label: 'Revenue Analytics', accent: 'bg-emerald-500/15' },
      { label: 'Team Performance', accent: 'bg-blue-500/15' },
      { label: 'AI Predictions', accent: 'bg-purple-500/15' },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    stats: [
      { label: 'Load Time', value: '0.8s' },
      { label: 'Lighthouse', value: '98' },
      { label: 'Uptime', value: '99.9%' },
    ],
    highlights: ['SEO Optimized', 'PWA Support', 'Real-Time Data'],
  },
  mobile: {
    title: 'FinanceFlow',
    subtitle: 'iOS & Android Application',
    description: 'Native and cross-platform mobile apps with beautiful interfaces, smooth animations, and offline-first architecture.',
    screens: [
      { label: 'Portfolio Overview', accent: 'bg-emerald-500/15' },
      { label: 'Smart Transfers', accent: 'bg-blue-500/15' },
      { label: 'AI Insights', accent: 'bg-purple-500/15' },
    ],
    techStack: ['Flutter', 'Swift', 'Kotlin', 'Firebase'],
    stats: [
      { label: 'Rating', value: '4.9' },
      { label: 'Downloads', value: '50K+' },
      { label: 'Retention', value: '68%' },
    ],
    highlights: ['Biometric Auth', 'Push Notifications', 'Offline Mode'],
  },
  tablet: {
    title: 'MediSync Pro',
    subtitle: 'Healthcare Management Suite',
    description: 'Tablet-optimized applications with split-view layouts, stylus support, and large-screen UI patterns.',
    screens: [
      { label: 'Patient Dashboard', accent: 'bg-emerald-500/15' },
      { label: 'Scheduling', accent: 'bg-blue-500/15' },
      { label: 'Records & Reports', accent: 'bg-purple-500/15' },
    ],
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'HIPAA'],
    stats: [
      { label: 'Hospitals', value: '120+' },
      { label: 'Patients', value: '1M+' },
      { label: 'Compliance', value: '100%' },
    ],
    highlights: ['Split View', 'HIPAA Compliant', 'Stylus Support'],
  },
};

/* ─── Browser Mockup ─── */
function BrowserMockup({ data }: { data: typeof platformData.web }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[520px] mx-auto"
    >
      <div className="relative">
        <div className="absolute -inset-8 rounded-3xl bg-emerald-500/[0.04] blur-2xl" />
        <div className="relative rounded-xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white/[0.04] rounded-md px-3 py-1.5 flex items-center gap-2">
                <Shield size={10} className="text-emerald-400/50" />
                <span className="text-[11px] text-white/30 font-mono">{data.subtitle}</span>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-white">{data.title}</div>
                <div className="text-[10px] text-white/25 mt-0.5">Real-time overview</div>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </div>
            <div className="h-28 rounded-lg bg-white/[0.03] border border-white/[0.04] mb-4 p-3 flex items-end gap-1.5">
              {[40, 55, 35, 70, 50, 80, 65, 90, 75, 85, 60, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/40 to-emerald-400/5"
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {data.screens.map((screen, i) => (
                <motion.div
                  key={screen.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`p-3 rounded-lg ${screen.accent} border border-white/[0.04]`}
                >
                  <div className="w-5 h-5 rounded bg-white/[0.06] mb-2" />
                  <div className="text-[9px] text-white/50 font-medium">{screen.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Phone Mockup ─── */
function PhoneMockup({ data }: { data: typeof platformData.mobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="flex justify-center items-end gap-5"
    >
      {/* Main phone (iOS) */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-[40px] bg-emerald-500/[0.05] blur-2xl" />
        <div className="relative w-[250px] rounded-[32px] border border-white/[0.1] bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-black/60">
          <div className="flex items-center justify-between px-5 pt-3.5 pb-1">
            <span className="text-[10px] text-white/40 font-medium">9:41</span>
            <div className="w-24 h-[22px] rounded-full bg-black" />
            <div className="flex items-center gap-1">
              <Signal size={10} className="text-white/40" />
              <Wifi size={10} className="text-white/40" />
              <Battery size={10} className="text-white/40" />
            </div>
          </div>
          <div className="px-4 pb-5 pt-3">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[15px] font-bold text-white">FinanceFlow</div>
                <div className="text-[10px] text-emerald-400/60 mt-0.5">Portfolio</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/25 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-emerald-400">JR</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 border border-emerald-500/15 mb-5"
            >
              <div className="text-[10px] text-white/30 mb-1">Total Balance</div>
              <div className="text-2xl font-bold text-white tracking-tight">$124,580</div>
              <div className="flex items-center gap-1 mt-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15">
                  <TrendingUp size={10} className="text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">+12.4%</span>
                </div>
                <span className="text-[9px] text-white/20">this month</span>
              </div>
            </motion.div>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {['Send', 'Receive', 'Invest', 'More'].map((action, i) => (
                <motion.div
                  key={action}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.04]"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/10" />
                  <span className="text-[8px] text-white/40">{action}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2.5">
              {data.screens.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.03]"
                >
                  <div className={`w-9 h-9 rounded-lg ${item.accent} flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="text-[10px] text-white/60 font-medium">{item.label}</div>
                    <div className="text-[9px] text-white/20">Updated just now</div>
                  </div>
                  <ArrowRight size={10} className="text-white/10" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center pb-2.5">
            <div className="w-28 h-1 rounded-full bg-white/15" />
          </div>
        </div>
      </div>

      {/* Second phone (Android) - slightly behind and smaller */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block relative -ml-8 mb-6"
      >
        <div className="w-[200px] rounded-[28px] border border-white/[0.06] bg-[#0a0a0a] overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <span className="text-[9px] text-white/30 font-medium">9:41</span>
            <div className="w-16 h-[16px] rounded-full bg-black" />
            <div className="flex items-center gap-1">
              <Signal size={8} className="text-white/30" />
              <Wifi size={8} className="text-white/30" />
            </div>
          </div>
          <div className="px-3.5 pb-4 pt-2">
            <div className="text-[11px] font-bold text-white/60 mb-3">Markets</div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/15 to-purple-500/10 border border-blue-500/10 mb-3">
              <div className="text-[9px] text-white/25 mb-1">Portfolio Value</div>
              <div className="text-lg font-bold text-white/70">$89,240</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={8} className="text-emerald-400/60" />
                <span className="text-[9px] text-emerald-400/60">+8.7%</span>
              </div>
            </div>
            {['Watchlist', 'Recent Trades', 'Alerts'].map((item, i) => (
              <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] mb-1.5">
                <div className="w-6 h-6 rounded bg-white/[0.04]" />
                <span className="text-[8px] text-white/30">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center pb-2">
            <div className="w-20 h-0.5 rounded-full bg-white/10" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Tablet Mockup ─── */
function TabletMockup({ data }: { data: typeof platformData.tablet }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[500px] mx-auto"
    >
      <div className="relative">
        <div className="absolute -inset-6 rounded-3xl bg-blue-500/[0.03] blur-2xl" />
        <div className="relative rounded-[20px] border border-white/[0.08] bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between px-6 pt-3 pb-1">
            <span className="text-[10px] text-white/40 font-medium">9:41 AM</span>
            <div className="w-16 h-[14px] rounded-full bg-black" />
            <div className="flex items-center gap-1.5">
              <Signal size={10} className="text-white/40" />
              <Wifi size={10} className="text-white/40" />
              <Battery size={10} className="text-white/40" />
            </div>
          </div>
          <div className="flex">
            <div className="w-[140px] border-r border-white/[0.04] p-3 space-y-2">
              <div className="text-[10px] font-bold text-white mb-3">{data.title}</div>
              {['Dashboard', 'Patients', 'Schedule', 'Records', 'Reports', 'Settings'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[9px] ${
                    i === 0 ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'text-white/30'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded ${i === 0 ? 'bg-emerald-500/20' : 'bg-white/[0.06]'}`} />
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] font-semibold text-white">Patient Dashboard</div>
                  <div className="text-[9px] text-white/25">Today&apos;s Overview</div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-[9px] text-emerald-400 font-medium">12 Active</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {data.screens.map((screen, i) => (
                  <motion.div
                    key={screen.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`p-2.5 rounded-lg ${screen.accent} border border-white/[0.04]`}
                  >
                    <div className="text-[9px] text-white/50 font-medium">{screen.label}</div>
                    <div className="text-sm font-bold text-white mt-1">{i === 0 ? '847' : i === 1 ? '24' : '156'}</div>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-lg border border-white/[0.04] overflow-hidden">
                <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/[0.04]">
                  {['Patient', 'Status', 'Next Visit', 'Doctor'].map((h) => (
                    <div key={h} className="text-[8px] text-white/25 font-medium">{h}</div>
                  ))}
                </div>
                {[1, 2, 3, 4].map((row, i) => (
                  <motion.div key={row} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.08 }} className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-white/[0.02]">
                    <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-white/[0.06]" /><div className="w-12 h-2 rounded bg-white/[0.06]" /></div>
                    <div className={`w-10 h-4 rounded-full ${i < 2 ? 'bg-emerald-500/10' : 'bg-yellow-500/10'}`} />
                    <div className="w-14 h-2 rounded bg-white/[0.04]" />
                    <div className="w-10 h-2 rounded bg-white/[0.04]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-2 pt-1"><div className="w-28 h-1 rounded-full bg-white/10" /></div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function MobileShowcase() {
  const [activePlatform, setActivePlatform] = useState<Platform>('web');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  useEffect(() => {
    if (!isAutoPlaying || !inView) return;
    const timer = setInterval(() => {
      setActivePlatform((prev) => {
        const order: Platform[] = ['web', 'mobile', 'tablet'];
        return order[(order.indexOf(prev) + 1) % order.length];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, inView]);

  const activeData = platformData[activePlatform];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.02] blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
            Cross-Platform Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Every Screen,{' '}
            <span className="gradient-text">One Experience</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            We build applications that work flawlessly across web, mobile, and tablet &mdash;
            delivering consistent, high-performance experiences on every device.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => { setActivePlatform(platform.id); setIsAutoPlaying(false); }}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activePlatform === platform.id ? 'text-emerald-400' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {activePlatform === platform.id && (
                  <motion.div
                    layoutId="platformTab"
                    className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <platform.Icon size={16} className="relative z-10" />
                <span className="relative z-10">{platform.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2">{activeData.title}</h3>
                <p className="text-sm text-white/30 mb-4">{activeData.subtitle}</p>
                <p className="text-white/40 leading-relaxed mb-8">{activeData.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeData.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/[0.06] border border-emerald-500/10 text-xs text-emerald-400/70">
                      <Zap size={10} />
                      {h}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mb-8">
                  <div className="text-xs text-white/20 uppercase tracking-widest mb-3">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {activeData.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.06]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Store badges (only for mobile) */}
                {activePlatform === 'mobile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3 mb-8"
                  >
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/50">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83" fill="currentColor"/>
                        <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" fill="currentColor"/>
                      </svg>
                      <div>
                        <div className="text-[9px] text-white/25 leading-none">Download on the</div>
                        <div className="text-sm text-white/70 font-semibold leading-tight">App Store</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer">
                      <svg width="18" height="20" viewBox="0 0 20 22" fill="none" className="text-white/50">
                        <path d="M1 1.35L11.65 11 1 20.65V1.35zM14.19 8.47L3.76.6l-.01-.01L14.19 8.47zm.71.42l-2.92 1.69L14.9 13l3.74-2.15-3.74-2.16v.2zm-2.92 4.54L1.54 21.31l.22.1 10.22-5.86v-.12z" fill="currentColor"/>
                      </svg>
                      <div>
                        <div className="text-[9px] text-white/25 leading-none">Get it on</div>
                        <div className="text-sm text-white/70 font-semibold leading-tight">Google Play</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.04]">
                  {activeData.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-[11px] text-white/25 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right - Device mockup */}
          <div className="order-1 lg:order-2 min-h-[480px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activePlatform === 'web' && <BrowserMockup key="web" data={platformData.web} />}
              {activePlatform === 'mobile' && <PhoneMockup key="mobile" data={platformData.mobile} />}
              {activePlatform === 'tablet' && <TabletMockup key="tablet" data={platformData.tablet} />}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center mt-12 gap-2">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => { setActivePlatform(p.id); setIsAutoPlaying(false); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activePlatform === p.id ? 'w-10 bg-emerald-400/60' : 'w-3 bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
