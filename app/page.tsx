import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to FinanceEd PH
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal finance education platform designed for Filipinos
        </p>
        <p className="text-gray-700 mb-8">
          Learn about investing, analyze funds, and get personalized financial insights
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <Link href="/quiz" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-semibold mb-2">Take the Quiz</h2>
          <p className="text-gray-600">
            Get personalized financial insights based on your situation and goals
          </p>
        </Link>

        <Link href="/funds" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">💰</div>
          <h2 className="text-xl font-semibold mb-2">Analyze Funds</h2>
          <p className="text-gray-600">
            Compare and analyze different investment funds available in the Philippines
          </p>
        </Link>

        <Link href="/learn" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-xl font-semibold mb-2">Learn</h2>
          <p className="text-gray-600">
            Access curated financial education content tailored for Filipino investors
          </p>
        </Link>
      </section>

      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
        <p className="text-gray-700 mb-6">
          Take our quick quiz to understand your financial profile and get started
        </p>
        <Link
          href="/quiz"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Quiz
        </Link>
      </section>
    </div>
  );
}
