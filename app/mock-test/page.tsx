'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/auth/AuthModal';
import MockTestCard from '@/components/test-cards/MockTestCard';
import PracticeTestCard from '@/components/test-cards/PracticeTestCard';
import TabSwitch from '@/components/ui/TabSwitch';
import SubjectFilter from '@/components/ui/SubjectFilter';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { mockTests } from '@/lib/mockTestCardData';
import { practiceTests, subjectOptions } from '@/lib/practiceTestData';

export default function MockTestPage() {
  const { showAuthModal, closeModal, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'previous' | 'practice'>('previous');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');

  useEffect(() => {
    if (showAuthModal && !isAuthenticated) {
      // Will be handled by modal close action
    }
  }, [showAuthModal, isAuthenticated]);

  const handleModalClose = () => {
    closeModal();
    router.push('/');
  };

  const handleStartTest = (testId: string) => {
    // Navigate to test page
    console.log('Starting test:', testId);
    router.push(`/exam/${testId}`);
  };

  // Filter practice tests based on selected subject
  const filteredPracticeTests = useMemo(() => {
    if (selectedSubject === 'All Subjects') {
      return practiceTests;
    }
    return practiceTests.filter(
      (test) => test.primarySubject === selectedSubject || test.primarySubject === 'All'
    );
  }, [selectedSubject]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Mock Tests
          </h1>
          <p className="text-black text-sm md:text-base">
            Practice with previous year questions and custom question banks
          </p>
        </div>

        {/* Tabs Section */}
        <TabSwitch activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content based on active tab */}
        {activeTab === 'previous' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mockTests.map((test) => (
              <MockTestCard
                key={test.id}
                test={test}
                onStartTest={handleStartTest}
              />
            ))}
          </div>
        ) : (
          <>
            {/* Subject Filter for Practice Tests */}
            <SubjectFilter
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
              subjects={subjectOptions}
            />

            {/* Practice Test Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredPracticeTests.map((test) => (
                <PracticeTestCard
                  key={test.id}
                  test={test}
                  onStartTest={handleStartTest}
                />
              ))}
            </div>

            {filteredPracticeTests.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600">
                  No practice tests available for the selected subject.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
