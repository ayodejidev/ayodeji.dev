import { getAllPosts, HashnodePost } from '@/services/hashnode';
import BlogPostCard from '@/components/BlogPostCard';
import { isFeaturedPost, featuredBlogIds } from '@/config/blog';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Blog | ${siteConfig.title}`,
  description: 'Read my latest thoughts on developer experience, tooling, and community.',
};

export default async function BlogPage() {
  let posts: HashnodePost[] = [];
  
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.warn('Failed to fetch blog posts:', error);
    // Return empty array if API is not available
    posts = [];
  }

  // Get featured posts based on configuration
  // Posts are sorted by featured order (as specified in config) then by published date
  const featuredPosts = posts
    .filter((post) => isFeaturedPost(post.id, post.slug))
    .sort((a, b) => {
      // Maintain order as specified in config
      const aIndex = featuredBlogIds.findIndex(
        (id) => id === a.id || id === a.slug
      );
      const bIndex = featuredBlogIds.findIndex(
        (id) => id === b.id || id === b.slug
      );
      
      // If order is specified in config, use it; otherwise sort by date
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  // Remove featured posts from the main list
  const nonFeaturedPosts = posts.filter(
    (post) => !isFeaturedPost(post.id, post.slug)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Blog
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Featured articles
            </h2>
            <div className="space-y-8">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} isFeatured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          {nonFeaturedPosts.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                More articles
              </h2>
              <div className="space-y-8">
                {nonFeaturedPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} isFeatured={false} />
                ))}
              </div>
            </>
          )}

          {/* No Results */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                No posts found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Check back soon for new articles!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 