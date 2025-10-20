'use client';

import { useState } from 'react';

type ContentType = 'Book' | 'Video' | 'Article';

interface ContentItem {
  id: number;
  title: string;
  type: ContentType;
  author: string;
  description: string;
  link: string;
}

const contentItems: ContentItem[] = [
  {
    id: 1,
    title: 'Think and Grow Rich',
    type: 'Book',
    author: 'Napoleon Hill',
    description: 'A timeless classic on building wealth through mindset and persistence. Essential reading for anyone starting their financial journey.',
    link: 'https://www.amazon.com/Think-Grow-Rich-Napoleon-Hill/dp/1585424331',
  },
  {
    id: 2,
    title: 'Rich Dad Poor Dad',
    type: 'Book',
    author: 'Robert Kiyosaki',
    description: 'Learn the fundamental differences in mindset between the wealthy and the poor. A must-read for understanding assets vs liabilities.',
    link: 'https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194',
  },
  {
    id: 3,
    title: 'Personal Finance for Filipinos',
    type: 'Video',
    author: 'Nicole Alba',
    description: 'Comprehensive guide to managing money, saving, and investing specifically for Filipinos. Covers emergency funds, insurance, and investment basics.',
    link: 'https://www.youtube.com/watch?v=example1',
  },
  {
    id: 4,
    title: 'Stock Market Investing 101',
    type: 'Video',
    author: 'Nicole Alba',
    description: 'Beginner-friendly introduction to the Philippine Stock Exchange. Learn how to start investing in stocks with as little as 5,000 pesos.',
    link: 'https://www.youtube.com/watch?v=example2',
  },
  {
    id: 5,
    title: 'The Psychology of Money',
    type: 'Book',
    author: 'Morgan Housel',
    description: 'Understand how people think about money and why we make the financial decisions we do. Timeless lessons on wealth and happiness.',
    link: 'https://www.amazon.com/Psychology-Money-Timeless-lessons-happiness/dp/0857197681',
  },
  {
    id: 6,
    title: 'Understanding Mutual Funds in the Philippines',
    type: 'Article',
    author: 'Financial Wellness PH',
    description: 'A comprehensive guide to different types of mutual funds available in the Philippines, their fees, and how to choose the right one.',
    link: 'https://example.com/mutual-funds-guide',
  },
  {
    id: 7,
    title: 'Emergency Fund: How Much Do You Really Need?',
    type: 'Article',
    author: 'Money Matters PH',
    description: 'Calculate your ideal emergency fund size based on your lifestyle and risk factors. Includes practical tips for building it faster.',
    link: 'https://example.com/emergency-fund',
  },
  {
    id: 8,
    title: 'Passive Income Strategies for Filipinos',
    type: 'Video',
    author: 'Investing Juan',
    description: 'Explore different ways to generate passive income in the Philippines, from dividend stocks to rental properties and online businesses.',
    link: 'https://www.youtube.com/watch?v=example3',
  },
];

export default function ContentPage() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | ContentType>('All');

  const filteredContent = selectedFilter === 'All'
    ? contentItems
    : contentItems.filter(item => item.type === selectedFilter);

  const getTypeBadgeColor = (type: ContentType) => {
    switch (type) {
      case 'Book':
        return 'bg-purple-100 text-purple-800';
      case 'Video':
        return 'bg-red-100 text-red-800';
      case 'Article':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filters: Array<'All' | ContentType> = ['All', 'Book', 'Video', 'Article'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Content Repository
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Curated financial education resources to help you on your journey to financial wellness.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition min-h-[44px] text-base ${
              selectedFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:shadow-lg transition"
          >
            <div className="mb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getTypeBadgeColor(item.type)}`}>
                {item.type}
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h2>

            <p className="text-sm text-gray-600 mb-3">
              by {item.author}
            </p>

            <p className="text-sm md:text-base text-gray-700 mb-4 flex-grow">
              {item.description}
            </p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition min-h-[44px] flex items-center justify-center text-base"
            >
              View Resource
            </a>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No content found for this filter.</p>
        </div>
      )}
    </div>
  );
}
