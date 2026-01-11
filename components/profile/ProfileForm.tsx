interface ProfileData {
  fullName: string;
  email: string;
  location: string;
  bio: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  isEditing: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function ProfileForm({
  profileData,
  isEditing,
  onInputChange,
}: ProfileFormProps) {
  return (
    <div className="space-y-6">
      {/* Full Name and Email - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={onInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B49] disabled:bg-gray-50 text-gray-900"
            placeholder="Sarah Johnson"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={onInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B49] disabled:bg-gray-50 text-gray-900"
            placeholder="sarah.johnson@email.com"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={profileData.location}
          onChange={onInputChange}
          disabled={!isEditing}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B49] disabled:bg-gray-50 text-gray-900"
          placeholder="New York, USA"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={onInputChange}
          disabled={!isEditing}
          rows={5}
          maxLength={140}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B49] disabled:bg-gray-50 text-gray-900 resize-none"
          placeholder="Passionate about learning new technologies and building innovative solutions. Currently focusing on full-stack development and data science."
        />
        <p className="text-sm text-gray-500 mt-2">
          {profileData.bio.length}/140 characters
        </p>
      </div>
    </div>
  );
}
