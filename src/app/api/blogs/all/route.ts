import { NextResponse } from 'next/server';
import { getAllPosts } from '@/services/hashnode';

/**
 * GET /api/blogs/all
 * 
 * Fetches all published blog posts from Hashnode.
 * Useful for debugging and verifying all posts are being fetched correctly.
 * 
 * Returns:
 * - total: Total number of posts fetched
 * - posts: Array of all blog posts with id, title, slug, and publishedAt
 * - oldestPost: The oldest post (by publishedAt)
 * - newestPost: The newest post (by publishedAt)
 */
export async function GET() {
  try {
    const allPosts = await getAllPosts();

    // Sort posts by published date
    const sortedPosts = [...allPosts].sort(
      (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );

    const oldestPost = sortedPosts[0];
    const newestPost = sortedPosts[sortedPosts.length - 1];

    return NextResponse.json({
      total: allPosts.length,
      posts: allPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        brief: post.brief,
      })),
      oldestPost: oldestPost
        ? {
            id: oldestPost.id,
            title: oldestPost.title,
            slug: oldestPost.slug,
            publishedAt: oldestPost.publishedAt,
          }
        : null,
      newestPost: newestPost
        ? {
            id: newestPost.id,
            title: newestPost.title,
            slug: newestPost.slug,
            publishedAt: newestPost.publishedAt,
          }
        : null,
      sortedByDate: sortedPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching all blogs:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch blogs',
        message: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

