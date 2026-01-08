'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { examDatasets, ExamData } from '@/lib/examQuestions';
import Timer from '@/components/Timer';
import QuestionCard from '@/components/QuestionCard';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  const [examData, setExamData] = useState<ExamData | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    const data = examDatasets[testId];
    setExamData(data || null);
  }, [testId]);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (confirm('Are you sure you want to submit the test?')) {
      // Store answers in sessionStorage for results page
      sessionStorage.setItem(
        `exam-${testId}`,
        JSON.stringify({
          answers: selectedAnswers,
          examData: examData,
        })
      );
      router.push(`/exam/${testId}/results`);
    }
  };

  const handleTimeUp = () => {
    alert('Time is up! Your test will be submitted automatically.');
    setIsTimerRunning(false);
    handleSubmit();
  };

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003333]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#004B49]">{examData.title}</h1>
          <Timer
            initialTime={examData.duration}
            onTimeUp={handleTimeUp}
            isRunning={isTimerRunning}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-[#8BA8A3] rounded-xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Read the instructions carefully</h2>
          <ul className="space-y-2 text-sm">
            <li>• You have <strong>{examData.duration / 60} minutes</strong> to complete this quiz.</li>
            <li>• Select the best answer for each multiple-choice question.</li>
            <li>• For each correct answer marks will be +1, and for each incorrect answer -0.25 will be deducted</li>
            <li>• Click Submit on the last when you&apos;re finished.</li>
            <li>• Once submitted, you cannot change your answers.</li>
          </ul>
          <p className="mt-4 font-semibold">Time: {examData.duration / 60} minutes</p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {examData.questions.map((question, index) => (
            <div key={question.id} id={`question-${question.id}`}>
              <QuestionCard
                questionNumber={index + 1}
                totalQuestions={examData.questions.length}
                questionText={question.question}
                options={question.options.map((opt, idx) => ({
                  id: String.fromCharCode(65 + idx),
                  text: opt,
                }))}
                selectedAnswer={
                  selectedAnswers[question.id] !== undefined
                    ? String.fromCharCode(65 + selectedAnswers[question.id])
                    : undefined
                }
                onSelectAnswer={(optionId: string) =>
                  handleAnswerSelect(question.id, optionId.charCodeAt(0) - 65)
                }
                isReviewMode={false}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-700">
              <p className="font-semibold">
                Answered: {Object.keys(selectedAnswers).length} / {examData.questions.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Make sure you&apos;ve answered all questions before submitting
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-[#004B49] text-white rounded-lg font-semibold hover:bg-[#003333] transition-colors"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
