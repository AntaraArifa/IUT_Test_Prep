'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const BASE_URL = 'https://iut-admission-mocktest-server.onrender.com';

interface User {
  id?: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    // Load user from localStorage - backend session is maintained via HTTP-only cookies
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Sign in failed');
    }

    // 🔍 Debug: Check if backend sent Set-Cookie header
    console.log('🍪 Login Response Headers:');
    console.log('Set-Cookie:', response.headers.get('set-cookie'));
    console.log('All cookies after login:', document.cookie);

    // Extract user data from response (backend should return user object with id, username, email, role)
    const userData: User = {
      id: data.user?.id || data.id,
      username: data.user?.username || data.username || email.split('@')[0],
      email: data.user?.email || data.email || email.toLowerCase(),
      role: data.user?.role || data.role || 'student'
    };
    
    setUser(userData);
    
    // Store user in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    // Redirect admin users to admin dashboard
    if (userData.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        email: email.toLowerCase(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Sign up failed');
    }

    // After signup, redirect to sign-in page
    router.push('/auth/sign-in');
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Clear user state and localStorage
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
