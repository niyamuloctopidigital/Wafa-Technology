import Link from 'next/link';
import { FiLinkedin, FiTwitter, FiGithub, FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

function formatUSPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

const Footer = async () => {
  let settings: any = null;

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
  const formattedPhone = formatUSPhone(phoneNumber);
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
    <footer className="footer-wrapper relative overflow-hidden">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex mb-5">
              <img
                src="https://assets.cdn.filesafe.space/j53xn6YJHwIdPImV00rn/media/69d764e6ebf1a6084361a27e.webp"
                alt="Wafa Technology Logo"
                className="h-8 w-auto"
                style={{ imageRendering: 'auto' }}
              />
            </Link>
            <p className="footer-text-muted text-sm leading-relaxed mb-6 max-w-xs">
              Engineering intelligent software for businesses worldwide. AI automation, full-stack development, and mobile applications.
            </p>

            {/* Contact info with icons */}
            <div className="space-y-3 mb-6">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 group"
              >
                <span className="footer-icon-box w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-3.5 h-3.5 footer-icon" />
                </span>
                <span className="text-sm footer-text-muted group-hover:text-emerald-500 transition-colors">{email}</span>
              </a>
              <a
                href={phoneHref}
                className="flex items-center gap-3 group"
              >
                <span className="footer-icon-box w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-3.5 h-3.5 footer-icon" />
                </span>
                <span className="text-sm footer-text-muted group-hover:text-emerald-500 transition-colors">{formattedPhone}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="footer-icon-box w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="w-3.5 h-3.5 footer-icon" />
                </span>
                <span className="text-sm footer-text-muted">Albuquerque, NM 87110, USA</span>
              </div>
            </div>

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
                    className="footer-social-icon w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="footer-heading text-xs uppercase tracking-widest font-semibold mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm footer-text-muted footer-link transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="footer-heading text-xs uppercase tracking-widest font-semibold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm footer-text-muted footer-link transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div className="lg:col-span-3">
            <h4 className="footer-heading text-xs uppercase tracking-widest font-semibold mb-5">
              Get Started
            </h4>
            <p className="text-sm footer-text-muted leading-relaxed mb-5">
              Have a project in mind? Let&apos;s discuss how we can bring your idea to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-500 font-medium hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all"
            >
              Book a Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <div className="mt-8 footer-newsletter-box p-4 rounded-xl">
              <p className="text-xs footer-text-muted mb-1">Response guaranteed within</p>
              <p className="text-lg font-bold footer-text-primary">24 Hours</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 footer-border-top flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs footer-text-faint">
            &copy; {currentYear} Wafa Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs footer-text-faint">
            <Link href="/sitemap.xml" className="footer-link transition-colors">Sitemap</Link>
            <span className="opacity-30">|</span>
            <span>Developed by <a href="https://octopi-digital.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-500/60 hover:text-emerald-500 transition-colors">Octopi Digital LLC</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
