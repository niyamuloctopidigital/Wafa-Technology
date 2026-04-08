'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Brain, Code2, Smartphone, Server, Cloud, BarChart3 } from 'lucide-react';

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
    else if (pathname?.startsWith('/blog')) setActiveLink('blog');
    else if (pathname?.startsWith('/about')) setActiveLink('about');
    else if (pathname?.startsWith('/contact')) setActiveLink('contact');
    else setActiveLink('home');
  }, [pathname]);

  const navLinks = [
    { name: 'Services', id: 'services', href: '/services' },
    { name: 'Projects', id: 'projects', href: '/projects' },
    { name: 'Team', id: 'team', href: '/team' },
    { name: 'Blog', id: 'blog', href: '/blog' },
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
              src="https://wafatechnology.com/wp-content/uploads/2025/11/Frame-1597879963.png"
              alt="Wafa Technology Logo"
              className="h-12 w-auto"
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
                        <div className="glass-card p-5 rounded-2xl border border-white/[0.08] shadow-2xl">
                          <div className="grid grid-cols-3 gap-2">
                            {services.map((service, idx) => (
                              <Link
                                key={idx}
                                href="/services"
                                className="group p-3 rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer duration-200"
                              >
                                <div className="mb-2 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                  <service.Icon size={15} className="text-emerald-400" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-medium text-sm text-white mb-0.5">
                                  {service.title}
                                </h3>
                                <p className="text-xs text-white/35 leading-relaxed">
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

          {/* Right - CTA Button */}
          <div className="hidden lg:block flex-shrink-0">
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
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[80vw] max-w-sm bg-gradient-to-b from-white/10 to-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-24 px-6 flex-1 flex flex-col gap-6">
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
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-white font-display text-3xl text-left hover:text-green-400 transition-colors font-bold"
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-6 pb-8"
              >
                <motion.button
                  className="glow-button w-full py-3 font-medium rounded-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Call
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
