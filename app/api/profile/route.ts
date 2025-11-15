import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, getAuthenticatedSupabaseClient } from '@/lib/auth-utils';
import { isMockMode, getTestMode } from '@/lib/supabase';

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

    if (isMockMode()) {
      // In mock mode, return mock profile
      console.log(`[${getTestMode()}] Returning mock profile`);
      return NextResponse.json({
        exists: true,
        profile: {
          personality_type: 'The Balanced Builder',
          profile_summary: 'You are The Balanced Builder...',
          strengths: [
            'Self-aware about financial habits',
            'Clear perspective on money and value',
            'Willing to reflect on financial behavior',
          ],
          growth_areas: [
            'Consider developing a more structured savings plan',
            'Explore investment options aligned with your goals',
            'Build an emergency fund if not already present',
          ],
          money_mindset: 'Your relationship with money is pragmatic and thoughtful.',
          recommendations: [
            'Set up automatic transfers to a savings account',
            'Review your current investment portfolio quarterly',
          ],
          completion_percentage: 100,
          is_completed: true,
        },
      });
    }

    // In DEV/LIVE mode, fetch from database
    console.log(`[${getTestMode()}] Fetching profile for user ${userId}`);

    // Get authenticated Supabase client (with user's JWT token for RLS)
    const supabase = getAuthenticatedSupabaseClient(request);
    if (!supabase) {
      return NextResponse.json(
        { error: 'Failed to create authenticated client' },
        { status: 500 }
      );
    }

    // Fetch profile from database
    const { data, error } = await supabase
      .from('onboarding_profile')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      console.log(`[${getTestMode()}] No profile found for user ${userId}`);
      return NextResponse.json({ exists: false });
    }

    return NextResponse.json({
      exists: true,
      profile: data,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
