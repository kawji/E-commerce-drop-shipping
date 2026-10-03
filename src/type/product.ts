/**
 * Shared product-domain contracts.
 *
 * Every monetary field ending in `Cents` is an integer in the currency's
 * smallest unit (for example, USD 549.00 is stored as 54900).
 */

declare const centsBrand: unique symbol
declare const cartQuantityBrand: unique symbol

/** Integer amount in the currency's smallest unit (cent/satang). */
export type Cents = number & { readonly [centsBrand]: "Cents" }

/** Positive integer used as a cart line quantity. */
export type CartQuantity = number & {
    readonly [cartQuantityBrand]: "CartQuantity"
}

export type CurrencyCode = "USD" | "THB"
export type ProductStatus = "draft" | "active" | "archived"

export interface ProductImage {
    /** Local path or URL accepted by the application's image renderer. */
    src: string
    alt: string
}

export interface ProductCategory {
    id: string
    name: string
    slug: string
}

export interface ProductColorOption {
    id: string
    name: string
    /** Semantic color value for domain/UI adapters. */
    hex: string
    /** Temporary presentation fields for the current SelectColor component. */
    bg600: string
    bg300: string
}

export interface ProductSpecification {
    label: string
    value: string
}

export interface ProductReviewAttribute {
    name: string
    value: string
}

export interface ProductReview {
    id: string
    userName: string
    userAvatar?: string
    /** ISO 8601 date string. */
    createdAt: string
    /** Rating from 1 through 5. */
    rating: number
    attributes: ProductReviewAttribute[]
    comment: string
    likes: number
    isVerified?: boolean
}

export interface ProductService {
    id: string
    icon: "truck" | "return" | "shield" | "support"
    title: string
    description?: string
    availabilityNote?: string
    actionLabel?: string
}

/** A sellable product version with its own price, stock, and attributes. */
export interface ProductVariant {
    id: string
    productId: string
    sku: string
    name: string
    priceCents: Cents
    compareAtPriceCents?: Cents
    stockQuantity: number
    attributes: Readonly<Record<string, string>>
    image?: ProductImage
    isDefault?: boolean
}

export interface ProductFinancingOption {
    id: string
    label: string
    amountCents: Cents
    currency: CurrencyCode
    termMonths?: number
}

/** Canonical normalized product entity and the system's product source of truth. */
export interface Product {
    id: string
    slug: string
    name: string
    shortDescription: string
    description: string
    category: ProductCategory
    /** Base selling price as an integer amount in cents. */
    basePriceCents: Cents
    compareAtPriceCents?: Cents
    currency: CurrencyCode
    images: readonly ProductImage[]
    colors: readonly ProductColorOption[]
    variants: readonly ProductVariant[]
    specifications: readonly ProductSpecification[]
    reviews: readonly ProductReview[]
    services: readonly ProductService[]
    financingOptions?: readonly ProductFinancingOption[]
    /** Average rating from 0 through 5. */
    rating: number
    reviewCount: number
    stockQuantity: number
    status: ProductStatus
    isFeatured: boolean
}

/** Normalized input shape used by mock/catalog ingestion before creating a Product. */
export interface ProductSeed {
    id: string
    name: string
    shortDescription: string
    imageSrc: string
    basePriceCents: Cents
    category: ProductCategory
    rating: number
    reviewCount: number
    stockQuantity?: number
    isFeatured?: boolean
}

/** Lightweight projection for search, filters, and recommendation lists. */
export interface ProductSummary {
    id: string
    slug: string
    name: string
    primaryImageUrl: string
    priceCents: Cents
    currency: CurrencyCode
    rating: number
    reviewCount: number
}

/**
 * A cart line stores a price snapshot so the payable total can be audited
 * even if catalog prices change later.
 */
export interface CartLineItem {
    productId: string
    variantId: string
    sku: string
    quantity: CartQuantity
    unitPriceCents: Cents
    lineTotalCents: Cents
    currency: CurrencyCode
}

export interface Cart {
    id: string
    currency: CurrencyCode
    lineItems: readonly CartLineItem[]
    subtotalCents: Cents
    discountCents: Cents
    shippingCents: Cents
    taxCents: Cents
    grandTotalCents: Cents
    updatedAt: string
}