import type { Config } from '@react-router/dev/config';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { getPageImagePath } from './app/lib/og';

function normalizeBasePath(value: string | undefined): string {
  if (!value || value === '/') return '/';

  return value.endsWith('/') ? value.slice(0, -1) : value;
}

const basePath = normalizeBasePath(process.env.PAGES_BASE_PATH);
const getUrl = createGetUrl('/docs');
const docsDir = 'content/docs';

async function getDocEntries(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) return getDocEntries(fullPath);
      if (entry.isFile() && entry.name.endsWith('.mdx')) {
        return [relative(docsDir, fullPath)];
      }

      return [];
    }),
  );

  return files.flat();
}

export default {
  ssr: true,
  basename: basePath,
  routeDiscovery: {
    mode: 'initial',
  },
  future: {
    v8_middleware: true,
  },
  async prerender({ getStaticPaths }) {
    const paths: string[] = [];
    const excluded: string[] = ['/api/search'];

    for (const path of getStaticPaths()) {
      if (!excluded.includes(path)) paths.push(path);
    }

    for (const entry of await getDocEntries(docsDir)) {
      const slugs = getSlugs(entry);

      paths.push(getUrl(slugs));
      paths.push(getPageImagePath(slugs));
    }

    return paths;
  },
} satisfies Config;
