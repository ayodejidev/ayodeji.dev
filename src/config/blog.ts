/**
 * Blog Configuration
 * 
 * Configure which blog posts should be featured on the blog page.
 * You can specify posts by their ID or slug (slug is recommended as it's more stable).
 * 
 * HOW TO USE:
 * 1. Find the slug of the blog post you want to feature (from your Hashnode dashboard or blog URL)
 * 2. Add the slug to the array below in the order you want them to appear
 * 3. Save the file - featured posts will appear at the top of your blog page
 * 
 * Example:
 * export const featuredBlogIds: string[] = [
 *   'building-scalable-developer-experiences',  // Featured first
 *   'future-of-innersource',                    // Featured second
 *   'modern-api-design-2025',                   // Featured third
 * ];
 */

export const featuredBlogIds: string[] = [
  'my-devrelcon-new-york-2025-experience'
  // Add blog IDs or slugs here (in the order you want them displayed)
  // Example: 'my-awesome-blog-post'
  // Example: 'another-featured-post'
];

/**
 * Blog pagination settings
 */
export const blogConfig = {
  // Number of posts to fetch per page from Hashnode API
  pageSize: 20,
  
  // Number of featured posts to display (if not using featuredBlogIds)
  defaultFeaturedCount: 3,
};

/**
 * Helper function to check if a post should be featured
 * Supports both ID and slug matching
 */
export function isFeaturedPost(postId: string | undefined, postSlug: string): boolean {
  if (featuredBlogIds.length === 0) {
    return false;
  }
  
  return featuredBlogIds.some(
    (idOrSlug) => idOrSlug === postId || idOrSlug === postSlug
  );
}
