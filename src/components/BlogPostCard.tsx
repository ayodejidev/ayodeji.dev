import Link from 'next/link';
import Image from 'next/image';
import { HashnodePost } from '@/services/hashnode';

interface BlogPostCardProps {
  post: HashnodePost;
  isFeatured?: boolean;
}

export default function BlogPostCard({ post, isFeatured = false }: BlogPostCardProps) {
  // Calculate reading time (assuming average reading speed of 200 words per minute)
  const wordCount = post.content?.markdown?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Left: Thumbnail */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
          {post.coverImage ? (
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 256px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand-light/20 dark:from-brand/30 dark:to-brand-light/30 flex items-center justify-center">
              <svg className="w-12 h-12 text-brand/50 dark:text-brand-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Right: Post Details */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Status Label */}
            {isFeatured && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-500">🌟</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Featured article
                </span>
              </div>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            
            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.brief}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag.name}
                  href={`/blog?tag=${tag.name}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-brand/10 hover:text-brand dark:hover:bg-brand/20 dark:hover:text-brand-light transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
              {post.tags.length > 3 && (
                <span className="px-3 py-1 text-gray-500 dark:text-gray-400 text-sm">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>

            {/* CTA Link */}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-brand dark:text-brand-light font-medium hover:gap-3 transition-all duration-200 group/link"
            >
              Read the blog
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
} 