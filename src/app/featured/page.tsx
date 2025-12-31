'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredItems, FeaturedItem } from '@/config/featured';

// Type icons mapping
const typeIcons: Record<FeaturedItem['type'], string> = {
  article: '📝',
  interview: '🎤',
  meetup: '👥',
  podcast: '🎙️',
  video: '🎬',
  other: '⭐',
};

// Type labels
const typeLabels: Record<FeaturedItem['type'], string> = {
  article: 'Article',
  interview: 'Interview',
  meetup: 'Meetup',
  podcast: 'Podcast',
  video: 'Video',
  other: 'Featured',
};

export default function Featured() {
  const [activeFilter, setActiveFilter] = useState<FeaturedItem['type'] | 'all'>('all');

  const sortedItems = useMemo(() => {
    return [...featuredItems].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, []);

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return sortedItems;
    }
    return sortedItems.filter(item => item.type === activeFilter);
  }, [sortedItems, activeFilter]);

  // Get all available types from items
  const availableTypes = useMemo(() => {
    const types = new Set<FeaturedItem['type']>();
    sortedItems.forEach(item => types.add(item.type));
    return Array.from(types);
  }, [sortedItems]);

  // Get count for each type
  const typeCounts = useMemo(() => {
    const counts: Record<FeaturedItem['type'], number> = {
      article: 0,
      interview: 0,
      meetup: 0,
      podcast: 0,
      video: 0,
      other: 0,
    };
    sortedItems.forEach(item => {
      counts[item.type]++;
    });
    return counts;
  }, [sortedItems]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (sortedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Articles, interviews, and meetups where I've been featured.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              No featured content yet. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Articles, interviews, meetups, and other content where I've been featured.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeFilter === 'all'
                ? 'bg-brand text-white dark:bg-brand-light dark:text-gray-900'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All ({sortedItems.length})
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                activeFilter === type
                  ? 'bg-brand text-white dark:bg-brand-light dark:text-gray-900'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span>{typeIcons[type]}</span>
              <span>{typeLabels[type]} ({typeCounts[type]})</span>
            </button>
          ))}
        </div>

        {/* Featured Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <FeaturedCard key={item.id} item={item} formatDate={formatDate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No items found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Featured Card Component
function FeaturedCard({ 
  item, 
  formatDate 
}: { 
  item: FeaturedItem; 
  formatDate: (date: string) => string;
}) {
  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        {item.image && (
          <div className="relative w-full h-48 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Type Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{typeIcons[item.type]}</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {typeLabels[item.type]}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand dark:group-hover:text-brand-light transition-colors line-clamp-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm flex-grow">
            {item.description}
          </p>

          {/* Metadata */}
          <div className="mt-auto space-y-2">
            {item.publisher && (
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.publisher}
              </p>
            )}
            <time
              dateTime={item.date}
              className="text-xs text-gray-500 dark:text-gray-400 block"
            >
              {formatDate(item.date)}
            </time>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

