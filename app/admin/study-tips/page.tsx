'use client';

import { useState, useEffect, useCallback } from 'react';
import { StudyTip, fetchStudyTips, createStudyTip, updateStudyTip, deleteStudyTip, CreateStudyTipData, UpdateStudyTipData } from '@/lib/api/studyTips';
import StudyTipForm from '@/components/admin/StudyTipForm';
import StudyTipAdminCard from '@/components/admin/StudyTipAdminCard';

export default function AdminStudyTipsPage() {
  const [studyTips, setStudyTips] = useState<StudyTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingTip, setEditingTip] = useState<StudyTip | null>(null);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'preparation', label: 'Preparation' },
    { id: 'subjects', label: 'Subject-Wise' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'math', label: 'Mathematics' },
    { id: 'time-management', label: 'Time Management' },
    { id: 'exam-day', label: 'Exam Day' },
    { id: 'general', label: 'General' },
  ];

  const loadStudyTips = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchStudyTips(selectedCategory === 'all' ? undefined : selectedCategory);
      setStudyTips(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load study tips');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadStudyTips();
  }, [loadStudyTips]);

  const handleCreate = async (data: CreateStudyTipData) => {
    try {
      await createStudyTip(data);
      setShowForm(false);
      loadStudyTips();
    } catch (err) {
      alert('Failed to create study tip: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleUpdate = async (data: UpdateStudyTipData) => {
    if (!editingTip) return;
    try {
      await updateStudyTip(editingTip._id, data);
      setEditingTip(null);
      setShowForm(false);
      loadStudyTips();
    } catch (err) {
      alert('Failed to update study tip: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this study tip?')) return;
    try {
      await deleteStudyTip(id);
      loadStudyTips();
    } catch (err) {
      alert('Failed to delete study tip: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleEdit = (tip: StudyTip) => {
    setEditingTip(tip);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTip(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Study Tips</h1>
              <p className="text-gray-600 mt-2">Create, edit, and organize study tips for students</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003833] transition-colors"
            >
              {showForm ? 'Cancel' : '+ Add New Tip'}
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
              {editingTip ? 'Edit Study Tip' : 'Create New Study Tip'}
            </h2>
            <StudyTipForm
              initialData={editingTip || undefined}
              onSubmit={editingTip ? handleUpdate : handleCreate}
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
            <p className="mt-4 text-gray-600">Loading study tips...</p>
          </div>
        ) : (
          <>
            {/* Study Tips List */}
            {studyTips.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No study tips found. Create one to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studyTips.map((tip) => (
                  <StudyTipAdminCard
                    key={tip._id}
                    tip={tip}
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
