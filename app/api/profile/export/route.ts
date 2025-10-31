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
      // In dev mode, return mock export
      return Response.json({
        responses: [],
        profile: null,
        exported_at: new Date().toISOString(),
      });
    } else {
      // Fetch all onboarding responses
      const { data: responses, error: responseError } = await supabase
        .from('onboarding_response')
        .select('*')
        .eq('user_id', userId);

      if (responseError) {
        console.error('Error fetching responses:', responseError);
        return NextResponse.json(
          { error: 'Failed to fetch responses' },
          { status: 500 }
        );
      }

      // Fetch onboarding profile
      const { data: profile, error: profileError } = await supabase
        .from('onboarding_profile')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 = no rows returned (which is fine)
        console.error('Error fetching profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to fetch profile' },
          { status: 500 }
        );
      }

      return Response.json({
        responses: responses || [],
        profile: profile || null,
        exported_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error exporting profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
