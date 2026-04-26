import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'remodel-core — Database modeling engine for Rust' },
    {
      name: 'description',
      content:
        'Build Entity-Relationship models, convert them to relational schemas, and generate SQL DDL for PostgreSQL, MySQL, and SQLite.',
    },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-col items-center justify-center flex-1 gap-8 px-4 py-20 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="inline-block rounded-full bg-fd-primary/10 px-3 py-1 text-xs font-medium text-fd-primary ring-1 ring-fd-primary/20">
            v0.1.0
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            remodel-core
          </h1>
          <p className="max-w-xl text-fd-muted-foreground text-lg">
            Rust engine for database modeling. Design ER diagrams, convert them
            to relational schemas, and emit SQL DDL for PostgreSQL, MySQL, and
            SQLite.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/docs"
            className="rounded-full bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
          >
            Get started →
          </Link>
          <a
            href="https://github.com/hebertcisco/remodel-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium hover:bg-fd-muted transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://crates.io/crates/remodel-core"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium hover:bg-fd-muted transition-colors"
          >
            crates.io
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mt-4">
          {[
            {
              title: 'Conceptual model',
              desc: 'Entities, attributes, relationships, specializations, and unions — the full ER vocabulary.',
              href: '/docs/conceptual-model',
            },
            {
              title: 'Logical conversion',
              desc: 'Automatic ER → relational mapping with configurable strategies for every ambiguity.',
              href: '/docs/conversion',
            },
            {
              title: 'SQL generation',
              desc: 'Emit CREATE TABLE DDL for PostgreSQL, MySQL / MariaDB, and SQLite from a single model.',
              href: '/docs/sql-generation',
            },
          ].map((card) => (
            <Link
              key={card.href}
              to={card.href}
              className="rounded-xl border border-fd-border bg-fd-card p-5 text-left hover:bg-fd-muted transition-colors"
            >
              <p className="font-semibold text-fd-foreground mb-1">{card.title}</p>
              <p className="text-sm text-fd-muted-foreground">{card.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </HomeLayout>
  );
}
