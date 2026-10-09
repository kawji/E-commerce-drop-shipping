'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { MoreHorizontal, Flag, Trash2, ThumbsUp, BadgeCheck } from "lucide-react"
import Staricon from "@/icons/star"
import { CurrentUser, getUserRoleFromCookies, canModerate, canReport } from "@/lib/supabaseAuth"

/**
 * คุณสมบัติสินค้าที่ผู้รีวิวเลือก (ออกแบบเป็น key-value ทั่่วไป
 * เพื่รองรบั attribute หลากหลายในอนาคต เช่น สี, ขนาด, ความจุ, แร็ม)
 */
export interface ReviewAttribute {
    name: string;
    value: string;
}

/** โครงสร้างข้อมูลรีวิว 1 รายการ (พร้อมส่างจาก API/Supabase ในอนาคต) */
export interface ProductReview {
    id: string;
    userName: string;
    /** optional: path รปูโปรไฟลล์ูกค้า (ถ้ามิต่างว่างจะแสดงเป็นตวัอักษรต้นชื่) */
    userAvatar?: string;
    /** ISO date string เช่น "2026-09-12T10:30:00Z" */
    createdAt: string;
    /** คะแนน 1-5 */
    rating: number;
    /** รายการคณุ สมบัติสินค้าที่เลือก (ไมจำกัดเฉพาะสี) */
    attributes: ReviewAttribute[];
    comment: string;
    likes: number;
    isVerified?: boolean;
}

interface ProductReviewsProps {
    reviews: readonly ProductReview[];
    title?: string;
    className?: string;
}

/** ฟอร์แมตวันที่ลงรีวิว */
function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

/** แถวดาวเรตติ้ง (ใชร่วมกันระหวางส่วนสรุุปและแตละรีวิว) */
function Stars({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) {
    const full = Math.round(rating)
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Staricon key={i} className={clsx(size, i < full ? "text-green-500" : "text-black/12")} />
            ))}
        </div>
    )
}

/**
 * Reusable Component: ส่วนรีวิวสินคา (Ratings & Reviews) สไตลLazada
 * - หัวบล็อก: รปูโปรไฟล,์ ชื่ือผ้้้รีวิว, วันท่ีลงรีวิว
 * - มุมขวา: ปุ่่ "..." dropdown สำหรบั "รายงานความผดิปกตติ (Report)"
 * - รองหัวขอ: ดาว + attribute ท่ีเลือก (รองรบั หลายประเภท ไมจำกัดเฉพาะสี)
 * - ท้ายบล็อก: ปุ่่กดถุกใจ + จำนวน likes (เก็บดวย useState ชั่้วคราว)
 *
 * Future Integration: อาน role ผ้ใชงานจาก Supabase cookie (placeholder)
 * เพื่อกำหนดสิทธิ์ เช่น guest จะรายงานไมได, admin ลบรีวิวได
 */
export default function ProductReviews({
    reviews,
    title = "Ratings & Reviews",
    className,
}: ProductReviewsProps) {
    // ===== Supabase Auth placeholder: อาน role จาก cookie (จำลอง) =====
    const [currentUser, setCurrentUser] = useState<CurrentUser>({ id: null, email: null, role: "guest" })

    useEffect(() => {
        // TODO(Supabase): แทนทดี้วย supabase.auth.getUser() จาก session จรงิ
        setCurrentUser(getUserRoleFromCookies())
    }, [])

    if (!reviews || reviews.length === 0) return null

    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    return (
        <section className={clsx("flex flex-col w-full gap-4", className)}>
            <h2 className="text-xl md:text-2xl font-semibold text-black/90 border-b border-black/10 pb-3">
                {title}
            </h2>

            {/* ส่วนสรุุปคะแนน (สไตลLazada: ตวัเลขใหญ + ดาว) */}
            <div className="flex items-center gap-4 md:gap-6 bg-white border border-black/6 rounded-lg px-5 py-4">
                <div className="flex flex-col items-center">
                    <p className="text-4xl font-bold text-black/90 leading-none">{average.toFixed(1)}</p>
                    <p className="text-xs text-black/50 mt-1">out of 5</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <Stars rating={average} size="w-5 h-5" />
                    <p className="text-sm text-black/60">
                        {reviews.length.toLocaleString()} rating{reviews.length > 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {/* รายการรรีวิว */}
            <div className="flex flex-col w-full gap-4">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} currentUser={currentUser} />
                ))}
            </div>
        </section>
    )
}

