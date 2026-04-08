'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Monitor,
  Smartphone,
  Tablet,
  Star,
  Download,
  TrendingUp,
  Wifi,
  Battery,
  Signal,
} from 'lucide-react';

type Platform = 'web' | 'mobile' | 'tablet';

const platforms: { id: Platform; label: string; Icon: typeof Monitor; description: string }[] = [
  { id: 'web', label: 'Web Apps', Icon: Monitor, description: 'Responsive web applications' },
  { id: 'mobile', label: 'Mobile Apps', Icon: Smartphone, description: 'iOS & Android' },
  { id: 'tablet', label: 'Tablet Apps', Icon: Tablet, description: 'iPad & Android tablets' },
];

const platformData: Record<Platform, {
  title: string;
  subtitle: string;
  screens: { label: string; accent: string }[];
  techStack: string[];
  stats: { label: string; value: string }[];
}> = {
  web: {
    title: 'Enterprise Dashboard',
    subtitle: 'analytics.wafa.io',
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
  },
  mobile: {
    title: 'FinanceFlow',
    subtitle: 'Available on App Store & Google Play',
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
  },
  tablet: {
    title: 'MediSync Pro',
    subtitle: 'Healthcare Management Suite',
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
  },
};

function BrowserMockup({ data }: { data: typeof platformData.web }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[520px] mx-auto"
    >
      <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/30" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white/[0.04] rounded-md px-3 py-1.5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-emerald-400/30 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] text-white/30 font-mono">{data.subtitle}</span>
            </div>
          </div>
        </div>

        {/* Browser content */}
        <div className="p-5">
          {/* Top bar mockup */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white">{data.title}</div>
              <div className="text-[10px] text-white/25 mt-0.5">Real-time overview</div>
            </div>
            <div className="flex gap-2">
              <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-[10px] text-emerald-400 font-medium">Live</div>
            </div>
          </div>

          {/* Chart area mockup */}
          <div className="h-28 rounded-lg bg-white/[0.03] border border-white/[0.04] mb-4 p-3 flex items-end gap-1.5">
            {[40, 55, 35, 70, 50, 80, 65, 90, 75, 85, 60, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400/10"
              />
            ))}
          </div>

          {/* Panels */}
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
    </motion.div>
  );
}

