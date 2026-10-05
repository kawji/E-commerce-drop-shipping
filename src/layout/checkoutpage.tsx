'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Navbar from '@/components/navbar'
import SectionInformation from '@/app/checkout/_components/sectionsInformation'
import RadioPay from '@/app/checkout/_components/radioPay'
import ItemPay from '@/app/checkout/_components/itemPay'
import { type IconName } from '@/icons/iconsList'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/formatPrice'
import { PRODUCTS } from '@/data/productMockData'
import type {
    CartLineItem,
    Product,
    ProductVariant,
} from '@/type/product'

type DeliveryMethod = 'standard' | 'express'
type PaymentMethod = 'cash' | 'card' | 'paypal'
type PaymentProvider = 'visa' | 'prompay' | 'credit'

type ItemsPay = {
    icon: IconName
    title: PaymentProvider
}

type CheckoutItem = {
    lineItem: CartLineItem
    product: Product
    variant: ProductVariant
}

const DELIVERY_METHODS: readonly {
    value: DeliveryMethod
    label: string
}[] = [
    { value: 'standard', label: 'Standard Delivery' },
    { value: 'express', label: 'Express Delivery' },
]

const PAYMENT_METHODS: readonly {
    value: PaymentMethod
    label: string
}[] = [
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
]

const PAYMENT_ITEMS: readonly ItemsPay[] = [
    { icon: 'visa', title: 'visa' },
    { icon: 'prom', title: 'prompay' },
    { icon: 'credit', title: 'credit' },
]

