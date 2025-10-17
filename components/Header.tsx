import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">₱</span>
            </div>
            <Link href="/" className="text-xl font-bold hover:text-blue-100 transition">
              FinanceEd PH
            </Link>
          </div>

          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-100 transition">
              Home
            </Link>
            <Link href="/quiz" className="hover:text-blue-100 transition">
              Quiz
            </Link>
            <Link href="/funds" className="hover:text-blue-100 transition">
              Funds
            </Link>
            <Link href="/learn" className="hover:text-blue-100 transition">
              Learn
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
