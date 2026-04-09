import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  faviconUrl?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  calendarLink?: string;
  calendarEmbedCode?: string;
  headerTrackingCode?: string;
  footerTrackingCode?: string;
  analytics: {
    googleAnalyticsId?: string;
    metaPixelId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: 'Wafa Technology' },
    siteDescription: { type: String, default: '' },
    contactEmail: { type: String, default: 'info@wafatechnology.com' },
    phoneNumber: { type: String, default: '+13829254256' },
    address: { type: String, default: 'Albuquerque, NM 87110, USA' },
    faviconUrl: { type: String, default: '' },
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
    calendarLink: { type: String },
    calendarEmbedCode: { type: String },
    headerTrackingCode: { type: String, default: '' },
    footerTrackingCode: { type: String, default: '' },
    analytics: {
      googleAnalyticsId: { type: String },
      metaPixelId: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
