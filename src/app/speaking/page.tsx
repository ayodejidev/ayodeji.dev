'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { talks, Talk } from '@/config/speaking';

export default function Speaking() {
  // Use talks from config
  const allTalks: Talk[] = useMemo(() => talks, []);

  // Categorize talks based on current date
  const { upcomingTalks, pastTalks } = useMemo(() => {
    const now = new Date();
    const upcoming: Talk[] = [];
    const past: Talk[] = [];

    allTalks.forEach(talk => {
      const talkDate = new Date(talk.date);
      if (talkDate > now) {
        upcoming.push(talk);
      } else {
        past.push(talk);
      }
    });

    // Sort upcoming talks by date (earliest first)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Sort past talks by date (most recent first)
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { upcomingTalks: upcoming, pastTalks: past };
  }, [allTalks]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Check if talk is upcoming
  const isUpcoming = (dateString: string) => {
    const talkDate = new Date(dateString);
    const now = new Date();
    return talkDate > now;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Speaking
            </h1>
          </div>
        </div>
      </section>

      {/* Upcoming Talks Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Upcoming talks
          </h2>
          <div className="space-y-8">
            {upcomingTalks.length > 0 ? (
              upcomingTalks.map(talk => (
                <TalkCard key={talk.id} talk={talk} isUpcoming={true} />
              ))
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
                <div className="text-gray-500 dark:text-gray-400">
                  <span className="text-4xl mb-4 block">📅</span>
                  <p className="text-lg">No upcoming speaking engagements at the moment.</p>
                  <p className="text-sm mt-2">Check back soon for new events!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Past Talks Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Past talks
          </h2>
          <div className="space-y-8">
            {pastTalks.length > 0 ? (
              pastTalks.map(talk => (
                <TalkCard key={talk.id} talk={talk} isUpcoming={false} />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  No past talks found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Interested in having me speak at your event?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm always excited to share knowledge and connect with developer communities around the world.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Get in Touch
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Talk Card Component
function TalkCard({ talk, isUpcoming }: { talk: Talk; isUpcoming: boolean }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Left: Thumbnail/Video/Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
          {talk.videoEmbedUrl ? (
            <div className="w-full h-full">
              <iframe
                className="w-full h-full"
                src={talk.videoEmbedUrl}
                title={talk.videoTitle || talk.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : talk.image ? (
            <div className="relative w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              <Image
                src={talk.image}
                alt={talk.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand-light/20 dark:from-brand/30 dark:to-brand-light/30 flex items-center justify-center">
              <svg className="w-12 h-12 text-brand/50 dark:text-brand-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Right: Talk Details */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Status Label */}
            {isUpcoming && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-500">📅</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Upcoming talk
                </span>
              </div>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <time dateTime={talk.date}>
                {formatDate(talk.date)}
              </time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>📍</span>
                <span>{talk.location}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
              {talk.title}
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {talk.description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {talk.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
              {talk.tags.length > 3 && (
                <span className="px-3 py-1 text-gray-500 dark:text-gray-400 text-sm">
                  +{talk.tags.length - 3} more
                </span>
              )}
            </div>

            {/* CTA Link */}
            <div className="flex items-center gap-4">
              {talk.videoUrl && (
                <a
                  href={talk.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand dark:text-brand-light font-medium hover:gap-3 transition-all duration-200 group/link"
                >
                  Watch talk
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {talk.eventUrl && (
                <a
                  href={talk.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand dark:text-brand-light font-medium hover:gap-3 transition-all duration-200 group/link"
                >
                  View Event
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 