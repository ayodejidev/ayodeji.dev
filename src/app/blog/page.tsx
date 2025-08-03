import { getAllPosts, HashnodePost } from '@/services/hashnode';
import BlogPostCard from '@/components/BlogPostCard';
import BlogSearch from '@/components/BlogSearch';

export const metadata = {
  title: 'Blog | Ayodeji Ogundare',
  description: 'Read my latest thoughts on developer experience, tooling, and community.',
};

interface BlogPageProps {
  searchParams: {
    q?: string;
    tag?: string;
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  let posts: HashnodePost[] = [];
  
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.warn('Failed to fetch blog posts:', error);
    // Return empty array if API is not available
    posts = [];
  }
  const page = Number(searchParams.page) || 1;
  const postsPerPage = 9;

  // Filter posts based on search query and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchParams.q
      ? post.title.toLowerCase().includes(searchParams.q.toLowerCase()) ||
        post.brief.toLowerCase().includes(searchParams.q.toLowerCase())
      : true;

    const matchesTag = searchParams.tag
      ? post.tags.some((tag) => tag.name === searchParams.tag)
      : true;

    return matchesSearch && matchesTag;
  });

  // Get featured posts (first 3 posts)
  const featuredPosts = filteredPosts.slice(0, 3);

  // Remove featured posts from the main list
  const nonFeaturedPosts = filteredPosts.filter(
    post => !featuredPosts.some(featured => featured.slug === post.slug)
  );

  // Get paginated posts (from non-featured)
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = nonFeaturedPosts.slice(startIndex, startIndex + postsPerPage);
  
  const totalPages = Math.ceil(nonFeaturedPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore my latest thoughts on developer experience, tooling, and community building. 
              From technical deep-dives to insights on developer advocacy and open source.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <BlogSearch posts={posts} />
        </div>
      </section>

      {/* Featured Posts Section */}
      {page === 1 && featuredPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
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
        <div className="max-w-7xl mx-auto">
          {nonFeaturedPosts.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                All Articles
              </h2>
              <div className="space-y-8">
                {paginatedPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} isFeatured={false} />
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <a
                  key={pageNum}
                  href={`/blog?page=${pageNum}${
                    searchParams.q ? `&q=${searchParams.q}` : ''
                  }${searchParams.tag ? `&tag=${searchParams.tag}` : ''}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pageNum === page
                      ? 'bg-brand text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </a>
              ))}
            </div>
          )}

          {/* No Results */}
          {nonFeaturedPosts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                No posts found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 