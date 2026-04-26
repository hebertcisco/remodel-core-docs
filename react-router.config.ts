import type { Config } from '@react-router/dev/config';
import { globSync } from 'node:fs';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { getPageImagePath } from './app/lib/og';

const getUrl = createGetUrl('/docs');

export default {
  ssr: true,
  future: {
    v8_middleware: true,
  },
  async prerender({ getStaticPaths }) {
    const paths: string[] = [];
    const excluded: string[] = ['/api/search'];

    for (const path of getStaticPaths()) {
      if (!excluded.includes(path)) paths.push(path);
    }

    for (const entry of globSync('**/*.mdx', { cwd: 'content/docs' })) {
      const slugs = getSlugs(entry);

      paths.push(getUrl(slugs));
      paths.push(getPageImagePath(slugs));
    }

    return paths;
  },
} satisfies Config;
