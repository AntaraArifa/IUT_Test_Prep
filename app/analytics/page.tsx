'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReadinessScore from '@/components/analytics/ReadinessScore';
import QuickStats from '@/components/analytics/QuickStats';
import ProficiencyList from '@/components/analytics/ProficiencyList';
import AICoachInsights from '@/components/analytics/AICoachInsights';
import ExamHistory from '@/components/analytics/ExamHistory';
import { fetchTestHistory, TestHistoryItem, fetchCoachInsights, CoachInsight, TestDataForCoach } from '@/lib/api';
import { dummyAnalyticsData } from '@/lib/analyticsData';

export default function AnalyticsPage() {
  const { showAuthModal, closeModal, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  const [examHistory, setExamHistory] = useState<TestHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate analytics from real exam history
  const [readinessScore, setReadinessScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState('0 min/test');
  const [aiInsights, setAiInsights] = useState<CoachInsight[]>([]);
  const [aiInsightsLoading, setAiInsightsLoading] = useState(false);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      // Fetch test history (all results for analytics)
      const historyData = await fetchTestHistory(1, 50);
      setExamHistory(historyData.data);

      // Calculate real analytics
      if (historyData.data.length > 0) {
        // Calculate accuracy
        const totalScore = historyData.data.reduce((sum, exam) => sum + exam.score, 0);
        const totalQuestions = historyData.data.reduce((sum, exam) => sum + exam.total, 0);
        const calcAccuracy = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
        setAccuracy(Math.round(calcAccuracy));

        // Calculate average speed
        const totalTime = historyData.data.reduce((sum, exam) => sum + exam.timeTakenMinutes, 0);
        const avgTime = Math.round(totalTime / historyData.data.length);
        setAvgSpeed(`${avgTime} min/test`);

        // Calculate readiness score (based on recent performance)
        // Use last 5 tests for readiness
        const recentTests = historyData.data.slice(0, 5);
        const recentScore = recentTests.reduce((sum, exam) => sum + exam.score, 0);
        const recentTotal = recentTests.reduce((sum, exam) => sum + exam.total, 0);
        const calcReadiness = recentTotal > 0 ? (recentScore / recentTotal) * 100 : 0;
        setReadinessScore(Math.round(calcReadiness));

        // Load AI coach insights from recent tests
        loadAIInsights(historyData.data);
      }

      setLoading(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to load analytics');
      setLoading(false);
    }
  };

  const loadAIInsights = async (history: TestHistoryItem[]) => {
    try {
      setAiInsightsLoading(true);
      
      // Backend fetches user's recent tests automatically
      if (history.length > 0) {
        const insights = await fetchCoachInsights();
        setAiInsights(insights);
      } else {
        // No test history, set empty array
        setAiInsights([]);
      }
    } catch (err) {
      console.log('AI insights not available, using dummy data:', err);
      // Set empty array to trigger dummy data fallback in render
      setAiInsights([]);
    } finally {
      setAiInsightsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      void loadAnalyticsData();
    }
  }, [isAuthenticated]);

  const handleModalClose = () => {
    closeModal();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={handleModalClose} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your progress and improve your performance</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B49]"></div>
          </div>
        ) : examHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Test History Yet</h3>
            <p className="text-gray-600 mb-6">
              Take your first mock test to see your analytics and track your progress
            </p>
            <button
              onClick={() => router.push('/mock-test')}
              className="px-6 py-3 bg-[#004B49] text-white rounded-lg font-semibold hover:bg-[#003333]"
            >
              Take a Mock Test
            </button>
          </div>
        ) : (
          <>
            {/* Top Section: Readiness Score + Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ReadinessScore score={readinessScore} />
              <QuickStats accuracy={accuracy} avgSpeed={avgSpeed} />
            </div>

            {/* Proficiency Section - Using dummy data for now (will be calculated from subject-wise performance later) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ProficiencyList
                title="Subject Proficiency"
                items={dummyAnalyticsData.subjectProficiency}
              />
              <ProficiencyList
                title="Topic Proficiency"
                items={dummyAnalyticsData.topicProficiency}
              />
            </div>

            {/* AI Coach Insights - Real AI data */}
            <div className="mb-6">
              {aiInsightsLoading ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-green-700 font-medium">Generating AI insights...</p>
                </div>
              ) : aiInsights.length > 0 ? (
                <AICoachInsights insights={aiInsights
                  .filter(insight => insight.tag === 'critical' || insight.tag === 'warning')
                  .map(insight => ({
                    type: insight.tag as 'critical' | 'warning',
                    title: insight.tag === 'critical' ? 'Critical' : 'Warning',
                    message: insight.message,
                  }))} />
              ) : (
                <AICoachInsights insights={dummyAnalyticsData.insights} />
              )}
            </div>

            {/* Exam History - Real data from API */}
            <div>
              <ExamHistory exams={examHistory.map(exam => ({
                id: exam.testSessionId,
                name: exam.examName,
                date: new Date(exam.submittedAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }),
                score: `${exam.score}/${exam.total}`,
                timeTaken: `${exam.timeTakenMinutes} min`,
              }))} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
