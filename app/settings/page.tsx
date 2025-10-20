'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [devMode, setDevMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Load dev mode setting from localStorage
    const savedDevMode = localStorage.getItem('DEV_MODE') === 'true';
    setDevMode(savedDevMode);
  }, []);

  const handleDevModeToggle = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    localStorage.setItem('DEV_MODE', String(newDevMode));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClearLocalStorage = () => {
    if (confirm('This will clear all local data including quiz results and settings. Continue?')) {
      localStorage.clear();
      setDevMode(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/');
      }, 2000);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Settings
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Manage your app settings and development options
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          Settings updated successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* Dev Mode Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Developer Mode
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Enable mock data for testing without AI integration. Useful for development and testing.
              </p>
            </div>
            <button
              onClick={handleDevModeToggle}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                devMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label="Toggle dev mode"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  devMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Status:</strong> {devMode ? 'Enabled' : 'Disabled'}
            </p>
            {devMode && (
              <p className="text-sm text-blue-800 mt-2">
                Mock data is active for fund analysis and user quiz. API calls will be bypassed.
              </p>
            )}
          </div>
        </div>

        {/* Mock Data Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Current Mock Data
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-gray-900 mb-1">Quiz Analysis</h3>
              <p className="text-sm text-gray-600">
                Mock analysis generates realistic user profiles based on quiz responses
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-gray-900 mb-1">Fund Analysis</h3>
              <p className="text-sm text-gray-600">
                Mock data generates random but realistic fund scores and recommendations
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-gray-900 mb-1">Authentication</h3>
              <p className="text-sm text-gray-600">
                {devMode ? 'Using mock authentication (any credentials work)' : 'Using Supabase authentication'}
              </p>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Data Management
          </h2>
          <div className="space-y-4">
            {user && (
              <div className="pb-4 border-b">
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  Currently logged in as: <strong>{user.email}</strong>
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition min-h-[44px] text-base"
                >
                  Logout
                </button>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Clear All Data</h3>
              <p className="text-sm md:text-base text-gray-600 mb-3">
                Remove all stored data including quiz results, settings, and authentication tokens.
              </p>
              <button
                onClick={handleClearLocalStorage}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition min-h-[44px] text-base"
              >
                Clear localStorage
              </button>
            </div>
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Environment Information
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">App Version:</span>
              <span className="font-mono text-gray-900">0.1.0-MVP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Environment:</span>
              <span className="font-mono text-gray-900">
                {process.env.NODE_ENV || 'development'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Features:</span>
              <span className="text-gray-900">Quiz, Fund Analysis, Content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
