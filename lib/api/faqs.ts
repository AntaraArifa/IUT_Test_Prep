import { fetchAPI } from './client';

export interface FAQ {
  _id: string;
  category: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFAQData {
  category: string;
  question: string;
  answer: string;
}

export interface UpdateFAQData {
  category?: string;
  question?: string;
  answer?: string;
}

// Get all FAQs (public)
export const fetchFAQs = async (category?: string): Promise<FAQ[]> => {
  const endpoint = category ? `/api/faqs?category=${category}` : '/api/faqs';
  return fetchAPI<FAQ[]>(endpoint);
};

// Create FAQ (admin only)
export const createFAQ = async (data: CreateFAQData): Promise<FAQ> => {
  return fetchAPI<FAQ>('/api/admin/faqs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Update FAQ (admin only)
export const updateFAQ = async (id: string, data: UpdateFAQData): Promise<FAQ> => {
  return fetchAPI<FAQ>(`/api/admin/faqs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// Delete FAQ (admin only)
export const deleteFAQ = async (id: string): Promise<void> => {
  await fetchAPI<void>(`/api/admin/faqs/${id}`, {
    method: 'DELETE',
  });
};
