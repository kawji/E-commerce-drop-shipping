'use client'

import Image from "next/image"
import { useState } from "react"

import Navbar from "@/components/navbar"
import SectionInformation from "@/app/checkout/_components/sectionsInformation"
import RadioPay from "@/app/checkout/_components/radioPay"
import ItemPay from "@/app/checkout/_components/itemPay"
import VariantOptions, {
    type VariantOption,
    formatPriceDelta,
} from "@/app/checkout/_components/variantOptions"
import { type IconName } from "@/icons/iconsList"

type ItemsPay = {
    icon: IconName
    title: string
}

const BASE_PRICE = 549

/** Mock product upgrades used to exercise checkout's dynamic pricing. */
const VARIANT_OPTIONS: readonly VariantOption[] = [
    {
        id: "standard",
        label: "Standard Spec",
        description: "Core i5 · 8GB RAM",
        priceDelta: 0,
    },
    {
        id: "pro",
        label: "Pro Upgrade",
        description: "Core i7 · 16GB RAM",
        priceDelta: 149,
    },
    {
        id: "max",
        label: "Max Performance",
        description: "Core i9 · 32GB RAM",
        priceDelta: 349,
    },
]

const DEFAULT_VARIANT = VARIANT_OPTIONS[0]!

const PAYMENT_ITEMS: readonly ItemsPay[] = [
    { icon: "visa", title: "visa" },
    { icon: "prom", title: "prompay" },
    { icon: "credit", title: "credit" },
]

export default function CheckoutLayoutPage() {
    const [checkout, setCheckout] = useState("delivery")
    const [currentPay, setCurrentPay] = useState("visa")
    const [selectedVariant, setSelectedVariant] = useState<VariantOption["id"]>(
        DEFAULT_VARIANT.id,
    )

    // Keep one source of truth for both the selected chip and order totals.
    const activeVariant =
        VARIANT_OPTIONS.find((option) => option.id === selectedVariant) ??
        DEFAULT_VARIANT
    const totalPrice = BASE_PRICE + activeVariant.priceDelta

    return (
        <div className="flex w-full flex-col items-center pb-50 text-zinc-950/90">
            <Navbar />

            <div className="flex w-full max-w-380 flex-col items-center justify-start gap-5 px-5 lg:flex-row lg:items-start lg:justify-center xl:px-18 lg:px-13">
                <div className="flex w-full max-w-170 flex-col items-center gap-5 pt-8">
                    <section className="flex w-full flex-col gap-4 rounded-lg border border-black/5 bg-zinc-50 px-4 py-4 shadow-xs sm:gap-5 sm:px-7 sm:py-5">
                        <h1 className="text-lg font-bold text-zinc-950/92 sm:text-2xl">
                            Review Item And Shipping
                        </h1>

                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="relative aspect-square flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded bg-black/4 sm:h-32 sm:w-32">
                                <Image
                                    src="/pg/headphone1-.png"
                                    alt="AirPods Max in checkout"
                                    fill
                                    sizes="(max-width: 640px) 96px, 128px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex grow flex-col justify-center gap-2 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                <div className="flex flex-col">
                                    <h2 className="text-base font-semibold leading-tight text-zinc-950/90 sm:text-2xl sm:leading-relaxed">
                                        Airpods-Max
                                    </h2>
                                    <p className="mt-0.5 text-xs font-medium text-black/45 sm:text-sm">
                                        Color: Pink
                                    </p>
                                    <p className="mt-0.5 text-xs font-semibold text-[#0f3612] sm:text-sm">
                                        {activeVariant.label}
                                    </p>
                                </div>

                                <div className="mt-1 flex flex-row items-baseline justify-between gap-2 border-t border-black/5 pt-2 sm:mt-0 sm:flex-col sm:items-end sm:justify-center sm:border-none sm:pt-0">
                                    <span
                                        aria-live="polite"
                                        className="text-base font-bold text-zinc-950/90 sm:text-xl"
                                    >
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-medium text-black/77 sm:text-sm">
                                        Quantity: 01
                                    </span>
                                </div>
                            </div>
                        </div>
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

                            <RadioPay
                                currentPay={checkout}
                                section="Cash on Delivery"
                                setCurrentPay={setCheckout}
                                value="delivery"
                            />
                            <RadioPay
                                currentPay={checkout}
                                section="Shopcart Card"
                                setCurrentPay={setCheckout}
                                value="card"
                            />
                            <RadioPay
                                currentPay={checkout}
                                section="Paypal"
                                setCurrentPay={setCheckout}
                                value="paypal"
                            />

                            <div className="mt-1 flex w-full flex-row flex-wrap items-center gap-2">
                                {PAYMENT_ITEMS.map((item) => (
                                    <ItemPay
                                        key={item.title}
                                        icon={item.icon}
                                        title={item.title}
                                        currentSelect={currentPay}
                                        onCurrentSelect={setCurrentPay}
                                    />
                                ))}
                            </div>

                            {/* Product options are selected here and lifted to this parent state. */}
                            <div className="mt-1 flex w-full flex-col gap-2.5 border-t border-black/6 pt-4">
                                <div className="flex w-full items-center justify-between gap-3">
                                    <span className="text-sm font-bold text-zinc-950/90 sm:text-base">
                                        Product Options
                                    </span>
                                    <span className="text-xs font-semibold text-[#0f3612] sm:text-sm">
                                        {activeVariant.label}
                                    </span>
                                </div>
                                <VariantOptions
                                    options={VARIANT_OPTIONS}
                                    selectedId={selectedVariant}
                                    onSelect={(id) => setSelectedVariant(id)}
                                />
                            </div>
                        </div>

                        {/* All totals derive from the selected option, so they update in real time. */}
                        <div
                            aria-live="polite"
                            className="flex w-full flex-col gap-2 border-t border-black/6 pt-4 text-sm"
                        >
                            <div className="flex w-full items-center justify-between font-medium text-black/60">
                                <span>Subtotal</span>
                                <span>${BASE_PRICE.toFixed(2)}</span>
                            </div>
                            <div className="flex w-full items-center justify-between font-medium text-black/60">
                                <span>{activeVariant.label}</span>
                                <span>{formatPriceDelta(activeVariant.priceDelta)}</span>
                            </div>
                            <div className="flex w-full items-center justify-between border-t border-black/6 pt-2 text-base font-bold text-zinc-950/90 sm:text-lg">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
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