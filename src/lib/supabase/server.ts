import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Create a Supabase client for use in Server Components, Server Actions,
 * and Route Handlers (Next.js App Router).
 * Reads/writes auth cookies via `next/headers` and uses env vars from `.env.local`.
 *
 * NOTE: Must only be imported from server-side code.
 * For client-side code, use `@/lib/supabase/client` instead.
 *
 * @example
 * ```tsx
 * import { createClient } from "@/lib/supabase/server";
 *
 * export default async function Page() {
 *   const supabase = await createClient();
 *   const { data: products } = await supabase.from("products").select("*");
 *   // ...
 * }
 * ```
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component without write access.
            // Middleware (`updateSession`) refreshes the session instead.
          }
        },
      },
    },
  );
}