'use client';

import { useState } from 'react';

interface StudyTipFormData {
  category: string;
  title: string;
  subtitle: string;
  details: string[];
}

interface StudyTipFormProps {
  initialData?: StudyTipFormData;
  onSubmit: (data: StudyTipFormData) => void;
  onCancel: () => void;
}

export default function StudyTipForm({ initialData, onSubmit, onCancel }: StudyTipFormProps) {
  const [category, setCategory] = useState(initialData?.category || 'preparation');
  const [title, setTitle] = useState(initialData?.title || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [details, setDetails] = useState<string[]>(initialData?.details || ['']);

  const categories = [
    { id: 'preparation', label: 'Preparation' },
    { id: 'subjects', label: 'Subject-Wise' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'math', label: 'Mathematics' },
    { id: 'time-management', label: 'Time Management' },
    { id: 'exam-day', label: 'Exam Day' },
    { id: 'general', label: 'General' },
  ];

  const handleAddDetail = () => {
    setDetails([...details, '']);
  };

  const handleRemoveDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty details
    const filteredDetails = details.filter(d => d.trim() !== '');
    
    if (!title.trim() || !subtitle.trim() || filteredDetails.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      category,
      title: title.trim(),
      subtitle: subtitle.trim(),
      details: filteredDetails,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B49] focus:border-transparent"
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B49] focus:border-transparent"
          placeholder="e.g., Master Kinematics Faster"
          required
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subtitle *
        </label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B49] focus:border-transparent"
          placeholder="Short description"
          required
        />
      </div>

      {/* Details */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Tips/Details * (at least one required)
          </label>
          <button
            type="button"
            onClick={handleAddDetail}
            className="text-sm text-[#004B49] hover:underline"
          >
            + Add Tip
          </button>
        </div>
        <div className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={detail}
                onChange={(e) => handleDetailChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B49] focus:border-transparent"
                placeholder={`Tip ${index + 1}`}
              />
              {details.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDetail(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003833] transition-colors"
        >
          {initialData ? 'Update' : 'Create'} Study Tip
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
