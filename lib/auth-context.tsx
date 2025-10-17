'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isDevMode } from './supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    if (isDevMode()) {
      // In dev mode, check localStorage
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        setUser(JSON.parse(mockUser));
      }
      setLoading(false);
    } else {
      // In production mode, check Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signUp = async (email: string, password: string) => {
    if (isDevMode()) {
      // Mock signup in dev mode
      const mockUser: SupabaseUser = {
        id: `mock-${Date.now()}`,
        email,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      return { error: null };
    } else {
      // Real Supabase signup
      const { error } = await supabase.auth.signUp({ email, password });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isDevMode()) {
      // Mock login in dev mode
      const mockUser: SupabaseUser = {
        id: `mock-${Date.now()}`,
        email,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      return { error: null };
    } else {
      // Real Supabase login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    }
  };

  const signOut = async () => {
    if (isDevMode()) {
      // Mock logout in dev mode
      localStorage.removeItem('mockUser');
      setUser(null);
    } else {
      // Real Supabase logout
      await supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
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
