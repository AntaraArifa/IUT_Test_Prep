'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchTestDetail, QuestionDetail, getSubjectName } from '@/lib/api';
import QuestionCard from '@/components/exam/QuestionCard';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const testSessionId = params.testId as string;

  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTestResults();
  }, [testSessionId]);

  const loadTestResults = async () => {
    try {
      setLoading(true);
      const data = await fetchTestDetail(testSessionId);
      
      setExamName(data.examName);
      setQuestions(data.questions);
      setScore(data.score);
      setTotal(data.total);
      
      // Calculate percentage
      const percent = (data.score / data.total) * 100;
      setPercentage(Math.round(Math.max(0, percent)));
      
      setLoading(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to load results');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B49] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Failed to Load Results</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/mock-test')}
            className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003333]"
          >
            Go to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  const correctCount = questions.filter((q) => q.isCorrect === true).length;
  const incorrectCount = questions.filter((q) => q.isCorrect === false).length;
  const unansweredCount = questions.filter((q) => q.isCorrect === null).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Results Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Your Test Has Been Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-4">{examName}</p>
            <div className="text-3xl font-semibold text-[#004B49] mb-1">
              Score: {score}/{total}
            </div>
            <div className="text-md text-gray-600">
              ({percentage}%)
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold text-green-600 mb-1">
                {correctCount}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold text-red-600 mb-1">
                {incorrectCount}
              </div>
              <div className="text-sm text-gray-600">Incorrect Answers</div>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold text-gray-600 mb-1">
                {unansweredCount}
              </div>
              <div className="text-sm text-gray-600">Unanswered</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/analytics')}
              className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003333]"
            >
              View Analytics
            </button>
            <button
              onClick={() => router.push('/mock-test')}
              className="px-6 py-2 border-2 border-[#004B49] text-[#004B49] rounded-lg hover:bg-gray-50"
            >
              Take Another Test
            </button>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Answer Review</h2>
          
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.questionId} className="border-b pb-6 last:border-b-0">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      Question {index + 1} of {questions.length}
                      {question.subject && (
                        <span className="ml-2 text-[#004B49]">
                          ({getSubjectName(question.subject)})
                        </span>
                      )}
                    </div>
                    <p className="text-gray-900">{question.stem}</p>
                  </div>
                  {question.isCorrect === true && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold whitespace-nowrap">
                      ✓ Correct
                    </span>
                  )}
                  {question.isCorrect === false && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold whitespace-nowrap">
                      ✗ Incorrect
                    </span>
                  )}
                  {question.isCorrect === null && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap">
                      - Unanswered
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, optIdx) => {
                    const isCorrect = option === question.correctAnswer;
                    const isSelected = option === question.selectedAnswer;
                    
                    let bgColor = 'bg-white border-gray-300';
                    if (isCorrect) {
                      bgColor = 'bg-green-50 border-green-500';
                    } else if (isSelected && !isCorrect) {
                      bgColor = 'bg-red-50 border-red-500';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center p-3 border-2 rounded-lg ${bgColor}`}
                      >
                        <span className="font-semibold mr-3 text-gray-700">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className={`flex-1 ${isCorrect ? 'font-semibold text-green-700' : ''}`}>
                          {option}
                        </span>
                        {isCorrect && (
                          <span className="text-green-600 font-semibold ml-2">
                            ✓ Correct Answer
                          </span>
                        )}
                        {isSelected && !isCorrect && (
                          <span className="text-red-600 font-semibold ml-2">
                            Your Answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
