-- Portfolio content schema
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- It creates the tables, locks them to read-only for visitors (you edit via the
-- dashboard's Table Editor), creates a public "portfolio" storage bucket for
-- images, and seeds everything with the site's current content.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.projects (
  slug        text primary key,            -- URL: /work/<slug>
  title       text not null,
  subtitle    text not null,               -- small red label, e.g. "Himalayan Karma Treks — UI/UX & Frontend"
  role        text,                        -- shown in the case-study sidebar, e.g. "UI/UX & Frontend"
  description text not null,               -- "Overview" paragraph
  details     text[] not null default '{}',-- "Key Contributions" bullets
  tools       text[] not null default '{}',
  image_url   text,                        -- path inside the "portfolio" bucket (e.g. "covers/hero.webp");
                                           -- full URLs and site paths ("/images/…") also work
  link        text,                        -- live-site URL
  sort_order  int  not null default 0,     -- controls list order and "Next project"
  published   boolean not null default true
);

create table if not exists public.experiences (
  id         bigint generated always as identity primary key,
  role       text not null,
  company    text not null,
  details    text[] not null default '{}',
  sort_order int  not null default 0
);

create table if not exists public.skill_groups (
  id         bigint generated always as identity primary key,
  category   text not null,
  skills     text[] not null default '{}',
  sort_order int  not null default 0
);

-- ---------------------------------------------------------------------------
-- Security: anyone may read, nobody may write with the public (anon) key.
-- You edit content through the Supabase dashboard, which bypasses these rules.
-- ---------------------------------------------------------------------------

alter table public.projects     enable row level security;
alter table public.experiences  enable row level security;
alter table public.skill_groups enable row level security;

drop policy if exists "Public read" on public.projects;
create policy "Public read" on public.projects     for select using (true);
drop policy if exists "Public read" on public.experiences;
create policy "Public read" on public.experiences  for select using (true);
drop policy if exists "Public read" on public.skill_groups;
create policy "Public read" on public.skill_groups for select using (true);

-- Writes are allowed for logged-in users only — that's you, via the site's
-- /admin page. Create your login in the dashboard under Authentication →
-- Users → "Add user" (email + password), and turn OFF "Allow new users to
-- sign up" under Authentication → Sign In / Providers so nobody else can
-- create an account.
drop policy if exists "Owner write" on public.projects;
create policy "Owner write" on public.projects
  for all to authenticated using (true) with check (true);
drop policy if exists "Owner write" on public.experiences;
create policy "Owner write" on public.experiences
  for all to authenticated using (true) with check (true);
drop policy if exists "Owner write" on public.skill_groups;
create policy "Owner write" on public.skill_groups
  for all to authenticated using (true) with check (true);

-- Public storage bucket for project images. Upload from the /admin page (or
-- dashboard → Storage → portfolio) — the file's public URL goes into
-- projects.image_url.
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "Owner upload portfolio" on storage.objects;
create policy "Owner upload portfolio" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio');
drop policy if exists "Owner update portfolio" on storage.objects;
create policy "Owner update portfolio" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio');
drop policy if exists "Owner delete portfolio" on storage.objects;
create policy "Owner delete portfolio" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio');

-- ---------------------------------------------------------------------------
-- Seed: current site content
-- ---------------------------------------------------------------------------

