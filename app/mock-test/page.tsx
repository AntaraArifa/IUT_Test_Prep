'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/AuthModal';
import MockTestCard from '@/components/MockTestCard';
import TabSwitch from '@/components/TabSwitch';
import EmptyState from '@/components/EmptyState.jsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockTests } from '@/lib/mockTestCardData';

export default function MockTestPage() {
  const { showAuthModal, closeModal, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'previous' | 'practice'>('previous');

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
    // Navigate to test page (to be implemented)
    console.log('Starting test:', testId);
    // router.push(`/mock-test/${testId}`);
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

        {/* Mock Test Cards Grid */}
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
          <EmptyState />
        )}
      </div>
    </div>
  );
}
