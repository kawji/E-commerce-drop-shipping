import clsx from "clsx"
import ProductMiniCard, { MiniProduct } from "@/components/ProductMiniCard"

interface RelatedProductsProps {
    /** Array ของสินค้าในหมวดหมู่เดียวกกัน */
    products: MiniProduct[];
    /** id ของสินค้าทีกำลงังแสดงอยู่ (ป้องกกันไม่ให้แสดงซ้ำ) */
    currentProductId?: string;
    /** หัวข้อของ section */
    title?: string;
    /** className เพิ่มเติม */
    className?: string;
}

/**
 * Reusable Component: สินค้าหมวดหมู่เดียวกกัน (Related Products)
 * - .map() แสดงรายการเป็น Grid responsive
 * - กรองสินค้าตัวปัจจุบันออก ไม่ให้แสดงซ้ำกกับหน่าทีกำลงังเปิดอยู่
 */
export default function RelatedProducts({
    products,
    currentProductId,
    title = "Related Products",
    className,
}: RelatedProductsProps) {
    // เงื่่อนไขป้องกกัน: ไม่แสดงสินค้าชิ้้นปัจจุบันซ้ำ
    const filtered = products.filter((p) => p.id !== currentProductId);

    if (filtered.length === 0) return null;

    return (
        <section className={clsx("flex flex-col w-full gap-4", className)}>
            <h2 className="text-xl md:text-2xl font-semibold text-black/90 border-b border-black/10 pb-3">
                {title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {filtered.map((product) => (
                    <ProductMiniCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
}