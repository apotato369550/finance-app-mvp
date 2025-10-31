import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-utils';
import { isDevMode } from '@/lib/supabase';
import { generateProfileWithAI } from '@/lib/profileAnalyzer';

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
    const body = await request.json();
    const { responses, questionTexts } = body;

    if (isDevMode()) {
      // In dev mode, use mock analysis
      const profile = generateProfileWithAI(responses, questionTexts, false);
      return NextResponse.json({ profile });
    }

    // TODO: In production, call real AI service (OpenAI, Claude, etc.)
    // For now, use mock profile
    const profile = generateProfileWithAI(responses, questionTexts, false);

    // In production, you would:
    // 1. Store the profile in the database
    // 2. Update the onboarding_profile table with the AI-generated data
    // 3. Return the stored profile

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Profile analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
