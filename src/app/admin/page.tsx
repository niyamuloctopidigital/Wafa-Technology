'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { FiFolder, FiUsers, FiFileText, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface StatCard {
  label: string;
  value: number;
  trend: number;
  icon: React.ReactNode;
  color: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  isPublished: boolean;
  views: number;
  createdAt: string;
}

const StatCardSkeleton = () => (
  <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 animate-pulse">
    <div className="h-4 w-24 bg-gray-700 rounded mb-4"></div>
    <div className="h-8 w-16 bg-gray-700 rounded"></div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch all data
        const [statsRes, leadsRes, postsRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/leads?limit=5'),
          fetch('/api/blog?limit=5&sort=-createdAt'),
        ]);

        if (!statsRes.ok || !leadsRes.ok || !postsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const statsData = await statsRes.json();
        const leadsData = await leadsRes.json();
        const postsData = await postsRes.json();

        setStats([
          {
            label: 'Total Projects',
            value: statsData.projects || 0,
            trend: 12,
            icon: <FiFolder className="w-6 h-6" />,
            color: 'from-blue-500 to-blue-600',
          },
          {
            label: 'Team Members',
            value: statsData.teamMembers || 0,
            trend: 8,
            icon: <FiUsers className="w-6 h-6" />,
            color: 'from-purple-500 to-purple-600',
          },
          {
            label: 'Blog Posts',
            value: statsData.blogPosts || 0,
            trend: -5,
            icon: <FiFileText className="w-6 h-6" />,
            color: 'from-green-500 to-green-600',
          },
          {
            label: 'New Leads',
            value: statsData.newLeads || 0,
            trend: 24,
            icon: <FiMail className="w-6 h-6" />,
            color: 'from-orange-500 to-orange-600',
          },
        ]);

        setLeads(leadsData.data || []);
        setPosts(postsData.data || []);
      } catch (err) {
        setError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSeed = async () => {
    try {
      setSeeding(true);
      const res = await fetch('/api/seed', { method: 'POST' });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to seed data');
      toast.success('Demo data seeded successfully');
      setLoading(true);
      setError('');
      const [statsRes, leadsRes, postsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/leads?limit=5'),
        fetch('/api/blog?limit=5&sort=-createdAt'),
      ]);
      if (!statsRes.ok || !leadsRes.ok || !postsRes.ok) {
        throw new Error('Failed to refresh dashboard data');
      }
      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      const postsData = await postsRes.json();
      setStats([
        {
          label: 'Total Projects',
          value: statsData.projects || 0,
          trend: 12,
          icon: <FiFolder className="w-6 h-6" />,
          color: 'from-blue-500 to-blue-600',
        },
        {
          label: 'Team Members',
          value: statsData.teamMembers || 0,
          trend: 8,
          icon: <FiUsers className="w-6 h-6" />,
          color: 'from-purple-500 to-purple-600',
        },
        {
          label: 'Blog Posts',
          value: statsData.blogPosts || 0,
          trend: -5,
          icon: <FiFileText className="w-6 h-6" />,
          color: 'from-green-500 to-green-600',
        },
        {
          label: 'New Leads',
          value: statsData.newLeads || 0,
          trend: 24,
          icon: <FiMail className="w-6 h-6" />,
          color: 'from-orange-500 to-orange-600',
        },
      ]);
      setLeads(leadsData.data || []);
      setPosts(postsData.data || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to seed data');
    } finally {
      setSeeding(false);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-200 mb-2">Welcome back, Admin</h1>
        <p className="text-gray-500">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat, idx) => (
              <div key={idx} className="bg-[#111111] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                  <div className={`text-[#4ADE80] bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-200">{stat.value}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.trend > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.trend > 0 ? (
                      <FiTrendingUp className="w-4 h-4" />
                    ) : (
                      <FiTrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(stat.trend)}%</span>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/admin/projects">
          <button className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-300 hover:border-[#4ADE80] hover:text-[#4ADE80] transition-all flex items-center justify-center gap-2 font-medium">
            <FiPlus className="w-5 h-5" />
            Add Project
          </button>
        </Link>
        <Link href="/admin/team">
          <button className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-300 hover:border-[#4ADE80] hover:text-[#4ADE80] transition-all flex items-center justify-center gap-2 font-medium">
            <FiPlus className="w-5 h-5" />
            Add Team Member
          </button>
        </Link>
        <Link href="/admin/blog">
          <button className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-300 hover:border-[#4ADE80] hover:text-[#4ADE80] transition-all flex items-center justify-center gap-2 font-medium">
            <FiPlus className="w-5 h-5" />
            New Blog Post
          </button>
        </Link>
        <Link href="/admin/leads">
          <button className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-300 hover:border-[#4ADE80] hover:text-[#4ADE80] transition-all flex items-center justify-center gap-2 font-medium">
            <FiMail className="w-5 h-5" />
            View Leads
          </button>
        </Link>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="w-full px-4 py-3 bg-gradient-to-r from-[#4ADE80] to-green-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {seeding ? 'Seeding Data...' : 'Seed Demo Data'}
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-200 mb-6">Recent Leads</h2>
          {loading ? (
            <div className="space-y-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-12 bg-gray-800 rounded animate-pulse"></div>
                ))}
            </div>
          ) : leads.length > 0 ? (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-200 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No leads yet</p>
          )}
          <Link href="/admin/leads">
            <button className="w-full mt-6 px-4 py-2 border border-gray-800 rounded-lg text-gray-400 hover:text-[#4ADE80] hover:border-[#4ADE80] transition-all text-sm font-medium">
              View All Leads
            </button>
          </Link>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-200 mb-6">Recent Blog Posts</h2>
          {loading ? (
            <div className="space-y-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-12 bg-gray-800 rounded animate-pulse"></div>
                ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-200 truncate">{post.title}</p>
                    <p className="text-xs text-gray-500">
                      {post.category} • {post.views} views
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        post.isPublished
                          ? 'bg-green-500 bg-opacity-10 text-green-400'
                          : 'bg-gray-700 bg-opacity-50 text-gray-400'
                      }`}
                    >
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No blog posts yet</p>
          )}
          <Link href="/admin/blog">
            <button className="w-full mt-6 px-4 py-2 border border-gray-800 rounded-lg text-gray-400 hover:text-[#4ADE80] hover:border-[#4ADE80] transition-all text-sm font-medium">
              View All Posts
            </button>
          </Link>
        </div>
      </div>

      {/* Charts placeholder */}
      <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-200 mb-6">Analytics</h2>
        <div className="h-64 flex items-center justify-center bg-[#0a0a0a] border border-gray-800 rounded-lg">
          <p className="text-gray-500">Charts implementation coming soon...</p>
        </div>
      </div>
    </div>
  );
}
