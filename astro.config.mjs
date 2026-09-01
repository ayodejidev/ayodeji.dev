import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ayodeji.dev',
  output: 'static',
  trailingSlash: 'never',
  redirects: { '/about': '/#about' },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/404' && path !== '/about' && !path.startsWith('/blog/tags/') && !path.startsWith('/raw/') && !path.startsWith('/content-media/');
      },
    }),
  ],
});