export default function CheckoutLayoutPage() {
    const { cart, lineItems, removeFromCart, updateQuantity } = useCart()
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard')
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
    const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('visa')

    const checkoutItems = lineItems.flatMap<CheckoutItem>((lineItem) => {
        const product = PRODUCTS.find((candidate) => candidate.id === lineItem.productId)
        const variant = product?.variants.find(
            (candidate) => candidate.id === lineItem.variantId,
        )

        return product && variant ? [{ lineItem, product, variant }] : []
    })

    return (
        <div className="flex w-full flex-col items-center pb-50 text-zinc-950/90">
            <Navbar />

            <div className="flex w-full max-w-380 flex-col items-center justify-start gap-5 px-5 lg:flex-row lg:items-start lg:justify-center xl:px-18 lg:px-13">
                <div className="flex w-full max-w-170 flex-col items-center gap-5 pt-8">
                    <section className="flex w-full flex-col gap-4 rounded-lg border border-black/5 bg-zinc-50 px-4 py-4 shadow-xs sm:gap-5 sm:px-7 sm:py-5">
                        <h1 className="text-lg font-bold text-zinc-950/92 sm:text-2xl">
                            Review Item And Shipping
                        </h1>

                        {checkoutItems.length === 0 ? (
                            <div className="flex w-full flex-col items-center gap-3 rounded-md border border-dashed border-black/10 px-5 py-10 text-center">
                                <p className="font-semibold text-zinc-950/80">Your cart is empty</p>
                                <Link
                                    href="/"
                                    className="text-sm font-semibold text-[#0f3612] underline underline-offset-4"
                                >
                                    Continue shopping
                                </Link>
                            </div>
                        ) : (
                            checkoutItems.map(({ lineItem, product, variant }) => {
                                const image = product.images[0]
                                const variantLabel =
                                    variant.attributes.Color ?? variant.name
                                const quantity = lineItem.quantity

                                return (
                                    <div
                                        key={`${lineItem.productId}-${lineItem.variantId}`}
                                        className="flex items-center gap-4 border-t border-black/5 pt-4 first:border-t-0 first:pt-0 sm:gap-5"
                                    >
                                        <div className="relative aspect-square flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded bg-black/4 sm:h-32 sm:w-32">
                                            {image ? (
                                                <Image
                                                    src={image.src}
                                                    alt={`${product.name} in checkout`}
                                                    fill
                                                    sizes="(max-width: 640px) 96px, 128px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span className="text-xs text-black/40">No image</span>
                                            )}
                                        </div>

                                        <div className="flex grow flex-col justify-center gap-2 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                            <div className="flex flex-col">
                                                <h2 className="text-base font-semibold leading-tight text-zinc-950/90 sm:text-2xl sm:leading-relaxed">
                                                    {product.name}
                                                </h2>
                                                <p className="mt-0.5 text-xs font-medium text-black/45 sm:text-sm">
                                                    Variant: {variantLabel}
                                                </p>
                                                <p className="mt-0.5 text-xs font-medium text-black/45 sm:text-sm">
                                                    SKU: {lineItem.sku}
                                                </p>
                                            </div>

                                            <div className="mt-1 flex flex-row items-baseline justify-between gap-2 border-t border-black/5 pt-2 sm:mt-0 sm:flex-col sm:items-end sm:justify-center sm:border-none sm:pt-0">
                                                <span
                                                    aria-live="polite"
                                                    className="text-base font-bold text-zinc-950/90 sm:text-xl"
                                                >
                                                    {formatPrice(
                                                        lineItem.lineTotalCents,
                                                        lineItem.currency,
                                                    )}
                                                </span>
                                                <span className="text-xs font-medium text-black/77 sm:text-sm">
                                                    Quantity: {String(quantity).padStart(2, '0')}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        aria-label={`Decrease ${product.name} quantity`}
                                                        disabled={quantity <= 1}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                lineItem.productId,
                                                                lineItem.variantId,
                                                                quantity - 1,
                                                            )
                                                        }
                                                        className="h-6 w-6 rounded-full border border-black/10 text-sm disabled:cursor-not-allowed disabled:opacity-35"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="min-w-4 text-center text-xs font-semibold">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        aria-label={`Increase ${product.name} quantity`}
                                                        disabled={quantity >= variant.stockQuantity}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                lineItem.productId,
                                                                lineItem.variantId,
                                                                quantity + 1,
                                                            )
                                                        }
                                                        className="h-6 w-6 rounded-full border border-black/10 text-sm disabled:cursor-not-allowed disabled:opacity-35"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                lineItem.productId,
                                                                lineItem.variantId,
                                                            )
                                                        }
                                                        className="ml-1 text-[11px] font-semibold text-red-700 underline underline-offset-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </section>

                    <section className="flex w-full flex-col gap-5 rounded-md border border-black/6 bg-zinc-50 p-4 shadow-2xs sm:px-7 sm:py-5">
                        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
                            <h1 className="text-lg font-bold text-zinc-950/90 sm:text-2xl">
                                Delivery Information
                            </h1>
                            <button
                                type="button"
                                className="cursor-pointer self-start rounded-full bg-black/9 px-4 py-1.5 text-xs font-semibold transition-colors hover:bg-black/15 sm:self-auto sm:py-1 sm:text-sm"
                            >
                                Edit Information
                            </button>
                        </div>

                        <div className="flex w-full flex-col items-start gap-3 text-zinc-950/90 sm:gap-4">
                            <SectionInformation section="Name" data="Wade Warren" />
                            <SectionInformation
                                section="Address"
                                data="4140 Parker Rd. Allentown, New Mexico 31134"
                            />
                            <SectionInformation section="City" data="Austin" />
                            <SectionInformation section="Zip Code" data="85486" />
                            <SectionInformation section="Mobile" data="+447700960054" />
                            <SectionInformation
                                section="Email"
                                data="georgia.young@example.com"
                            />
                        </div>

                        <div className="flex w-full flex-col gap-3 border-t border-black/6 pt-4">
                            <h2 className="text-base font-bold text-zinc-950/90 sm:text-lg">
                                Delivery Method
                            </h2>
                            {DELIVERY_METHODS.map((method) => (
                                <RadioPay
                                    key={method.value}
                                    currentPay={deliveryMethod}
                                    setCurrentPay={(value) =>
                                        setDeliveryMethod(value as DeliveryMethod)
                                    }
                                    value={method.value}
                                    section={method.label}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                <div className="flex w-full max-w-170 pt-4 sm:pt-8 lg:max-w-135">
                    <section className="flex w-full flex-col items-start gap-4 rounded-md border border-black/6 bg-zinc-50 p-4 text-zinc-950/90 sm:px-7 sm:py-5">
                        <h1 className="text-xl font-bold sm:text-2xl">Order Summary</h1>

                        <div className="relative flex w-full flex-col gap-2 border-y border-y-black/6 py-5 sm:flex-row sm:items-center sm:gap-0 sm:py-4">
                            <input
                                type="text"
                                name="coupon"
                                id="coupon"
                                placeholder="Enter Coupon Code"
                                className="w-full rounded-full bg-black/4 px-4.5 py-3 text-[13px] outline-none sm:pr-32"
                            />
                            <button
                                type="button"
                                className="flex w-full items-center justify-center rounded-full bg-[#0f3612de] px-4 py-2.5 text-[13px] font-medium text-zinc-50/90 transition-colors hover:bg-[#0f3612f0] sm:absolute sm:right-1.5 sm:top-1/2 sm:w-auto sm:-translate-y-1/2 sm:py-1.5"
                            >
                                Apply coupon
                            </button>
                        </div>

                        <div className="flex w-full flex-col items-start justify-start gap-3 py-0">
                            <div className="w-full text-lg font-bold leading-relaxed sm:text-xl">
                                Payment Details
                            </div>

                            {PAYMENT_METHODS.map((method) => (
                                <RadioPay
                                    key={method.value}
                                    currentPay={paymentMethod}
                                    setCurrentPay={(value) =>
                                        setPaymentMethod(value as PaymentMethod)
                                    }
                                    value={method.value}
                                    section={method.label}
                                />
                            ))}

                            {paymentMethod === 'card' && (
                                <div className="mt-1 flex w-full flex-row flex-wrap items-center gap-2">
                                    {PAYMENT_ITEMS.map((item) => (
                                        <ItemPay
                                            key={item.title}
                                            icon={item.icon}
                                            title={item.title}
                                            currentSelect={paymentProvider}
                                            onCurrentSelect={(value) =>
                                                setPaymentProvider(value as PaymentProvider)
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div
                            aria-live="polite"
                            className="flex w-full flex-col gap-2 border-t border-black/6 pt-4 text-sm"
                        >
                            <div className="flex w-full items-center justify-between font-medium text-black/60">
                                <span>Subtotal</span>
                                <span>{formatPrice(cart.subtotalCents, cart.currency)}</span>
                            </div>
                            <div className="flex w-full items-center justify-between font-medium text-black/60">
                                <span>Shipping</span>
                                <span>{formatPrice(cart.shippingCents, cart.currency)}</span>
                            </div>
                            <div className="flex w-full items-center justify-between border-t border-black/6 pt-2 text-base font-bold text-zinc-950/90 sm:text-lg">
                                <span>Total</span>
                                <span>{formatPrice(cart.grandTotalCents, cart.currency)}</span>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-2 text-sm font-semibold">
                            <label htmlFor="checkout-email">Email*</label>
                            <input
                                id="checkout-email"
                                type="email"
                                placeholder="Type here..."
                                className="rounded border border-black/6 px-4.5 py-3 font-normal outline-none transition-all focus:border-black/30"
                            />
                        </div>

                        <div className="flex w-full flex-col gap-2 text-sm font-semibold">
                            <label htmlFor="card-holder-name">Card Holder Name*</label>
                            <input
                                id="card-holder-name"
                                type="text"
                                placeholder="Type here..."
                                className="rounded border border-black/6 px-4.5 py-3 font-normal outline-none transition-all focus:border-black/30"
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
