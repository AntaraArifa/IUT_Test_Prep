'use client';

import { useState, useEffect } from 'react';
import StudyTipCard from '@/components/study-tips/StudyTipCard';
import StudyTipsCategoryFilter from '@/components/study-tips/StudyTipsCategoryFilter';
import { fetchStudyTips, StudyTip } from '@/lib/api/studyTips';

export default function StudyTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studyTips, setStudyTips] = useState<StudyTip[]>([]);
  const [loading, setLoading] = useState(true);

  const studyTipsCategories = [
    { id: 'all', label: 'All Tips' },
    { id: 'preparation', label: 'Preparation' },
    { id: 'subjects', label: 'Subject-Wise' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'math', label: 'Mathematics' },
    { id: 'time-management', label: 'Time Management' },
    { id: 'exam-day', label: 'Exam Day' },
    { id: 'general', label: 'General' },
  ];

  useEffect(() => {
    const loadStudyTips = async () => {
      try {
        setLoading(true);
        const data = await fetchStudyTips(selectedCategory === 'all' ? undefined : selectedCategory);
        setStudyTips(data);
      } catch (error) {
        console.error('Failed to load study tips:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStudyTips();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Tips & Strategies
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert strategies and proven techniques to help you excel in your IUT admission test preparation
          </p>
        </div>

        {/* Category Filter */}
        <StudyTipsCategoryFilter 
          categories={studyTipsCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Study Tips Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#004B49] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading study tips...</p>
          </div>
        ) : studyTips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No study tips found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studyTips.map((tip) => (
              <StudyTipCard
                key={tip._id}
                title={tip.title}
                description={tip.subtitle}
                tips={tip.details}
              />
            ))}
          </div>
        )}

        {/* Motivational Footer */}
        <div className="mt-12 bg-gradient-to-r from-[#004B49] to-[#006666] rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Your Success Starts with Smart Preparation!
          </h2>
          <p className="text-white text-lg mb-6">
            Remember: Consistency, practice, and a positive mindset are your best tools for success.
          </p>
          <a
            href="/mock-test"
            className="inline-block px-8 py-3 bg-white text-[#004B49] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Practicing Now
          </a>
        </div>
      </div>
    </div>
  );
}