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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Financial Analysis Quiz</h1>

        {/* Progress indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Section {currentSection + 1} of {totalSections}
            </span>
            <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Section 1: Basic Info */}
        {currentSection === 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Basic Information</h2>

            <div>
              <label className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
                Occupation Type
              </label>
              <select
                value={formData.occupation}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white"
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
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Financial Snapshot</h2>

            <div>
              <label className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
                Monthly Income (after deductions)
              </label>
              <div className="relative">
                <span className="absolute left-5 top-5 text-gray-500 font-semibold text-lg">₱</span>
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
                  className="w-full pl-10 pr-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
                Monthly Expenses
              </label>
              <div className="relative">
                <span className="absolute left-5 top-5 text-gray-500 font-semibold text-lg">₱</span>
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
                  className="w-full pl-10 pr-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
                Do you have a bank account?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, hasBankAccount: true })
                  }
                  className={`flex-1 py-4 px-6 text-base rounded-xl border-2 transition font-medium min-h-[56px] ${
                    formData.hasBankAccount
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, hasBankAccount: false })
                  }
                  className={`flex-1 py-4 px-6 text-base rounded-xl border-2 transition font-medium min-h-[56px] ${
                    !formData.hasBankAccount
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
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
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Tell Us More</h2>

            <div>
              <label className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
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
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900"
                rows={6}
                placeholder="Share your thoughts..."
              />
              <div className="text-right text-sm text-gray-600 mt-2 font-medium">
                {formData.essayResponse.length}/500 characters
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10 pt-8 border-t-2 border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className={`px-8 py-4 text-base rounded-xl transition font-medium min-h-[56px] ${
              currentSection === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400'
            }`}
          >
            Previous
          </button>

          {currentSection < totalSections - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-8 py-4 text-base rounded-xl transition font-medium min-h-[56px] ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`px-8 py-4 text-base rounded-xl transition font-bold min-h-[56px] ${
                canProceed()
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Quiz ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
