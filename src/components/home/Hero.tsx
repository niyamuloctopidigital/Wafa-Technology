'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Terminal, Braces, Server, Smartphone, Cloud, Shield } from 'lucide-react';

const codeBlock = [
  '  const pipeline = await AI.deploy({',
  '    model: "wafa-enterprise-v3",',
  '    scaling: "auto",',
  '    regions: ["us-east", "eu-west", "ap-south"],',
  '    monitoring: true,',
  '    fallback: { strategy: "graceful" }',
  '  });',
  '',
  '  const result = await pipeline.process({',
  '    input: customerData,',
  '    transform: ["normalize", "enrich", "predict"],',
  '    output: { format: "structured", validate: true }',
  '  });',
  '',
  '  console.log(`Deployed in ${result.latency}ms`);',
];

function TypewriterCode() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= codeBlock.length) return;

    const line = codeBlock[currentLine];
    if (currentChar >= line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 80);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentChar((c) => c + 1);
    }, 25 + Math.random() * 20);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar]);

  const syntaxHighlight = (line: string) => {
    return line
      .replace(/(const|await|return|true|false)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(".*?")/g, '<span class="text-emerald-400">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-white/30">$1</span>')
      .replace(/(\d+)/g, '<span class="text-orange-300">$1</span>')
      .replace(/(console\.log|\.deploy|\.process)/g, '<span class="text-yellow-300">$1</span>')
      .replace(/(pipeline|result|customerData)/g, '<span class="text-blue-300">$1</span>');
  };

  return (
    <div className="font-mono text-[13px] leading-relaxed">
      {displayedLines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-8 text-right mr-4 text-white/20 select-none text-xs">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }} />
        </div>
      ))}
      {currentLine < codeBlock.length && (
        <div className="flex">
          <span className="w-8 text-right mr-4 text-white/20 select-none text-xs">
            {displayedLines.length + 1}
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(codeBlock[currentLine].slice(0, currentChar)),
            }}
          />
          <span className="animate-pulse text-emerald-400 ml-px">|</span>
        </div>
      )}
      {currentLine >= codeBlock.length && (
        <div className="flex items-center mt-2">
          <span className="w-8 text-right mr-4 text-white/20 select-none text-xs">{'>'}</span>
          <span className="text-emerald-400/80 text-xs">Build successful &mdash; deployed to 3 regions</span>
        </div>
      )}
    </div>
  );
}

const floatingIcons = [
  { Icon: Braces, x: '10%', y: '20%', delay: 0 },
  { Icon: Server, x: '85%', y: '15%', delay: 0.5 },
  { Icon: Smartphone, x: '75%', y: '75%', delay: 1 },
  { Icon: Cloud, x: '15%', y: '70%', delay: 1.5 },
  { Icon: Shield, x: '90%', y: '50%', delay: 2 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-[70px]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, x, y: posY, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          style={{ left: x, top: posY }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.06, 0.12, 0.06],
            y: [0, -15, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay }}
        >
          <Icon size={28} className="text-emerald-400" strokeWidth={1} />
        </motion.div>
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400 font-medium">
                  Engineering the Future
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="text-white">We Architect</span>
                <br />
                <span className="gradient-text">Intelligent</span>
                <br />
                <span className="text-white">Software</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-6 text-lg text-white/50 max-w-lg leading-relaxed"
              >
                From AI-powered automation to scalable cloud platforms, mobile
                applications to enterprise backends &mdash; we engineer software that
                transforms how businesses operate worldwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contact"
                  className="glow-button px-8 py-3.5 font-semibold rounded-full inline-flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/services"
                  className="outline-button px-8 py-3.5 font-medium rounded-full inline-flex items-center justify-center"
                >
                  Explore Services
                </Link>
              </motion.div>

              {/* Tech badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                <span className="text-xs text-white/25 uppercase tracking-widest">
                  Powered by
                </span>
                {['React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Flutter'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="text-sm text-white/30 font-mono hover:text-emerald-400/60 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            {/* Right - Code Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-emerald-500/[0.03] blur-xl" />
                <div className="relative rounded-xl border border-white/[0.06] bg-[#0c0c0c] overflow-hidden shadow-2xl">
                  {/* Title bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-white/20" />
                      <span className="text-xs text-white/30 font-mono">deploy.ts</span>
                    </div>
                    <div className="w-16" />
                  </div>

                  {/* Code */}
                  <div className="p-5 min-h-[340px]">
                    <TypewriterCode />
                  </div>

                  {/* Status bar */}
                  <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Ready
                      </span>
                      <span className="text-xs text-white/20">TypeScript</span>
                    </div>
                    <span className="text-xs text-white/20 font-mono">UTF-8</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-emerald-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
