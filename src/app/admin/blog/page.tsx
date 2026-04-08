'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  author: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  author: string;
  category: string;
  tags: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  isFeatured: boolean;
}

const initialFormData: FormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImageUrl: '',
  author: '',
  category: '',
  tags: '',
  metaTitle: '',
  metaDescription: '',
  isPublished: false,
  isFeatured: false,
};

const categories = [
  'Technology',
  'Business',
  'Design',
  'Development',
  'AI/ML',
  'Cloud',
  'Tutorial',
  'News',
  'Other',
];

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [publishedFilter, setPublishedFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const normalized = (data.data || []).map((post: any) => ({
        ...post,
        id: post.id || post._id,
        coverImageUrl: post.coverImage || post.coverImageUrl || '',
      }));
      setPosts(normalized);
    } catch (err) {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || post.category === categoryFilter;
    const matchesPublished =
      publishedFilter === '' ||
      (publishedFilter === 'published' && post.isPublished) ||
      (publishedFilter === 'draft' && !post.isPublished);
    return matchesSearch && matchesCategory && matchesPublished;
  });

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingId(post.id);
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImageUrl: post.coverImageUrl || '',
        author: post.author,
        category: post.category,
        tags: post.tags?.join(', ') || '',
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        isPublished: post.isPublished,
        isFeatured: post.isFeatured,
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: !editingId ? slugify(title) : formData.slug,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingId ? `/api/blog/${editingId}` : '/api/blog';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImageUrl: formData.coverImageUrl,
        author: formData.author,
        category: formData.category,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save');

      toast.success(editingId ? 'Post updated' : 'Post created');
      handleCloseModal();
      fetchPosts();
    } catch (err) {
      toast.error('Failed to save post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/blog/${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Post deleted');
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-200">Blog Posts</h1>
          <p className="text-gray-500 mt-1">Manage your blog content</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-green-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <FiPlus className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-200 placeholder-gray-600 focus:border-[#4ADE80] focus:outline-none transition-colors"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={publishedFilter}
          onChange={(e) => setPublishedFilter(e.target.value)}
          className="px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
        >
          <option value="">All Posts</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filteredPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Views</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-800 hover:bg-[#0a0a0a] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.coverImageUrl && (
                          <img
                            src={post.coverImageUrl}
                            alt={post.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-700"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-200">{post.title}</p>
                          {post.isFeatured && (
                            <span className="text-xs text-yellow-400">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{post.category}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{post.author}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          post.isPublished
                            ? 'bg-green-500 bg-opacity-10 text-green-400'
                            : 'bg-gray-700 bg-opacity-50 text-gray-400'
                        }`}
                      >
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <FiEye className="w-4 h-4" />
                        {post.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal(post)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-[#4ADE80] hover:bg-[#4ADE80] hover:bg-opacity-10 transition-all mr-2"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(post.id);
                          setShowDeleteModal(true);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400 hover:bg-opacity-10 transition-all"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">No blog posts found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-200">
                {editingId ? 'Edit Post' : 'New Post'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={10}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.coverImageUrl}
                  onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meta Title</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Published</span>
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Featured</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-300 hover:border-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-green-400 text-black rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-gray-800 rounded-lg max-w-sm w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-200 mb-2">Delete Post</h2>
              <p className="text-gray-400 mb-6">Are you sure? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-300 hover:border-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