function SinglePhone({
  title,
  subtitle,
  platform,
  balance,
  change,
  actions,
  items,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  platform: string;
  balance: string;
  change: string;
  actions: string[];
  items: { label: string; accent: string }[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="w-[240px] flex-shrink-0"
    >
      <div className="rounded-[28px] border border-white/[0.08] bg-[#0a0a0a] overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[10px] text-white/40 font-medium">9:41</span>
          <div className="w-20 h-[18px] rounded-full bg-black" />
          <div className="flex items-center gap-1">
            <Signal size={10} className="text-white/40" />
            <Wifi size={10} className="text-white/40" />
            <Battery size={10} className="text-white/40" />
          </div>
        </div>

        {/* App content */}
        <div className="px-4 pb-5 pt-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-bold text-white">{title}</div>
              <div className="text-[10px] text-emerald-400/60 mt-0.5">{subtitle}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/15" />
          </div>

          {/* Balance card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/15 to-blue-500/10 border border-emerald-500/10 mb-4"
          >
            <div className="text-[10px] text-white/30 mb-1">Total Balance</div>
            <div className="text-xl font-bold text-white">{balance}</div>
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp size={10} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400">{change}</span>
            </div>
          </motion.div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {actions.map((action, i) => (
              <motion.div
                key={action}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.35 + i * 0.06 }}
                className="flex flex-col items-center gap-1.5 py-2.5 rounded-lg bg-white/[0.04]"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/10" />
                <span className="text-[9px] text-white/40">{action}</span>
              </motion.div>
            ))}
          </div>

          {/* List items */}
          <div className="space-y-2">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.5 + i * 0.08 }}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.03]"
              >
                <div className={`w-8 h-8 rounded-lg ${item.accent} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-white/60 font-medium">{item.label}</div>
                  <div className="text-[9px] text-white/20">Updated just now</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-24 h-1 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Store badge */}
      <div className="flex justify-center mt-3">
        <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white/10" />
          <div>
            <div className="text-[8px] text-white/25 leading-none">{platform === 'ios' ? 'Download on' : 'Get it on'}</div>
            <div className="text-[10px] text-white/60 font-medium leading-tight">{platform === 'ios' ? 'App Store' : 'Google Play'}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneMockup({ data }: { data: typeof platformData.mobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="flex justify-center gap-6"
    >
      {/* iOS Phone */}
      <SinglePhone
        title="FinanceFlow"
        subtitle="Portfolio"
        platform="ios"
        balance="$124,580"
        change="+12.4%"
        actions={['Send', 'Receive', 'Invest']}
        items={data.screens}
        delay={0}
      />
      {/* Android Phone */}
      <div className="hidden sm:block">
        <SinglePhone
          title="FinanceFlow"
          subtitle="Markets"
          platform="android"
          balance="$89,240"
          change="+8.7%"
          actions={['Trade', 'Alerts', 'News']}
          items={[
            { label: 'Watchlist', accent: 'bg-orange-500/15' },
            { label: 'Recent Trades', accent: 'bg-cyan-500/15' },
            { label: 'Notifications', accent: 'bg-pink-500/15' },
          ]}
          delay={0.15}
        />
      </div>
    </motion.div>
  );
}

function TabletMockup({ data }: { data: typeof platformData.tablet }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[480px] mx-auto"
    >
      <div className="rounded-[20px] border border-white/[0.08] bg-[#0a0a0a] overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1">
          <span className="text-[10px] text-white/40 font-medium">9:41 AM</span>
          <div className="w-16 h-[14px] rounded-full bg-black" />
          <div className="flex items-center gap-1.5">
            <Signal size={10} className="text-white/40" />
            <Wifi size={10} className="text-white/40" />
            <Battery size={10} className="text-white/40" />
          </div>
        </div>

        {/* Tablet content - split view */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[140px] border-r border-white/[0.04] p-3 space-y-2">
            <div className="text-[10px] font-bold text-white mb-3">{data.title}</div>
            {['Dashboard', 'Patients', 'Schedule', 'Records', 'Reports', 'Settings'].map(
              (item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[9px] ${
                    i === 0
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                      : 'text-white/30 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded ${i === 0 ? 'bg-emerald-500/20' : 'bg-white/[0.06]'}`} />
                  {item}
                </motion.div>
              )
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] font-semibold text-white">Patient Dashboard</div>
                <div className="text-[9px] text-white/25">Today&apos;s Overview</div>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-[9px] text-emerald-400 font-medium">
                12 Active
              </div>
            </div>

            {/* Stats row */}
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
                  <div className="text-sm font-bold text-white mt-1">
                    {i === 0 ? '847' : i === 1 ? '24' : '156'}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Table mockup */}
            <div className="rounded-lg border border-white/[0.04] overflow-hidden">
              <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/[0.04]">
                {['Patient', 'Status', 'Next Visit', 'Doctor'].map((h) => (
                  <div key={h} className="text-[8px] text-white/25 font-medium">{h}</div>
                ))}
              </div>
              {[1, 2, 3, 4].map((row, i) => (
                <motion.div
                  key={row}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-white/[0.02]"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-white/[0.06]" />
                    <div className="w-12 h-2 rounded bg-white/[0.06]" />
                  </div>
                  <div className={`w-10 h-4 rounded-full ${i < 2 ? 'bg-emerald-500/10' : 'bg-yellow-500/10'}`} />
                  <div className="w-14 h-2 rounded bg-white/[0.04]" />
                  <div className="w-10 h-2 rounded bg-white/[0.04]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1">
          <div className="w-28 h-1 rounded-full bg-white/10" />
        </div>
      </div>
    </motion.div>
  );
}

export default function MobileShowcase() {
  const [activePlatform, setActivePlatform] = useState<Platform>('web');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  // Auto-rotate platforms
  useEffect(() => {
    if (!isAutoPlaying || !inView) return;
    const timer = setInterval(() => {
      setActivePlatform((prev) => {
        const order: Platform[] = ['web', 'mobile', 'tablet'];
        const idx = order.indexOf(prev);
        return order[(idx + 1) % order.length];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, inView]);

  const activeData = platformData[activePlatform];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
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
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => {
                  setActivePlatform(platform.id);
                  setIsAutoPlaying(false);
                }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activePlatform === platform.id
                    ? 'text-emerald-400'
                    : 'text-white/40 hover:text-white/60'
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

        {/* Device mockup + info */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{activeData.title}</h3>
                <p className="text-sm text-white/30 mb-8">{activeData.subtitle}</p>

                {/* Tech stack */}
                <div className="mb-8">
                  <div className="text-xs text-white/20 uppercase tracking-widest mb-3">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeData.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {activeData.stats.map((stat, i) => (
                    <div key={stat.label}>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-[11px] text-white/25 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Center - Device mockup */}
          <div className="lg:col-span-3 order-1 lg:order-2 min-h-[480px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activePlatform === 'web' && <BrowserMockup key="web" data={platformData.web} />}
              {activePlatform === 'mobile' && <PhoneMockup key="mobile" data={platformData.mobile} />}
              {activePlatform === 'tablet' && <TabletMockup key="tablet" data={platformData.tablet} />}
            </AnimatePresence>
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-10 gap-2">
          {platforms.map((p) => (
            <div
              key={p.id}
              className={`h-1 rounded-full transition-all duration-500 ${
                activePlatform === p.id
                  ? 'w-8 bg-emerald-400/60'
                  : 'w-2 bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
