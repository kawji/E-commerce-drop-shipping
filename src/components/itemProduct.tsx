'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Staricon from '@/icons/star'
import { formatPrice } from '@/lib/formatPrice'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/type/product'

type Props = {
    product: Product
}

export default function ItemProduct({ product }: Props) {
    const image = product.images[0]
    const fullStars = Math.round(product.rating)
    const { addToCart } = useCart()
    const [isAdded, setIsAdded] = useState(false)
    const defaultVariant =
        product.variants.find((variant) => variant.isDefault) ?? product.variants[0]

    if (!image) return null

    const handleAddToCart = () => {
        if (!defaultVariant || defaultVariant.stockQuantity < 1) return

        addToCart(product.id, defaultVariant.id, 1)
        setIsAdded(true)
    }

    return (
        <div className="flex flex-col aspect-1/1.25 hover:shadow hover:scale-101 cursor-pointer transition-all duration-300 p-2 rounded">
            <Link
                href={`/products/${product.id}`}
                className="flex flex-1 flex-col gap-3"
            >
                <div className="relative w-full aspect-1.5/1.25 flex items-center justify-center bg-black/5 rounded-md">
                    <Image
                        src={image.src}
                        width={180}
                        height={180}
                        style={{ objectFit: 'cover' }}
                        alt={image.alt}
                    />
                </div>
                <div className="flex-1 w-full flex flex-col">
                    <div className="flex flex-col w-full gap-1">
                        <div className="flex items-center justify-between text-base gap-1 font-bold text-black/88">
                            <p className="leading-none">{product.name}</p>
                            <span className="flex text-[11px]">
                                {formatPrice(product.basePriceCents, product.currency)}
                            </span>
                        </div>
                        <div className="text-[11px] text-black/70 font-semibold">
                            {product.shortDescription}
                        </div>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, index) => (
                                <Staricon
                                    key={index}
                                    className={
                                        index < fullStars
                                            ? 'text-green-500'
                                            : 'text-black/15'
                                    }
                                />
                            ))}
                            <p className="text-[12px] ml-1 text-black/77">
                                ({product.reviewCount})
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="w-full flex items-center mt-1">
                <button
                    type="button"
                    disabled={!defaultVariant || defaultVariant.stockQuantity < 1}
                    onClick={handleAddToCart}
                    className="px-3.5 py-1.5 border rounded-3xl text-[12px] font-semibold tracking-wide cursor-pointer border-[#0f3612] bg-zinc-50 hover:bg-[#0f3612] hover:text-white/93 text-black/90 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isAdded ? 'Added' : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}