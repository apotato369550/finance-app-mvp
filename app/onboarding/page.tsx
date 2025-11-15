'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ONBOARDING_QUESTIONS, getQuestionsInOrder } from '@/lib/onboarding-questions';
import { OnboardingQuestion, OnboardingResponse } from '@/types';

const PrivacyDisclaimer = ({ onAccept, onSkip }: { onAccept: () => void; onSkip: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
    <div className="max-w-2xl w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Let's personalize your experience</h1>
        <p className="text-lg text-gray-600">Your data, your control</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100">
        <p className="text-gray-700 mb-6 text-base leading-relaxed">
          We'll ask you some questions about your financial habits and goals. Your answers help us create a personalized profile and recommendations.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl mt-1 font-bold">✓</span>
            <span className="text-gray-700">Stored securely and encrypted</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl mt-1 font-bold">✓</span>
            <span className="text-gray-700">Never shared with third parties</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl mt-1 font-bold">✓</span>
            <span className="text-gray-700">Used only to improve your experience</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl mt-1 font-bold">✓</span>
            <span className="text-gray-700">Deletable at any time from your settings</span>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          You can delay this process and complete it later.
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onSkip}
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition font-medium"
        >
          Complete later
        </button>
        <button
          onClick={onAccept}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg font-medium"
        >
          I understand, let's start
        </button>
      </div>
    </div>
  </div>
);

interface QuestionScreenProps {
  question: OnboardingQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (response: Omit<OnboardingResponse, 'user_id' | 'id' | 'created_at' | 'updated_at'>) => void;
  onSkip: () => void;
  onBack: () => void;
  previousAnswer?: any;
}

const QuestionScreen = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onSkip,
  onBack,
  previousAnswer,
}: QuestionScreenProps) => {
  const [response, setResponse] = useState(previousAnswer || '');
  const [loading, setLoading] = useState(false);

  // Reset response when question changes
  useEffect(() => {
    setResponse(previousAnswer || '');
  }, [question.id, previousAnswer]);

  const handleNext = async () => {
    // Always require an answer - users cannot skip questions
    if (!response || (typeof response === 'string' && response.trim() === '')) {
      alert('This question is required. Please provide an answer before continuing.');
      return;
    }

    setLoading(true);
    try {
      await onAnswer({
        question_id: question.id,
        question_text: question.text,
        response_type: question.type,
        response_value: question.type === 'number' ? parseInt(response) : response,
      });
      // Clear the response after successful submission
      setResponse('');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Header with progress */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 underline font-medium"
            >
              Complete later
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 leading-tight">{question.text}</h2>

          {/* Input based on type */}
          {question.type === 'text' && (
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-5 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm text-gray-900"
              rows={4}
            />
          )}

          {question.type === 'number' && (
            <input
              type="number"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Enter a number..."
              className="w-full p-5 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900"
            />
          )}

          {question.type === 'choice' && (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => setResponse(option)}
                  className={`w-full p-5 text-left border-2 rounded-2xl transition font-medium ${
                    response === option
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {(question.type === 'scale_1_5' || question.type === 'scale_1_10') && (
            <div className="space-y-4">
              <div className="flex justify-between gap-2">
                {question.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setResponse(option)}
                    className={`flex-1 py-4 rounded-xl border-2 transition text-sm font-medium ${
                      response === option
                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="border-t border-gray-200 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6 w-full">
          <div className="flex justify-between gap-4">
            <button
              onClick={onBack}
              disabled={currentIndex === 0 || loading}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-medium"
            >
              {loading ? 'Saving...' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading, getAuthHeader } = useAuth();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const questions = getQuestionsInOrder();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handlePrivacyAccept = async () => {
    setLoading(true);
    try {
      // Update privacy_consent_at in the database
      const authHeader = await getAuthHeader();
      const response = await fetch('/api/onboarding/privacy-consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setShowDisclaimer(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      const authHeader = await getAuthHeader();
      await fetch('/api/onboarding/skip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
      });
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (response: Omit<OnboardingResponse, 'user_id' | 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch('/api/onboarding/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify(response),
      });

      if (res.ok) {
        const data = await res.json();
        setAnswers((prev) => ({
          ...prev,
          [response.question_id]: response.response_value,
        }));

        // Move to next question or complete
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // All questions answered, complete onboarding
          const completeRes = await fetch('/api/onboarding/complete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
          });

          if (completeRes.ok) {
            router.push('/profile');
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (showDisclaimer) {
    return (
      <PrivacyDisclaimer
        onAccept={() => handlePrivacyAccept()}
        onSkip={() => handleSkip()}
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <QuestionScreen
      question={currentQuestion}
      currentIndex={currentIndex}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
      onSkip={handleSkip}
      onBack={handleBack}
      previousAnswer={answers[currentQuestion.id]}
    />
  );
}
