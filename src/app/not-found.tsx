'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-[150px] sm:text-[200px] font-bold font-display gradient-text leading-none"
        >
          404
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4">
          Page Not Found
        </h1>

        <p className="text-dark-800 text-lg max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="glow-button inline-flex items-center justify-center gap-2"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="outline-button inline-flex items-center justify-center gap-2"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
