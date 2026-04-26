# remodel-core-docs

Documentation site for [`remodel-core`](https://github.com/hebertcisco/remodel-core), built with React Router and Fumadocs.

The site documents the Rust modeling engine behind Remodel: conceptual modeling, logical conversion, validation rules, SQL generation, and related integration topics. It also exposes machine-readable documentation endpoints for LLM-oriented consumers.

## Related Links

- GitHub: <https://github.com/hebertcisco/remodel-core>
- crates.io: <https://crates.io/crates/remodel-core>
- docs.rs: <https://docs.rs/remodel-core>

## Stack

- React 19
- React Router 7
- Fumadocs
- MDX content in `content/docs`
- Tailwind CSS 4

## Local Development

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Serve the production build locally:

```bash
bun run start
```

Run static checks:

```bash
bun run lint
bun run types:check
```

If you prefer, the scripts also work through `npm`, `pnpm`, or `yarn`.

## Available Scripts

- `dev`: starts the React Router development server
- `build`: creates the production build
- `start`: serves the built app from `build/server/index.js`
- `lint`: runs `oxlint`
- `types:check`: generates route/docs types and runs TypeScript checks
- `postinstall`: regenerates Fumadocs MDX metadata

## Project Structure

```text
remodel-core-docs/
├── app/
│   ├── components/     # shared MDX/UI helpers
│   ├── lib/            # source loading, layout, OG helpers
│   ├── llms/           # LLM-friendly text/MDX endpoints
│   ├── routes/         # app routes
│   └── root.tsx
├── content/docs/       # documentation pages and sidebar metadata
├── public/             # static assets
├── source.config.ts    # Fumadocs content source configuration
└── vite.config.ts
```

## Writing Docs

Documentation pages live in `content/docs/*.mdx`.

- Add new pages as MDX files with frontmatter such as `title` and `description`.
- Keep `content/docs/meta.json` in sync so the sidebar order and section grouping stay correct.
- The docs route reads content from the generated Fumadocs source, so changing MDX files is usually enough for new content.

The current docs are organized around:

- introduction and getting started
- conceptual modeling
- logical modeling
- validation and conversion
- SQL generation
- integration topics

## Routes

Main routes:

- `/`: landing page
- `/docs/*`: documentation pages
- `/api/search`: search endpoint
- `/og/docs/*`: Open Graph image generation

LLM-oriented routes:

- `/llms.txt`: index of available machine-readable docs
- `/llms-full.txt`: aggregated plain-text documentation
- `/llms.mdx/docs/*`: page-level MDX output

## Notes

- The docs source is configured in `source.config.ts` with processed markdown enabled.
- `types:check` runs both React Router type generation and `fumadocs-mdx`, so it is the safest verification command after content or route changes.
- Some entries referenced by `content/docs/meta.json` should stay aligned with actual MDX files to avoid broken navigation.
