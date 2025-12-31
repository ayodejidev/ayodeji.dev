'use client';

import Link from 'next/link';

export default function FeaturedSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Featured Blogs Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-brand-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Icon with animation */}
              <div className="w-16 h-16 bg-brand/10 dark:bg-brand-light/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:bg-brand/20 dark:group-hover:bg-brand-light/20">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📝</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand dark:group-hover:text-brand-light transition-colors duration-300">
                Blogs
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                Read my thoughts on developer experience, open source collaboration, and insights from the tech community.
              </p>
              
              {/* Button with enhanced hover */}
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group-hover:shadow-xl"
              >
                View blogs
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Featured Talks Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-brand-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Icon with animation */}
              <div className="w-16 h-16 bg-brand/10 dark:bg-brand-light/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 group-hover:bg-brand/20 dark:group-hover:bg-brand-light/20">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎤</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand dark:group-hover:text-brand-light transition-colors duration-300">
                Talks
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                Discover my speaking engagements and presentations on developer experience, open source, and community building.
              </p>
              
              {/* Button with enhanced hover */}
              <Link
                href="/speaking"
                className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group-hover:shadow-xl"
              >
                View talks
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Featured Projects Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent dark:from-brand-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Icon with animation */}
              <div className="w-16 h-16 bg-brand/10 dark:bg-brand-light/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:bg-brand/20 dark:group-hover:bg-brand-light/20">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📁</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand dark:group-hover:text-brand-light transition-colors duration-300">
                Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                Explore my open source projects and personal work that showcase my skills and passion for development.
              </p>
              
              {/* Button with enhanced hover */}
              <a
                href="https://github.com/ayodejidev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group-hover:shadow-xl"
              >
                View projects
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 