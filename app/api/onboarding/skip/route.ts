import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-utils';
import { supabase, isDevMode } from '@/lib/supabase';

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

    if (isDevMode()) {
      // In dev mode, just return success (mock update)
      console.log(`Dev mode: Would mark onboarding as skipped for user ${userId}`);
      return NextResponse.json({
        success: true,
        message: 'Onboarding skipped (dev mode)',
      });
    } else {
      // In production, update the user's profile
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