# site

Black Letter Studio - marketing site and feedback Worker.

Astro + Tailwind + MDX. Brand tokens consumed from the `brand` repo via git submodule at `vendor/brand`.

## Development

```sh
pnpm install
git submodule update --init --recursive   # first time only
pnpm dev                                   # local dev server
pnpm build                                 # static build -> dist/
pnpm lint                                  # astro check
```

## Structure

```text
/
├── public/              static assets (fonts, favicon)
├── src/
│   ├── components/      Nav, Footer
│   ├── layouts/         BaseLayout.astro
│   ├── pages/           routes (home, fair-copy, proofmark, trust, feedback, support, legal/*)
│   └── styles/          global.css with @theme tokens
├── vendor/brand/        git submodule - private brand tokens repo
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Deployment

Netlify (wired up in a later task).
