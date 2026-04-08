import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Service from '@/models/Service';
import Project from '@/models/Project';
import Team from '@/models/Team';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wafatechnology.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Dynamic pages from database
  let blogPages: MetadataRoute.Sitemap = [];
  let servicePages: MetadataRoute.Sitemap = [];

  try {
    if (process.env.MONGODB_URI) {
      await dbConnect();

      // Blog posts
      const blogs = await Blog.find({ isPublished: true })
        .select('slug updatedAt')
        .lean();
      blogPages = blogs.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updatedAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      // Services
      const services = await Service.find({ isActive: true })
        .select('slug updatedAt')
        .lean();
      servicePages = services.map((service: any) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Sitemap generation error:', error);
  }

  return [...staticPages, ...servicePages, ...blogPages];
}
