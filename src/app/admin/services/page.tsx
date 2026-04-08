'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  iconName: string;
  features: Feature[];
  technologies: string[];
  thumbnailUrl?: string;
  bannerImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  order: number;
  isActive: boolean;
}

interface FormData {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  features: Feature[];
  technologies: string;
  thumbnailUrl: string;
  bannerImageUrl: string;
  metaTitle: string;
  metaDescription: string;
  order: number;
  isActive: boolean;
}

const initialFormData: FormData = {
  title: '',
  slug: '',
  shortDescription: '',
  longDescription: '',
  iconName: '',
  features: [],
  technologies: '',
  thumbnailUrl: '',
  bannerImageUrl: '',
  metaTitle: '',
  metaDescription: '',
  order: 0,
  isActive: true,
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  // Fetch services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const normalized = (data.data || []).map((service: any) => ({
        ...service,
        id: service.id || service._id,
        iconName: service.icon || service.iconName || '',
        thumbnailUrl: service.thumbnail || service.thumbnailUrl || '',
        bannerImageUrl: service.bannerImage || service.bannerImageUrl || '',
      }));
      setServices(normalized);
    } catch (err) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title,
        slug: service.slug,
        shortDescription: service.shortDescription,
        longDescription: service.longDescription || '',
        iconName: service.iconName || service.icon || '',
        features: service.features || [],
        technologies: service.technologies?.join(', ') || '',
        thumbnailUrl: service.thumbnailUrl || service.thumbnail || '',
        bannerImageUrl: service.bannerImageUrl || service.bannerImage || '',
        metaTitle: service.metaTitle || '',
        metaDescription: service.metaDescription || '',
        order: service.order,
        isActive: service.isActive,
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

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { title: '', description: '', icon: '' }],
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingId ? `/api/services/${editingId}` : '/api/services';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        title: formData.title,
        slug: formData.slug,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        icon: formData.iconName,
        features: formData.features,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
        thumbnail: formData.thumbnailUrl,
        bannerImage: formData.bannerImageUrl,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        order: formData.order,
        isActive: formData.isActive,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || 'Failed to save service');

      toast.success(editingId ? 'Service updated' : 'Service added');
      handleCloseModal();
      fetchServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/services/${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Service deleted');
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchServices();
    } catch (err) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-200">Services</h1>
          <p className="text-gray-500 mt-1">Manage your service offerings</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-green-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <FiPlus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Icon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-gray-800 hover:bg-[#0a0a0a] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-200">{service.title}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{service.iconName}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{service.order}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          service.isActive
                            ? 'bg-green-500 bg-opacity-10 text-green-400'
                            : 'bg-gray-700 bg-opacity-50 text-gray-400'
                        }`}
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal(service)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-[#4ADE80] hover:bg-[#4ADE80] hover:bg-opacity-10 transition-all mr-2"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(service.id);
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
          <div className="p-8 text-center text-gray-500">No services found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-200">
                {editingId ? 'Edit Service' : 'Add Service'}
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
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Icon Name *</label>
                  <input
                    type="text"
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    required
                    placeholder="e.g., Zap, Code, Shield"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Banner Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.bannerImageUrl}
                    onChange={(e) => setFormData({ ...formData, bannerImageUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
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
                <input
                  type="text"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              {/* Features */}
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-300">Features</label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm text-[#4ADE80] hover:text-green-400 transition-colors font-medium"
                  >
                    + Add Feature
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-lg space-y-3"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          placeholder="Feature Title"
                          className="px-3 py-2 bg-[#111111] border border-gray-700 rounded-lg text-gray-200 text-sm focus:border-[#4ADE80] focus:outline-none transition-colors"
                        />
                        <input
                          type="text"
                          value={feature.icon}
                          onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                          placeholder="Icon Name"
                          className="px-3 py-2 bg-[#111111] border border-gray-700 rounded-lg text-gray-200 text-sm focus:border-[#4ADE80] focus:outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded-lg text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        placeholder="Feature Description"
                        rows={2}
                        className="w-full px-3 py-2 bg-[#111111] border border-gray-700 rounded-lg text-gray-200 text-sm focus:border-[#4ADE80] focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex items-end">
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
              <h2 className="text-xl font-bold text-gray-200 mb-2">Delete Service</h2>
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
