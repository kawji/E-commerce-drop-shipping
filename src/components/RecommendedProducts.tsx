import clsx from "clsx"
import ProductMiniCard, { MiniProduct } from "@/components/ProductMiniCard"

interface RecommendedProductsProps {
    /** Array ของสินค้าแนะนำ (คละหมวดหมู่) */
    products: MiniProduct[];
    /** หัวข้อของ section */
    title?: string;
    /** className เพิ่่มเติม */
    className?: string;
}

/**
 * Reusable Component: สินค้าแนะนำทั่่วไป (Recommended Products)
 * - รับ Prop เหมื่่อน RelatedProducts แต้แยก Component ออกมาชั้ดเจน
 *   (ในอนาคตจะย้าง API คนละ endpoint กไ็ด้)
 * - .map() แสดงรายการเป็็น Grid responsive เหมื่่อนกนั
 */
export default function RecommendedProducts({
    products,
    title = "Recommended For You",
    className,
}: RecommendedProductsProps) {
    if (!products || products.length === 0) return null;

    return (
        <section className={clsx("flex flex-col w-full gap-4", className)}>
            <h2 className="text-xl md:text-2xl font-semibold text-black/90 border-b border-black/10 pb-3">
                {title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {products.map((product) => (
                    <ProductMiniCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
}