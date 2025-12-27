import Link from 'next/link';
import { getAllPosts, HashnodePost } from '@/services/hashnode';
import { talks } from '@/config/speaking';

export default async function RecentActivity() {
  // Fetch recent blog posts
  let recentPosts: HashnodePost[] = [];
  try {
    const allPosts = await getAllPosts();
    recentPosts = allPosts.slice(0, 3); // Get 3 most recent posts
  } catch (error) {
    console.warn('Failed to fetch recent posts:', error);
  }

  // Get upcoming and recent past talks
  const now = new Date();
  const upcomingTalks = talks
    .filter(talk => new Date(talk.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);
  
  const recentPastTalks = talks
    .filter(talk => new Date(talk.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const displayTalks = upcomingTalks.length > 0 ? upcomingTalks : recentPastTalks.slice(0, 2);

  // Don't show section if there's no content
  if (recentPosts.length === 0 && displayTalks.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">

        <div className="space-y-12">
          {/* Recent Blog Posts */}
          {recentPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Latest articles
                </h3>
                <Link
                  href="/blog"
                  className="text-brand dark:text-brand-light hover:underline text-sm font-medium"
                >
                  View all →
                </Link>
              </div>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow flex flex-col h-[240px]"
                  >
                    <div className="h-6 mb-3"></div>
                    <Link href={`/blog/${post.slug}`}>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-brand dark:hover:text-brand-light transition-colors">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-1 flex-grow">
                      {post.brief}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <time
                        dateTime={post.publishedAt}
                        className="text-sm text-gray-500 dark:text-gray-400"
                      >
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm text-brand dark:text-brand-light hover:underline font-medium"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speaking Engagements */}
          {displayTalks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {upcomingTalks.length > 0 ? 'Upcoming talks' : 'Recent talks'}
                </h3>
                <Link
                  href="/speaking"
                  className="text-brand dark:text-brand-light hover:underline text-sm font-medium"
                >
                  View all →
                </Link>
              </div>
              <div className="space-y-6">
                {displayTalks.map((talk) => {
                  const talkDate = new Date(talk.date);
                  const isUpcoming = talkDate > now;

                  return (
                    <div
                      key={talk.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow flex flex-col h-[240px]"
                    >
                      <div className="h-6 mb-3">
                        {isUpcoming && (
                          <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {talk.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-1 flex-grow">
                        {talk.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <time dateTime={talk.date}>
                          {talkDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <span>•</span>
                        <span className="line-clamp-1">{talk.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-auto">
                        {talk.videoUrl && (
                          <a
                            href={talk.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-brand dark:text-brand-light hover:underline font-medium"
                          >
                            Watch video →
                          </a>
                        )}
                        {talk.eventUrl && (
                          <a
                            href={talk.eventUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-brand dark:text-brand-light hover:underline font-medium"
                          >
                            Event details →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

