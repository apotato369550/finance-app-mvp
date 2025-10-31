import { createClient } from '@supabase/supabase-js';
import { isDevMode } from '@/lib/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    if (isDevMode()) {
      // In dev mode, just return success
      return Response.json({ success: true });
    }

    // Get the user from the auth header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));

    if (userError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update privacy_consent_at in profiles table
    const { error } = await supabase
      .from('profiles')
      .update({ privacy_consent_at: new Date().toISOString() })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating privacy consent:', error);
      return Response.json({ error: 'Failed to save consent' }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Privacy consent error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
