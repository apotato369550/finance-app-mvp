'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user } = useAuth();
  const [devMode, setDevMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check dev mode status
    const checkDevMode = () => {
      const isDevMode = localStorage.getItem('DEV_MODE') === 'true';
      setDevMode(isDevMode);
    };

    checkDevMode();
    // Listen for storage changes
    window.addEventListener('storage', checkDevMode);
    // Check every second for changes (for same-tab updates)
    const interval = setInterval(checkDevMode, 1000);

    return () => {
      window.removeEventListener('storage', checkDevMode);
      clearInterval(interval);
    };
  }, []);

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
            {devMode && (
              <span className="ml-2 px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
                DEV
              </span>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-700 rounded-md"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-100 transition">
              Home
            </Link>
            <Link href="/quiz" className="hover:text-blue-100 transition">
              Quiz
            </Link>
            <Link href="/fund-analysis" className="hover:text-blue-100 transition">
              Funds
            </Link>
            <Link href="/content" className="hover:text-blue-100 transition">
              Learn
            </Link>
            <Link href="/settings" className="hover:text-blue-100 transition">
              Settings
            </Link>

            {user ? (
              <Link href="/dashboard" className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition min-h-[44px] flex items-center">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition min-h-[44px] flex items-center">
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-blue-100 transition" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/quiz" className="block py-2 hover:text-blue-100 transition" onClick={() => setIsMobileMenuOpen(false)}>
              Quiz
            </Link>
            <Link href="/fund-analysis" className="block py-2 hover:text-blue-100 transition" onClick={() => setIsMobileMenuOpen(false)}>
              Funds
            </Link>
            <Link href="/content" className="block py-2 hover:text-blue-100 transition" onClick={() => setIsMobileMenuOpen(false)}>
              Learn
            </Link>
            <Link href="/settings" className="block py-2 hover:text-blue-100 transition" onClick={() => setIsMobileMenuOpen(false)}>
              Settings
            </Link>
            {user ? (
              <Link href="/dashboard" className="block py-2 bg-white text-blue-600 px-4 rounded-md font-semibold hover:bg-blue-50 transition text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="block py-2 bg-white text-blue-600 px-4 rounded-md font-semibold hover:bg-blue-50 transition text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