/** บลอกรีวิว 1 รายการ (แยกเป็น component ย่อย เพื่อกำหนด state likes/menu ของแตละรายการอิสระจากกกัน) */
function ReviewCard({ review, currentUser }: { review: ProductReview; currentUser: CurrentUser }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [reported, setReported] = useState(false)
    // Likes เก็บไวด้ว้ ย useState ชั่้วคราว (อนาคตย้ายไปเก็บใน Supabase table `review_likes`)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(review.likes)

    const handleLike = () => {
        setLiked((prev) => {
            setLikeCount((count) => count + (prev ? -1 : 1))
            return !prev
        })
    }

    const handleReport = () => {
        setMenuOpen(false)
        // จำลองสิทธิ์: ผ้้ใชท่ี่ยังไมlogin (guest) จะรายงานไมได
        if (!canReport(currentUser)) {
            window.alert("Please log in to report a review. (Supabase Auth placeholder)")
            return
        }
        setReported(true)
    }

    const handleDelete = () => {
        setMenuOpen(false)
        // TODO(Supabase): call deleteReview mutation (admin only)
        window.alert(`Delete review #${review.id} — placeholder (admin only)`)
    }

    return (
        <article className="relative flex flex-col w-full bg-white border border-black/6 rounded-lg p-4 md:p-5 gap-3">
            {/* ===== หัวบล็อก: โปรไฟล,์ ชื่ือ, วันท่ี + ปุ่่ "..." ===== */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    {/* รปูโปรไฟล,์ (ถ้ามิต่างว่าง แสดงเป็นอักษรต้นชื่ือ) */}
                    {review.userAvatar ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-black/5">
                            <Image src={review.userAvatar} alt={review.userName} fill sizes="40px" className="object-cover" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[#0f3612]/10 text-[#0f3612] font-bold text-base">
                            {review.userName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex flex-col min-w-0">
                        <span className="flex items-center gap-1.5 text-sm md:text-base font-semibold text-black/85 truncate">
                            {review.userName}
                            {review.isVerified && (
                                <BadgeCheck className="w-4 h-4 shrink-0 text-green-600" aria-label="Verified buyer" />
                            )}
                        </span>
                        <span className="text-xs text-black/45">{formatDate(review.createdAt)}</span>
                    </div>
                </div>

                {/* ปุ่่ "..." dropdown (Report / Delete) */}
                <div className="relative shrink-0">
                    <button
                        type="button"
                        aria-label="Review options"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-black/40 hover:bg-black/5 hover:text-black/70 cursor-pointer transition-colors"
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </button>

                    {menuOpen && (
                        <>
                            {/* ผ้าม่านโปรรงสำหรบั ปิด dropdown เมือกดออกด้านนอก */}
                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                            <div className="absolute right-0 top-9 z-20 flex flex-col min-w-44 rounded-lg border border-black/8 bg-white shadow-lg overflow-hidden">
                                <button
                                    type="button"
                                    onClick={handleReport}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-black/75 hover:bg-black/4 cursor-pointer transition-colors"
                                >
                                    <Flag className="w-4 h-4 text-black/45" />
                                    Report abuse
                                </button>
                                {/* ปุ่่ลบ: แสดงเฉพาะผ้้ใชส้ิทธ์ Admin (จาก Supabase role placeholder) */}
                                {canModerate(currentUser) && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors border-t border-black/5"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete review
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ===== รองหัวขอ: ดาว + attributes (key-value ยืดหยุน) ===== */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Stars rating={review.rating} />
                {review.attributes.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                        {review.attributes.map((attr, i) => (
                            <span
                                key={`${attr.name}-${i}`}
                                className="px-2.5 py-1 rounded-full bg-black/4 text-xs font-medium text-black/60"
                            >
                                {attr.name}: {attr.value}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* ===== เนื้้อหา รีวิว ===== */}
            <p className="w-full text-sm md:text-[15px] leading-relaxed text-black/75 whitespace-pre-line wrap-break-word">
                {review.comment}
            </p>

            {reported && (
                <p className="text-xs font-medium text-amber-600">
                    This review has been reported. Our team will review it shortly.
                </p>
            )}

            {/* ===== ท้ายบล็อก: ปุ่่ถุกใจ + จำนวน likes ===== */}
            <div className="flex items-center gap-2 pt-1">
                <button
                    type="button"
                    onClick={handleLike}
                    className={clsx(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs md:text-sm font-semibold cursor-pointer transition-all duration-200",
                        liked
                            ? "border-[#0f3612] bg-[#0f3612]/8 text-[#0f3612]"
                            : "border-black/12 text-black/60 hover:border-[#0f3612]/60 hover:text-[#0f3612]"
                    )}
                >
                    <ThumbsUp className={clsx("w-4 h-4", liked && "fill-current")} />
                    <span>Helpful</span>
                </button>
                <span className="text-xs md:text-sm text-black/55 font-medium">{likeCount.toLocaleString()}</span>
            </div>
        </article>
    )
}