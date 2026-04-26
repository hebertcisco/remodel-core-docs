import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import mdx from 'fumadocs-mdx/vite';
import * as MdxConfig from './source.config';

function normalizeBasePath(value: string | undefined): string {
  if (!value || value === '/') return '/';

  return value.endsWith('/') ? value : `${value}/`;
}

export default defineConfig({
  base: normalizeBasePath(process.env.PAGES_BASE_PATH),
  plugins: [mdx(MdxConfig), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    external: ['@takumi-rs/image-response'],
  },
});
