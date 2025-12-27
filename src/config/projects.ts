/**
 * Projects Configuration
 * 
 * Configure your projects to display on the /projects page.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  featured?: boolean;
}

/**
 * All projects
 * Add your projects here
 */
export const projects: Project[] = [
  {
    id: 'github-data-app',
    title: 'GitHub Data',
    description: 'A web application that visualizes GitHub user and repo data with beautiful charts and insights. Built with Next.js, TypeScript, and Tailwind CSS.',
    image: 'https://picsum.photos/400/300?random=12',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub API', 'Charts'],
    link: 'https://github.com/ayodejidev/github-data-app',
    github: 'https://github.com/ayodejidev/github-data-app',
    featured: true
  },
  // Add more projects as needed
  // {
  //   id: 'project-2',
  //   title: 'Project Two',
  //   description: 'Description of your second project.',
  //   image: 'https://picsum.photos/400/300?random=11',
  //   tags: ['Next.js', 'TypeScript', 'Tailwind'],
  //   link: 'https://project2.com',
  //   github: 'https://github.com/yourusername/project2',
  //   featured: true
  // },
];

