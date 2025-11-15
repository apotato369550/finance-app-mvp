import { NextRequest } from 'next/server';
import { getTestMode, isMockMode } from './supabase';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export async function getAuthenticatedUser(request: NextRequest) {
  const mode = getTestMode();

  if (mode === 'MOCK') {
    // In mock mode, check for mock user in Authorization header or cookie
    const authHeader = request.headers.get('authorization');
    const mockUser = authHeader?.replace('Bearer ', '');

    if (mockUser) {
      try {
        return JSON.parse(mockUser);
      } catch {
        return null;
      }
    }

    // Also check cookies
    const cookie = request.cookies.get('mockUser');
    if (cookie) {
      try {
        return JSON.parse(cookie.value);
      } catch {
        return null;
      }
    }

    return null;
  }

  // DEV or LIVE mode - use Supabase auth token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Get appropriate Supabase config based on mode
    const supabaseUrl = mode === 'DEV'
      ? process.env.NEXT_PUBLIC_SUPABASE_URL_DEV!
      : process.env.NEXT_PUBLIC_SUPABASE_URL_LIVE!;

    const supabaseKey = mode === 'DEV'
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LIVE!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Creates a Supabase client with the user's JWT token for RLS to work correctly.
 * This is needed for server-side API routes to respect Row Level Security policies.
 */
export function getAuthenticatedSupabaseClient(request: NextRequest): SupabaseClient | null {
  const mode = getTestMode();

  // In mock mode, we don't need a real Supabase client
  if (mode === 'MOCK') {
    return null;
  }

  // Get the JWT token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  // Get appropriate Supabase config based on mode
  const supabaseUrl = mode === 'DEV'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL_DEV!
    : process.env.NEXT_PUBLIC_SUPABASE_URL_LIVE!;

  const supabaseKey = mode === 'DEV'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LIVE!;

  // Create client with user's token - this makes auth.uid() work in RLS policies
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
}

export async function requireAuth(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return {
      error: 'Authentication required',
      status: 401,
      user: null
    };
  }

  return {
    error: null,
    status: 200,
    user
  };
}