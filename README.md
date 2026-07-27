# Sandiya Thapa — Portfolio

Personal portfolio for **Sandiya Thapa**, a UI/UX Designer based in Kathmandu, Nepal.
Live at **[sandiyathapa.com.np](https://sandiyathapa.com.np)**.

A single-page React site with a small `/admin` content studio. Content (projects,
experience, skills, and the contact details / social links) loads from Supabase when
configured, and otherwise falls back to the static JSON in `src/data/` — so the site
works with or without a backend.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** with **shadcn/ui** (Radix primitives)
- **React Router** for routing, **Framer Motion** for animation
- **Supabase** (optional) for live content and image storage

## Getting started

Requires Node.js 18+ and npm.

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Type-check + production build
npm run build

# Preview the production build locally
npm run preview

# Lint and run unit tests
npm run lint
npm run test
```

## Editing content

The `/admin` page edits projects, experience, skills, and — on the **Contact** tab —
the email, phone/WhatsApp number, location, social links, CV link, hero role and
tagline, and footer note. There are two ways to run it:

- **Local mode** — run `npm run dev` and open `http://localhost:8080/admin` (no login).
  Edits are written straight into `src/data/*.json`; commit and push to publish them.
- **Supabase mode** — configure a Supabase project so content can be edited on the live
  site. See [`supabase/README.md`](./supabase/README.md) for the one-time setup.

To enable Supabase, copy `.env.example` to `.env.local` and fill in:

```sh
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Without these, the site runs entirely on the built-in content in `src/data/`.

## Project structure

```
public/            Static assets, favicons, OG image, sitemap, robots.txt
src/
  components/      UI sections and shared components
  data/            Fallback content (projects, experience, skills, site) as JSON
  hooks/           Data hooks (Supabase-backed with static fallback)
  lib/             Supabase client and helpers
  pages/           Routes: Index, ProjectDetail, NotFound, admin/
supabase/          Database schema and setup notes
```

## Deployment

The site is a static SPA deployed on **Netlify**. `public/_redirects` rewrites all
routes to `index.html` so client-side routes (e.g. `/admin`, `/work/:id`) resolve on
direct load. To enable live editing on the deployed site, add the `VITE_SUPABASE_*`
environment variables in the Netlify dashboard and redeploy.
