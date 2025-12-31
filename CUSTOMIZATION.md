# Customization Guide

This guide will help you customize this portfolio template for your own personal website. The core customization is done through configuration files - no need to modify complex components!

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
- Include video links if available (optional)
- Add preview images for talks

**Fields:**
- `id`: Unique identifier (number)
- `title`: Talk title
- `description`: Talk description
- `date`: Date in YYYY-MM-DD format
- `location`: Event location
- `videoEmbedUrl`: YouTube/Vimeo embed URL (for iframe) - **optional**
- `videoUrl`: Direct video link - **optional**
- `videoTitle`: Video title - **optional**
- `image`: Talk image (URL or local path) - **optional**
- `eventUrl`: Link to event page - **optional**
- `tags`: Array of topics/tags

**Note:** Video fields are optional. You can add talks without video recordings - they'll still appear on the speaking page with an "Upcoming" badge if the date is in the future.

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
    image: "/talks/my-talk.jpg",
    eventUrl: "https://event.com/talk",
    tags: ["React", "Next.js", "Web Development"]
  },
  {
    id: 2,
    title: "Upcoming Talk Without Video",
    description: "This talk hasn't happened yet, so no video.",
    date: "2025-12-01",
    location: "New York, NY",
    image: "/talks/upcoming-talk.jpg",
    eventUrl: "https://event.com/upcoming",
    tags: ["AI", "Machine Learning"]
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

### 6. Featured Content (`src/config/featured.ts`)

Showcase articles, interviews, meetups, podcasts, and other content where you were featured.

**What to change:**
- Add featured content items to the `featuredItems` array
- Items are displayed on the `/featured` page with filtering by type
- Add preview images for better visual presentation

**Fields:**
- `id`: Unique identifier (string)
- `title`: Title of the featured content
- `description`: Brief description
- `type`: Type of content - `'article' | 'interview' | 'meetup' | 'podcast' | 'video' | 'other'`
- `url`: Link to the featured content
- `image`: Preview image (URL or local path) - **optional**
- `date`: Publication date in YYYY-MM-DD format
- `publisher`: Publisher name (e.g., "CNCF", "Tech Weekly") - **optional**
- `tags`: Array of tags - **optional**

**Example:**
```typescript
export const featuredItems: FeaturedItem[] = [
  {
    id: 'cncf-article',
    title: 'The longest-running Kubernetes Community Days is back!',
    description: 'Guest post co-authored about organizing Kubernetes Community Days.',
    type: 'article',
    url: 'https://www.cncf.io/blog/2023/04/11/article',
    image: '/featured/cncf-article.jpg',
    date: '2023-04-11',
    publisher: 'CNCF',
    tags: ['Kubernetes', 'Community', 'Conference'],
  },
  {
    id: 'devrel-interview',
    title: 'From Community Building to DevRel',
    description: 'Origin story interview about transitioning to Developer Relations.',
    type: 'interview',
    url: 'https://developerrelations.com/interview',
    image: '/featured/interview.jpg',
    date: '2023-01-28',
    publisher: 'DeveloperRelations.com',
    tags: ['DevRel', 'Interview', 'Community Building'],
  },
];
```

**Featured Page Features:**
- All items are displayed in a single grid view
- Filter buttons at the top allow filtering by type (All, Article, Interview, Meetup, etc.)
- Items are automatically sorted by date (newest first)
- Each filter shows the count of items in that category

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

### Featured Page (`src/app/featured/page.tsx`)

The featured page displays all your featured content with filtering capabilities:
- Shows all featured items in a responsive grid
- Filter buttons at the top (All, Article, Interview, Meetup, Podcast, Video, Other)
- Each filter shows the count of items
- Items are sorted by date (newest first)
- Click any item to open the external link

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
- Talk images: `public/talks/` (or use URLs)
- Featured content images: `public/featured/` (or use URLs)

## Environment Variables

Create a `.env.local` file with:

```env
# Hashnode API (for blog integration)
HASHNODE_API_KEY=your_hashnode_api_key
NEXT_PUBLIC_HASHNODE_USERNAME=your_hashnode_username

# Optional: Hashnode publication host
# Set this if your publication host differs from your username
# (e.g., if username is "ayodejidev" but host is "deji.hashnode.dev")
NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST=deji.hashnode.dev

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

This is a standard Next.js app, so it can be deployed to:
- Netlify
- Vercel
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

### Remove Featured Page
- Remove the Featured link from `src/config/navigation.ts`
- Optionally delete `src/app/featured/` directory
- Remove `src/config/featured.ts` if not needed

### Remove Contact Form
- Remove the Contact link from `src/config/navigation.ts`
- Optionally delete `src/app/contact/` directory

## Getting Help

If you run into issues:

1. Check the [README.md](README.md) for setup instructions
2. Open an issue on GitHub if you find a bug
3. Check Next.js and Tailwind CSS documentation for framework-specific questions


## License

This project is open source under the MIT License. Feel free to use it for your own portfolio!

---

Happy customizing! 🚀
