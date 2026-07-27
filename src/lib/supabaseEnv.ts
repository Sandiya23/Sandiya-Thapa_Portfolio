/**
 * Supabase configuration, deliberately kept free of the client itself.
 *
 * lib/supabase.ts calls createClient() at module scope, and that single call
 * constructs the auth, realtime, storage and functions clients whether or not
 * anything uses them (~50 kB gzipped). Rollup can't treat that call as
 * side-effect free, so importing *any* symbol from that module drags the whole
 * client along. Anything the public site needs therefore lives here instead.
 */
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Resolves a stored image reference to a usable URL. The database keeps only
 * a path inside the "portfolio" storage bucket (e.g. "covers/hero.webp") so
 * the Supabase project domain lives solely in VITE_SUPABASE_URL — full URLs
 * and site-relative paths ("/images/…") pass through unchanged.
 */
export const resolveImageUrl = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  if (value.startsWith("http") || value.startsWith("/")) return value;
  if (!SUPABASE_URL) return undefined;
  return `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/portfolio/${value}`;
};
