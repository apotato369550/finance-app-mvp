import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="text-center py-16 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">FinanceEd PH</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Your personal finance education platform designed for Filipinos
        </p>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Learn about investing, analyze funds, and get personalized financial insights to secure your financial future
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Link href="/quiz" className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📊</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Take the Quiz</h2>
          <p className="text-gray-600 leading-relaxed">
            Get personalized financial insights based on your situation and goals
          </p>
        </Link>

        <Link href="/fund-analysis" className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">💰</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Analyze Funds</h2>
          <p className="text-gray-600 leading-relaxed">
            Compare and analyze different investment funds available in the Philippines
          </p>
        </Link>

        <Link href="/content" className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📚</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Learn</h2>
          <p className="text-gray-600 leading-relaxed">
            Access curated financial education content tailored for Filipino investors
          </p>
        </Link>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 md:p-14 text-center mb-16 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">Ready to Start Your Financial Journey?</h2>
        <p className="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto leading-relaxed">
          Take our quick quiz to understand your financial profile and get personalized recommendations
        </p>
        <Link
          href="/quiz"
          className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          Start Quiz Now →
        </Link>
      </section>
    </div>
  );
}
