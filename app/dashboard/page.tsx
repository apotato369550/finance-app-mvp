'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import type { AnalysisResult } from '@/lib/mockAnalysis';

interface OnboardingStatus {
  completed: boolean;
  skipped: boolean;
  completion_percentage: number;
  profile_exists: boolean;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load analysis from localStorage when component mounts
    const storedAnalysis = localStorage.getItem('userAnalysis');
    if (storedAnalysis) {
      try {
        setAnalysis(JSON.parse(storedAnalysis));
      } catch (error) {
        console.error('Failed to parse stored analysis:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch onboarding status
    const fetchOnboardingStatus = async () => {
      try {
        const response = await fetch('/api/onboarding/status');
        if (response.ok) {
          const data = await response.json();
          setOnboardingStatus(data);
        }
      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
      } finally {
        setLoadingStatus(false);
      }
    };

    if (user) {
      fetchOnboardingStatus();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const devMode = typeof window !== 'undefined' && localStorage.getItem('DEV_MODE') === 'true';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-3 text-base bg-red-600 text-white rounded-md hover:bg-red-700 transition min-h-[44px]"
          >
            Sign Out
          </button>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-sm md:text-base text-gray-600 mb-2">
            You are logged in as: <span className="font-medium text-gray-900">{user.email}</span>
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            User ID: {user.id}
          </p>
        </div>

        {/* Analysis Results Section */}
        {analysis && (
          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Your Financial Analysis</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-blue-800 mb-1">User Type</h3>
                <p className="text-2xl font-bold text-blue-900">{analysis.userType}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-green-800 mb-1">Financial Health</h3>
                <p className="text-2xl font-bold text-green-900">{analysis.financialHealth}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-purple-800 mb-1">Risk Profile</h3>
                <p className="text-2xl font-bold text-purple-900">{analysis.riskProfile}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-blue-600 text-white text-center text-sm font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => router.push('/quiz')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base min-h-[44px]"
            >
              Retake Quiz →
            </button>
          </div>
        )}

        {/* Onboarding Status Banner */}
        {!loadingStatus && onboardingStatus && !onboardingStatus.completed && !onboardingStatus.skipped && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Complete Your Profile</h3>
                <p className="text-sm text-blue-700">
                  Get personalized insights by completing your financial personality profile
                </p>
              </div>
              <button
                onClick={() => router.push('/onboarding')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
              >
                Complete Profile →
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-base md:text-lg font-semibold mb-2">Financial Profile</h3>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              View your personality profile and insights
            </p>
            {onboardingStatus?.completed ? (
              <button
                onClick={() => router.push('/profile')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base min-h-[44px]"
              >
                View Profile →
              </button>
            ) : (
              <button
                onClick={() => router.push('/onboarding')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base min-h-[44px]"
              >
                Start Profile →
              </button>
            )}
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-base md:text-lg font-semibold mb-2">Fund Analysis</h3>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              Compare investment funds
            </p>
            <button
              onClick={() => router.push('/fund-analysis')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base min-h-[44px]"
            >
              View Funds →
            </button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-base md:text-lg font-semibold mb-2">Learning Center</h3>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              Access educational content
            </p>
            <button
              onClick={() => router.push('/content')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base min-h-[44px]"
            >
              Start Learning →
            </button>
          </div>
        </div>

        {devMode && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs md:text-sm text-yellow-800">
              <strong>DEV MODE:</strong> You are currently in development mode with mock authentication.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
