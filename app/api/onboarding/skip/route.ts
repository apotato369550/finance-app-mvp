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
      // In mock mode, just return success (mock update)
      console.log(`[${getTestMode()}] Mock skip onboarding for user ${userId}`);
      return NextResponse.json({
        success: true,
        message: 'Onboarding skipped (mock mode)',
      });
    } else {
      // In DEV/LIVE mode, update the database
      console.log(`[${getTestMode()}] Marking onboarding as skipped for user ${userId}`);

      // Get authenticated Supabase client (with user's JWT token for RLS)
      const supabase = getAuthenticatedSupabaseClient(request);
      if (!supabase) {
        return NextResponse.json(
          { error: 'Failed to create authenticated client' },
          { status: 500 }
        );
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_skipped: true,
          onboarding_completed: false,
        })
        .eq('id', userId);

      if (error) {
        console.error('Error skipping onboarding:', error);
        return NextResponse.json(
          { error: 'Failed to skip onboarding' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Onboarding skipped successfully',
      });
    }

  } catch (error) {
    console.error('Error skipping onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}