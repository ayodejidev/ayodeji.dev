# Release v0.2.0

## 🎉 What's New

### Major Features
- **Featured Content Page**: New `/featured` page to showcase articles, interviews, meetups, and other content where you were featured
- **Filtering System**: Filter featured content by type (Article, Interview, Meetup, Podcast, Video, Other)
- **Recent Activity**: Enhanced homepage with recent blog posts and talks
- **Configuration System**: Centralized configuration files for easier customization

### Improvements
- **Speaking Page**: Support for talks without video recordings
- **Blog Integration**: Enhanced Hashnode API integration with better error handling
- **Documentation**: Comprehensive customization guide and updated README
- **Testing**: Improved test coverage with better mocking for async components

### Technical Updates
- **Next.js**: Upgraded to Next.js 16.1.1 (requires Node.js >= 20.9.0)
- **ESLint**: Upgraded to ESLint 9 with Next.js 16 compatibility
- **Type Safety**: Improved TypeScript types throughout the codebase

## 📝 Configuration Files

All customization is now done through configuration files in `src/config/`:
- `site.ts` - Site metadata, social links, branding
- `navigation.ts` - Navigation menu
- `projects.ts` - Your projects
- `speaking.ts` - Speaking engagements
- `blog.ts` - Blog configuration
- `featured.ts` - Featured content

## 🔧 Breaking Changes

- **Node.js Requirement**: Now requires Node.js >= 20.9.0 (due to Next.js 16)
- **ESLint**: Updated to ESLint 9 (flat config format)

## 📚 Documentation

- Added comprehensive `CUSTOMIZATION.md` guide
- Updated `README.md` with new features and requirements
- Added `CONTRIBUTING.md` for contributors

## 🐛 Bug Fixes

- Fixed test warnings for Next.js Image component
- Improved error handling in Hashnode API integration
- Fixed hydration errors in related posts

## 🙏 Thank You

Thank you to all contributors and users of this template!

---

For detailed upgrade instructions, see [CUSTOMIZATION.md](CUSTOMIZATION.md)

