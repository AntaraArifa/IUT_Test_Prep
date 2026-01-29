export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'tests' | 'account' | 'technical';
}

export const faqData: FAQItem[] = [
  // General Questions
  {
    category: 'general',
    question: 'What is IUT TestPrep?',
    answer: 'IUT TestPrep is a comprehensive online platform designed to help students prepare for the IUT (Islamic University of Technology) admission test. We provide mock tests, practice questions, analytics, and AI-powered insights to enhance your preparation.'
  },
  {
    category: 'general',
    question: 'How can IUT TestPrep help me prepare for the admission test?',
    answer: 'Our platform offers realistic mock tests that simulate the actual IUT admission exam, detailed analytics to track your progress, subject-wise proficiency tracking, AI coach insights for personalized recommendations, and a comprehensive question bank covering Physics, Chemistry, Mathematics, and English.'
  },
  {
    category: 'general',
    question: 'Is IUT TestPrep free to use?',
    answer: 'Yes! IUT TestPrep is currently free for all students. Simply create an account to access all features including mock tests, analytics, and AI-powered study recommendations.'
  },
  {
    category: 'general',
    question: 'Do I need to download any software?',
    answer: 'No downloads required! IUT TestPrep is a web-based platform that works directly in your browser on any device - desktop, laptop, tablet, or smartphone.'
  },

  // Tests & Practice
  {
    category: 'tests',
    question: 'What types of tests are available?',
    answer: 'We offer two types of tests: Previous Year Tests - Actual questions from past IUT admission exams to familiarize you with the exam pattern, and Practice Tests - Subject-specific and mixed tests to strengthen your concepts and improve problem-solving speed.'
  },
  {
    category: 'tests',
    question: 'How long are the mock tests?',
    answer: 'Mock tests are timed based on the actual IUT admission exam format. Full-length tests typically last 90-120 minutes, while subject-specific practice tests may vary from 30-60 minutes depending on the number of questions.'
  },
  {
    category: 'tests',
    question: 'Can I pause a test and resume later?',
    answer: 'Once you start a mock test, the timer runs continuously to simulate real exam conditions. However, you can take breaks between different tests. We recommend completing each test in one sitting for the most accurate practice experience.'
  },
  {
    category: 'tests',
    question: 'How are my test results calculated?',
    answer: 'Your score is calculated based on correct answers. Each question carries equal marks, and there is no negative marking. After submission, you will see your total score, percentage, time taken, and detailed question-by-question analysis with correct answers and AI explanations.'
  },
  {
    category: 'tests',
    question: 'Can I review my answers after completing a test?',
    answer: 'Yes! After submitting a test, you can review all questions, see which ones you got right or wrong, view correct answers, and read AI-powered explanations for each question to understand the concepts better.'
  },

  // Account & Profile
  {
    category: 'account',
    question: 'How do I create an account?',
    answer: 'Click on "Sign In" in the top right corner, then select "Sign Up" to create a new account. You will need to provide a username, email address, and password. Once registered, you can immediately start taking tests.'
  },
  {
    category: 'account',
    question: 'I forgot my password. How can I reset it?',
    answer: 'On the sign-in page, click "Forgot Password" and enter your registered email address. You will receive a password reset link via email. Follow the instructions in the email to set a new password.'
  },
  {
    category: 'account',
    question: 'Can I change my profile information?',
    answer: 'Yes! Go to your Profile page from the navigation menu. There you can update your username, email, upload a profile picture, and manage your account settings.'
  },
  {
    category: 'account',
    question: 'How is my data protected?',
    answer: 'We take data security seriously. Your password is encrypted, and we never share your personal information with third parties. All test data and analytics are private to your account.'
  },

  // Technical & Analytics
  {
    category: 'technical',
    question: 'What is the Analytics Dashboard?',
    answer: 'The Analytics Dashboard provides comprehensive insights into your performance including: Readiness Score based on recent tests, Subject-wise proficiency tracking, Accuracy and speed metrics, Complete exam history, and AI-powered coaching insights highlighting areas that need improvement.'
  },
  {
    category: 'technical',
    question: 'What are AI Coach Insights?',
    answer: 'AI Coach Insights use artificial intelligence to analyze your test performance and provide personalized recommendations. The AI identifies weak areas, suggests topics to focus on, and provides strategic advice to improve your scores.'
  },
  {
    category: 'technical',
    question: 'Which browsers are supported?',
    answer: 'IUT TestPrep works best on modern browsers including Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. Make sure your browser is updated to the latest version for the best experience.'
  },
  {
    category: 'technical',
    question: 'What should I do if I encounter a technical issue?',
    answer: 'If you experience any technical problems, please contact us through the Contact page. Provide details about the issue, including what you were doing when it occurred, and we will assist you as soon as possible.'
  },
  {
    category: 'technical',
    question: 'Can I use IUT TestPrep on my mobile phone?',
    answer: 'Yes! Our platform is fully responsive and works on smartphones and tablets. However, for the best test-taking experience, we recommend using a laptop or desktop with a stable internet connection.'
  },

  // More specific questions
  {
    category: 'tests',
    question: 'How often should I take mock tests?',
    answer: 'We recommend taking at least 2-3 full-length mock tests per week, along with regular subject-specific practice. Consistent practice helps you build stamina, improve time management, and identify areas needing more attention.'
  },
  {
    category: 'general',
    question: 'Can I download questions for offline practice?',
    answer: 'Currently, all tests must be taken online through our platform to ensure accurate timing, automatic grading, and analytics tracking. However, you can review your past test results anytime from your dashboard.'
  },
  {
    category: 'technical',
    question: 'How is my Readiness Score calculated?',
    answer: 'Your Readiness Score is calculated based on your performance in the most recent 5 tests. It considers accuracy, consistency, and improvement trends to give you an overall indicator of your exam preparedness.'
  }
];

export const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'tests', label: 'Tests & Practice' },
  { id: 'account', label: 'Account' },
  { id: 'technical', label: 'Technical & Analytics' }
];
