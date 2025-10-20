'use client';

import { useState } from 'react';
import { mockAnalyzeFund, type FundAnalysisResult } from '@/lib/mockFundAnalysis';

export default function FundAnalysisPage() {
  const [fundName, setFundName] = useState('');
  const [analysis, setAnalysis] = useState<FundAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fundName.trim()) {
      setError('Please enter a fund name');
      return;
    }

    setLoading(true);

    try {
      // Check if we're in dev mode
      const devMode = localStorage.getItem('DEV_MODE') === 'true';

      if (devMode) {
        // Use mock analysis in dev mode
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        const result = mockAnalyzeFund(fundName);
        setAnalysis(result);
      } else {
        // Call API route in production mode
        const response = await fetch('/api/analyze-fund', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fundName }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze fund');
        }

        const result = await response.json();
        setAnalysis(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation === 'Strong Buy') return 'bg-green-100 text-green-800';
    if (recommendation === 'Buy') return 'bg-blue-100 text-blue-800';
    if (recommendation === 'Hold') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Fund Analysis Tool
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Enter a fund name to get detailed analysis including fundamental score, strengths, weaknesses, and investment recommendation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="fundName" className="block text-base font-medium text-gray-700 mb-2">
            Fund Name
          </label>
          <input
            type="text"
            id="fundName"
            value={fundName}
            onChange={(e) => setFundName(e.target.value)}
            placeholder="e.g., BPI Equity Fund, FMETF, etc."
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 text-base font-semibold rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-h-[48px]"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Fund'
          )}
        </button>
      </form>

      {analysis && (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {analysis.fundName}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Fundamental Score</div>
                <div className={`text-4xl md:text-5xl font-bold ${getScoreColor(analysis.fundamentalScore)}`}>
                  {analysis.fundamentalScore.toFixed(1)}/10
                </div>
              </div>
              <div>
                <span className={`inline-block px-4 py-2 rounded-full text-base font-semibold ${getRecommendationColor(analysis.recommendation)}`}>
                  {analysis.recommendation}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Summary</h3>
            <p className="text-base text-gray-700 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start text-sm md:text-base">
                    <span className="text-green-600 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-red-600 mr-2">⚠</span>
                Weaknesses
              </h3>
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start text-sm md:text-base">
                    <span className="text-red-600 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
