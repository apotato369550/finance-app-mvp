import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, getAuthenticatedSupabaseClient } from '@/lib/auth-utils';
import { isMockMode, getTestMode } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(request);
    if (authResult.error) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const userId = authResult.user!.id;

    if (isMockMode()) {
      // In mock mode, just return success
      console.log(`[${getTestMode()}] Mock privacy consent recorded`);
      return NextResponse.json({ success: true });
    }

    // In DEV/LIVE mode, update the database
    console.log(`[${getTestMode()}] Recording privacy consent for user ${userId}`);

    // Get authenticated Supabase client (with user's JWT token for RLS)
    const supabase = getAuthenticatedSupabaseClient(request);
    if (!supabase) {
      return NextResponse.json(
        { error: 'Failed to create authenticated client' },
        { status: 500 }
      );
    }

    // Update privacy_consent_at in profiles table
    const { error } = await supabase
      .from('profiles')
      .update({ privacy_consent_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error('Error updating privacy consent:', error);
      return NextResponse.json(
        { error: 'Failed to save consent' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Privacy consent error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
