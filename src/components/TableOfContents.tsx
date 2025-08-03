'use client';

import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  content: string | Promise<string>;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [processedContent, setProcessedContent] = useState<string>('');

  useEffect(() => {
    // Handle both string and Promise<string>
    const processContent = async () => {
      const contentString = typeof content === 'string' ? content : await content;
      setProcessedContent(contentString);

      // Extract headings from content
      const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/g;
      const matches = Array.from(contentString.matchAll(headingRegex));
      
      // Only keep h1 and h2 headings
      const mainHeadings = matches
        .filter(match => {
          const level = parseInt(match[1]);
          return level === 1 || level === 2;
        })
        .map((match) => {
          const level = parseInt(match[1]);
          const text = match[2].replace(/<[^>]*>/g, ''); // Remove any HTML tags
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          
          return { id, text, level };
        });

      setHeadings(mainHeadings);

      // Add IDs to headings in the content
      const contentWithIds = contentString.replace(
        headingRegex,
        (match, level, text) => {
          const id = text
            .toLowerCase()
            .replace(/<[^>]*>/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          return `<h${level} id="${id}">${text}</h${level}>`;
        }
      );

      // Update content in the DOM
      const contentElement = document.querySelector('.prose');
      if (contentElement) {
        contentElement.innerHTML = contentWithIds;
      }
    };

    processContent();

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content]);

  const handleHeadingClick = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 2 ? 'ml-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm hover:text-brand dark:hover:text-brand-light transition-colors ${
                activeId === heading.id
                  ? 'text-brand dark:text-brand-light font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={(e) => handleHeadingClick(heading.id, e)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 