import Link from 'next/link';
import Image from 'next/image';
import { HashnodePost } from '@/services/hashnode';

interface BlogPostCardProps {
  post: HashnodePost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Calculate reading time (assuming average reading speed of 200 words per minute)
  const wordCount = post.content?.markdown?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      {post.coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="p-6">
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

        <h2 className="text-xl font-semibold mb-3">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-brand dark:hover:text-brand-light transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.brief}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/blog?tag=${tag.name}`}
              className="px-3 py-1 bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light rounded-full text-sm hover:bg-brand/20 dark:hover:bg-brand/30 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
} 