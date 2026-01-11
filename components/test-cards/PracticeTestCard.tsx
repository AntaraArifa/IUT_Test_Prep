import { PracticeTest } from '@/lib/practiceTestData';

interface PracticeTestCardProps {
  test: PracticeTest;
  onStartTest: (testId: string) => void;
}

export default function PracticeTestCard({ test, onStartTest }: PracticeTestCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-[#004B49] shadow-sm hover:shadow-md transition-shadow p-5">
      {/* Test Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {test.title}
      </h3>

      {/* Test Info Icons */}
      <div className="flex items-center gap-4 mb-4 text-sm text-black">
        {/* Questions */}
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-[#004B49]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>{test.questions} ques</span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-[#004B49]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{test.duration}</span>
        </div>

        {/* Marks */}
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-[#004B49]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>{test.marks} marks</span>
        </div>
      </div>

      {/* Subject Distribution */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-black mb-3">
          Subject Distribution:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {test.subjects.map((subject) => (
            <button
              key={subject}
              className="px-3 py-1.5 text-sm font-medium text-black bg-white border border-[#004B49] rounded-lg hover:bg-gray-50 transition-colors"
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Start Test Button */}
      <button
        onClick={() => onStartTest(test.id)}
        className="bg-[#004B49] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#003333] transition-all hover:shadow-lg transform hover:-translate-y-0.5 text-sm mx-auto block"
      >
        Start Test
      </button>
    </div>
  );
}
