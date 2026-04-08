import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Share2 } from 'lucide-react';
import { FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';

// Blog posts data
const blogPosts: Record<string, any> = {
  'next-js-14-app-router': {
    id: 1,
    title: 'Getting Started with Next.js 14 App Router',
    category: 'Development',
    author: 'Ahmed Hassan',
    avatar: 'AH',
    date: '2024-03-15',
    readTime: '5 min read',
    image: 'linear-gradient(135deg, #4ADE80 0%, #22c55e 100%)',
    excerpt: 'Learn how to leverage the new App Router in Next.js 14 for faster development and better performance.',
    content: `
      <h2>Introduction to App Router</h2>
      <p>Next.js 14 introduces significant improvements to the App Router, making it easier than ever to build high-performance applications. The new routing system provides a more intuitive way to structure your application.</p>

      <h3>Key Features</h3>
      <p>The App Router comes with several powerful features that make development faster and more enjoyable:</p>
      <ul>
        <li>File-based routing with intuitive directory structure</li>
        <li>Built-in support for layouts and nested routing</li>
        <li>Automatic code splitting and optimization</li>
        <li>Enhanced server component capabilities</li>
      </ul>

      <h3>Getting Started</h3>
      <p>To get started with the App Router, create a new Next.js 14 project and explore the app directory structure. The framework handles most of the configuration for you, allowing you to focus on building features.</p>

      <pre><code>npx create-next-app@latest my-app --typescript</code></pre>

      <h3>Best Practices</h3>
      <p>When working with the App Router, follow these best practices to maximize performance and maintainability:</p>
      <ul>
        <li>Use server components by default</li>
        <li>Leverage dynamic imports for client-side code</li>
        <li>Implement proper error boundaries</li>
        <li>Optimize images and assets</li>
      </ul>

      <p>The App Router represents a significant step forward in web development frameworks, providing developers with the tools needed to build modern, performant applications.</p>
    `,
    relatedPosts: ['react-performance-optimization', 'typescript-best-practices'],
  },
  'ai-automation-guide': {
    id: 2,
    title: 'Complete Guide to AI Automation for Businesses',
    category: 'AI',
    author: 'Sarah Tech',
    avatar: 'ST',
    date: '2024-03-12',
    readTime: '8 min read',
    image: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    excerpt: 'Discover how AI automation can streamline your business processes and increase productivity.',
    content: `
      <h2>The Future of Business Automation</h2>
      <p>Artificial intelligence is revolutionizing how businesses operate. AI automation can handle repetitive tasks, analyze data at scale, and provide actionable insights that drive growth.</p>

      <h3>Common Use Cases</h3>
      <p>AI automation is being successfully implemented across various industries:</p>
      <ul>
        <li>Customer service and support automation</li>
        <li>Data analysis and reporting</li>
        <li>Predictive analytics</li>
        <li>Content generation and optimization</li>
      </ul>

      <h3>Implementation Strategy</h3>
      <p>Before implementing AI automation, assess your business needs and identify the most impactful areas for automation. Start with pilot projects to validate the approach before scaling.</p>

      <p>AI automation is not just about technology—it's about transforming how your organization works to become more efficient and competitive in the digital age.</p>
    `,
    relatedPosts: ['web-design-trends', 'digital-marketing-strategy'],
  },
  'web-design-trends': {
    id: 3,
    title: 'Web Design Trends 2024: What You Need to Know',
    category: 'Design',
    author: 'Maya Design',
    avatar: 'MD',
    date: '2024-03-10',
    readTime: '6 min read',
    image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    excerpt: 'Explore the latest design trends shaping the web in 2024 and how to implement them effectively.',
    content: `
      <h2>Design Trends Shaping 2024</h2>
      <p>Web design continues to evolve with new trends emerging each year. Let's explore the key design trends that are defining 2024 and how to implement them in your projects.</p>

      <h3>Dark Mode and High Contrast</h3>
      <p>Dark mode has become mainstream, and users expect it as a standard option. High contrast designs are also gaining popularity for improved accessibility and visual impact.</p>

      <h3>Microinteractions and Animation</h3>
      <p>Subtle animations and microinteractions enhance user experience by providing feedback and guiding user attention. These should be purposeful and not distract from the content.</p>

      <h3>Responsive and Adaptive Design</h3>
      <p>With diverse device sizes, responsive design is no longer optional. Modern design approaches focus on adaptive interfaces that work seamlessly across all screen sizes.</p>

      <p>The most successful designs in 2024 balance aesthetics with functionality, prioritizing user experience above all else.</p>
    `,
    relatedPosts: ['react-performance-optimization', 'digital-marketing-strategy'],
  },
  'react-performance-optimization': {
    id: 4,
    title: 'React Performance Optimization Techniques',
    category: 'Development',
    author: 'Ahmed Hassan',
    avatar: 'AH',
    date: '2024-03-08',
    readTime: '7 min read',
    image: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    excerpt: 'Master advanced React optimization techniques to build lightning-fast applications.',
    content: `
      <h2>Optimizing React Applications</h2>
      <p>Performance is crucial for user experience. Let's explore proven techniques to optimize your React applications and ensure they run smoothly.</p>

      <h3>Code Splitting and Lazy Loading</h3>
      <p>Use React.lazy() and Suspense to load components only when needed. This reduces initial bundle size and improves load times.</p>

      <pre><code>const HeavyComponent = React.lazy(() => import('./HeavyComponent'));</code></pre>

      <h3>Memoization</h3>
      <p>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders and computations.</p>

      <h3>Virtual Lists</h3>
      <p>For lists with many items, implement virtual scrolling to render only visible items, significantly improving performance.</p>

      <h3>Bundle Analysis</h3>
      <p>Regularly analyze your bundle size using tools like webpack-bundle-analyzer to identify and eliminate unnecessary dependencies.</p>

      <p>Small optimizations across your application can result in significant performance improvements that users will notice.</p>
    `,
    relatedPosts: ['next-js-14-app-router', 'typescript-best-practices'],
  },
  'digital-marketing-strategy': {
    id: 5,
    title: 'Building a Winning Digital Marketing Strategy',
    category: 'Marketing',
    author: 'Lisa Growth',
    avatar: 'LG',
    date: '2024-03-05',
    readTime: '6 min read',
    image: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    excerpt: 'Learn the fundamentals of digital marketing and create a strategy that drives results.',
    content: `
      <h2>Creating Your Digital Marketing Strategy</h2>
      <p>A well-planned digital marketing strategy is essential for business growth. Let's explore the key components and how to implement them effectively.</p>

      <h3>Define Your Goals</h3>
      <p>Start by clearly defining what you want to achieve. Use SMART goals—Specific, Measurable, Achievable, Relevant, and Time-bound.</p>

      <h3>Know Your Audience</h3>
      <p>Understanding your target audience is crucial. Create detailed buyer personas to guide your marketing efforts.</p>

      <h3>Content Strategy</h3>
      <p>Create valuable content that addresses your audience's pain points. Consistency and quality are key to building trust.</p>

      <h3>Measure and Adapt</h3>
      <p>Use analytics to track your performance and make data-driven decisions. Continuously optimize based on results.</p>

      <p>Digital marketing is an ongoing process of learning, testing, and optimization.</p>
    `,
    relatedPosts: ['web-design-trends', 'ai-automation-guide'],
  },
  'typescript-best-practices': {
    id: 6,
    title: 'TypeScript Best Practices for Enterprise Apps',
    category: 'Technology',
    author: 'Ahmed Hassan',
    avatar: 'AH',
    date: '2024-03-01',
    readTime: '9 min read',
    image: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    excerpt: 'Understand TypeScript best practices to write more maintainable and scalable code.',
    content: `
      <h2>TypeScript for Enterprise Development</h2>
      <p>TypeScript brings type safety to JavaScript, making it ideal for large-scale applications. Let's explore best practices for enterprise development.</p>

      <h3>Strict Mode Configuration</h3>
      <p>Enable strict mode in your tsconfig.json to catch more errors at compile time.</p>

      <pre><code>"strict": true</code></pre>

      <h3>Type Definitions</h3>
      <p>Always define proper types for your functions and data structures. Avoid using any unless absolutely necessary.</p>

      <h3>Interface vs Type</h3>
      <p>Use interfaces for object shapes and types for unions and primitives. This maintains consistency in your codebase.</p>

      <h3>Error Handling</h3>
      <p>Implement proper error handling with typed error classes. This makes debugging easier and improves code reliability.</p>

      <p>Investing time in proper TypeScript practices pays dividends in code quality and maintainability as your project grows.</p>
    `,
    relatedPosts: ['next-js-14-app-router', 'react-performance-optimization'],
  },
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug];

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | Wafa Technology Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

const tableOfContents = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'key-features', title: 'Key Features' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'best-practices', title: 'Best Practices' },
];

