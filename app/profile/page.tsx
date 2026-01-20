'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import ProfilePicture from '@/components/profile/ProfilePicture';
import ProfileForm from '@/components/profile/ProfileForm';
import { fetchUserProfile, updateUserProfile, UserProfile } from '@/lib/api';

export default function ProfilePage() {
  const { showAuthModal, closeModal, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    location: '',
    bio: '',
    profilePicture: '',
  });

  // Load profile data on mount and when page refreshes
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      // Try to fetch profile from backend
      const profile = await fetchUserProfile();
      setProfileData({
        fullName: profile.username || user?.username || '',
        email: profile.email || user?.email || '',
        location: profile.location || '',
        bio: profile.bio || '',
        profilePicture: profile.profilePicture || '',
      });
    } catch (err) {
      console.log('Profile API not available yet, using user data from auth');
      // If API not ready, use data from auth context
      setProfileData({
        fullName: user?.username || '',
        email: user?.email || '',
        location: '',
        bio: '',
        profilePicture: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    closeModal();
    router.push('/');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Compress and convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions (max 800px width/height)
        let width = img.width;
        let height = img.height;
        const maxSize = 800;
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        setProfileData((prev) => ({
          ...prev,
          profilePicture: compressedDataUrl,
        }));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      
      // Call backend API to save profile changes
      const updatedProfile = await updateUserProfile({
        location: profileData.location,
        bio: profileData.bio,
        profilePicture: profileData.profilePicture,
      });

      // Update local state with response from backend
      setProfileData({
        fullName: updatedProfile.username || profileData.fullName,
        email: updatedProfile.email || profileData.email,
        location: updatedProfile.location || '',
        bio: updatedProfile.bio || '',
        profilePicture: updatedProfile.profilePicture || '',
      });

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      const error = err as Error;
      console.error('Failed to update profile:', error);
      
      // If backend not ready, just update local state
      if (error.message.includes('404')) {
        console.log('Profile API not ready, changes saved locally only');
        setIsEditing(false);
        alert('Profile updated locally! (Backend integration pending)');
      } else {
        alert('Failed to update profile: ' + error.message);
      }
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B49] mx-auto mb-4"></div>
          <p className="text-black">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Profile Picture Section */}
          <ProfilePicture
            profilePicture={profileData.profilePicture}
            isEditing={isEditing}
            onImageUpload={handleImageUpload}
          />

          {/* Form Fields */}
          <ProfileForm
            profileData={profileData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={saving}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="px-6 py-3 bg-[#004B49] text-white rounded-lg font-semibold hover:bg-[#003333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-[#004B49] text-white rounded-lg font-semibold hover:bg-[#003333] transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
