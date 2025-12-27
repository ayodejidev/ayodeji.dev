import { notFound } from 'next/navigation';
import { blogConfig } from '@/config/blog';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const HASHNODE_API_KEY = process.env.HASHNODE_API_KEY;
const HASHNODE_USERNAME = process.env.NEXT_PUBLIC_HASHNODE_USERNAME;

// Only throw errors in development or when actually making API calls
// During build time, we'll handle missing env vars gracefully

// Debug logging
function debugLog(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Hashnode Service] ${message}`, data || '');
  }
}

// Debug environment variables
debugLog('Environment Variables Check:', {
  hasApiKey: !!HASHNODE_API_KEY,
  apiKeyLength: HASHNODE_API_KEY?.length,
  hasUsername: !!HASHNODE_USERNAME,
  username: HASHNODE_USERNAME,
  nodeEnv: process.env.NODE_ENV,
});

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

// Function to fetch a single post by slug (searches through all posts)
export async function getPostBySlug(slug: string): Promise<HashnodePost | null> {
  const allPosts = await getAllPosts();
  return allPosts.find((post) => post.slug === slug) || null;
}

// Function to get all posts (fetches all pages)
export async function getAllPosts(): Promise<HashnodePost[]> {
  const allPosts: HashnodePost[] = [];
  let hasNextPage = true;
  let cursor: string | undefined = undefined;
  const pageSize = blogConfig.pageSize;

  while (hasNextPage) {
    const userData = await getUserData(pageSize, cursor);
    const publication = userData.publications.edges[0]?.node;
    
    if (!publication) {
      break;
    }

    const posts = publication.posts.edges.map((edge) => edge.node);
    allPosts.push(...posts);

    hasNextPage = publication.posts.pageInfo.hasNextPage;
    cursor = publication.posts.pageInfo.endCursor;
  }

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