import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `404 - Page Not Found | ${siteConfig.title}`,
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number with Animation */}
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[12rem] font-bold text-brand dark:text-brand-light leading-none">
            <span className="inline-block animate-float">4</span>
            <span className="inline-block animate-float-reverse" style={{ animationDelay: '0.2s' }}>0</span>
            <span className="inline-block animate-float" style={{ animationDelay: '0.4s' }}>4</span>
          </h1>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 text-brand dark:text-brand-light border-2 border-brand dark:border-brand-light hover:bg-brand hover:text-white dark:hover:bg-brand-light dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Blog
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 text-brand dark:text-brand-light border-2 border-brand dark:border-brand-light hover:bg-brand hover:text-white dark:hover:bg-brand-light dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              About
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-brand dark:text-brand-light border-2 border-brand dark:border-brand-light hover:bg-brand hover:text-white dark:hover:bg-brand-light dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-64 h-64 border-4 border-brand dark:border-brand-light rounded-full"></div>
          </div>
          <div className="relative">
            <svg
              className="w-32 h-32 mx-auto text-brand/20 dark:text-brand-light/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

