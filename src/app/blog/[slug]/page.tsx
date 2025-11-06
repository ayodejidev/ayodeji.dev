import { getPostBySlug, getAllPosts } from '@/services/hashnode';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import BlogPostCard from '@/components/BlogPostCard';
import { marked } from 'marked';

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

    return {
      title: `${post.title} | Ayodeji Ogundare`,
      description: post.brief,
      openGraph: {
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
  const processedMarkdown = post.content?.markdown
    ? post.content.markdown.replace(
        /!\[(.*?)\]\((.*?)\s+align="(.*?)"\)/g,
        (match, alt, src, align) => {
          return `<div class="flex justify-${align} my-4">
            <img src="${src}" alt="${alt}" class="rounded-lg max-w-full h-auto" />
          </div>`;
        }
      )
    : '';

  // Use synchronous marked and explicitly type as string
  const content: string = processedMarkdown 
    ? marked(processedMarkdown) as string
    : '';

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
            
            <time
              dateTime={post.publishedAt}
              className="text-gray-500 dark:text-gray-400"
            >
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-8 prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <TableOfContents content={content} />
          </div>

          <div className="border-t dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold mb-4">Share this post</h2>
            <ShareButtons
              url={`https://ayodeji.dev/blog/${post.slug}`}
              title={post.title}
            />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Related Posts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 