import { fetchAPI } from './client';

export interface StudyTip {
  _id: string;
  category: string;
  title: string;
  subtitle: string;
  details: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudyTipData {
  category: string;
  title: string;
  subtitle: string;
  details: string[];
}

export interface UpdateStudyTipData {
  category?: string;
  title?: string;
  subtitle?: string;
  details?: string[];
}

// Get all Study Tips (public)
export const fetchStudyTips = async (category?: string): Promise<StudyTip[]> => {
  const endpoint = category ? `/api/study-tips?category=${category}` : '/api/study-tips';
  return fetchAPI<StudyTip[]>(endpoint);
};

// Create Study Tip (admin only)
export const createStudyTip = async (data: CreateStudyTipData): Promise<StudyTip> => {
  return fetchAPI<StudyTip>('/api/admin/study-tips', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Update Study Tip (admin only)
export const updateStudyTip = async (id: string, data: UpdateStudyTipData): Promise<StudyTip> => {
  return fetchAPI<StudyTip>(`/api/admin/study-tips/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// Delete Study Tip (admin only)
export const deleteStudyTip = async (id: string): Promise<void> => {
  await fetchAPI<void>(`/api/admin/study-tips/${id}`, {
    method: 'DELETE',
  });
};
