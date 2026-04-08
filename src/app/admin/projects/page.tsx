'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  thumbnail?: string;
  thumbnailUrl?: string;
  images?: string[];
  clientName?: string;
  projectUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string;
  thumbnailUrl: string;
  images: string;
  clientName: string;
  projectUrl: string;
  isFeatured: boolean;
  isActive: boolean;
}

const initialFormData: FormData = {
  title: '',
  slug: '',
  description: '',
  longDescription: '',
  category: '',
  technologies: '',
  thumbnailUrl: '',
  images: '',
  clientName: '',
  projectUrl: '',
  isFeatured: false,
  isActive: true,
};

const categories = [
  'Web Development',
  'Mobile App',
  'AI/ML',
  'Cloud Infrastructure',
  'Consulting',
  'Other',
];

// Simple slugify function
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const categoryOptions = Array.from(
    new Set([
      ...categories,
      ...projects.map((project) => project.category).filter(Boolean),
    ])
  );

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const normalizedProjects = (data.data || []).map((project: any) => ({
        ...project,
        id: project.id || project._id,
        thumbnailUrl: project.thumbnail || project.thumbnailUrl || '',
      }));
      setProjects(normalizedProjects);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        longDescription: project.longDescription || '',
        category: project.category,
        technologies: project.technologies?.join(', ') || '',
        thumbnailUrl: project.thumbnail || project.thumbnailUrl || '',
        images: project.images?.join('\n') || '',
        clientName: project.clientName || '',
        projectUrl: project.projectUrl || '',
        isFeatured: project.isFeatured,
        isActive: project.isActive,
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

    if (!formData.title || !formData.slug || !formData.category || !formData.thumbnailUrl) {
      toast.error('Title, category, and thumbnail are required');
      setSubmitting(false);
      return;
    }

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        longDescription: formData.longDescription,
        category: formData.category,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
        thumbnail: formData.thumbnailUrl,
        images: formData.images
          .split('\n')
          .map((i) => i.trim())
          .filter((i) => i),
        clientName: formData.clientName,
        projectUrl: formData.projectUrl,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || 'Failed to save project');

      toast.success(editingId ? 'Project updated' : 'Project added');
      handleCloseModal();
      fetchProjects();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/projects/${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Project deleted');
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-200">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-green-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <FiPlus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
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
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filteredProjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Featured</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-800 hover:bg-[#0a0a0a] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.thumbnailUrl && (
                          <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-700"
                          />
                        )}
                        <p className="font-medium text-gray-200">{project.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{project.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          project.isFeatured
                            ? 'bg-yellow-500 bg-opacity-10 text-yellow-400'
                            : 'bg-gray-700 bg-opacity-50 text-gray-400'
                        }`}
                      >
                        {project.isFeatured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          project.isActive
                            ? 'bg-green-500 bg-opacity-10 text-green-400'
                            : 'bg-gray-700 bg-opacity-50 text-gray-400'
                        }`}
                      >
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-[#4ADE80] hover:bg-[#4ADE80] hover:bg-opacity-10 transition-all mr-2"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(project.id);
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
          <div className="p-8 text-center text-gray-500">No projects found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-200">
                {editingId ? 'Edit Project' : 'Add Project'}
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Short Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Long Description
                </label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <input
                    list="project-categories"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    placeholder="Select or type a category"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                  <datalist id="project-categories">
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Node.js, PostgreSQL"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Images (one URL per line)
                </label>
                <textarea
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  rows={3}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project URL</label>
                  <input
                    type="url"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Featured</span>
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Active</span>
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
              <h2 className="text-xl font-bold text-gray-200 mb-2">Delete Project</h2>
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
