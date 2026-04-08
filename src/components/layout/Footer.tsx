import Link from 'next/link';
import { FiLinkedin, FiTwitter, FiGithub, FiInstagram, FiFacebook } from 'react-icons/fi';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

const Footer = async () => {
  let settings = null;

  if (process.env.MONGODB_URI) {
    try {
      await dbConnect();
      settings = await Settings.findOne().lean();
    } catch (error) {
      console.error('Footer settings load error:', error);
    }
  }

  const currentYear = new Date().getFullYear();
  const email = settings?.contactEmail || 'info@wafatechnology.com';
  const phoneNumber = settings?.phoneNumber || '+13829254256';
  const phoneHref = `tel:${phoneNumber.replace(/[^+\d]/g, '')}`;
  const socialLinks = settings?.socialLinks || {};

  const social = [
    { icon: FiLinkedin, href: socialLinks.linkedin || 'https://linkedin.com/company/wafatechnology', label: 'LinkedIn' },
    { icon: FiTwitter, href: socialLinks.twitter || 'https://twitter.com/wafatechnology', label: 'Twitter' },
    { icon: FiGithub, href: socialLinks.github || 'https://github.com/wafatechnology', label: 'GitHub' },
    { icon: FiFacebook, href: socialLinks.facebook || 'https://facebook.com/wafatechnology', label: 'Facebook' },
    { icon: FiInstagram, href: socialLinks.instagram || 'https://instagram.com/wafatechnology', label: 'Instagram' },
  ].filter((item) => item.href);

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    'AI & Automation',
    'Software Development',
    'Mobile Applications',
    'Backend & Infrastructure',
    'Cloud Architecture',
    'Data Engineering',
  ];

  return (
    <footer className="relative bg-[#060606] overflow-hidden">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid - 5 evenly spaced columns */}
        <div className="py-16 lg:py-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex mb-5">
              <img
                src="https://wafatechnology.com/wp-content/uploads/2025/11/Frame-1597879963.png"
                alt="Wafa Technology Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              Engineering intelligent software for businesses worldwide.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-emerald-400 hover:border-emerald-500/20 transition-all duration-200"
                    aria-label={s.label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs text-white/20 uppercase tracking-widest font-semibold mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs text-white/20 uppercase tracking-widest font-semibold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs text-white/20 uppercase tracking-widest font-semibold mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-white/40 hover:text-emerald-400 transition-colors duration-200 break-all"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={phoneHref}
                  className="text-sm text-white/40 hover:text-emerald-400 transition-colors duration-200"
                >
                  {phoneNumber}
                </a>
              </li>
            </ul>
          </div>

          {/* Start a Project */}
          <div>
            <h4 className="text-xs text-white/20 uppercase tracking-widest font-semibold mb-5">
              Get Started
            </h4>
            <p className="text-sm text-white/30 leading-relaxed mb-5">
              Have an idea? Let&apos;s bring it to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all"
            >
              Book a Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">
            &copy; {currentYear} Wafa Technology. All rights reserved.
          </p>
          <div className="text-xs text-white/15">
            Developed by <a href="https://octopi-digital.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-500/40 hover:text-emerald-400 transition-colors">Octopi Digital LLC</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
