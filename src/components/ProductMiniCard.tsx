import Image from "next/image"
import Link from "next/link"
import Staricon from "@/icons/star"
import clsx from "clsx"

/**
 * โครงสร้างข้อมูลสินค้าแบบย่อ (สำหรับ Grid แสดงสินค้าแนะนำ/สินค้าคล้ายกัน)
 * Export ไว้เพื่อให้หน้าอื่่น (เช่น Admin หรือการดึงข้อมูลจาก API) ใช้ type เดียวกกันน้
 */
export interface MiniProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
}

interface ProductMiniCardProps extends MiniProduct {}

/**
 * Product Card ขนาดย่อ (ใช้ร่วมกันระหว่าง RelatedProducts และ RecommendedProducts)
 * สไตลค์້างกบั card หน้า home ของโปรเจกต์
 */
export default function ProductMiniCard({ id, name, price, image, rating }: ProductMiniCardProps) {
    const fullStars = Math.round(rating);

    return (
        <Link
            href={`/products/${id}`}
            className="group flex flex-col w-full rounded-lg border border-black/6 bg-white overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
            {/* รปูภาพสินค้า */}
            <div className="relative w-full aspect-[1.3/1] bg-black/4">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* ข้อมูลสินค้า */}
            <div className="flex flex-col gap-1.5 p-3">
                <p className="text-sm font-semibold text-black/85 leading-snug line-clamp-2">
                    {name}
                </p>
                <p className="text-base font-bold text-[#0f3612]">
                    ${price.toFixed(2)}
                </p>
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Staricon
                            key={i}
                            className={clsx(
                                "w-3.5 h-3.5",
                                i < fullStars ? "text-green-500" : "text-black/12"
                            )}
                        />
                    ))}
                    <p className="text-xs ml-1 text-black/60">({rating.toFixed(1)})</p>
                </div>
            </div>
        </Link>
    );
}