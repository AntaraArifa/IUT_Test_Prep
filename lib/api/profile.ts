import { fetchAPI, BASE_URL } from './client';

export interface UserProfile {
  username: string;
  email: string;
  location?: string;
  bio?: string;
  profilePicture?: string;
}

export interface UpdateProfileData {
  name?: string;
  location?: string;
  bio?: string;
  profilePicture?: string;
}

// Fetch user profile
export const fetchUserProfile = async (): Promise<UserProfile> => {
  return fetchAPI<UserProfile>('/api/user/profile');
};

// Update user profile
export const updateUserProfile = async (
  data: UpdateProfileData
): Promise<UserProfile> => {
  return fetchAPI<UserProfile>('/api/user/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// Upload profile picture
export const uploadProfilePicture = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await fetch(`${BASE_URL}/api/profile/picture`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Upload failed');
  }

  return response.json();
};
