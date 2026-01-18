'use client';

import { useCallback } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getTestSession, saveAnswer, submitTest, Question } from '@/lib/api';
import Timer from '@/components/exam/Timer';
import QuestionCard from '@/components/exam/QuestionCard';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const testSessionId = params.testId as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [endTime, setEndTime] = useState<string>('');
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingAnswer, setSavingAnswer] = useState(false);

  const loadTestSession = useCallback(async () => {
    try {
      setLoading(true);
      const session = await getTestSession(testSessionId);
      setQuestions(session.questions);
      setEndTime(session.endsAt);
      setLoading(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to load test');
      setLoading(false);
    }
  }, [testSessionId]);

  // Load test session
  useEffect(() => {
    loadTestSession();
  }, [loadTestSession]);

  // Calculate remaining time
  const getRemainingTime = (): number => {
    if (!endTime) return 0;
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const remaining = Math.max(0, Math.floor((end - now) / 1000));
    return remaining;
  };

  const handleAnswerSelect = async (questionId: string, optionText: string) => {
    // Update local state immediately
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));

    // Save to backend
    try {
      setSavingAnswer(true);
      await saveAnswer(testSessionId, questionId, optionText);
    } catch (err) {
      console.error('Failed to save answer:', err);
      // Don't show error to user, answer is saved locally
    } finally {
      setSavingAnswer(false);
    }
  };

  const handleSubmit = async () => {
    if (confirm('Are you sure you want to submit the test?')) {
      try {
        setIsTimerRunning(false);
        setLoading(true);
        await submitTest(testSessionId);
        
        // Navigate to results page with testSessionId
        router.push(`/exam/${testSessionId}/results`);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to submit test');
        alert('Failed to submit test. Please try again.');
        setLoading(false);
        setIsTimerRunning(true);
      }
    }
  };

  const handleTimeUp = async () => {
    alert('Time is up! Your test will be submitted automatically.');
    setIsTimerRunning(false);
    try {
      await submitTest(testSessionId);
      router.push(`/exam/${testSessionId}/results`);
    } catch {
      alert('Failed to auto-submit test. Please submit manually.');
    }
  };

  if (loading && !questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B49] mx-auto mb-4"></div>
          <p className="text-black">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Test</h1>
          <p className="text-black mb-6">{error}</p>
          <button
            onClick={() => router.push('/mock-test')}
            className="px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003333]"
          >
            Back to Mock Tests
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
          <h1 className="text-xl font-bold text-[#004B49]">Mock Test</h1>
          <div className="flex items-center gap-4">
            {savingAnswer && (
              <span className="text-sm text-black flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#004B49]"></div>
                Saving...
              </span>
            )}
            <Timer
              initialTime={getRemainingTime()}
              onTimeUp={handleTimeUp}
              isRunning={isTimerRunning}
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-[#8BA8A3] rounded-xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Read the instructions carefully</h2>
          <ul className="space-y-2 text-sm">
            <li>• Select the best answer for each multiple-choice question.</li>
            <li>• For each correct answer marks will be +1, and for each incorrect answer -0.25 will be deducted</li>
            <li>• Your answers are auto-saved as you select them.</li>
            <li>• Click Submit when you&apos;re finished.</li>
            <li>• Once submitted, you cannot change your answers.</li>
          </ul>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.questionId} id={`question-${question.questionId}`}>
              <QuestionCard
                questionNumber={index + 1}
                totalQuestions={questions.length}
                questionText={question.stem}
                options={question.options.map((opt, idx) => ({
                  id: String.fromCharCode(65 + idx),
                  text: opt,
                }))}
                selectedAnswer={
                  selectedAnswers[question.questionId]
                    ? String.fromCharCode(
                        65 + question.options.indexOf(selectedAnswers[question.questionId])
                      )
                    : undefined
                }
                onSelectAnswer={(optionId: string) => {
                  const optionIndex = optionId.charCodeAt(0) - 65;
                  handleAnswerSelect(question.questionId, question.options[optionIndex]);
                }}
                isReviewMode={false}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="text-black">
              <p className="font-semibold">
                Answered: {Object.keys(selectedAnswers).length} / {questions.length}
              </p>
              <p className="text-sm text-black mt-1">
                Make sure you&apos;ve answered all questions before submitting
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-[#004B49] text-white rounded-lg font-semibold hover:bg-[#003333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
