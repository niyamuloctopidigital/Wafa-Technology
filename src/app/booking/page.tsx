'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Globe } from 'lucide-react';

export default function BookingPage() {
  const [calendarLink, setCalendarLink] = useState('');
  const [calendarEmbedCode, setCalendarEmbedCode] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) return;
        const data = await res.json();
        setCalendarLink(data.calendarLink || process.env.NEXT_PUBLIC_CALENDLY_URL || '');
        setCalendarEmbedCode(data.calendarEmbedCode || '');
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/50 transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Contact
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              Schedule a Meeting
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Book a{' '}
              <span className="gradient-text">Free Consultation</span>
            </h1>
            <p className="mt-4 text-white/40 max-w-xl mx-auto text-lg">
              Choose a time that works for you. Our engineering team will discuss
              your project requirements and propose a tailored solution.
            </p>

            {/* Info badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { icon: Clock, text: '30 minutes' },
                { icon: Calendar, text: 'No commitment' },
                { icon: Globe, text: 'Any timezone' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm text-white/40"
                >
                  <item.icon size={14} className="text-emerald-400/50" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar embed */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {calendarEmbedCode ? (
              <div
                className="booking-embed-container"
                dangerouslySetInnerHTML={{ __html: calendarEmbedCode.replace(
                  /style="[^"]*"/g,
                  'style="width:100%;min-height:800px;height:100vh;border:none;overflow:visible;"'
                ) }}
              />
            ) : calendarLink ? (
              <iframe
                src={calendarLink}
                width="100%"
                frameBorder="0"
                className="w-full"
                style={{ minHeight: '800px', height: '100vh', border: 'none' }}
                title="Book a consultation"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                  <Calendar size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Calendar Coming Soon</h3>
                <p className="text-white/30 text-sm mb-6 text-center max-w-sm">
                  Our booking calendar is being set up. In the meantime, please reach out directly.
                </p>
                <Link
                  href="/contact"
                  className="glow-button px-8 py-3 font-semibold rounded-full inline-flex items-center gap-2"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