const relatedBlogPosts: Record<string, any> = {
  'next-js-14-app-router': {
    title: 'Getting Started with Next.js 14 App Router',
    excerpt: 'Learn how to leverage the new App Router in Next.js 14 for faster development and better performance.',
    slug: 'next-js-14-app-router',
    image: 'linear-gradient(135deg, #4ADE80 0%, #22c55e 100%)',
  },
  'react-performance-optimization': {
    title: 'React Performance Optimization Techniques',
    excerpt: 'Master advanced React optimization techniques to build lightning-fast applications.',
    slug: 'react-performance-optimization',
    image: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  'typescript-best-practices': {
    title: 'TypeScript Best Practices for Enterprise Apps',
    excerpt: 'Understand TypeScript best practices to write more maintainable and scalable code.',
    slug: 'typescript-best-practices',
    image: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
  },
  'web-design-trends': {
    title: 'Web Design Trends 2024: What You Need to Know',
    excerpt: 'Explore the latest design trends shaping the web in 2024 and how to implement them effectively.',
    slug: 'web-design-trends',
    image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  'ai-automation-guide': {
    title: 'Complete Guide to AI Automation for Businesses',
    excerpt: 'Discover how AI automation can streamline your business processes and increase productivity.',
    slug: 'ai-automation-guide',
    image: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  },
  'digital-marketing-strategy': {
    title: 'Building a Winning Digital Marketing Strategy',
    excerpt: 'Learn the fundamentals of digital marketing and create a strategy that drives results.',
    slug: 'digital-marketing-strategy',
    image: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  },
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts[params.slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you are looking for does not exist.</p>
          <Link href="/blog" className="px-6 py-3 bg-[#4ADE80] text-black rounded-lg font-medium hover:bg-[#22c55e] transition-all">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedSlugs = post.relatedPosts || [];
  const relatedPosts = relatedSlugs
    .map((slug: string) => relatedBlogPosts[slug])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Breadcrumb */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#4ADE80] transition-colors">Home</Link>
          <ChevronRight size={16} />
          <Link href="/blog" className="hover:text-[#4ADE80] transition-colors">Blog</Link>
          <ChevronRight size={16} />
          <span className="text-gray-400">{post.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4ADE80]/20 flex items-center justify-center text-[#4ADE80] font-bold">
              {post.avatar}
            </div>
            <div>
              <div className="font-medium text-white">{post.author}</div>
            </div>
          </div>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        {/* Featured Image */}
        <div
          className="w-full h-96 rounded-xl overflow-hidden mb-8"
          style={{ background: post.image }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-8 border border-white/10 prose prose-invert max-w-none">
              <div
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(
                    /<h2>/g,
                    '<h2 class="text-3xl font-bold text-white mt-8 mb-4">'
                  ).replace(
                    /<h3>/g,
                    '<h3 class="text-2xl font-bold text-white mt-6 mb-3">'
                  ).replace(
                    /<p>/g,
                    '<p class="mb-4">'
                  ).replace(
                    /<ul>/g,
                    '<ul class="list-disc list-inside mb-4 space-y-2">'
                  ).replace(
                    /<li>/g,
                    '<li class="ml-2">'
                  ).replace(
                    /<pre>/g,
                    '<pre class="bg-black/50 rounded-lg p-4 mb-4 overflow-x-auto border border-white/10">'
                  ).replace(
                    /<code>/g,
                    '<code class="text-[#4ADE80] font-mono text-sm">'
                  )
                }}
              />

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-4">
                <span className="text-gray-400">Share:</span>
                <button className="p-2 hover:bg-[#4ADE80]/20 rounded-lg transition-colors text-gray-400 hover:text-[#4ADE80]">
                  <FiTwitter size={20} />
                </button>
                <button className="p-2 hover:bg-[#4ADE80]/20 rounded-lg transition-colors text-gray-400 hover:text-[#4ADE80]">
                  <FiLinkedin size={20} />
                </button>
                <button className="p-2 hover:bg-[#4ADE80]/20 rounded-lg transition-colors text-gray-400 hover:text-[#4ADE80]">
                  <FiFacebook size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Bio Card */}
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold mb-4">About Author</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#4ADE80]/20 flex items-center justify-center text-[#4ADE80] font-bold">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-bold">{post.author}</div>
                  <div className="text-xs text-gray-500">Tech Writer</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Passionate about technology and helping others learn. Writes about web development, AI, and best practices.
              </p>
              <button className="w-full px-4 py-2 bg-[#4ADE80] text-black rounded-lg font-medium hover:bg-[#22c55e] transition-all text-sm">
                Follow Author
              </button>
            </div>

            {/* Table of Contents */}
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-400 hover:text-[#4ADE80] transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Newsletter Subscribe */}
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-[#4ADE80]/50 bg-gradient-to-br from-[#4ADE80]/10 to-transparent">
              <h3 className="text-lg font-bold mb-2">Subscribe</h3>
              <p className="text-sm text-gray-400 mb-4">Get the latest articles delivered to your inbox.</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#4ADE80] transition-colors text-sm mb-3"
              />
              <button className="w-full px-4 py-2 bg-[#4ADE80] text-black rounded-lg font-medium hover:bg-[#22c55e] transition-all text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 mt-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="group h-full backdrop-blur-lg bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-[#4ADE80] transition-all hover:shadow-lg hover:shadow-[#4ADE80]/20">
                    <div
                      className="h-40 w-full relative"
                      style={{ background: relatedPost.image }}
                    />
                    <div className="p-6">
                      <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-[#4ADE80] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
