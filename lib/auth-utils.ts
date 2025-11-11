import { NextRequest } from 'next/server';
import { getTestMode, isMockMode } from './supabase';
import { createClient } from '@supabase/supabase-js';

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