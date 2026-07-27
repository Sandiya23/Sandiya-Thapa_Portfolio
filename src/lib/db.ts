import { PostgrestClient } from "@supabase/postgrest-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabaseEnv";

/**
 * Read-only PostgREST client used by the public site.
 *
 * The public pages only ever run `.from().select()`, so they talk to PostgREST
 * directly rather than through @supabase/supabase-js. It's the same query
 * builder — supabase-js just wraps this library — but it skips the auth,
 * realtime, storage and functions clients that createClient() always builds,
 * keeping ~50 kB gzipped out of the initial bundle. The full client stays in
 * lib/supabase.ts, which only the content studio imports.
 *
 * The two headers are exactly what supabase-js sends when nobody is signed in,
 * so requests are identical on the wire and row-level security is unchanged.
 *
 * Null when the env vars aren't set — every consumer falls back to the static
 * content in src/data/, so the site works without Supabase.
 */
export const db =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? new PostgrestClient(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      })
    : null;
