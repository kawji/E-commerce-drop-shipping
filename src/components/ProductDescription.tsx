'use client'

import clsx from "clsx"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ProductDescriptionProps {
    /** ข้อมูลรายละเอียดแบบ Text ยาว (รองรบัการขึ้่นบรรทัดใหม้ด้้วย \n จากข้อมูลดิบท) */
    description: string;
    /** หััวข้้อของ section (ค่าเรื่่มตั้น: "Product Details") */
    title?: string;
    /** className เพิ่่มเติมสำหรบัปรับแต่งภายนอก */
    className?: string;
}

/** จำนวนบรรทัดสุงสุดตอนย่อข้้อความ (ก่อนกด "อ่า่นเพิ่่มเติม") */
const COLLAPSED_LINES = 6;
/** ถ้ามึจำนวนตวัอักษรเกนิค่านี้ ถือว่่าข้้อความยาว และแสดงปุ่่ม Read More */
const LONG_TEXT_THRESHOLD = 300;

/**
 * Reusable Component: แสดงรายละเอียดทั่่วไปของสิินค้า (Description)
 *
 * - ใช้ class `whitespace-pre-line` เพื่่อให้ขึ้่นบรรทัดจากข้อมูลดิบทแสดงตรงตามจริง
 * - ถ้้าข้้อความยาวเกนิกำหนด จะย่่อแสดงด้วย line-clamp และแสดงปุ่่ม
 *   "Read More / Show Less" ควบคุมด้วย React State
 *
 * ใช้ได้ทั้่งหน้้า ProductPage (ฝั่່งลูกค้้า) และหน้้า Admin
 */
export default function ProductDescription({
    description,
    title = "Product Details",
    className,
}: ProductDescriptionProps) {
    const [expanded, setExpanded] = useState(false);

    // ถ้้ามึไม่มึข้อมูล ก็ไม่ต้อง render section นี้
    if (!description) return null;

    // พิจารณาว่่าข้้อความ "ยาวพอ" ที่จะต้องย่่อหรืไม่
    const lineCount = description.split("\n").length;
    const isLong = lineCount > COLLAPSED_LINES || description.length > LONG_TEXT_THRESHOLD;

    return (
        <div className={clsx("flex flex-col w-full gap-3", className)}>
            <h2 className="text-xl md:text-2xl font-semibold text-black/90 border-b border-black/10 pb-3">
                {title}
            </h2>

            {/* whitespace-pre-line = เคารพ \n จากข้อมูลดิบท
                line-clamp-6 = ย่่อข้้อความเมื่ื่อยังไม่กดอ่า่นเพิ่่มเติม */}
            <div
                className={clsx(
                    "w-full text-sm md:text-base font-medium leading-relaxed md:leading-loose text-black/70 whitespace-pre-line break-words",
                    !expanded && isLong && "line-clamp-6"
                )}
            >
                {description}
            </div>

            {/* ปุ่่มอ่า่นเพิ่่มเติม / ย่่อข้้อความ (แสดงเฉพาะกรณีทึข้้อความยาวเท่านั้่น) */}
            {isLong && (
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="flex items-center gap-1 self-start text-sm font-semibold text-[#0f3612] hover:text-[#0f3612cc] cursor-pointer transition-colors"
                >
                    {expanded ? (
                        <>
                            <span>Show Less</span>
                            <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            <span>Read More</span>
                            <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}