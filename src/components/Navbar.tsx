'use client'

import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  // Helper function to get active classes
  const getActiveClasses = (path: string) => {
    const active = isActive(path)
    return active
      ? 'text-brand dark:text-brand-light font-semibold nav-link-active'
      : 'text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-brand-light nav-link-inactive'
  }

  // Helper function to get mobile active classes
  const getMobileActiveClasses = (path: string) => {
    const active = isActive(path)
    return active
      ? 'block px-3 py-2 rounded-md text-base font-medium text-brand dark:text-brand-light bg-brand/10 dark:bg-brand-light/10 border-l-4 border-brand dark:border-brand-light'
      : 'block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
  }

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Ayodeji Ogundare"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
            <span className="font-bold text-gray-900 dark:text-white">Ayodeji.dev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`transition-all duration-300 ${getActiveClasses('/')}`}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={`transition-all duration-300 ${getActiveClasses('/blog')}`}
            >
              Blog
            </Link>
            <Link 
              href="/speaking" 
              className={`transition-all duration-300 ${getActiveClasses('/speaking')}`}
            >
              Speaking
            </Link>
            <a
              href="https://github.com/ayodejidev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-brand-light transition-all duration-200"
            >
              Projects
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with enhanced animations */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`${getMobileActiveClasses('/')} transition-all duration-300 transform ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '0ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`${getMobileActiveClasses('/blog')} transition-all duration-300 transform ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '50ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/speaking"
              className={`${getMobileActiveClasses('/speaking')} transition-all duration-300 transform ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '100ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Speaking
            </Link>
            <a
              href="https://github.com/ayodejidev"
              target="_blank"
              rel="noopener noreferrer"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '150ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
} 