insert into public.projects (slug, title, subtitle, role, description, details, tools, link, sort_order) values
(
  'karma-trekking',
  'Karma Trekking Website',
  'Himalayan Karma Treks — UI/UX & Frontend',
  'UI/UX & Frontend',
  'Designed and built the website for a Himalayan trekking and expedition company, featuring an immersive full-screen hero carousel, expedition and trek package pages, and a streamlined trip booking flow.',
  array[
    'Designed an immersive full-screen hero with an auto-rotating banner carousel',
    'Structured expedition, trekking, activity, and destination sections for easy browsing',
    'Built responsive layouts across desktop, tablet, and mobile',
    'Implemented a clear ''Book a Trip'' call-to-action and booking flow'
  ],
  array['Figma', 'HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  'https://karmatrekking.com/',
  1
),
(
  'waste-management-hackathon',
  'Waste Management Hackathon Project',
  'College Hackathon — UI/UX & Frontend',
  'UI/UX & Frontend',
  'Designed complete website layout and user flows. Led frontend development with HTML, CSS, and JavaScript. Applied responsive design with intuitive, task-oriented interaction design.',
  array[
    'Designed complete website layout and user flows for a waste management platform',
    'Led frontend development with HTML, CSS, and JavaScript',
    'Applied responsive design with intuitive, task-oriented interaction design',
    'Collaborated with team members during the hackathon sprint'
  ],
  array['Figma', 'HTML', 'CSS', 'JavaScript'],
  null,
  2
),
(
  'styles-ecommerce',
  'Styles E-commerce',
  'E-commerce Website — UI/UX Design',
  'UI/UX Design',
  'Designed modern e-commerce UI including product pages and checkout flow. Created responsive prototypes in Figma and implemented frontend using HTML, CSS, JavaScript.',
  array[
    'Designed modern e-commerce UI including product pages and checkout flow',
    'Created responsive prototypes in Figma',
    'Implemented frontend using HTML, CSS, JavaScript',
    'Focused on conversion-optimized user experience'
  ],
  array['Figma', 'HTML', 'CSS', 'JavaScript'],
  null,
  3
),
(
  'rewasoft-expedition',
  'Expedition & Travel Website',
  'RewaSoft Pvt. Ltd — UI/UX Design',
  'UI/UX Design',
  'Designed UI for an expedition and travel website. Created wireframes and high-fidelity prototypes using Figma. Structured layouts to improve navigation and user engagement.',
  array[
    'Designed UI for an expedition and travel website',
    'Created wireframes and high-fidelity prototypes using Figma',
    'Structured layouts to improve navigation and user engagement',
    'Collaborated with developers to ensure accurate UI implementation'
  ],
  array['Figma', 'Wireframing', 'Prototyping'],
  null,
  4
),
(
  'neutroline-dashboard',
  'Admin Dashboard',
  'Neutroline Pvt. Ltd. — UI/UX Design',
  'UI/UX Design',
  'Designed an admin dashboard for managing staff, customers, and services. Created wireframes and interactive prototypes in Figma.',
  array[
    'Designed an admin dashboard for managing staff, customers, and services',
    'Created wireframes and interactive prototypes in Figma',
    'Improved information architecture to simplify navigation and workflows',
    'Collaborated with developers for UI implementation using HTML5 and CSS3'
  ],
  array['Figma', 'HTML5', 'CSS3', 'Information Architecture'],
  null,
  5
),
(
  'quasar-homepage',
  'Company Homepage Redesign',
  'Quasar Technology — UI/UX & Frontend',
  'UI/UX & Frontend',
  'Designed homepage UI focused on first-time user experience and clarity. Built responsive layouts for desktop and mobile devices.',
  array[
    'Designed homepage UI focused on first-time user experience and clarity',
    'Created high-fidelity mockups and interactive prototypes',
    'Built responsive layouts for desktop and mobile devices',
    'Improved accessibility, readability, and visual hierarchy'
  ],
  array['Figma', 'Responsive Design', 'Accessibility', 'HTML', 'CSS'],
  null,
  6
)
on conflict (slug) do nothing;

insert into public.experiences (role, company, details, sort_order) values
(
  'UI/UX Designer',
  'RewaSoft Pvt. Ltd',
  array[
    'Designed UI for an expedition and travel website',
    'Created wireframes and high-fidelity prototypes using Figma',
    'Structured layouts to improve navigation and user engagement',
    'Collaborated with developers to ensure accurate UI implementation'
  ],
  1
),
(
  'UI/UX Designer',
  'Neutroline Pvt. Ltd.',
  array[
    'Designed an admin dashboard for managing staff, customers, and services',
    'Created wireframes and interactive prototypes in Figma',
    'Improved information architecture to simplify navigation and workflows',
    'Collaborated with developers for UI implementation using HTML5 and CSS3'
  ],
  2
),
(
  'UI/UX & Frontend Intern',
  'Quasar Technology',
  array[
    'Designed homepage UI focused on first-time user experience and clarity',
    'Created high-fidelity mockups and interactive prototypes',
    'Built responsive layouts for desktop and mobile devices',
    'Improved accessibility, readability, and visual hierarchy'
  ],
  3
);

insert into public.skill_groups (category, skills, sort_order) values
('UI/UX Design', array['UI Design', 'UX Design', 'Wireframing', 'Prototyping', 'Interaction Design', 'Responsive Design'], 1),
('Tools',        array['Figma', 'Adobe XD', 'Adobe Creative Suite'], 2),
('Frontend',     array['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'], 3),
('Soft Skills',  array['Design Thinking', 'Team Collaboration', 'Communication', 'Attention to Detail'], 4);
