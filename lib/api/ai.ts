import { fetchAPI } from './client';

// Types for AI endpoints
export interface CoachInsight {
  tag: 'critical' | 'warning' | 'on-track';
  message: string;
}

export interface TestDataForCoach {
  title: string;
  score: number;
  totalMarks: number;
  timeTaken: number;
  submittedAt: string;
}

/**
 * Get AI-powered test analysis for a completed test session
 * @param testSessionId - The ID of the test session
 * @returns Plain text analysis from AI
 */
export async function fetchTestAnalysis(testSessionId: string): Promise<string> {
  const response = await fetchAPI<{ analysis: string } | string>(`/api/ai/test-analysis/${testSessionId}`, {
    method: 'POST',
  });
  // Handle both string and object responses
  return typeof response === 'string' ? response : response.analysis;
}

/**
 * Get AI explanation for a specific question
 * @param testSessionId - The ID of the test session
 * @param questionId - The ID of the question
 * @returns Concise explanation text (3-4 lines)
 */
export async function fetchQuestionExplanation(
  testSessionId: string,
  questionId: string
): Promise<string> {
  const response = await fetchAPI<{ explanation: string } | string>(
    `/api/ai/explain-question/${testSessionId}/${questionId}`,
    {
      method: 'POST',
    }
  );
  // Handle both string and object responses
  return typeof response === 'string' ? response : response.explanation;
}

/**
 * Get coaching insights from recent test attempts
 * Backend automatically fetches user's recent tests
 * @returns Array of 3 insights with tags and messages
 */
export async function fetchCoachInsights(): Promise<CoachInsight[]> {
  return fetchAPI<CoachInsight[]>('/api/ai/coach-insight', {
    method: 'GET',
  });
}
