'use client';

import { useState } from 'react';
import Hero from '@/components/landing/Hero';
import Card from '@/components/ui/Card';
import HowItWorksStep from '@/components/landing/HowItWorksStep';
import Tab from '@/components/ui/Tab';
import QuestionCard from '@/components/exam/QuestionCard';
import Timer from '@/components/exam/Timer';
import { mockQuestions } from '@/lib/mockData';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const handleSelectAnswer = (optionId: string) => {
    setUserAnswers({
      ...userAnswers,
      [mockQuestions[currentQuestion].id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsTestSubmitted(true);
    setCurrentQuestion(0); // Reset to first question for review
    setActiveTab(1); // Switch to Review Mode
  };

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleClearResponse = () => {
    const newAnswers = { ...userAnswers };
    delete newAnswers[mockQuestions[currentQuestion].id];
    setUserAnswers(newAnswers);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Why Take Preparation with Us Section */}
      <section className="py-20 bg-gray-50 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 lg:max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#004B49] mb-4">
              You can take your preparation with us
            </h2>
            <p className="text-lg text-gray-600">
              Three powerful pillars to supercharge your preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Real Simulation"
              description="Experience authentic exam conditions with timed tests, realistic question patterns, and pressure management. Auto-save ensures you never lose progress."
              icon={
                <div className="w-12 h-12 bg-[#004B49]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#004B49]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              }
            />
            <Card
              title="Smart Analytics"
              description="Track your performance over time with detail-ed insights. Visualize your strengths, identify weak areas, and monitor improvement trends."
              icon={
                <div className="w-12 h-12 bg-[#004B49]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#004B49]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              }
            />
            <Card
              title="Adaptive Learning"
              description="Questions automatically adjust to your skill level. Focus on areas that need improvement with personalized difficulty recommendations."
              icon={
                <div className="w-12 h-12 bg-[#004B49]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#004B49]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* See It In Action Section */}
      <section id="see-it-in-action" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#004B49] mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-gray-600">
              Experience the platform before you sign up
            </p>
          </div>

          {/* Tabs */}
          <Tab
            tabs={['Live Test Interface', 'Review Mode']}
            activeTab={activeTab}
            onTabChange={(index) => {
              // Only allow switching to Review Mode if test is submitted
              if (index === 1 && !isTestSubmitted) {
                return;
              }
              setActiveTab(index);
              if (index === 0) {
                // Reset test when going back to Live Test
                setIsTestSubmitted(false);
                setIsTestStarted(false);
                setCurrentQuestion(0);
                setUserAnswers({});
              }
            }}
          />

          {/* Live Test Interface */}
          {activeTab === 0 && (
            <div>
              {/* Test Header with Start Button */}
              {!isTestStarted ? (
                <div className="border-2 border-[#004B49] rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-[#004B49] mb-4">
                    Mock Test - Physics
                  </h3>
                  <p className="text-gray-600 mb-6">
                    5 questions • 3 minutes • Click below to begin
                  </p>
                  <button
                    onClick={handleStartTest}
                    className="px-8 py-3 bg-[#004B49] text-white rounded-md hover:bg-[#003333] transition-colors font-medium text-lg"
                  >
                    Start Test
                  </button>
                </div>
              ) : (
                <>
                  {/* Timer and Test Info */}
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <p className="text-sm text-gray-700">Mock Test - Physics</p>
                    <Timer initialTime={180} isRunning={isTestStarted && !isTestSubmitted} onTimeUp={handleSubmit} />
                  </div>

                  {/* Question Card */}
                  <div className="border-2 border-[#004B49] rounded-2xl p-2 sm:p-4">
                    <QuestionCard
                      questionNumber={currentQuestion + 1}
                      totalQuestions={mockQuestions.length}
                      questionText={mockQuestions[currentQuestion].questionText}
                      options={mockQuestions[currentQuestion].options}
                      selectedAnswer={userAnswers[mockQuestions[currentQuestion].id]}
                      onSelectAnswer={handleSelectAnswer}
                    />

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4 justify-between items-center px-4">
                      <button
                        onClick={handleClearResponse}
                        className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
                      >
                        Clear Response
                      </button>

                      <div className="flex gap-4">
                        <button
                          onClick={handlePrevious}
                          disabled={currentQuestion === 0}
                          className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        {currentQuestion === mockQuestions.length - 1 ? (
                          <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-[#004B49] text-white rounded-md hover:bg-[#003333] transition-colors font-medium"
                          >
                            Save & Next
                          </button>
                        ) : (
                          <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-[#004B49] text-white rounded-md hover:bg-[#003333] transition-colors font-medium"
                          >
                            Save & Next
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Review Mode */}
          {activeTab === 1 && isTestSubmitted && (
            <div>
              {/* Review Mode Label */}
              <p className="text-sm text-gray-700 mb-6">Review Mode</p>

              {/* Question Card */}
              <div className="border-2 border-[#004B49] rounded-2xl p-2 sm:p-4">
                <QuestionCard
                  questionNumber={currentQuestion + 1}
                  totalQuestions={mockQuestions.length}
                  questionText={mockQuestions[currentQuestion].questionText}
                  options={mockQuestions[currentQuestion].options}
                  selectedAnswer={userAnswers[mockQuestions[currentQuestion].id]}
                  correctAnswer={mockQuestions[currentQuestion].correctAnswer}
                  explanation={mockQuestions[currentQuestion].explanation}
                  isReviewMode={true}
                />

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-end gap-4 px-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {currentQuestion === mockQuestions.length - 1 ? (
                    <button
                      onClick={() => {
                        // Reset and go back to start
                        setCurrentQuestion(0);
                      }}
                      className="px-6 py-2 bg-[#004B49] text-white rounded-md hover:bg-[#003333] transition-colors font-medium"
                    >
                      Finish Review
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-[#004B49] text-white rounded-md hover:bg-[#003333] transition-colors font-medium"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#004B49] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <HowItWorksStep
              step="1"
              title="Create Account"
              description="Sign up for free in seconds and get instant access to all mock tests and features"
            />
            <HowItWorksStep
              step="2"
              title="Take Exam"
              description="Practice under realistic exam conditions with timer, question navigation, and auto-save"
            />
            <HowItWorksStep
              step="3"
              title="Review & Improve"
              description="Analyze detailed results, track performance trends, and identify areas for improvement"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
