'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-600 mb-2">
            You are logged in as: <span className="font-medium text-gray-900">{user.email}</span>
          </p>
          <p className="text-sm text-gray-500">
            User ID: {user.id}
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Quiz Analysis</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get personalized financial insights
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Start Quiz →
            </button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Fund Analysis</h3>
            <p className="text-gray-600 text-sm mb-4">
              Compare investment funds
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View Funds →
            </button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Learning Center</h3>
            <p className="text-gray-600 text-sm mb-4">
              Access educational content
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Start Learning →
            </button>
          </div>
        </div>

        {process.env.NEXT_PUBLIC_DEV_MODE === 'true' && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>DEV MODE:</strong> You are currently in development mode with mock authentication.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
