import type { CSSProperties } from "react";
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

/**
 * Distinct generated cover art per project — dark base with a shifting red key
 * light. Used behind every project cover so a project without a screenshot
 * still reads as a designed surface. Shared by both projects layouts.
 */
export const coverFor = (i: number): CSSProperties => {
  const spots = [
    { x: "22%", y: "18%" },
    { x: "78%", y: "24%" },
    { x: "30%", y: "80%" },
    { x: "82%", y: "78%" },
    { x: "50%", y: "20%" },
  ];
  const s = spots[i % spots.length];
  return {
    backgroundImage: `
      radial-gradient(60% 80% at ${s.x} ${s.y}, hsl(0 72% 51% / 0.16), transparent 55%),
      radial-gradient(50% 60% at 80% 10%, hsl(0 0% 18%), transparent 60%),
      linear-gradient(160deg, hsl(0 0% 9%), hsl(0 0% 4.5%))
    `,
  };
};
