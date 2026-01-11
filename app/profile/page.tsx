'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AuthModal from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import ProfilePicture from '@/components/profile/ProfilePicture';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  const { showAuthModal, closeModal, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    location: '',
    bio: '',
    profilePicture: null as string | null,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.username || '',
        email: user.email || '',
        location: '',
        bio: '',
        profilePicture: null,
      });
    }
  }, [user]);

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
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size must be less than 2MB');
    }
  };

  const handleSaveChanges = () => {
    // TODO: Integrate with backend API to save profile changes
    console.log('Saving profile:', profileData);
    setIsEditing(false);
    alert('Profile updated successfully!');
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
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-3 bg-[#004B49] text-white rounded-lg font-semibold hover:bg-[#003333] transition-colors"
                >
                  Save Changes
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
