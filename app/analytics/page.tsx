'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReadinessScore from '@/components/analytics/ReadinessScore';
import QuickStats from '@/components/analytics/QuickStats';
import ProficiencyList from '@/components/analytics/ProficiencyList';
import AICoachInsights from '@/components/analytics/AICoachInsights';
import ExamHistory from '@/components/analytics/ExamHistory';
import { dummyAnalyticsData } from '@/lib/analyticsData';

export default function AnalyticsPage() {
  const { showAuthModal, closeModal, isAuthenticated } = useProtectedRoute();
  const router = useRouter();

  useEffect(() => {
    // If modal is shown, redirect when closed without auth
    if (showAuthModal && !isAuthenticated) {
      // Will be handled by modal close action
    }
  }, [showAuthModal, isAuthenticated]);

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
        {/* Top Section: Readiness Score + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ReadinessScore score={dummyAnalyticsData.readinessScore} />
          <QuickStats
            accuracy={dummyAnalyticsData.accuracy}
            avgSpeed={dummyAnalyticsData.avgSpeed}
          />
        </div>

        {/* Proficiency Section */}
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

        {/* AI Coach Insights */}
        <div className="mb-6">
          <AICoachInsights insights={dummyAnalyticsData.insights} />
        </div>

        {/* Exam History */}
        <div>
          <ExamHistory exams={dummyAnalyticsData.examHistory} />
        </div>
      </div>
    </div>
  );
}
