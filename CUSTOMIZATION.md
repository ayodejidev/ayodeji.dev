# Customization Guide

This guide will help you customize this portfolio template for your own personal website. All customization is done through configuration files - no need to modify complex components!

## Quick Start

1. **Clone this repository:**
```bash
git clone https://github.com/ayodejidev/ayodeji.dev.git
cd ayodeji.dev
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your own values
```

4. **Customize the configuration files** (see sections below)

5. **Run the development server:**
```bash
npm run dev
```

## Configuration Files

All customization happens in the `src/config/` directory. Here's what each file does:

### 1. Site Configuration (`src/config/site.ts`)

This is the main configuration file for your site's identity.

**What to change:**
- `name`: Your full name
- `title`: Site title (appears in browser tab)
- `description`: Your professional tagline/description
- `url`: Your website URL
- `author.name`: Your name
- `author.tagline`: Your professional tagline
- `social.*`: Your social media profile URLs
- `branding.siteName`: Your site name (appears in navbar)
- `branding.logo`: Path to your logo (place in `public/` folder)
- `branding.profileImage`: Path to your profile image (place in `public/` folder)

**Example:**
```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Name - Portfolio',
  description: 'Your Professional Title',
  url: 'https://yourdomain.com',
  author: {
    name: 'Your Name',
    tagline: 'Your Professional Title',
  },
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://www.linkedin.com/in/yourprofile/',
    twitter: 'https://x.com/yourusername',
  },
  branding: {
    siteName: 'YourName.dev',
    logo: '/logo.png',
    profileImage: '/profile.png',
  },
};
```

### 2. Navigation (`src/config/navigation.ts`)

Configure your site's navigation menu.

**What to change:**
- Add, remove, or reorder navigation links
- Set `external: true` for external links (like GitHub, external portfolio)

**Example:**
```typescript
export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Projects', href: '/projects' },
  { label: 'GitHub', href: 'https://github.com/yourusername', external: true },
];
```

### 3. Projects (`src/config/projects.ts`)

Add your projects to showcase on the `/projects` page.

**What to change:**
- Replace the example project with your own
- Add multiple projects
- Set `featured: true` to highlight important projects

**Fields:**
- `id`: Unique identifier
- `title`: Project name
- `description`: Brief description
- `image`: URL or path to project image
- `tags`: Array of technologies used
- `link`: Live project URL
- `github`: GitHub repository URL (optional)
- `featured`: Whether to feature this project (optional)

**Example:**
```typescript
export const projects: Project[] = [
  {
    id: 'my-awesome-project',
    title: 'My Awesome Project',
    description: 'A description of what this project does and why it\'s cool.',
    image: '/images/project1.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://myproject.com',
    github: 'https://github.com/yourusername/myproject',
    featured: true
  },
];
```

### 4. Speaking Engagements (`src/config/speaking.ts`)

Add your talks and speaking engagements.

**What to change:**
- Replace example talks with your own
- Add upcoming and past talks
- Include video links if available

**Fields:**
- `id`: Unique identifier (number)
- `title`: Talk title
- `description`: Talk description
- `date`: Date in YYYY-MM-DD format
- `location`: Event location
- `videoEmbedUrl`: YouTube/Vimeo embed URL (for iframe)
- `videoUrl`: Direct video link
- `videoTitle`: Video title
- `image`: Talk image (URL or local path)
- `eventUrl`: Link to event page
- `tags`: Array of topics/tags

**Example:**
```typescript
export const talks: Talk[] = [
  {
    id: 1,
    title: "My Amazing Talk",
    description: "A description of what I talked about.",
    date: "2024-06-15",
    location: "San Francisco, CA",
    videoEmbedUrl: "https://www.youtube.com/embed/video-id",
    videoUrl: "https://www.youtube.com/watch?v=video-id",
    videoTitle: "My Amazing Talk",
    tags: ["React", "Next.js", "Web Development"]
  },
];
```

