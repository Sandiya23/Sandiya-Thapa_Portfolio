import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Null when the env vars aren't set — every consumer falls back to the
 * static content in src/data/, so the site works without Supabase.
 */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

/**
 * Resolves a stored image reference to a usable URL. The database keeps only
 * a path inside the "portfolio" storage bucket (e.g. "covers/hero.webp") so
 * the Supabase project domain lives solely in VITE_SUPABASE_URL — full URLs
 * and site-relative paths ("/images/…") pass through unchanged.
 */
export const resolveImageUrl = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  if (value.startsWith("http") || value.startsWith("/")) return value;
  if (!url) return undefined;
  return `${url.replace(/\/$/, "")}/storage/v1/object/public/portfolio/${value}`;
};
