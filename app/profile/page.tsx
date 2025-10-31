'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { OnboardingProfile } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${user?.id || ''}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setProfile(data.profile);
        } else {
          router.push('/onboarding');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = async () => {
    try {
      await fetch('/api/onboarding/reset', { method: 'POST' });
      router.push('/onboarding');
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Retake Modal */}
        {showRetakeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Retake Your Profile?</h3>
              <p className="text-gray-600 mb-6">
                You'll go through the questions again to update your profile. Your previous responses will be saved.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowRetakeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRetake}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Yes, retake
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">{profile.personality_type}</h1>
          <p className="text-xl text-gray-600">Your Financial Personality Profile</p>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">About You</h2>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
            {profile.profile_summary}
          </p>
        </div>

        {/* Money Mindset */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Money Mindset</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{profile.money_mindset}</p>
        </div>

        {/* Strengths */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Strengths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.strengths?.map((strength, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl text-green-600 flex-shrink-0">✓</span>
                  <p className="text-gray-700 text-lg">{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Areas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Areas for Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.growth_areas?.map((area, index) => (
              <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl text-amber-600 flex-shrink-0">→</span>
                  <p className="text-gray-700 text-lg">{area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Personalized Recommendations</h2>
          <ol className="space-y-4">
            {profile.recommendations?.map((recommendation, index) => (
              <li key={index} className="flex gap-4">
                <span className="text-lg font-semibold text-blue-600 flex-shrink-0">
                  {index + 1}.
                </span>
                <p className="text-lg text-gray-700">{recommendation}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Completion Status */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
            <span className="text-2xl font-bold text-blue-600">
              {profile.completion_percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${profile.completion_percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => setShowRetakeModal(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Retake Profile
          </button>
        </div>
      </div>
    </main>
  );
}
