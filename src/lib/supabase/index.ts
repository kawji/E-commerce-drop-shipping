/**
 * Supabase entry point — re-exports App Router helpers.
 *
 * - Client Components: `import { createClient } from "@/lib/supabase/client"`
 * - Server Components / Actions / Route Handlers: `import { createClient } from "@/lib/supabase/server"`
 * - Middleware session refresh: `import { updateSession } from "@/lib/supabase/middleware"`
 *
 * Env vars (from `.env.local`):
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

export { createClient as createBrowserClient } from "./client";
export { createClient as createServerSupabaseClient } from "./server";
export { updateSession } from "./middleware";

/** Validate that required Supabase env vars are present. Throws in dev if missing. */
export function assertSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
    );
  }

  return { url, anonKey };
}