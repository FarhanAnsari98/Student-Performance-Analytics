"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Role } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('atendalearn-user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setRole(parsedUser.role);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('atendalearn-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem('atendalearn-user', JSON.stringify(user));
    setUser(user);
    setRole(user.role);
  };

  const logout = () => {
    localStorage.removeItem('atendalearn-user');
    setUser(null);
    setRole(null);
    router.push('/');
  };

  const value = { user, role, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
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
