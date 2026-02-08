'use client';

import { useState, useEffect, useCallback } from 'react';
import { FAQ, fetchFAQs, createFAQ, updateFAQ, deleteFAQ, CreateFAQData, UpdateFAQData } from '@/lib/api/faqs';
import FAQForm from '@/components/admin/FAQForm';
import FAQAdminCard from '@/components/admin/FAQAdminCard';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'exam', label: 'Exam' },
    { id: 'account', label: 'Account' },
    { id: 'payment', label: 'Payment' },
    { id: 'general', label: 'General' },
  ];

  const loadFAQs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFAQs(selectedCategory === 'all' ? undefined : selectedCategory);
      setFaqs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadFAQs();
  }, [loadFAQs]);

  const handleCreate = async (data: CreateFAQData) => {
    try {
      await createFAQ(data);
      setShowForm(false);
      loadFAQs();
    } catch (err) {
      alert('Failed to create FAQ: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleUpdate = async (data: UpdateFAQData) => {
    if (!editingFaq) return;
    try {
      await updateFAQ(editingFaq._id, data);
      setEditingFaq(null);
      setShowForm(false);
      loadFAQs();
    } catch (err) {
      alert('Failed to update FAQ: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      loadFAQs();
    } catch (err) {
      alert('Failed to delete FAQ: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingFaq(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage FAQs</h1>
              <p className="text-gray-600 mt-2">Create, edit, and organize frequently asked questions</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003833] transition-colors"
            >
              {showForm ? 'Cancel' : '+ Add New FAQ'}
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#004B49] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
            </h2>
            <FAQForm
              initialData={editingFaq || undefined}
              onSubmit={editingFaq ? handleUpdate : handleCreate}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#004B49] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading FAQs...</p>
          </div>
        ) : (
          <>
            {/* FAQs List */}
            {faqs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No FAQs found. Create one to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <FAQAdminCard
                    key={faq._id}
                    faq={faq}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
