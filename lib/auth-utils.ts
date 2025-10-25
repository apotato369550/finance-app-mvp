import { NextRequest } from 'next/server';
import { isDevMode } from './supabase';

export async function getAuthenticatedUser(request: NextRequest) {
  if (isDevMode()) {
    // In dev mode, check for mock user in Authorization header or cookie
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
  } else {
    // In production, use Supabase auth token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      // Verify the token with Supabase
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return null;
      }

      return user;
    } catch {
      return null;
    }
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