import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-utils';
import { supabase, isDevMode } from '@/lib/supabase';

export async function GET(request: NextRequest) {
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
      // In dev mode, return mock status
      return NextResponse.json({
        completed: false,
        skipped: false,
        completion_percentage: 0,
        profile_exists: false,
      });
    } else {
      // In production, query the database
      // Check onboarding profile
      const { data: profile, error: profileError } = await supabase
        .from('onboarding_profile')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error fetching onboarding profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to fetch onboarding status' },
          { status: 500 }
        );
      }

      // Check user profile for skip status
      const { data: userProfile, error: userError } = await supabase
        .from('profiles')
        .select('onboarding_completed, onboarding_skipped')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error fetching user profile:', userError);
        return NextResponse.json(
          { error: 'Failed to fetch user status' },
          { status: 500 }
        );
      }

      const completionPercentage = profile?.completion_percentage || 0;
      const isCompleted = profile?.is_completed || userProfile?.onboarding_completed || false;
      const isSkipped = userProfile?.onboarding_skipped || false;
      const profileExists = !!profile;

      return NextResponse.json({
        completed: isCompleted,
        skipped: isSkipped,
        completion_percentage: completionPercentage,
        profile_exists: profileExists,
      });
    }

  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}