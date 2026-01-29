'use client';

import { useState } from 'react';
import FAQItem from '@/components/faq/FAQItem';
import CategoryFilter from '@/components/faq/CategoryFilter';
import { faqData, faqCategories } from '@/lib/faqData';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about IUT TestPrep
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={faqCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-[#004B49] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Still have questions?
          </h2>
          <p className="text-white mb-6">
            Can't find the answer you're looking for? Feel free to reach out to our support team.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-[#004B49] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
