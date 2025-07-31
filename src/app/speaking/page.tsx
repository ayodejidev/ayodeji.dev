'use client';

import { useMemo } from 'react';

interface Talk {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  videoUrl: string | null;
  videoTitle: string | null;
}

export default function Speaking() {
  // Define all talks with their dates
  const allTalks: Talk[] = useMemo(() => [
    {
      id: 1,
      title: "OSCA FEST 2022 – Imagine a world without open source",
      description: "Ayodeji spoke at Open Source Community Africa's flagship event about the critical importance of open source software and how it shapes our digital world.",
      date: "2022-03-25",
      location: "Lagos, Nigeria",
      videoUrl: "https://www.youtube.com/embed/-ZnzJEB3GGg",
      videoTitle: "OSCA FEST 2022 - Imagine a world without open source"
    }
  ], []);

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

  // Talk card component
  const TalkCard = ({ talk }: { talk: Talk }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
      <div className="space-y-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {talk.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {talk.description}
        </p>
        
        {/* Metadata */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{formatDate(talk.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{talk.location}</span>
          </div>
        </div>
        
        {/* Video Embed (only if available) */}
        {talk.videoUrl && talk.videoTitle && (
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={talk.videoUrl}
              title={talk.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen py-20 bg-white dark:bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Speaking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I love sharing knowledge and experiences with the developer community through talks, workshops, and presentations.
          </p>
        </div>

        {/* Upcoming Talks Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Upcoming Talks
          </h2>
          <div className="space-y-8">
            {upcomingTalks.length > 0 ? (
              upcomingTalks.map(talk => (
                <TalkCard key={talk.id} talk={talk} />
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

        {/* Past Talks Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Past Talks
          </h2>
          <div className="space-y-8">
            {pastTalks.map(talk => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
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
      </div>
    </main>
  );
} 