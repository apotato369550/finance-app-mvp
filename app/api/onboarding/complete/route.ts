import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, getAuthenticatedSupabaseClient } from '@/lib/auth-utils';
import { isMockMode, getTestMode } from '@/lib/supabase';
import { generateMockProfile } from '@/lib/profileAnalyzer';

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
      // In mock mode, just return success (mock completion)
      console.log(`[${getTestMode()}] Mock onboarding completion for user ${userId}`);
      return NextResponse.json({
        success: true,
        message: 'Onboarding completed (mock mode)',
      });
    } else {
      // In DEV/LIVE mode, update the database
      console.log(`[${getTestMode()}] Marking onboarding as completed for user ${userId}`);

      // Get authenticated Supabase client (with user's JWT token for RLS)
      const supabase = getAuthenticatedSupabaseClient(request);
      if (!supabase) {
        return NextResponse.json(
          { error: 'Failed to create authenticated client' },
          { status: 500 }
        );
      }

      const now = new Date().toISOString();

      // Fetch all user's responses to generate profile
      const { data: responses, error: responsesError } = await supabase
        .from('onboarding_response')
        .select('question_id, response_value')
        .eq('user_id', userId);

      if (responsesError) {
        console.error('Error fetching responses:', responsesError);
        return NextResponse.json(
          { error: 'Failed to fetch responses' },
          { status: 500 }
        );
      }

      // Convert responses array to object
      const responsesMap: Record<string, any> = {};
      responses?.forEach((r) => {
        responsesMap[r.question_id] = r.response_value;
      });

      // Generate profile using analyzer
      const generatedProfile = generateMockProfile(responsesMap, {});

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

      // Update or create onboarding profile with generated data
      const { error: profileError } = await supabase
        .from('onboarding_profile')
        .upsert({
          user_id: userId,
          completion_percentage: 100,
          is_completed: true,
          personality_type: generatedProfile.personality_type,
          profile_summary: generatedProfile.profile_summary,
          strengths: generatedProfile.strengths,
          growth_areas: generatedProfile.growth_areas,
          money_mindset: generatedProfile.money_mindset,
          recommendations: generatedProfile.recommendations,
          generated_at: now,
          last_updated: now,
        }, {
          onConflict: 'user_id'
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