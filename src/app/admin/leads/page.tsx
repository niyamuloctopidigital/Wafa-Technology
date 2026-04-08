'use client';

import { useEffect, useState } from 'react';
import { FiTrash2, FiSearch, FiX, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  new: { color: 'blue', label: 'New', bgColor: 'bg-blue-500' },
  contacted: { color: 'yellow', label: 'Contacted', bgColor: 'bg-yellow-500' },
  qualified: { color: 'green', label: 'Qualified', bgColor: 'bg-green-500' },
  closed: { color: 'gray', label: 'Closed', bgColor: 'bg-gray-500' },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch leads
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leads');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const normalized = (data.data || []).map((lead: any) => ({
        ...lead,
        id: lead.id || lead._id,
      }));
      setLeads(normalized);
    } catch (err) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailModal(true);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update');

      toast.success('Status updated');
      fetchLeads();
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus as Lead['status'] });
      }
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/leads/${deletingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Lead deleted');
      setShowDeleteModal(false);
      setDeletingId(null);
      setShowDetailModal(false);
      fetchLeads();
    } catch (err) {
      toast.error('Failed to delete lead');
    }
  };

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-200">Leads</h1>
            <p className="text-gray-500 mt-1">Manage contact submissions</p>
          </div>
          <div className="px-4 py-2 bg-[#111111] border border-gray-800 rounded-lg">
            <div className="text-sm text-gray-400">New Leads</div>
            <div className="text-2xl font-bold text-[#4ADE80]">{newLeadsCount}</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-200 placeholder-gray-600 focus:border-[#4ADE80] focus:outline-none transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filteredAndSortedLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a] border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedLeads.map((lead) => {
                  const statusConfig_ = statusConfig[lead.status];
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-gray-800 hover:bg-[#0a0a0a] transition-colors cursor-pointer"
                      onClick={() => handleViewDetails(lead)}
                    >
                      <td className="px-6 py-4 font-medium text-gray-200">{lead.name}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{lead.email}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{lead.company || '-'}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{lead.service || '-'}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${statusConfig_.bgColor} bg-opacity-10 text-${statusConfig_.color}-400`}
                        >
                          {statusConfig_.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingId(lead.id);
                            setShowDeleteModal(true);
                          }}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400 hover:bg-opacity-10 transition-all"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">No leads found</div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-200">{selectedLead.name}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <p className="text-gray-200 break-all">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                  <p className="text-gray-200">{selectedLead.company || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Service Interested</label>
                  <p className="text-gray-200">{selectedLead.service || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                  <div className="relative inline-block w-full">
                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                      disabled={updatingStatus}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-200 focus:border-[#4ADE80] focus:outline-none transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <div className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 whitespace-pre-wrap">
                    {selectedLead.message}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-gray-400 mb-1">Received</label>
                  <p className="text-gray-300">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Last Updated</label>
                  <p className="text-gray-300">
                    {new Date(selectedLead.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-800">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-gray-300 hover:border-gray-600 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setDeletingId(selectedLead.id);
                    setShowDeleteModal(true);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Delete Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-gray-800 rounded-lg max-w-sm w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-200 mb-2">Delete Lead</h2>
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
