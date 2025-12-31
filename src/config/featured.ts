/**
 * Featured Content Configuration
 * 
 * Showcase articles, interviews, meetups, and other content where you were featured.
 * This data is used on the /featured page.
 */

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'interview' | 'meetup' | 'podcast' | 'video' | 'other';
  url: string;
  image?: string;
  date: string;
  publisher?: string;
  tags?: string[];
}

/**
 * All featured content
 * Add items here in chronological order (newest first)
 */
export const featuredItems: FeaturedItem[] = [
  {
    id: 'kcd-amsterdam-2023',
    title: 'The longest-running Kubernetes Community Days is back!',
    description: 'Guest post co-authored about organizing Kubernetes Community Days Amsterdam 2023, sharing lessons learned about community building, resilience, and organizing one of the most appreciated series of conferences in the cloud native space.',
    type: 'article',
    url: 'https://www.cncf.io/blog/2023/04/11/the-longest-running-kubernetes-community-days-is-back/',
    image: '/featured/kcd-amsterdam-2023.jpeg',
    date: '2023-04-11',
    publisher: 'CNCF',
    tags: ['Kubernetes', 'Community', 'KCD', 'Cloud Native', 'Conference'],
  },
  {
    id: 'devrel-origin-story',
    title: 'From Community Building to DevRel at Adyen',
    description: 'Origin story interview about transitioning from community building and technical program management in Nigeria to Developer Relations at Adyen, covering the journey, skills, and advice for DevRel hopefuls.',
    type: 'interview',
    url: 'https://developerrelations.com/origin-stories/ayodeji-ogundare/',
    image: '/featured/devrel-origin-story.jpeg',
    date: '2023-01-28',
    publisher: 'DeveloperRelations.com',
    tags: ['DevRel', 'Interview', 'Origin Story', 'Community Building'],
  },
];

