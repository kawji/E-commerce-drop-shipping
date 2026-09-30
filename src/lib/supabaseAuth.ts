"use client";

/**
 * ============================================================
 *  Supabase Auth & Role Management — PLACEHOLDER SETUP
 * ============================================================
 *  อนาคตเมือเชื่อมต่อกับ Supabase จรงิ:
 *   1. ติดตั้่ง `bun add @supabase/supabase-js`
 *   2. กำหนด env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABANCE_ANON_KEY
 *   3. แทนท่ี `getUserRoleFromCookies()` ด้วยการยืนยันทokeนจาก Supabase Auth
 *      (เช่น supabase.auth.getUser() แล้วอ้าน role จากตาราง profiles / JWT claims)
 * ============================================================
 */

/** ระดับสทิธข์องผ้้้ใชง้ านในระบบ (Admin จดัการรีวิว/รายงานไดง้ าน User) */
export type UserRole = "admin" | "user" | "guest";

export interface CurrentUser {
    id: string | null;
    email: string | null;
    role: UserRole;
}

/** ค่่า placeholder — แทนท่ีดว้ ย env จรงิ เมือเชื่อมตอ่ Supabase */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder-project.supabase.co";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "public-anon-placeholder-key";

/**
 * จำลองการอ้าน role จาก Supabase Auth cookie (ฝััง Client)
 *
 * ปจจุ ุบัน: อ้าน cookie ชื่่ `user-role` ท่ีจำลองขึ้้นมา
 * (Supabase จรงิ จะเซฟ session เป็น cookie ชื่่ `sb-<project-ref>-auth-token`)
 *
 * TODO(Supabase): แทนท่ีดว้ ยการ parse/verify JWT จาก `sb-*-auth-token`
 * และดึง role จาก claims หรือตาราง `profiles`
 */
export function getUserRoleFromCookies(): CurrentUser {
    // ปลอดภัย SSR: ฝััง server จะไม่มี document
    if (typeof document === "undefined") {
        return { id: null, email: null, role: "guest" };
    }

    const cookies = document.cookie.split(";").map((c) => c.trim());

    // --- PLACEHOLDER: จำลองการอ้าน Supabase session cookie ---
    const roleCookie = cookies.find((c) => c.startsWith("user-role="))?.split("=")[1];
    const idCookie = cookies.find((c) => c.startsWith("sb-user-id="))?.split("=")[1];

    const role: UserRole =
        roleCookie === "admin" ? "admin" : roleCookie === "user" ? "user" : "guest";

    return {
        id: idCookie ?? (role !== "guest" ? "mock-user-001" : null),
        email: role !== "guest" ? "mock-user@example.com" : null,
        role,
    };
}

/** Helper ตรวจสทิธ ์ใช้กบั ปุ่ มตางๆ ในระบบรีวิว */
export function canModerate(user: CurrentUser): boolean {
    return user.role === "admin";
}

export function canReport(user: CurrentUser): boolean {
    return user.role !== "guest";
}