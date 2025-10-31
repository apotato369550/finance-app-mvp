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
      // In dev mode, just return success
      console.log(`Dev mode: Would reset onboarding for user ${userId}`);
      return NextResponse.json({
        success: true,
        message: 'Onboarding reset (dev mode)',
      });
    } else {
      // Mark onboarding as incomplete
      const { error: userError } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: false,
          onboarding_skipped: false,
        })
        .eq('id', userId);

      if (userError) {
        console.error('Error resetting onboarding:', userError);
        return NextResponse.json(
          { error: 'Failed to reset onboarding' },
          { status: 500 }
        );
      }

      // Delete all responses for this user (archive old ones by deleting)
      const { error: deleteError } = await supabase
        .from('onboarding_response')
        .delete()
        .eq('user_id', userId);

      if (deleteError) {
        console.error('Error deleting responses:', deleteError);
        return NextResponse.json(
          { error: 'Failed to clear responses' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Onboarding reset successfully',
      });
    }
  } catch (error) {
    console.error('Error resetting onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
