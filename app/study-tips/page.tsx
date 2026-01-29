'use client';

import { useState } from 'react';
import StudyTipCard from '@/components/study-tips/StudyTipCard';
import StudyTipsCategoryFilter from '@/components/study-tips/StudyTipsCategoryFilter';
import { studyTipsData, studyTipsCategories } from '@/lib/studyTipsData';

export default function StudyTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTips = selectedCategory === 'all'
    ? studyTipsData
    : studyTipsData.filter(tip => tip.category === selectedCategory);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map((tip, index) => (
            <StudyTipCard
              key={index}
              title={tip.title}
              description={tip.description}
              tips={tip.tips}
            />
          ))}
        </div>

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