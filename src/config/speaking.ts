/**
 * Speaking Configuration
 * 
 * Configure your speaking engagements and talks.
 * This data is used on the /speaking page.
 * 
 * Image field accepts:
 * - URLs: 'https://example.com/image.jpg'
 * - Local paths: '/images/talk.jpg' (place images in public folder)
 */

export interface Talk {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  videoEmbedUrl?: string;
  videoUrl?: string;
  videoTitle?: string;
  image?: string;
  eventUrl?: string;
  tags: string[];
}

/**
 * All speaking engagements
 * Add your talks here in chronological order (newest first)
 */
export const talks: Talk[] = [
  {
    id: 2,
    title: "InnerSource by Design: Scaling Internal Collaboration with Open Source Operating Models",
    description: "This session explores how organizations can apply proven open source operating models to strengthen their InnerSource efforts.",
    date: "2025-11-13",
    location: "Berlin, Germany",
    videoEmbedUrl: "https://www.youtube.com/embed/ggF3fIT5lh8",
    videoUrl: "https://www.youtube.com/watch?v=ggF3fIT5lh8",
    videoTitle: "InnerSource by Design: Scaling Internal Collaboration with Open Source Operating Models",
    tags: ["Open Source", "InnerSource", "Developer Experience"]
  },
  {
    id: 1,
    title: "OSCA FEST 2022 – Imagine a world without open source",
    description: "Ayodeji spoke at Open Source Community Africa's flagship event about the critical importance of open source software and how it shapes our digital world.",
    date: "2022-03-25",
    location: "Lagos, Nigeria",
    videoEmbedUrl: "https://www.youtube.com/embed/-ZnzJEB3GGg",
    videoUrl: "https://www.youtube.com/watch?v=-ZnzJEB3GGg",
    videoTitle: "Imagine a world without open source",
    tags: ["Open Source", "Community", "Africa"]
  },
];

