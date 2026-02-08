'use client';

import { useState } from 'react';

interface FAQFormData {
  category: string;
  question: string;
  answer: string;
}

interface FAQFormProps {
  initialData?: FAQFormData;
  onSubmit: (data: FAQFormData) => void;
  onCancel: () => void;
}

export default function FAQForm({ initialData, onSubmit, onCancel }: FAQFormProps) {
  const [category, setCategory] = useState(initialData?.category || 'general');
  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');

  const categories = [
    { id: 'exam', label: 'Exam' },
    { id: 'account', label: 'Account' },
    { id: 'payment', label: 'Payment' },
    { id: 'general', label: 'General' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !answer.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      category,
      question: question.trim(),
      answer: answer.trim(),
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

      {/* Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Question *
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B49] focus:border-transparent"
          placeholder="e.g., Is there negative marking?"
          required
        />
      </div>

      {/* Answer */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Answer *
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B49] focus:border-transparent resize-vertical"
          placeholder="Enter the detailed answer..."
          required
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003833] transition-colors"
        >
          {initialData ? 'Update' : 'Create'} FAQ
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
