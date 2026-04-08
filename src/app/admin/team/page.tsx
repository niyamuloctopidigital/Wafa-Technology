'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  email?: string;
  department?: string;
  imageUrl?: string;
  isLeader: boolean;
  linkedin?: string;
  twitter?: string;
  github?: string;
  order: number;
  isActive: boolean;
}

interface FormData {
  name: string;
  role: string;
  bio: string;
  email: string;
  department: string;
  imageUrl: string;
  isLeader: boolean;
  linkedin: string;
  twitter: string;
  github: string;
  order: number;
  isActive: boolean;
}

const initialFormData: FormData = {
  name: '',
  role: '',
  bio: '',
  email: '',
  department: '',
  imageUrl: '',
  isLeader: false,
  linkedin: '',
  twitter: '',
  github: '',
  order: 0,
  isActive: true,
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'team' | 'leader'>('team');

  // Fetch team members
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/team');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const members = (data.data || []).map((member: any) => ({
        ...member,
        id: member._id || member.id,
        imageUrl: member.image || member.imageUrl || '',
      }));
      setMembers(members);
    } catch (err) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members
    .filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((member) =>
      activeCategory === 'leader' ? member.isLeader : !member.isLeader
    );

  const handleOpenModal = (member?: TeamMember) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio || '',
        email: member.email || '',
        department: member.department || '',
        imageUrl: member.imageUrl || '',
        isLeader: member.isLeader,
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
        github: member.github || '',
        order: member.order,
        isActive: member.isActive,
      });
      setActiveCategory(member.isLeader ? 'leader' : 'team');
    } else {
      setEditingId(null);
      setFormData({
        ...initialFormData,
        isLeader: activeCategory === 'leader',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingId ? `/api/team/${editingId}` : '/api/team';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        image: formData.imageUrl,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to save');
      }

      toast.success(editingId ? 'Member updated' : 'Member added');
      handleCloseModal();
      fetchMembers();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/team/${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Member deleted');
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchMembers();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to delete member');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-200">Team Management</h1>
            <p className="text-gray-500 mt-1">Add leaders, experts, and department-based team members.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-green-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <FiPlus className="w-5 h-5" />
            Add {activeCategory === 'leader' ? 'Leader' : 'Team Member'}
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory('team')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === 'team'
                ? 'bg-[#4ADE80] text-black'
                : 'bg-[#111111] text-gray-400 hover:bg-[#1f1f1f]'
            }`}
          >
            Team Members
          </button>
          <button
            onClick={() => setActiveCategory('leader')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === 'leader'
                ? 'bg-[#4ADE80] text-black'
                : 'bg-[#111111] text-gray-400 hover:bg-[#1f1f1f]'
            }`}
          >
            Leaders
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-200 placeholder-gray-600 focus:border-[#4ADE80] focus:outline-none transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filteredMembers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a] border-b border-gray-800">
                <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-gray-800 hover:bg-[#0a0a0a] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                                {member.imageUrl && (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-700"
                          />
                        )}
                        <p className="font-medium text-gray-200">{member.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{member.role}</td>
                    <td className="px-6 py-4 text-gray-400">{member.department || (member.isLeader ? 'Leadership' : 'General')}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          member.isActive
                            ? 'bg-green-500 bg-opacity-10 text-green-400'
                            : 'bg-gray-700 bg-opacity-50 text-gray-400'
                        }`}
                      >
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal(member)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-[#4ADE80] hover:bg-[#4ADE80] hover:bg-opacity-10 transition-all mr-2"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(member.id);
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
          <div className="p-8 text-center text-gray-500">No team members found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-200">
                {editingId ? 'Edit Member' : 'Add Member'}
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role / Profession *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. UI/UX, Marketing, DevOps"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isLeader}
                    onChange={(e) => setFormData({ ...formData, isLeader: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  Leader
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
                  />
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
              <h2 className="text-xl font-bold text-gray-200 mb-2">Delete Member</h2>
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
