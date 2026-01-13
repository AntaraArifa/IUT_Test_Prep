'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/auth/AuthModal';
import MockTestCard from '@/components/test-cards/MockTestCard';
import { useState, useEffect, useCallback } from 'react';
import PracticeTestCard from '@/components/test-cards/PracticeTestCard';
import TabSwitch from '@/components/ui/TabSwitch';
import SubjectFilter from '@/components/ui/SubjectFilter';
import { useRouter } from 'next/navigation';
import { fetchQuestionBanks, QuestionBank, getSubjectName, formatDuration, startTest } from '@/lib/api';

const subjectOptions = ['All Subjects', 'Physics', 'Chemistry', 'Mathematics', 'English'];

// Map frontend subject names to backend codes
const subjectCodeMap: { [key: string]: string } = {
  'Physics': 'phy',
  'Chemistry': 'chem',
  'Mathematics': 'math',
  'English': 'eng',
};

export default function MockTestPage() {
  const { showAuthModal, closeModal, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'previous' | 'practice'>('previous');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [previousYearTests, setPreviousYearTests] = useState<QuestionBank[]>([]);
  const [practiceTests, setPracticeTests] = useState<QuestionBank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch question banks when authenticated
  const loadQuestionBanks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'previous') {
        const data = await fetchQuestionBanks('prev_year');
        setPreviousYearTests(data);
      } else {
        const subjectCode = selectedSubject !== 'All Subjects' 
          ? subjectCodeMap[selectedSubject] 
          : undefined;
        const data = await fetchQuestionBanks('practice', subjectCode);
        setPracticeTests(data);
      }
    } catch (err) {
      const error = err as Error;
      // Don't show error if it's an authentication issue - protected route handles this
      if (!error.message.includes('sign in')) {
        setError(error.message || 'Failed to load tests');
      }
      console.error('Error loading question banks:', err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, selectedSubject]);

  useEffect(() => {
    if (isAuthenticated) {
      loadQuestionBanks();
    }
  }, [isAuthenticated, loadQuestionBanks]);

  const handleModalClose = () => {
    closeModal();
    router.push('/');
  };

  const handleStartTest = async (questionBankId: string) => {
    try {
      setLoading(true);
      const testSession = await startTest(questionBankId);
      // Navigate to exam page with testSessionId
      router.push(`/exam/${testSession.testSessionId}`);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to start test');
      if (error.message.includes('sign in')) {
        alert('Please sign in to start the test');
      } else {
        alert('Failed to start test. Please try again.');
      }
      setLoading(false);
    }
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

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Tabs Section */}
        <TabSwitch activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B49]"></div>
          </div>
        ) : (
          <>
            {/* Content based on active tab */}
            {activeTab === 'previous' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {previousYearTests.map((test) => (
                    <MockTestCard
                      key={test._id}
                      test={{
                        id: test._id,
                        year: test.year?.toString() || '',
                        title: test.title,
                        questions: test.totalQuestions,
                        duration: formatDuration(test.duration),
                        marks: test.totalQuestions,
                        subjects: test.subjects.map(getSubjectName),
                      }}
                      onStartTest={handleStartTest}
                    />
                  ))}
                </div>
                {previousYearTests.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <p className="text-gray-600">
                      No previous year tests available at the moment.
                    </p>
                  </div>
                )}
              </>
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
                  {practiceTests.map((test) => (
                    <PracticeTestCard
                      key={test._id}
                      test={{
                        id: test._id,
                        name: test.title,
                        title: test.title,
                        questions: test.totalQuestions,
                        duration: formatDuration(test.duration),
                        marks: test.totalQuestions,
                        subjects: test.subjects.map(getSubjectName),
                        primarySubject: test.subjects.length === 1 ? getSubjectName(test.subjects[0]) : 'All',
                      }}
                      onStartTest={handleStartTest}
                    />
                  ))}
                </div>

                {practiceTests.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <p className="text-gray-600">
                      No practice tests available for the selected subject.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
