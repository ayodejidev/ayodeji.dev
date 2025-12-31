import { getPostBySlug, getAllPosts } from '@/services/hashnode';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';
import RelatedPostCard from '@/components/RelatedPostCard';
import { marked } from 'marked';
import { siteConfig } from '@/config/site';

// Configure marked to use synchronous mode
marked.setOptions({
  async: false,
  gfm: true
});

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const postUrl = `${siteConfig.url}/blog/${params.slug}`;
    
    return {
      title: `${post.title} | ${siteConfig.title}`,
      description: post.brief,
      openGraph: {
        title: post.title,
        description: post.brief,
        url: postUrl,
        type: 'article',
        siteName: siteConfig.title,
        images: post.coverImage ? [
          {
            url: post.coverImage.url,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.brief,
        images: post.coverImage ? [post.coverImage.url] : [],
      },
    };
  } catch (error) {
    console.warn('Failed to fetch post metadata:', error);
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  let allPosts = [];
  
  try {
    post = await getPostBySlug(params.slug);
    allPosts = await getAllPosts();
  } catch (error) {
    console.warn('Failed to fetch blog post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  // Process markdown content to handle Hashnode image syntax
  let processedMarkdown = post.content?.markdown || '';
  
  if (processedMarkdown) {
    // Handle Hashnode images with align attribute
    processedMarkdown = processedMarkdown.replace(
      /!\[(.*?)\]\((.*?)\s+align="(.*?)"\)/g,
      (match, alt, src, align) => {
        return `<div class="flex justify-${align} my-4">
          <img src="${src}" alt="${alt}" class="rounded-lg max-w-full h-auto" style="width: auto; height: auto;" />
        </div>`;
      }
    );
  }

  // Use synchronous marked and explicitly type as string
  let content: string = processedMarkdown 
    ? marked(processedMarkdown) as string
    : '';

  // Process HTML output from marked to fix image aspect ratio issues
  if (content) {
    content = content.replace(
      /<img([^>]*)>/g,
      (match, attributes) => {
        // Check if style attribute already exists
        const hasStyle = attributes.includes('style=');
        
        // Extract existing style if present
        let existingStyle = '';
        if (hasStyle) {
          const styleMatch = attributes.match(/style="([^"]*)"/);
          if (styleMatch) {
            existingStyle = styleMatch[1];
          }
        }
        
        // Determine what to add
        let styleToAdd = '';
        if (attributes.match(/width\s*=\s*["']?\d+/i) && !attributes.match(/height\s*=\s*["']?\d+/i)) {
          // Has width but no height
          styleToAdd = existingStyle ? `${existingStyle}; height: auto;` : 'height: auto;';
        } else if (attributes.match(/height\s*=\s*["']?\d+/i) && !attributes.match(/width\s*=\s*["']?\d+/i)) {
          // Has height but no width
          styleToAdd = existingStyle ? `${existingStyle}; width: auto;` : 'width: auto;';
        } else if (!attributes.match(/width\s*=/i) && !attributes.match(/height\s*=/i)) {
          // No width or height specified
          styleToAdd = existingStyle ? `${existingStyle}; width: auto; height: auto;` : 'width: auto; height: auto;';
        }
        
        // If we need to add style
        if (styleToAdd) {
          if (hasStyle) {
            // Replace existing style
            return `<img${attributes.replace(/style="[^"]*"/, `style="${styleToAdd}"`)} />`;
          } else {
            // Add new style attribute
            return `<img${attributes} style="${styleToAdd}" />`;
          }
        }
        
        return match;
      }
    );
  }

  // Get related posts based on tags
  const relatedPosts = allPosts
    .filter((p) => 
      p.slug !== post.slug && 
      p.tags.some((tag) => 
        post.tags.some((postTag) => postTag.name === tag.name)
      )
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            {post.coverImage && (
              <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 896px"
                  priority
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="px-3 py-1 bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-4">
              {/* Author Info */}
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.profilePicture && (
                    <Image
                      src={post.author.profilePicture}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <>
                    <span>•</span>
                    <span>
                      Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </>
                )}
                {post.readTimeInMinutes && (
                  <>
                    <span>•</span>
                    <span>{post.readTimeInMinutes} min read</span>
                  </>
                )}
              </div>
            </div>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-8 prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="border-t dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold mb-4">Share this post</h2>
                <ShareButtons
                  url={`${siteConfig.url}/blog/${post.slug}`}
                  title={post.title}
                />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 