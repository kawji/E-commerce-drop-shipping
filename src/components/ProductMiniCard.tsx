import Image from "next/image"
import Link from "next/link"
import Staricon from "@/icons/star"
import clsx from "clsx"
import { formatPrice } from "@/lib/formatPrice"
import type { Cents, CurrencyCode } from "@/type/product"

/**
 * โครงสร้างข้อมูลสินค้าแบบย่อสำหรับรายการสินค้าแนะนำ/สินค้าคล้ายกัน
 * ราคาใน UI adapter นี้ยังคงอยู่ในหน่วย cents ตาม contract ของสินค้า
 */
export interface MiniProduct {
    id: string
    name: string
    priceCents: Cents
    currency: CurrencyCode
    image: string
    rating: number
}

type ProductMiniCardProps = MiniProduct

/**
 * Product Card ขนาดย่อใช้ร่วมกันระหว่าง RelatedProducts และ RecommendedProducts
 */
export default function ProductMiniCard({
    id,
    name,
    priceCents,
    currency,
    image,
    rating,
}: ProductMiniCardProps) {
    const fullStars = Math.round(rating)

    return (
        <Link
            href={`/products/${id}`}
            className="group flex flex-col w-full rounded-lg border border-black/6 bg-white overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
            <div className="relative w-full aspect-[1.3/1] bg-black/4">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex flex-col gap-1.5 p-3">
                <p className="text-sm font-semibold text-black/85 leading-snug line-clamp-2">
                    {name}
                </p>
                <p className="text-base font-bold text-[#0f3612]">
                    {formatPrice(priceCents, currency)}
                </p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Staricon
                            key={index}
                            className={clsx(
                                "w-3.5 h-3.5",
                                index < fullStars ? "text-green-500" : "text-black/12",
                            )}
                        />
                    ))}
                    <p className="text-xs ml-1 text-black/60">({rating.toFixed(1)})</p>
                </div>
            </div>
        </Link>
    )
}