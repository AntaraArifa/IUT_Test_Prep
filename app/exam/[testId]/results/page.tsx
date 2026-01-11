'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ExamData, Question } from '@/lib/examQuestions';
import QuestionCard from '@/components/exam/QuestionCard';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  const [examData, setExamData] = useState<ExamData | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Retrieve exam data from sessionStorage
    const storedData = sessionStorage.getItem(`exam-${testId}`);
    
    if (storedData) {
      const { answers, examData: storedExamData } = JSON.parse(storedData);
      setUserAnswers(answers);
      setExamData(storedExamData);

      // Calculate score with negative marking
      let correctCount = 0;
      let incorrectCount = 0;
      storedExamData.questions.forEach((question: Question) => {
        if (answers[question.id] !== undefined) {
          if (answers[question.id] === question.correctAnswer) {
            correctCount++;
          } else {
            incorrectCount++;
          }
        }
      });

      // +1 for correct, -0.25 for incorrect
      const totalScore = correctCount * 1 - incorrectCount * 0.25;
      const percent = (totalScore / storedExamData.totalMarks) * 100;

      setScore(Math.max(0, totalScore)); // Don't allow negative scores
      setPercentage(Math.round(Math.max(0, percent)));
    }
  }, [testId]);

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">No results found</h1>
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

  const correctCount = examData.questions.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;

  const incorrectCount = Object.keys(userAnswers).length - correctCount;
  const unansweredCount = examData.questions.length - Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Results Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Your Test Has Been Submitted Successfully!
            </h1>
            <div className="text-3xl font-semibold text-[#004B49] mb-1">
              Score: {score}/{examData.totalMarks}
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
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Detailed Answer Review
          </h2>
          
          <div className="space-y-6">
            {examData.questions.map((question, index) => {
              const userAnswer = userAnswers[question.id];
              const wasAnswered = userAnswer !== undefined;

              return (
                <div
                  key={question.id}
                  id={`question-${question.id}`}
                  className="scroll-mt-8"
                >
                  <QuestionCard
                    questionNumber={index + 1}
                    totalQuestions={examData.questions.length}
                    questionText={question.question}
                    options={question.options.map((opt, idx) => ({
                      id: String.fromCharCode(65 + idx),
                      text: opt,
                    }))}
                    selectedAnswer={wasAnswered ? String.fromCharCode(65 + userAnswer) : undefined}
                    correctAnswer={String.fromCharCode(65 + question.correctAnswer)}
                    isReviewMode={true}
                    explanation={question.explanation}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center pb-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
}
