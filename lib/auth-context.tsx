'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isMockMode, getTestMode } from './supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    if (isMockMode()) {
      // In mock mode, check localStorage
      console.log(`[${getTestMode()}] Using mock authentication`);
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        setUser(JSON.parse(mockUser));
      }
      setLoading(false);
    } else {
      // In DEV/LIVE mode, check Supabase session
      console.log(`[${getTestMode()}] Using Supabase authentication`);
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
    if (isMockMode()) {
      // Mock signup in mock mode
      console.log(`[${getTestMode()}] Mock signup for ${email}`);
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
      // Real Supabase signup in DEV/LIVE mode
      console.log(`[${getTestMode()}] Real signup for ${email}`);
      const { error } = await supabase.auth.signUp({ email, password });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isMockMode()) {
      // Mock login in mock mode
      console.log(`[${getTestMode()}] Mock login for ${email}`);
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
      // Real Supabase login in DEV/LIVE mode
      console.log(`[${getTestMode()}] Real login for ${email}`);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    }
  };

  const signOut = async () => {
    if (isMockMode()) {
      // Mock logout in mock mode
      console.log(`[${getTestMode()}] Mock logout`);
      localStorage.removeItem('mockUser');
      setUser(null);
    } else {
      // Real Supabase logout in DEV/LIVE mode
      console.log(`[${getTestMode()}] Real logout`);
      await supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, logout: signOut }}>
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
