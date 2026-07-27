import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabaseEnv";

/**
 * The full Supabase client — auth, storage and writes.
 *
 * Only the /sandmin content studio imports this, which keeps createClient()
 * (and with it the auth and realtime clients) inside the lazily-loaded admin
 * chunk. The public site reads through lib/db.ts instead. Nothing on a public
 * route may import this module, or the saving is lost.
 *
 * Null when the env vars aren't set — the admin page then offers local mode.
 */
export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
