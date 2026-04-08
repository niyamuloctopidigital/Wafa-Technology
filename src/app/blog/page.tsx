'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const categories = ['All', 'Technology', 'AI', 'Development', 'Design', 'Marketing'];

const blogPosts = [
  {
    id: 1,
    slug: 'next-js-14-app-router',
    title: 'Getting Started with Next.js 14 App Router',
    excerpt: 'Learn how to leverage the new App Router in Next.js 14 for faster development and better performance.',
    category: 'Development',
    author: 'Ahmed Hassan',
    avatar: 'AH',
    date: '2024-03-15',
    readTime: '5 min read',
    image: 'linear-gradient(135deg, #4ADE80 0%, #22c55e 100%)',
  },
  {
    id: 2,
    slug: 'ai-automation-guide',
    title: 'Complete Guide to AI Automation for Businesses',
    excerpt: 'Discover how AI automation can streamline your business processes and increase productivity.',
    category: 'AI',
    author: 'Sarah Tech',
    avatar: 'ST',
    date: '2024-03-12',
    readTime: '8 min read',
    image: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  },
  {
    id: 3,
    slug: 'web-design-trends',
    title: 'Web Design Trends 2024: What You Need to Know',
    excerpt: 'Explore the latest design trends shaping the web in 2024 and how to implement them effectively.',
    category: 'Design',
    author: 'Maya Design',
    avatar: 'MD',
    date: '2024-03-10',
    readTime: '6 min read',
    image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    id: 4,
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization Techniques',
    excerpt: 'Master advanced React optimization techniques to build lightning-fast applications.',
    category: 'Development',
    author: 'Ahmed Hassan',
    avatar: 'AH',
    date: '2024-03-08',
    readTime: '7 min read',
    image: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  {
    id: 5,
    slug: 'digital-marketing-strategy',
    title: 'Building a Winning Digital Marketing Strategy',
    excerpt: 'Learn the fundamentals of digital marketing and create a strategy that drives results.',
    category: 'Marketing',
    author: 'Lisa Growth',
    avatar: 'LG',
    date: '2024-03-05',
    readTime: '6 min read',
    image: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  },
  {
    id: 6,
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Enterprise Apps',
    excerpt: 'Understand TypeScript best practices to write more maintainable and scalable code.',
    category: 'Technology',
    author: 'Ahmed Hassan',
    avatar: 'AH',
    date: '2024-03-01',
    readTime: '9 min read',
    image: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-[#4ADE80] to-[#22c55e] bg-clip-text text-transparent">
          Our Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Insights, articles, and thought leadership from the Wafa Technology team
        </p>
      </motion.section>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-4 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-[#4ADE80] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] transition-all"
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#4ADE80] text-black'
                  : 'bg-gray-900 text-gray-400 hover:text-[#4ADE80] hover:border-[#4ADE80] border border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="group h-full"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="h-full backdrop-blur-lg bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-[#4ADE80] transition-all duration-300 hover:shadow-lg hover:shadow-[#4ADE80]/20 flex flex-col hover:-translate-y-1">
                  {/* Cover Image */}
                  <div
                    className="h-48 w-full relative overflow-hidden"
                    style={{ background: post.image }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-[#4ADE80] transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#4ADE80]/20 flex items-center justify-center text-[#4ADE80] text-xs font-bold">
                          {post.avatar}
                        </div>
                        <span>{post.author}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Date and Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <ArrowRight className="w-4 h-4 text-[#4ADE80] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center items-center gap-2 mb-20"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? 'bg-[#4ADE80] text-black'
                  : 'bg-gray-900 text-gray-400 hover:border-[#4ADE80] border border-gray-700 hover:text-[#4ADE80]'
              }`}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="ml-4 px-4 py-2 bg-[#4ADE80] text-black rounded-lg font-medium hover:bg-[#22c55e] transition-all"
            >
              Next
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
