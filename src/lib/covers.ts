import { projects, type Project } from "@/data/projects";

/**
 * Extensions tried (in order) when auto-loading a cover image from /public.
 * Drop a file like `public/1.jpg` (or .png / .webp) and it is picked up
 * automatically — no code change needed.
 */
export const COVER_EXTS = ["jpg", "jpeg", "png", "webp"] as const;

/**
 * 1-based number for each project that has no explicit imported `image`.
 * These map to files in /public: the first placeholder project → /1.*,
 * the second → /2.*, and so on. Projects that already ship an imported
 * `image` (e.g. bundled screenshots) are skipped.
 */
const numberById: Record<string, number> = {};
let counter = 0;
for (const p of projects) {
  if (!p.image) numberById[p.id] = ++counter;
}

export const publicCoverIndex = (project: Project): number | undefined =>
  numberById[project.id];
