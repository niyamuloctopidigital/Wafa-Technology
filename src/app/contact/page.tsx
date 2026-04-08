'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Send,
  ArrowRight,
  CheckCircle2,
  Globe,
} from 'lucide-react';

const services = [
  'AI & Automation',
  'Software Development',
  'Mobile App Development',
  'Backend & Infrastructure',
  'Cloud Architecture',
  'Consulting',
  'Other',
];

const faqs = [
  {
    id: 1,
    question: 'What services does Wafa Technology offer?',
    answer:
      'We specialize in AI & automation, full-stack software development, mobile applications (iOS, Android, tablets), backend engineering, cloud architecture, and data engineering. We build end-to-end solutions tailored to your business needs.',
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on scope and complexity. An MVP can be ready in 4-8 weeks, while enterprise platforms may take 3-6 months. We provide detailed roadmaps with milestones during the discovery phase.',
  },
  {
    id: 3,
    question: 'Do you work with international clients?',
    answer:
      'Absolutely. We work with clients worldwide. Our distributed engineering teams operate across time zones to ensure responsive communication and continuous delivery.',
  },
  {
    id: 4,
    question: 'What is your pricing model?',
    answer:
      'We offer flexible engagement models: fixed-price for well-defined projects, time-and-materials for evolving scopes, and dedicated team arrangements for long-term partnerships.',
  },
  {
    id: 5,
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. Every project includes a support period, and we offer ongoing maintenance packages with SLA-backed response times, monitoring, updates, and feature additions.',
  },
];

const defaultSettings = {
  contactEmail: 'info@wafatechnology.com',
  phoneNumber: '+13829254256',
  calendarLink: process.env.NEXT_PUBLIC_CALENDLY_URL || '#',
  calendarEmbedCode: '',
  socialLinks: {
    linkedin: '',
    twitter: '',
    github: '',
    instagram: '',
  },
};

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState(defaultSettings);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) return;
        const data = await res.json();
        setSiteSettings((prev) => ({
          ...prev,
          contactEmail: data.contactEmail || prev.contactEmail,
          phoneNumber: data.phoneNumber || prev.phoneNumber,
          calendarLink: data.calendarLink || prev.calendarLink,
          calendarEmbedCode: data.calendarEmbedCode || prev.calendarEmbedCode,
          socialLinks: { ...prev.socialLinks, ...data.socialLinks },
        }));
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteSettings.contactEmail,
      href: `mailto:${siteSettings.contactEmail}`,
      description: 'Send us a message anytime',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteSettings.phoneNumber,
      href: `tel:${siteSettings.phoneNumber.replace(/[^+\d]/g, '')}`,
      description: 'Mon-Fri, 9AM-6PM MT',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: 'Albuquerque, NM 87110, USA',
      href: '#',
      description: 'Headquarters',
    },
    {
      icon: Globe,
      label: 'Global',
      value: 'Remote teams worldwide',
      href: '#',
      description: 'Distributed engineering',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Let&apos;s Build{' '}
              <span className="gradient-text">Together</span>
            </h1>
            <p className="mt-6 text-lg text-white/40 max-w-xl mx-auto">
              Whether you have a clear vision or just an idea, our engineering team
              is ready to help you bring it to life.
            </p>
          </motion.div>

          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {contactInfo.map((info, i) => (
              <a
                key={info.label}
                href={info.href}
                className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/15 transition-colors">
                  <info.icon size={18} className="text-emerald-400" strokeWidth={1.5} />
                </div>
                <div className="text-xs text-white/25 mb-1">{info.label}</div>
                <div className="text-sm text-white font-medium">{info.value}</div>
                <div className="text-xs text-white/20 mt-1">{info.description}</div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form + Calendly Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
              <p className="text-sm text-white/30 mb-8">
                Fill out the form and we&apos;ll get back to you within 24 hours.
              </p>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
                  >
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm text-emerald-400">
                      Message sent successfully. We&apos;ll be in touch soon.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">Service *</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all appearance-none"
                    >
                      <option value="" className="bg-[#0a0a0a]">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-[#0a0a0a]">
                          {service}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="glow-button w-full sm:w-auto px-10 py-3.5 font-semibold rounded-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Calendly */}
              <div className="p-6 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03]">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Clock size={18} className="text-emerald-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Prefer a Call?</h3>
                <p className="text-sm text-white/30 mb-5 leading-relaxed">
                  Book a free 30-minute consultation with our engineering team.
                </p>
                {siteSettings.calendarEmbedCode ? (
                  <div
                    className="rounded-xl overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: siteSettings.calendarEmbedCode }}
                  />
                ) : (
                  <a
                    href={siteSettings.calendarLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium hover:bg-emerald-500/15 transition-all"
                  >
                    Schedule a Call
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>

              {/* Response time */}
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <h3 className="text-sm font-semibold text-white mb-4">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    { step: '01', text: 'We review your inquiry within 24 hours' },
                    { step: '02', text: 'A senior engineer assesses your requirements' },
                    { step: '03', text: 'We schedule a discovery call to discuss the solution' },
                    { step: '04', text: 'You receive a detailed proposal and timeline' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="text-xs font-mono text-emerald-400/50 mt-0.5">{item.step}</span>
                      <span className="text-sm text-white/40">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location card */}
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={16} className="text-emerald-400/50" />
                  <span className="text-sm font-semibold text-white">Headquarters</span>
                </div>
                <p className="text-sm text-white/40">Albuquerque, NM 87110, USA</p>
                <p className="text-xs text-white/20 mt-2">With remote teams operating globally</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 uppercase tracking-widest mb-6">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors text-left"
                >
                  <h3 className="text-sm font-medium text-white pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={16} className="text-emerald-400/50" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-sm text-white/35 leading-relaxed border-t border-white/[0.04] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
