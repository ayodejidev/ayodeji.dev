import Link from 'next/link';
import Image from 'next/image';
import { HashnodePost } from '@/services/hashnode';

interface RelatedPostCardProps {
  post: HashnodePost;
}

export default function RelatedPostCard({ post }: RelatedPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative w-full h-48 flex-shrink-0">
          {post.coverImage ? (
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand-light/20 dark:from-brand/30 dark:to-brand-light/30 flex items-center justify-center">
              <svg className="w-12 h-12 text-brand/50 dark:text-brand-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand dark:group-hover:text-brand-light transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm flex-grow">
            {post.brief}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-auto">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            {post.readTimeInMinutes && (
              <>
                <span>•</span>
                <span>{post.readTimeInMinutes} min read</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

