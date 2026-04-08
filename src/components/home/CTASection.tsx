'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Divider */}
          <div className="section-divider max-w-xs mx-auto mb-16" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Build Something
            <br />
            <span className="gradient-text">Extraordinary?</span>
          </h2>

          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
            Tell us about your project. Our engineering team will assess your requirements
            and propose a tailored solution &mdash; no commitment, no cost.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="glow-button px-10 py-4 font-semibold rounded-full inline-flex items-center gap-2 group text-lg"
            >
              Start a Project
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="mailto:info@wafatechnology.com"
              className="outline-button px-8 py-4 font-medium rounded-full inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Schedule a Call
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xs text-white/20"
          >
            Free consultation &middot; No commitment &middot; Response within 24 hours
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
