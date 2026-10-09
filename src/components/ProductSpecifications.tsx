import clsx from "clsx"
import type { ProductSpecification } from "@/type/product"

/**
 * โครงสร้างข้อมูลจำเพาะ 1 รายการ (คู่ Label : Value)
 * Export ไว้เพื่อให้หน้า Admin (เพิ่มสินค้า) สามารถ import ไปกำหนด type ของ Form/Data ได้อย่างสะดวก
 */
export type { ProductSpecification } from "@/type/product"

interface ProductSpecificationsProps {
    /** Array แบบ readonly ของข้อมูลจำเพาะ เช่น [{ label: "Brand", value: "Apple" }, ...] */
    specs: readonly ProductSpecification[]
    /** หัวข้อของ section (ค่าเริ่มต้น: "Specifications") */
    title?: string;
    /** className เพิ่มเติมสำหรับปรับแต่งภายนอก */
    className?: string;
}

/**
 * Reusable Component: แสดงข้อมูลจำเพาะของสินค้า (Specifications)
 * ใช้ได้ทั้งหน้า ProductPage (ฝั่งลูกค้า) และหน้า Admin (ฟอร์มแสดง/พรีวิวข้อมูล)
 */
export default function ProductSpecifications({
    specs,
    title = "Specifications",
    className,
}: ProductSpecificationsProps) {
    // ถ้าไม่มีข้อมูล ก็ไม่จำเป็นต้อง render section นี้ออกมา
    if (!specs || specs.length === 0) return null;

    return (
        <div className={clsx("flex flex-col w-full gap-3", className)}>
            <h2 className="text-xl md:text-2xl font-semibold text-black/90 pb-3">
                {title}
            </h2>

            <div className="w-full overflow-hidden rounded-lg border border-black/8 bg-transparent">
                {specs.map((spec, index) => (
                    <div
                        key={`${spec.label}-${index}`}
                        className={clsx(
                            "flex flex-col sm:flex-row w-full px-4 sm:px-5 py-3 text-sm md:text-base",
                            index % 2 === 1 && "bg-white",
                            index !== specs.length - 1 && "border-b border-black/5"
                        )}
                    >
                        <div className="w-full sm:w-1/4 shrink-0 font-medium text-black/50">
                            {spec.label}
                        </div>
                        <div className="w-full sm:flex-1 mt-0.5 sm:mt-0 font-medium text-black/85 wrap-break-word">
                            {spec.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}