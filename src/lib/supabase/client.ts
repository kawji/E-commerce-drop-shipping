"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for use in Client Components / browser context.
 * Uses NEXT_PUBLIC_* env vars from `.env.local`.
 *
 * @example
 * ```tsx
 * "use client";
 * import { createClient } from "@/lib/supabase/client";
 *
 * const supabase = createClient();
 * const { data } = await supabase.from("products").select("*");
 * ```
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}