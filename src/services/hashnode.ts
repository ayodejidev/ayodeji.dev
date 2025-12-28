import { notFound } from 'next/navigation';
import { blogConfig } from '@/config/blog';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const HASHNODE_API_KEY = process.env.HASHNODE_API_KEY;
const HASHNODE_USERNAME = process.env.NEXT_PUBLIC_HASHNODE_USERNAME;

// Only throw errors in development or when actually making API calls
// During build time, we'll handle missing env vars gracefully

// Debug logging (only in development)
function debugLog(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Hashnode Service] ${message}`, data || '');
  }
}

// Types for the Hashnode API responses
export interface HashnodePost {
  id?: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
  content?: {
    markdown: string;
  };
  tags: Array<{
    name: string;
  }>;
}

export interface HashnodePublication {
  url: string;
  title: string;
  posts: {
    edges: Array<{
      node: HashnodePost;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface HashnodeUser {
  id: string;
  name: string;
  username: string;
  tagline: string;
  publications: {
    edges: Array<{
      node: HashnodePublication;
    }>;
  };
}

// GraphQL query to fetch user data and posts (with pagination support)
const GET_USER_QUERY = `
  query GetUser($username: String!, $first: Int!, $after: String) {
    user(username: $username) {
      id
      name
      username
      tagline
      publications(first: 1) {
        edges {
          node {
            url
            title
            posts(first: $first, after: $after) {
              edges {
                node {
                  id
                  title
                  brief
                  slug
                  publishedAt
                  coverImage {
                    url
                  }
                  content {
                    markdown
                  }
                  tags {
                    name
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      }
    }
  }
`;

// Alternative query to fetch posts directly from publication (might have different limits)
// Note: Hashnode API returns published posts by default
const GET_PUBLICATION_POSTS_QUERY = `
  query GetPublicationPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            coverImage {
              url
            }
            content {
              markdown
            }
            tags {
              name
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// Function to fetch user data and posts with pagination
export async function getUserData(first: number = 20, after?: string): Promise<HashnodeUser> {
  if (!HASHNODE_API_KEY) {
    const error = new Error('Hashnode API key is not configured');
    console.warn('[Hashnode Service]', error.message);
    throw error;
  }

  if (!HASHNODE_USERNAME) {
    const error = new Error('Hashnode username is not configured');
    console.warn('[Hashnode Service]', error.message);
    throw error;
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': HASHNODE_API_KEY,
  };

  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: GET_USER_QUERY,
      variables: {
        username: HASHNODE_USERNAME,
        first,
        after: after || null,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Hashnode data');
  }

  const data = await response.json();

  if (data.errors) {
    console.error('Hashnode API errors:', data.errors);
    throw new Error('Hashnode API returned errors');
  }

  return data.data.user;
}

// GraphQL query to fetch a single post by slug directly from publication
const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        title
        brief
        slug
        publishedAt
        coverImage {
          url
        }
        content {
          markdown
        }
        tags {
          name
        }
      }
    }
  }
`;

// Function to fetch a single post by slug directly from Hashnode API
export async function getPostBySlugDirect(host: string, slug: string): Promise<HashnodePost | null> {
  if (!HASHNODE_API_KEY) {
    throw new Error('Hashnode API key is not configured');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': HASHNODE_API_KEY,
  };

  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: GET_POST_BY_SLUG_QUERY,
      variables: {
        host,
        slug,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch post from Hashnode');
  }

  const data = await response.json();

  if (data.errors) {
    console.error('Hashnode API errors:', data.errors);
    return null;
  }

  return data.data?.publication?.post || null;
}

// Function to fetch a single post by slug (searches through all posts first, then tries direct fetch)
export async function getPostBySlug(slug: string): Promise<HashnodePost | null> {
  // First, try to find it in all posts
  const allPosts = await getAllPosts();
  const foundPost = allPosts.find((post) => post.slug === slug);
  
  if (foundPost) {
    return foundPost;
  }

  // If not found, try direct fetch using the publication host
  // Extract host from username (e.g., username -> username.hashnode.dev)
  if (HASHNODE_USERNAME) {
    const host = HASHNODE_USERNAME.includes('.hashnode.dev') 
      ? HASHNODE_USERNAME 
      : `${HASHNODE_USERNAME}.hashnode.dev`;
    debugLog(`Post not found in paginated results, trying direct fetch for slug: ${slug}`);
    return await getPostBySlugDirect(host, slug);
  }

  return null;
}

// Function to fetch posts directly from publication (alternative method)
async function getPublicationPosts(host: string, first: number = 20, after?: string): Promise<{
  posts: HashnodePost[];
  hasNextPage: boolean;
  endCursor: string | undefined;
}> {
  if (!HASHNODE_API_KEY) {
    throw new Error('Hashnode API key is not configured');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': HASHNODE_API_KEY,
  };

  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: GET_PUBLICATION_POSTS_QUERY,
      variables: {
        host,
        first,
        after: after || null,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts from publication');
  }

  const data = await response.json();

  if (data.errors) {
    console.error('Hashnode API errors:', data.errors);
    throw new Error(`Hashnode API returned errors: ${JSON.stringify(data.errors)}`);
  }

  const publication = data.data?.publication;
  if (!publication) {
    debugLog(`No publication found for host: ${host}`);
    return {
      posts: [],
      hasNextPage: false,
      endCursor: undefined,
    };
  }

  return {
    posts: publication.posts.edges.map((edge: any) => edge.node),
    hasNextPage: publication.posts.pageInfo?.hasNextPage ?? false,
    endCursor: publication.posts.pageInfo?.endCursor,
  };
}

// Cache for publication host to avoid repeated API calls
let cachedPublicationHost: string | null = null;

// Function to get the publication host from user data
export async function getPublicationHost(): Promise<string | null> {
  // Return cached host if available
  if (cachedPublicationHost) {
    return cachedPublicationHost;
  }

  if (!HASHNODE_USERNAME) {
    return null;
  }

  try {
    const userData = await getUserData(1); // Just need 1 post to get publication info
    const publication = userData.publications.edges[0]?.node;
    
    if (!publication || !publication.url) {
      return null;
    }

    // Extract host from URL (e.g., "https://deji.hashnode.dev" -> "deji.hashnode.dev")
    const url = new URL(publication.url);
    const host = url.hostname;
    
    // Cache the host
    cachedPublicationHost = host;
    
    debugLog(`Found publication host from API: ${host} (from URL: ${publication.url})`);
    return host;
  } catch (error) {
    debugLog(`Error getting publication host:`, error);
    // Fallback to constructed host
    const fallbackHost = HASHNODE_USERNAME.includes('.hashnode.dev') 
      ? HASHNODE_USERNAME 
      : `${HASHNODE_USERNAME}.hashnode.dev`;
    debugLog(`Using fallback host: ${fallbackHost}`);
    return fallbackHost;
  }
}

// Function to get all posts (fetches all pages)
// Uses publication-based query by default as it's more reliable
export async function getAllPosts(): Promise<HashnodePost[]> {
  const allPosts: HashnodePost[] = [];
  let hasNextPage = true;
  let cursor: string | undefined = undefined;
  const pageSize = blogConfig.pageSize;
  let pageCount = 0;
  const maxPages = 50; // Safety limit to prevent infinite loops

  // Get the actual publication host from the API
  const host = await getPublicationHost();
  
  if (!host) {
    throw new Error('Could not determine publication host. Please check your Hashnode username configuration.');
  }
  
  debugLog(`Fetching posts from publication host: ${host}`);
  
  while (hasNextPage && pageCount < maxPages) {
    pageCount++;
    
    try {
      const result = await getPublicationPosts(host, pageSize, cursor);
      const posts = result.posts;
      
      allPosts.push(...posts);
      
      debugLog(`Page ${pageCount}: Fetched ${posts.length} posts. Total: ${allPosts.length}`);
      
      hasNextPage = result.hasNextPage;
      cursor = result.endCursor;
      
      // If we got fewer posts than pageSize, we're likely at the end
      if (posts.length < pageSize && !hasNextPage) {
        break;
      }
      
      // If no cursor is provided but hasNextPage is true, something is wrong
      if (hasNextPage && !cursor) {
        debugLog('Warning: hasNextPage is true but no endCursor provided. Stopping pagination.');
        break;
      }
      
      // If we got 0 posts, stop
      if (posts.length === 0) {
        break;
      }
      
    } catch (error) {
      debugLog(`Error fetching page ${pageCount}:`, error);
      // If it's the first page, throw the error. Otherwise, return what we have.
      if (pageCount === 1) {
        throw error;
      }
      break;
    }
  }

  if (pageCount >= maxPages) {
    debugLog(`Warning: Reached maximum page limit (${maxPages}). There may be more posts.`);
  }

  debugLog(`Finished fetching all posts. Total: ${allPosts.length} posts across ${pageCount} pages`);
  
  return allPosts;
}

// Function to get paginated posts
export async function getPaginatedPosts(
  first: number = 20,
  after?: string
): Promise<{
  posts: HashnodePost[];
  hasNextPage: boolean;
  endCursor: string;
}> {
  const userData = await getUserData(first, after);
  const publication = userData.publications.edges[0]?.node;
  
  if (!publication) {
    return {
      posts: [],
      hasNextPage: false,
      endCursor: '',
    };
  }

  return {
    posts: publication.posts.edges.map((edge) => edge.node),
    hasNextPage: publication.posts.pageInfo.hasNextPage,
    endCursor: publication.posts.pageInfo.endCursor,
  };
} 