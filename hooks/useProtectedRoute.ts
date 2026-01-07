'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

const PROTECTED_ROUTES = ['/mock-test', '/analytics'];

export function useProtectedRoute() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check if current route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route => 
      pathname.startsWith(route)
    );

    // Show modal if trying to access protected route without authentication
    if (!isLoading && !user && isProtectedRoute) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [user, isLoading, pathname]);

  return {
    showAuthModal,
    closeModal: () => setShowAuthModal(false),
    isProtected: PROTECTED_ROUTES.some(route => pathname.startsWith(route)),
    isAuthenticated: !!user
  };
}
