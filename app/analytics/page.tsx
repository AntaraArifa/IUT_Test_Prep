'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/AuthModal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-[#004B49] mb-8">Analytics</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600">
            Analytics dashboard will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
}
