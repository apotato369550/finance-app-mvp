import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-utils';
import { supabase, isDevMode } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
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
      console.log(`Dev mode: Would delete profile data for user ${userId}`);
      return NextResponse.json({
        success: true,
        message: 'Profile data deleted (dev mode)',
      });
    } else {
      // Delete onboarding responses
      const { error: responseError } = await supabase
        .from('onboarding_response')
        .delete()
        .eq('user_id', userId);

      if (responseError) {
        console.error('Error deleting responses:', responseError);
        return NextResponse.json(
          { error: 'Failed to delete responses' },
          { status: 500 }
        );
      }

      // Delete onboarding profile
      const { error: profileError } = await supabase
        .from('onboarding_profile')
        .delete()
        .eq('user_id', userId);

      if (profileError) {
        console.error('Error deleting profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to delete profile' },
          { status: 500 }
        );
      }

      // Reset user profile status
      const { error: userError } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: false,
          onboarding_skipped: false,
        })
        .eq('id', userId);

      if (userError) {
        console.error('Error resetting user profile:', userError);
        return NextResponse.json(
          { error: 'Failed to reset user profile' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Profile data deleted successfully',
      });
    }
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
