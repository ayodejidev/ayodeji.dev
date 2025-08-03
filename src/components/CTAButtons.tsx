'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CTAButtons() {
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Primary CTA Button */}
      <Link
        href="/contact"
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onMouseEnter={() => setPrimaryHovered(true)}
        onMouseLeave={() => setPrimaryHovered(false)}
      >
        Let's Connect
        <svg
          className={`ml-2 w-5 h-5 transition-transform duration-200 ${primaryHovered ? 'translate-x-1' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>

      {/* Secondary CTA Button */}
      <Link
        href="/about"
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-brand dark:text-brand-light border-2 border-brand dark:border-brand-light hover:bg-brand hover:text-white dark:hover:bg-brand-light dark:hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
        onMouseEnter={() => setSecondaryHovered(true)}
        onMouseLeave={() => setSecondaryHovered(false)}
      >
        About me
        <svg
          className={`ml-2 w-5 h-5 transition-transform duration-200 ${secondaryHovered ? 'translate-x-1' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
} 