# Supabase setup

The site loads projects/case studies, experience, and skills from Supabase.
If Supabase isn't configured (or a table is empty), it falls back to the
static content in `src/data/` — so nothing breaks without it.

## No Supabase? Edit locally instead

You can edit all content without Supabase, from the same admin UI:

1. Run `npm run dev` and open `http://localhost:8080/admin` — no login needed.
2. Edit projects, experience, and skills; image uploads land in `public/images/`.
3. Saves are written straight into `src/data/projects.json`,
   `src/data/experience.json`, and `src/data/skills.json`, and the dev site
   updates instantly.
4. To publish, commit and push — the deployed site ships that JSON as its
   built-in content.

Local mode only works on your own computer while the dev server is running;
the deployed site needs Supabase (below) for live editing.

## One-time setup

1. Create a free project at [supabase.com](https://supabase.com) (any name, e.g. `sandiya-portfolio`).
2. In the dashboard, open **SQL Editor → New query**, paste the whole of
   [`schema.sql`](./schema.sql), and click **Run**. This creates the tables,
   makes them publicly readable (but not writable), creates a public
   `portfolio` storage bucket for images, and seeds the current site content.
3. Go to **Project Settings → API** and copy the **Project URL** and the
   **anon public** key.
4. In the repo root, copy `.env.example` to `.env.local` and paste the two
   values in. Restart `npm run dev`.
5. When deploying (Vercel/Netlify/etc.), add the same two variables
   (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the host's environment
   settings and redeploy. The anon key is safe to expose — the database is
   read-only for visitors.

## Create your admin login

The site has a hidden admin page at **`/admin`** where you can edit everything
after signing in — no need to open the Supabase dashboard day-to-day.

1. In the Supabase dashboard: **Authentication → Users → Add user** — enter
   your email and a strong password (untick "Send email invite" if you don't
   want an email flow; use "Auto confirm user").
2. Still under Authentication, open **Sign In / Providers** and turn **off**
   "Allow new users to sign up" — otherwise anyone could create an account
   and edit your site.
3. Visit `https://your-site.com/admin`, sign in, and edit projects,
   experience, and skills. Image upload is built in.

## Editing content

You can edit either on the site's `/admin` page (recommended) or in the
Supabase dashboard under **Table Editor**:

- **projects** — one row per case study. `slug` is the URL (`/work/<slug>`),
  `description` is the Overview paragraph, `details` the Key Contributions
  bullets, `sort_order` controls the order on the home page and the
  "Next project" link, and `published` lets you hide a row without deleting it.
- **experiences** — the "Where I've worked" list.
- **skill_groups** — the "Skills & tools" cards.

Array columns (`details`, `tools`, `skills`) are edited as a list — click the
cell and add one entry per line.

### Project images

The easiest way is the `/admin` page — uploading there fills everything in.
Doing it by hand in the dashboard:

1. **Storage → portfolio** → upload the image (e.g. into a `covers/` folder).
2. Put the file's **path within the bucket** (e.g. `covers/my-shot.webp`) into
   that project's `image_url` column. The site builds the full URL from
   `VITE_SUPABASE_URL`, so the Supabase domain is never stored in your
   content. (Full URLs and site paths like `/images/…` also work.)

Changes appear on the live site on the next page load — no redeploy needed.
