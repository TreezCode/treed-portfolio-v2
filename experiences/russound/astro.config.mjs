import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  cacheDir: './.cache/astro',
  build: { format: 'directory' },
  vite: {
    cacheDir: './.cache/vite',
    build: { sourcemap: false },
  },
});
