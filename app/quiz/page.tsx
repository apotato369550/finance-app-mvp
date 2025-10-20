'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { mockAnalyzeUser, type QuizAnswers, type AnalysisResult } from '@/lib/mockAnalysis';

const OCCUPATION_OPTIONS = [
  'Student',
  'Salaryman',
  'Government Worker',
  'Self-employed',
  'Other',
];

export default function QuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<QuizAnswers>({
    occupation: '',
    monthlyIncome: 0,
    monthlyExpenses: 0,
    hasBankAccount: false,
    essayResponse: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  const totalSections = 3;
  const progress = ((currentSection + 1) / totalSections) * 100;

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if DEV_MODE is enabled
    const devMode = localStorage.getItem('DEV_MODE') === 'true';

    let analysisResult: AnalysisResult;

    if (devMode) {
      // Use mock analysis in dev mode
      analysisResult = mockAnalyzeUser(formData);
    } else {
      // TODO: Call API endpoint for real AI analysis
      // const response = await fetch('/api/analyze-user', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // analysisResult = await response.json();

      // For now, use mock analysis as fallback
      analysisResult = mockAnalyzeUser(formData);
    }

    // Store analysis result in localStorage
    localStorage.setItem('userAnalysis', JSON.stringify(analysisResult));

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const canProceed = () => {
    switch (currentSection) {
      case 0:
        return formData.occupation !== '';
      case 1:
        return formData.monthlyIncome >= 0 && formData.monthlyExpenses >= 0;
      case 2:
        return formData.essayResponse.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Financial Analysis Quiz</h1>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Section {currentSection + 1} of {totalSections}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Section 1: Basic Info */}
        {currentSection === 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Occupation Type
              </label>
              <select
                value={formData.occupation}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your occupation</option>
                {OCCUPATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Section 2: Financial Snapshot */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Financial Snapshot</h2>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Monthly Income (after deductions)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₱</span>
                <input
                  type="number"
                  min="0"
                  value={formData.monthlyIncome || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyIncome: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Monthly Expenses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₱</span>
                <input
                  type="number"
                  min="0"
                  value={formData.monthlyExpenses || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyExpenses: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Do you have a bank account?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, hasBankAccount: true })
                  }
                  className={`flex-1 py-3 px-4 text-base rounded-md border transition min-h-[44px] ${
                    formData.hasBankAccount
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, hasBankAccount: false })
                  }
                  className={`flex-1 py-3 px-4 text-base rounded-md border transition min-h-[44px] ${
                    !formData.hasBankAccount
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Essay Question */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Tell Us More</h2>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                What would you do if you had 100,000 pesos?
              </label>
              <textarea
                value={formData.essayResponse}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 500) {
                    setFormData({ ...formData, essayResponse: value });
                  }
                }}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={6}
                placeholder="Share your thoughts..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.essayResponse.length}/500 characters
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className={`px-6 py-3 text-base rounded-md transition min-h-[44px] ${
              currentSection === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentSection < totalSections - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-3 text-base rounded-md transition min-h-[44px] ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`px-6 py-3 text-base rounded-md transition min-h-[44px] ${
                canProceed()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
