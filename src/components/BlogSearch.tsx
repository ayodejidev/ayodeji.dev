'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HashnodePost } from '@/services/hashnode';

interface BlogSearchProps {
  posts: HashnodePost[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags.map((tag) => tag.name)))
  ).sort();

  // Update URL when search or tag changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedTag) params.set('tag', selectedTag);
    
    const newUrl = params.toString() 
      ? `/blog?${params.toString()}`
      : '/blog';
    
    router.push(newUrl);
  }, [searchQuery, selectedTag, router]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search blog"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
        />
        <svg
          className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedTag('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !selectedTag
              ? 'bg-brand text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-brand text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
} 