'use client';

import Image from 'next/image';
import { useRef } from 'react';

interface ProfilePictureProps {
  profilePicture: string | null;
  isEditing: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfilePicture({
  profilePicture,
  isEditing,
  onImageUpload,
}: ProfilePictureProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 10 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file.size > MAX_SIZE) {
      alert('Image size must be less than 10MB.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, or GIF images are allowed.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // If valid, forward to your parent handler
    onImageUpload(e);
  };

  return (
    <div className="mb-8">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-16 h-16 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>

          {isEditing && (
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-[#004B49] text-white p-2 rounded-full cursor-pointer hover:bg-[#003333] transition-colors shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>

              <input
                ref={inputRef}
                id="profile-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Profile Picture
          </h2>

          <p className="text-sm text-gray-600 mb-1">
            JPG, PNG or GIF. Max size 10MB.
          </p>

          {isEditing && (
            <p className="text-sm text-gray-500">
              Click the edit button to change your avatar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