### 5. Blog Configuration (`src/config/blog.ts`)

Configure which blog posts are featured on your blog page.

**What to change:**
- Add blog post slugs to `featuredBlogIds` array
- Posts will appear in the order you list them
- Adjust `pageSize` if needed (default: 20 posts per page)

**Example:**
```typescript
export const featuredBlogIds: string[] = [
  'my-most-important-post',
  'another-great-article',
  'third-featured-post',
];
```

## Customizing Pages

### About Page (`src/app/about/page.tsx`)

Edit this file to update:
- Your professional bio
- Work experience
- Skills
- Education
- Any other personal information

### Homepage (`src/app/page.tsx`)

The homepage uses components that pull from your config files. The main sections are:
- Hero section (uses `siteConfig`)
- Recent Activity (shows recent blog posts and talks)
- Featured sections

### Contact Page (`src/app/contact/page.tsx`)

Update contact information and ensure SendGrid is configured if you want the contact form to work.

## Styling & Branding

### Colors

The site uses Tailwind CSS with a custom color scheme. To change colors:

1. Edit `tailwind.config.js` to customize the color palette
2. The main brand color is defined as `brand` and `brand-light` in the config

### Fonts

Currently using Roboto Mono. To change:

1. Update `src/app/layout.tsx` to import a different Google Font
2. Update `tailwind.config.js` to use the new font family

### Images

Place your images in the `public/` folder:
- Logo: `public/logo.png`
- Profile image: `public/profile.png`
- Project images: `public/images/` (or use URLs)
- Talk images: `public/images/` (or use URLs)

## Environment Variables

Create a `.env.local` file with:

```env
# Hashnode API (for blog integration)
HASHNODE_API_KEY=your_hashnode_api_key
NEXT_PUBLIC_HASHNODE_USERNAME=your_hashnode_username

# Optional: Your site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# SendGrid (for contact form - optional)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_email@example.com
SENDGRID_TO_EMAIL=your_email@example.com
```

## API Endpoints

### `/api/blogs/all`

A debugging endpoint that fetches all published blog posts from Hashnode. Useful for verifying that all your posts are being fetched correctly.

**Usage:**
```bash
curl http://localhost:3000/api/blogs/all
```

**Response:**
```json
{
  "total": 3,
  "posts": [...],
  "oldestPost": {...},
  "newestPost": {...},
  "sortedByDate": [...]
}
```

This endpoint helps you:
- Verify how many posts are being fetched
- Check if your oldest posts are included
- Debug pagination issues
- See the date range of your posts

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Other Platforms

This is a standard Next.js app, so it can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any platform that supports Next.js

## Removing Features

Don't need certain features? Here's how to remove them:

### Remove Blog Integration
- Remove or comment out blog-related code in `src/app/page.tsx`
- Remove the Blog link from `src/config/navigation.ts`
- The blog pages will still exist but won't be linked

### Remove Speaking Page
- Remove the Speaking link from `src/config/navigation.ts`
- Optionally delete `src/app/speaking/` directory

### Remove Projects Page
- Remove the Projects link from `src/config/navigation.ts`
- Optionally delete `src/app/projects/` directory

### Remove Contact Form
- Remove the Contact link from `src/config/navigation.ts`
- Optionally delete `src/app/contact/` directory

## Getting Help

If you run into issues:

1. Check the [README.md](README.md) for setup instructions
2. Review the configuration files - most issues are configuration-related
3. Open an issue on GitHub if you find a bug
4. Check Next.js and Tailwind CSS documentation for framework-specific questions

## Tips

- **Start small**: Customize one section at a time
- **Use the config files**: Don't modify components unless necessary
- **Test locally**: Always test changes with `npm run dev` before deploying
- **Keep it updated**: Pull latest changes from the main repository periodically
- **Backup your config**: Keep your config files backed up - they're your customizations!

## License

This project is open source under the MIT License. Feel free to use it for your own portfolio!

---

Happy customizing! 🚀
