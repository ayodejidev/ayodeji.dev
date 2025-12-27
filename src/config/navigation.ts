/**
 * Navigation Configuration
 * 
 * Configure navigation links for the navbar and mobile menu.
 */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Main navigation links
 */
export const navLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Speaking',
    href: '/speaking',
  },
  {
    label: 'Projects',
    href: 'https://github.com/ayodejidev',
    external: true,
  },
];

