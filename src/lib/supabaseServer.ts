import { cookies } from "next/headers";
import type { UserRole } from "@/lib/supabaseAuth";

/**
 * ============================================================
 *  Supabase Auth — SERVER-SIDE ROLE READER (PLACEHOLDER)
 * ============================================================
 *  ใชงานจาก Server Component / Route Handler / Server Action เทานั้้น
 *  (นาไฟลน์ี้ไป import จาก Client Component ไมไ่ด้ดวยขอกำจัดของ next/headers)
 *
 *  TODO(Supabase): เมือเชือมตอจริง ใหใช @supabase/ssr:
 *    const supabase = createServerClient(SUPABASE_URL, ANON_KEY, { cookies })
 *    const { data: { user } } = await supabase.auth.getUser()
 *  จากนั้้น query role จากตาราง `profiles` ตาม user.id
 * ============================================================
 */

export interface ServerUser {
    id: string | null;
    role: UserRole;
}

/**
 * จำลองการอา่ น Supabase session cookie ฝััง Server
 * Supabase ของจริงจะเซฟ session ไวที้ cookie ชือ `sb-<project-ref>-auth-token`
 */
export async function getServerUser(): Promise<ServerUser> {
    const cookieStore = await cookies();

    // PLACEHOLDER: อา่ น cookie จำลอง (ตอง verify JWT ดวย Supabase ของจริงในอนาคต)
    const sessionCookie = cookieStore.get("sb-placeholder-project-auth-token");
    const roleCookie = cookieStore.get("user-role");

    if (!sessionCookie) {
        return { id: null, role: "guest" };
    }

    const role: UserRole =
        roleCookie?.value === "admin" ? "admin" : roleCookie?.value === "user" ? "user" : "guest";

    return { id: "mock-user-001", role };
}