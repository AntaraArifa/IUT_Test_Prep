'use client';

import Link from 'next/link';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Gradient Header */}
        <div 
          className="p-6 text-center"
          style={{
            background: 'linear-gradient(135deg, #004B49 0%, #295E5D 100%)'
          }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-white/90 text-sm">
            Please sign in to access this feature
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            You need to be logged in to access this. 
            Create an account or sign in to continue your learning journey.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/auth/sign-in"
              className="block w-full bg-[#004B49] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#003333] transition-colors"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="block w-full bg-white text-[#004B49] border-2 border-[#004B49] text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Create Account
            </Link>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm font-medium py-2"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
