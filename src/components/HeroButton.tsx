'use client';

import { useState } from 'react';

export default function HeroButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand transition-colors duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.location.href = '/contact'}
    >
      Get in Touch
      <svg
        className={`ml-2 w-5 h-5 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`}
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
    </button>
  );
} 