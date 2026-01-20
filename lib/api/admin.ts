import { fetchAPI, BASE_URL } from './client';

// Contact Messages
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  replied: boolean;
}

export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  return fetchAPI<ContactMessage[]>('/api/admin/contacts');
};

export const markMessageAsReplied = async (messageId: string): Promise<void> => {
  await fetchAPI<void>(`/api/admin/contacts/${messageId}/replied`, {
    method: 'PATCH',
  });
};

// Users Management
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export const fetchAllUsers = async (): Promise<User[]> => {
  return fetchAPI<User[]>('/api/admin/users');
};

export const updateUserRole = async (
  userId: string,
  role: string
): Promise<void> => {
  await fetchAPI<void>(`/api/admin/users/${userId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
};

// Question Bank Upload
export interface UploadResponse {
  message: string;
  questionBankId: string;
  questionsCount: number;
}

export const uploadQuestionBankCSV = async (
  file: File
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/admin/questions/import`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    // Don't set Content-Type for FormData - browser will set it with boundary
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Upload failed');
  }

  return response.json();
};

// Question Banks List
export interface QuestionBank {
  _id: string;
  title: string;
  type: 'prev_year' | 'practice';
  year?: number;
  subjects: string[];
  totalQuestions: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export const fetchQuestionBanks = async (
  type?: 'prev_year' | 'practice',
  subject?: string
): Promise<QuestionBank[]> => {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (subject) params.append('subject', subject);

  const queryString = params.toString();
  const endpoint = queryString ? `/api/question-banks?${queryString}` : '/api/question-banks';
  
  return fetchAPI<QuestionBank[]>(endpoint);
};

export const deleteQuestionBank = async (bankId: string): Promise<void> => {
  await fetchAPI<void>(`/api/admin/questions/banks/${bankId}`, {
    method: 'DELETE',
  });
};

// Admin Dashboard Stats
export interface AdminStats {
  totalUsers: number;
  totalMessages: number;
  totalQuestionBanks: number;
  recentActivity: string;
}

export const fetchAdminStats = async (): Promise<AdminStats> => {
  return fetchAPI<AdminStats>('/api/admin/stats');
};

// Get total user count
export const fetchUserCount = async (): Promise<number> => {
  const response = await fetchAPI<{ count: number }>('/api/admin/stats/users/count');
  return response.count;
};
