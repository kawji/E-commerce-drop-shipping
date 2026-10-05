'use client'

import { useState } from 'react'
import clsx from 'clsx'

type Props = {
    limit: number
    quantity?: number
    onQuantityChange?: (quantity: number) => void
}

export default function ButtonCount({
    limit,
    quantity: controlledQuantity,
    onQuantityChange,
}: Props) {
    const [internalQuantity, setInternalQuantity] = useState(1)
    const quantity = Math.min(
        Math.max(controlledQuantity ?? internalQuantity, 1),
        Math.max(limit, 1),
    )

    const updateQuantity = (nextQuantity: number) => {
        const safeQuantity = Math.min(
            Math.max(nextQuantity, 1),
            Math.max(limit, 1),
        )
        setInternalQuantity(safeQuantity)
        onQuantityChange?.(safeQuantity)
    }

    return (
        <div className="grid grid-cols-3 aspect-3.75/1.25 w-36 bg-black/5 rounded-full">
            <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                className={clsx(
                    'flex items-center justify-center w-full h-full text-xl cursor-pointer scale-130 hover:scale-170 transition-all duration-300 disabled:cursor-not-allowed',
                    quantity === 1 ? 'opacity-40' : 'opacity-100',
                )}
                onClick={() => updateQuantity(quantity - 1)}
            >
                -
            </button>
            <div
                className="flex items-center justify-center w-full h-full text-base"
                aria-live="polite"
            >
                {quantity}
            </div>
            <button
                type="button"
                aria-label="Increase quantity"
                disabled={quantity >= limit}
                className={clsx(
                    'flex items-center justify-center w-full h-full text-xl cursor-pointer scale-130 hover:scale-170 transition-all duration-300 disabled:cursor-not-allowed',
                    quantity === limit ? 'opacity-40' : 'opacity-100',
                )}
                onClick={() => updateQuantity(quantity + 1)}
            >
                +
            </button>
        </div>
    )
}