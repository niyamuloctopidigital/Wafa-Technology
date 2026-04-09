'use client';

import { useEffect, useState } from 'react';
import { FiSave, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  faviconUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  calendarLink?: string;
  calendarEmbedCode?: string;
  analytics: {
    googleAnalyticsId?: string;
    metaPixelId?: string;
  };
}

const initialSettings: Settings = {
  siteName: 'Wafa Technology',
  siteDescription: '',
  contactEmail: 'info@wafatechnology.com',
  phoneNumber: '+13829254256',
  address: 'Albuquerque, NM 87110, USA',
  faviconUrl: '',
  socialLinks: {
    twitter: '',
    linkedin: '',
    github: '',
    facebook: '',
    instagram: '',
  },
  calendarLink: '',
  calendarEmbedCode: '',
  analytics: {
    googleAnalyticsId: '',
    metaPixelId: '',
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...initialSettings, ...data });
      }
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save');

      toast.success('Settings saved successfully');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#4ADE80] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-200">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your site configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-200 mb-6">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Calendar / Scheduling */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-200 mb-6">Calendar / Scheduling</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Calendar Link</label>
              <input
                type="url"
                value={settings.calendarLink || ''}
                onChange={(e) => setSettings({ ...settings, calendarLink: e.target.value })}
                placeholder="https://calendly.com/your-schedule"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Calendar Embed Code</label>
              <textarea
                value={settings.calendarEmbedCode || ''}
                onChange={(e) => setSettings({ ...settings, calendarEmbedCode: e.target.value })}
                rows={4}
                placeholder="Paste your embed HTML or iframe code here"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-200 mb-6">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
              <input
                type="url"
                value={settings.socialLinks.twitter || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
              <input
                type="url"
                value={settings.socialLinks.linkedin || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/..."
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
              <input
                type="url"
                value={settings.socialLinks.github || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, github: e.target.value },
                  })
                }
                placeholder="https://github.com/..."
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
              <input
                type="url"
                value={settings.socialLinks.facebook || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
              <input
                type="url"
                value={settings.socialLinks.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Favicon */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-200 mb-2">Favicon</h2>
          <p className="text-sm text-gray-400 mb-4">Paste the URL of your favicon image (PNG, ICO, or WebP)</p>
          <div className="flex items-center gap-4">
            <input
              type="url"
              value={settings.faviconUrl || ''}
              onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
              placeholder="https://example.com/favicon.png"
              className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
            />
            {settings.faviconUrl && (
              <img src={settings.faviconUrl} alt="Favicon preview" className="w-8 h-8 rounded object-contain bg-white/10 p-1" />
            )}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-6">
            <FiAlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-bold text-gray-200">Analytics</h2>
              <p className="text-sm text-gray-400 mt-1">
                Add your tracking IDs for analytics and conversion tracking
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.analytics.googleAnalyticsId || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    analytics: { ...settings.analytics, googleAnalyticsId: e.target.value },
                  })
                }
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your Google Analytics Measurement ID (GA4)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Meta Pixel ID</label>
              <input
                type="text"
                value={settings.analytics.metaPixelId || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    analytics: { ...settings.analytics, metaPixelId: e.target.value },
                  })
                }
                placeholder="1234567890"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your Meta Pixel ID for Facebook/Instagram conversion tracking
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4ADE80] to-green-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <FiSave className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* Info Box */}
      <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4">
        <p className="text-blue-400 text-sm">
          Changes to these settings will be reflected on your website. Some changes may require a
          page refresh to take effect.
        </p>
      </div>
    </div>
  );
}
