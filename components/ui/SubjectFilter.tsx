'use client';
import { useState } from 'react';

interface SubjectFilterProps {
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  subjects: string[];
}

export default function SubjectFilter({
  selectedSubject,
  onSubjectChange,
  subjects,
}: SubjectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 bg-[#004B49] rounded-xl p-6">
      <label className="block text-sm font-semibold text-white mb-3">
        Subject:
      </label>
      <div className="relative w-1/2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border-none rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-900">{selectedSubject}</span>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

            {/* Dropdown Menu - Same width as button */}
            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    onSubjectChange(subject);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    selectedSubject === subject
                      ? 'bg-[#004B49] text-white hover:bg-[#003333]'
                      : 'text-gray-900'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}