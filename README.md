# Ayodeji.dev

A personal portfolio website built with Next.js, showcasing blog posts, speaking engagements, projects, and professional experience.

## Features

- **Blog Integration**: Fetches and displays blog posts from Hashnode API
- **Speaking Engagements**: Showcases upcoming and past talks with event details
- **About Page**: Professional experience, skills, and background
- **Contact Form**: Interactive contact form with validation
- **Dark Mode**: Full dark mode support with theme toggle
- **Fully Responsive**: Optimized for all device sizes (mobile, tablet, desktop)
- **SEO Optimized**: Proper metadata and Open Graph tags
- **Performance**: Optimized images, code splitting, and fast page loads

## Tech stack

- **Framework**: [Next.js 14.2.33](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown processing with `marked`
- **Testing**: Jest + React Testing Library
- **Font**: Roboto Mono (Google Fonts)

## Getting started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayodejidev/ayodeji.dev.git
cd ayodeji.dev
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your environment variables to `.env.local`:
```env
HASHNODE_API_KEY=your_hashnode_api_key
NEXT_PUBLIC_HASHNODE_USERNAME=your_hashnode_username
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Available scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Environment variables

| Variable | Description | Required |
|----------|-------------|----------|
| `HASHNODE_API_KEY` | Hashnode API key for fetching blog posts | Yes (for blog) |
| `NEXT_PUBLIC_HASHNODE_USERNAME` | Hashnode username | Yes (for blog) |




## Contributing

This is a personal portfolio website. If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

MIT

## Author

**Ayodeji Ogundare**
- Website: [ayodeji.dev](https://ayodeji.dev)
- GitHub: [@ayodejidev](https://github.com/ayodejidev)

---

Built with 💙 using Next.js and Tailwind CSS
