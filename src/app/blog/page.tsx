import { getAllPosts, HashnodePost } from '@/services/hashnode';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'Blog | Ayodeji Ogundare',
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

  // Get featured posts (first 3 posts)
  const featuredPosts = posts.slice(0, 3);

  // Remove featured posts from the main list
  const nonFeaturedPosts = posts.filter(
    post => !featuredPosts.some(featured => featured.slug === post.slug)
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
              Featured Articles
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
                All Articles
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