'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUserProfile } from '@/lib/api';
import AuthModal from '@/components/auth/AuthModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>('');
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Check if we're on admin pages
  const isAdminPage = pathname.startsWith('/admin');

  // Admin navigation links
  const adminNavLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/contacts', label: 'Messages' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/questions', label: 'Questions' },
    { href: '/admin/study-tips', label: 'Study Tips' },
    { href: '/admin/faqs', label: 'FAQs' },
  ];

  // Regular user navigation links
  const navLinks = [
    { href: '/mock-test', label: 'Mock Test', protected: true },
    { href: '/analytics', label: 'Analytics', protected: true },
    { href: '/study-tips', label: 'Study Tips', protected: false },
    { href: '/about', label: 'About', protected: false },
    { href: '/contact', label: 'Contact', protected: false },
  ];

  // Add admin link only if user is logged in and has admin role
  const navLinksWithAdmin = user?.role === 'admin' 
    ? [...navLinks, { href: '/admin', label: 'Admin', protected: true }]
    : navLinks;

  // Use admin links if on admin page, otherwise use regular links (with admin link if applicable)
  const currentNavLinks = isAdminPage ? adminNavLinks : navLinksWithAdmin;

  // Load profile picture when user is logged in
  useEffect(() => {
    if (user) {
      fetchUserProfile()
        .then((profile) => {
          if (profile.profilePicture) {
            setProfilePicture(profile.profilePicture);
          }
        })
        .catch(() => {
          // Profile picture not available
        });
    } else {
      setProfilePicture('');
    }
  }, [user]);

  const isActive = (href: string) => {
    // For admin dashboard, only match exact path
    if (href === '/admin') {
      return pathname === '/admin';
    }
    // For other paths, use startsWith
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleNavClick = (e: React.MouseEvent, link: { href: string; label: string; protected?: boolean }) => {
    if (link.protected && !user) {
      e.preventDefault();
      setShowAuthModal(true);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#004B49] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white">IUT TestPrep</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
            {currentNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => !isAdminPage && handleNavClick(e, link)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-white text-[#004B49]'
                    : 'text-white hover:bg-white hover:text-[#004B49]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sign In/Sign Up or Profile - Right Side */}
          <div className="hidden lg:flex items-center space-x-2 relative group">
            {user ? (
              <div>
                <button
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#004B49] rounded-md transition-all"
                >
                  {profilePicture ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={profilePicture}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                  <span>{user.username}</span>
                </button>

                {/* Profile Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible transition-all">
                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#004B49] rounded-md transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#004B49] rounded-md transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}  // Toggle the mobile menu state
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {currentNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (!isAdminPage) {
                    handleNavClick(e, link);
                  }
                  if (!('protected' in link) || !link.protected || user) {
                    setIsMenuOpen(false);
                  }
                }}
                className={`block px-4 py-2 rounded-md text-base font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-white text-[#004B49]'
                    : 'text-white hover:bg-white hover:text-[#004B49]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/20">
              {user ? (
                <>
                  <div className="px-4 py-2 text-base font-medium text-white">
                    {user.username}
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-[#004B49] rounded-md transition-all"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-[#004B49] rounded-md transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-[#004B49] rounded-md transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-[#004B49] rounded-md transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
}
