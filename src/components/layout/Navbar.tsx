'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Brain, Code2, Smartphone, Server, Cloud, BarChart3, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const services = [
  {
    title: 'AI & Automation',
    description: 'ML pipelines, chatbots, and process automation',
    Icon: Brain,
  },
  {
    title: 'Software Development',
    description: 'Full-stack web apps, SaaS, and APIs',
    Icon: Code2,
  },
  {
    title: 'Mobile Development',
    description: 'iOS, Android, and cross-platform apps',
    Icon: Smartphone,
  },
  {
    title: 'Backend & Infrastructure',
    description: 'Microservices, DevOps, and databases',
    Icon: Server,
  },
  {
    title: 'Cloud Architecture',
    description: 'Migration, scaling, and managed cloud',
    Icon: Cloud,
  },
  {
    title: 'Data Engineering',
    description: 'Pipelines, analytics, and BI dashboards',
    Icon: BarChart3,
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname?.startsWith('/team')) setActiveLink('team');
    else if (pathname?.startsWith('/services')) setActiveLink('services');
    else if (pathname?.startsWith('/projects')) setActiveLink('projects');
    else if (pathname?.startsWith('/about')) setActiveLink('about');
    else if (pathname?.startsWith('/contact')) setActiveLink('contact');
    else setActiveLink('home');
  }, [pathname]);

  const navLinks = [
    { name: 'Services', id: 'services', href: '/services' },
    { name: 'Projects', id: 'projects', href: '/projects' },
    { name: 'Team', id: 'team', href: '/team' },
    { name: 'About', id: 'about', href: '/about' },
    { name: 'Contact', id: 'contact', href: '/contact' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-card backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
        style={{ height: '70px', overflow: 'visible' }}
      >
        <div className="max-container h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex-shrink-0">
            <img
              src="https://assets.cdn.filesafe.space/j53xn6YJHwIdPImV00rn/media/69d764e6ebf1a6084361a27e.webp"
              alt="Wafa Technology Logo"
              className="h-9 w-auto"
              style={{ imageRendering: 'auto' }}
            />
          </Link>

          {/* Center Nav - Desktop Only */}
          <div className="hidden lg:flex">
            <motion.div className="glass-card px-2 py-2 flex items-center gap-1 rounded-full">
              {navLinks.map((link) => (
                <motion.div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() =>
                    link.id === 'services' && setIsServicesOpen(true)
                  }
                  onMouseLeave={() =>
                    link.id === 'services' && setIsServicesOpen(false)
                  }
                >
                  <Link
                    href={link.href || '#'}
                    className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                      activeLink === link.id
                        ? 'text-green-400'
                        : 'text-white/70 hover:text-white'
                    }`}
                    onClick={() => setActiveLink(link.id)}
                  >
                    {link.name}
                    {activeLink === link.id && (
                      <motion.div
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-green-400"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      />
                    )}
                  </Link>

                  {/* Services Mega Dropdown */}
                  <AnimatePresence>
                    {link.id === 'services' && isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[680px]"
                      >
                        <div className="services-dropdown p-5 rounded-2xl shadow-2xl" style={{
                          background: 'var(--dropdown-bg)',
                          border: '1px solid var(--dropdown-border)',
                          backdropFilter: 'blur(20px)',
                        }}>
                          <div className="grid grid-cols-3 gap-2">
                            {services.map((service, idx) => (
                              <Link
                                key={idx}
                                href="/services"
                                className="group p-3 rounded-xl transition-all cursor-pointer duration-200"
                                style={{ ['--hover-bg' as string]: 'var(--dropdown-hover)' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--dropdown-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                <div className="mb-2 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                  <service.Icon size={15} className="text-emerald-400" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-medium text-sm mb-0.5" style={{ color: 'var(--dropdown-title)' }}>
                                  {service.title}
                                </h3>
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--dropdown-desc)' }}>
                                  {service.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Theme Toggle + CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="theme-toggle-btn relative w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="glow-button px-6 py-2 font-medium rounded-lg flex items-center gap-2"
              >
                Book a Call
                <span className="inline-block">→</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden text-white/70 hover:text-white transition-colors p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - opens from RIGHT */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: theme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.7)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu-panel absolute right-0 top-0 bottom-0 w-[80vw] max-w-sm flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end pt-6 px-6">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-menu-close w-10 h-10 rounded-full flex items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="pt-8 px-6 flex-1 flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.id}
                    href={link.href || '#'}
                    onClick={() => {
                      setActiveLink(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`mobile-menu-link font-display text-2xl text-right font-bold py-2 border-b mobile-menu-border ${
                        activeLink === link.id ? 'text-emerald-500' : ''
                      }`}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-6 pb-8"
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    className="glow-button w-full py-3 font-medium rounded-lg text-center"
                    whileTap={{ scale: 0.95 }}
                  >
                    Book a Call
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
