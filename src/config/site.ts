/**
 * Site Configuration
 * 
 * Central configuration for site metadata, URLs, and branding.
 */

export const siteConfig = {
  // Site metadata
  name: 'Ayodeji Ogundare',
  title: 'Ayodeji Ogundare',
  description: 'Developer Advocate & Fullstack Software Engineer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ayodeji.dev',
  
  // Author information
  author: {
    name: 'Ayodeji Ogundare',
    tagline: 'Developer Advocate & Fullstack Software Engineer',
  },
  
  // Social media links
  social: {
    github: 'https://github.com/ayodejidev',
    linkedin: 'https://www.linkedin.com/in/ayodeji-ogundare/',
    twitter: 'https://x.com/ayodejidev',
  },
  
  // Site branding
  branding: {
    siteName: 'Ayodeji.dev',
    logo: '/logo.png',
    profileImage: '/profile.png',
  },
};

