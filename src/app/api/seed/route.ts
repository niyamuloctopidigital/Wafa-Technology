import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Team from '@/models/Team';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Blog from '@/models/Blog';
import Lead from '@/models/Lead';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const existingAdmin = await User.findOne({ email: 'wafa@gmail.com' });
    let createdAdmin = null;

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      const adminUser = new User({
        name: 'Admin',
        email: 'wafa@gmail.com',
        password: hashedPassword,
        role: 'admin',
        avatar: null,
      });
      const savedUser = await adminUser.save();
      const userObject = savedUser.toObject();
      delete userObject.password;
      createdAdmin = userObject;
    }

    const teamCount = await Team.countDocuments();
    const projectCount = await Project.countDocuments();
    const serviceCount = await Service.countDocuments();
    const blogCount = await Blog.countDocuments();
    const leadCount = await Lead.countDocuments();

    const teamData = [
      {
        name: 'Ayesha Khan',
        role: 'CEO & Founder',
        bio: 'Driving product vision and delivering digital solutions with a user-first approach.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        department: 'Leadership',
        isLeader: true,
        linkedin: 'https://www.linkedin.com/in/ayesha-khan',
        github: 'https://github.com/ayesha-khan',
        order: 1,
      },
      {
        name: 'Imran Ali',
        role: 'Lead Developer',
        bio: 'Building scalable web applications and managing the engineering team.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        department: 'Engineering',
        linkedin: 'https://www.linkedin.com/in/imran-ali',
        github: 'https://github.com/imran-ali',
        order: 2,
      },
      {
        name: 'Sara Malik',
        role: 'UI/UX Designer',
        bio: 'Designing modern interfaces that create memorable customer experiences.',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        department: 'Design',
        linkedin: 'https://www.linkedin.com/in/sara-malik',
        twitter: 'https://twitter.com/sara_malik',
        order: 3,
      },
    ];

    const projectData = [
      {
        title: 'Wafa eCommerce Platform',
        slug: 'wafa-ecommerce-platform',
        description: 'A responsive online store with secure checkout and custom admin tools.',
        longDescription:
          'Built a modern eCommerce platform with product management, payment integration, and analytics dashboards to help clients sell online.',
        category: 'Web Development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80',
        ],
        clientName: 'Alfa Retail',
        projectUrl: 'https://example.com/ecommerce',
        isFeatured: true,
      },
      {
        title: 'Smart Booking App',
        slug: 'smart-booking-app',
        description: 'A mobile-friendly booking system for appointments and reservations.',
        longDescription:
          'Delivered a booking app with calendar sync, notifications, and customer self-service features for streamlined appointment management.',
        category: 'Mobile App',
        technologies: ['React Native', 'Firebase', 'TypeScript'],
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        ],
        clientName: 'Vista Health',
        projectUrl: 'https://example.com/booking',
        isFeatured: false,
      },
    ];

    const serviceData = [
      {
        title: 'Custom Web Development',
        slug: 'custom-web-development',
        shortDescription: 'High-performing websites built for your business goals.',
        longDescription:
          'We build modern, responsive websites with pixel-perfect design, fast performance, and easy content management.',
        icon: 'web',
        features: [
          { title: 'Responsive design', description: 'Optimized for desktop and mobile devices.', icon: 'smartphone' },
          { title: 'Fast performance', description: 'Speed and reliability for every visitor.', icon: 'speedometer' },
        ],
        technologies: ['Next.js', 'React', 'Tailwind CSS'],
        thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        metaTitle: 'Custom Web Development Services',
        metaDescription: 'Build a website that converts visitors into customers.',
        order: 1,
      },
      {
        title: 'Brand Strategy',
        slug: 'brand-strategy',
        shortDescription: 'Create a strong brand identity and market presence.',
        longDescription:
          'Our branding services help businesses communicate clearly, build trust, and stand out in the market.',
        icon: 'brush',
        features: [
          { title: 'Logo design', description: 'Craft a memorable visual identity.', icon: 'pencil' },
          { title: 'Message strategy', description: 'Position your brand with confidence.', icon: 'chat' },
        ],
        technologies: ['Figma', 'Illustrator'],
        thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        metaTitle: 'Brand Strategy Services',
        metaDescription: 'Bring your brand to life with strategy and design.',
        order: 2,
      },
    ];

    const blogData = [
      {
        title: 'How to Launch a Successful Digital Product',
        slug: 'launch-successful-digital-product',
        excerpt: 'A practical guide to planning, building, and launching your next digital product.',
        content:
          'Launching a successful digital product requires research, clear goals, and strong execution. Start with the user, define the right MVP, and iterate fast based on feedback.',
        coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
        author: 'Ayesha Khan',
        category: 'Product',
        tags: ['product', 'strategy', 'launch'],
        metaTitle: 'Launch a Successful Digital Product',
        metaDescription: 'Learn the key steps to launching a winning digital product.',
        isPublished: true,
        isFeatured: true,
        readTime: 6,
        views: 120,
        publishedAt: new Date(),
      },
      {
        title: 'Top Design Trends for Modern Websites',
        slug: 'top-design-trends-modern-websites',
        excerpt: 'Discover the latest website design trends that create memorable experiences.',
        content:
          'From bold typography to interactive animation, modern websites are focused on clarity and user delight. Use whitespace, strong visuals, and intuitive controls.',
        coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        author: 'Sara Malik',
        category: 'Design',
        tags: ['design', 'web', 'ux'],
        metaTitle: 'Modern Website Design Trends',
        metaDescription: 'See the most popular web design trends for 2026.',
        isPublished: true,
        isFeatured: false,
        readTime: 5,
        views: 90,
        publishedAt: new Date(),
      },
    ];

    const leadData = [
      {
        name: 'Fatima Noor',
        email: 'fatima.noor@example.com',
        phone: '+923001234567',
        company: 'GreenTech Solutions',
        service: 'Custom Web Development',
        message: 'We need a new website for our consulting business with appointment booking.',
        status: 'new',
        source: 'website',
      },
      {
        name: 'Omar Sheikh',
        email: 'omar.sheikh@example.com',
        phone: '+923219876543',
        company: 'Bright Retail',
        service: 'Brand Strategy',
        message: 'Looking for branding and website redesign support.',
        status: 'new',
        source: 'website',
      },
    ];

    const createdTeam = teamCount === 0 ? await Team.insertMany(teamData) : [];
    const createdProjects = projectCount === 0 ? await Project.insertMany(projectData) : [];
    const createdServices = serviceCount === 0 ? await Service.insertMany(serviceData) : [];
    const createdBlogs = blogCount === 0 ? await Blog.insertMany(blogData) : [];
    const createdLeads = leadCount === 0 ? await Lead.insertMany(leadData) : [];

    return NextResponse.json(
      {
        success: true,
        message: 'Seed completed',
        admin: createdAdmin ? 'Admin created' : 'Admin already existed',
        counts: {
          team: createdTeam.length || teamCount,
          projects: createdProjects.length || projectCount,
          services: createdServices.length || serviceCount,
          blogs: createdBlogs.length || blogCount,
          leads: createdLeads.length || leadCount,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
