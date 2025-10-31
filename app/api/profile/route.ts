import { createClient } from '@supabase/supabase-js';
import { isDevMode } from '@/lib/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  try {
    if (isDevMode()) {
      // In dev mode, return mock profile
      return Response.json({
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

    // Get user from auth header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));

    if (userError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch profile from database
    const { data, error } = await supabase
      .from('onboarding_profile')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      return Response.json({ exists: false });
    }

    return Response.json({
      exists: true,
      profile: data,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
