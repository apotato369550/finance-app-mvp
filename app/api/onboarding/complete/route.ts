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
      // In dev mode, just return success (mock completion)
      console.log(`Dev mode: Would mark onboarding as completed for user ${userId}`);
      return NextResponse.json({
        success: true,
        message: 'Onboarding completed (dev mode)',
      });
    } else {
      // In production, update the user's profile and onboarding profile
      const now = new Date().toISOString();

      // Update user profile
      const { error: userError } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          onboarding_skipped: false,
        })
        .eq('id', userId);

      if (userError) {
        console.error('Error updating user profile:', userError);
        return NextResponse.json(
          { error: 'Failed to update user profile' },
          { status: 500 }
        );
      }

      // Update or create onboarding profile
      const { error: profileError } = await supabase
        .from('onboarding_profile')
        .upsert({
          user_id: userId,
          completion_percentage: 100,
          is_completed: true,
          last_updated: now,
        });

      if (profileError) {
        console.error('Error updating onboarding profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to update onboarding profile' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Onboarding completed successfully',
      });
    }

  } catch (error) {
    console.error('Error completing onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}