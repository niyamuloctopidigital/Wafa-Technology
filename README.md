# Wafa Technology - Next.js Website

A modern, SEO-optimized website built with Next.js 14, MongoDB, and NextAuth for Wafa Technology's software development and AI automation services.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (Credentials)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and other config

# Run development server
npm run dev
```

### Seed Admin User

After starting the server, seed the admin account:

```bash
curl -X POST http://localhost:3000/api/seed
```

Default admin credentials:
- Email: admin@wafatechnology.com
- Password: admin123

**Change these immediately in production!**

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/           # Admin portal (protected)
│   ├── api/             # API routes
│   ├── blog/            # Blog pages
│   ├── services/        # Service pages
│   ├── projects/        # Projects portfolio
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── admin/           # Admin components
│   ├── home/            # Homepage sections
│   ├── layout/          # Navbar, Footer
│   ├── seo/             # JSON-LD structured data
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (DB, auth)
└── models/              # Mongoose models
```

## Admin Portal

Access at `/admin` after logging in. Manage:
- Team members
- Projects portfolio
- Service pages
- Blog posts
- Contact leads

## SEO Features

- Dynamic meta tags per page
- JSON-LD structured data
- Auto-generated sitemap.xml
- robots.txt configuration
- Open Graph tags
- Semantic HTML

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Set environment variables in your hosting platform.
