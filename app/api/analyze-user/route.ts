import { NextRequest, NextResponse } from 'next/server';
import { mockAnalyzeUser, type QuizAnswers } from '@/lib/mockAnalysis';

export async function POST(request: NextRequest) {
  try {
    const body: QuizAnswers = await request.json();

    // TODO: Implement AI-powered analysis here
    // This endpoint will eventually call an AI service (e.g., OpenAI, Anthropic)
    // to provide more sophisticated financial analysis based on the user's quiz answers.
    //
    // Example implementation:
    // const aiResponse = await callAIService({
    //   occupation: body.occupation,
    //   monthlyIncome: body.monthlyIncome,
    //   monthlyExpenses: body.monthlyExpenses,
    //   hasBankAccount: body.hasBankAccount,
    //   essayResponse: body.essayResponse,
    // });
    //
    // return NextResponse.json(aiResponse);

    // For now, use mock analysis
    const analysisResult = mockAnalyzeUser(body);

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Error analyzing user:', error);
    return NextResponse.json(
      { error: 'Failed to analyze user data' },
      { status: 500 }
    );
  }
}
