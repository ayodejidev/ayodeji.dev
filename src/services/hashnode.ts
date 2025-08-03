import { notFound } from 'next/navigation';

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

// GraphQL query to fetch user data and posts
const GET_USER_QUERY = `
  query GetUser($username: String!) {
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
            posts(first: 5) {
              edges {
                node {
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

// Function to fetch user data and posts
export async function getUserData(): Promise<HashnodeUser> {
  if (!HASHNODE_API_KEY) {
    throw new Error('Hashnode API key is not configured');
  }

  if (!HASHNODE_USERNAME) {
    throw new Error('Hashnode username is not configured');
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

// Function to fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<HashnodePost | null> {
  const userData = await getUserData();
  const publication = userData.publications.edges[0]?.node;
  
  if (!publication) {
    return null;
  }

  const post = publication.posts.edges.find(
    (edge) => edge.node.slug === slug
  )?.node;

  return post || null;
}

// Function to get all posts
export async function getAllPosts(): Promise<HashnodePost[]> {
  const userData = await getUserData();
  const publication = userData.publications.edges[0]?.node;
  
  if (!publication) {
    return [];
  }

  return publication.posts.edges.map((edge) => edge.node);
}

// Function to get paginated posts
export async function getPaginatedPosts(
  first: number = 5,
  after?: string
): Promise<{
  posts: HashnodePost[];
  hasNextPage: boolean;
  endCursor: string;
}> {
  const userData = await getUserData();
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