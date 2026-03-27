// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://juliangp.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
