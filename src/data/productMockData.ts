import type {
    Cents,
    Product,
    ProductCategory,
    ProductColorOption,
    ProductImage,
    ProductReview,
    ProductSeed,
    ProductService,
    ProductSpecification,
    ProductSummary,
    ProductVariant,
} from "@/type/product"

/**
 * Central mock catalog for the feed and product-detail experiences.
 *
 * Canonical storage rule: every amount is an integer number of cents.
 * Examples: USD 283.00 -> 28_300, USD 549.00 -> 54_900, USD 9_999 -> 99.99.
 * UI-specific major-unit formatting is deliberately not performed here.
 */

function toCents(value: number): Cents {
    if (!Number.isSafeInteger(value)) {
        throw new Error(`Invalid cents value: ${value}. Monetary amounts must be safe integers.`)
    }

    return value as Cents
}

function toSlug(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

const HEADPHONES_CATEGORY: ProductCategory = {
    id: "category-headphones",
    name: "Headphones",
    slug: "headphones",
}

const ELECTRONICS_CATEGORY: ProductCategory = {
    id: "category-electronics",
    name: "Electronics",
    slug: "electronics",
}

const WEARABLES_CATEGORY: ProductCategory = {
    id: "category-wearables",
    name: "Wearables",
    slug: "wearables",
}

const TABLETS_CATEGORY: ProductCategory = {
    id: "category-tablets",
    name: "Tablets",
    slug: "tablets",
}

const COMPUTERS_CATEGORY: ProductCategory = {
    id: "category-computers",
    name: "Computers",
    slug: "computers",
}

const AIRPODS_MAX_DESCRIPTION = `ไฮไลท์

Apple AirPods Max หุ้ฟหู Over-Ear ที่สมดุลงน้ำระหว่องเสียงคุณภาพสูง และความสบายในการสวมใส่ที่ไม่เหมือนใคร

- Dynamic Head Tracking สำหรับประสบการณ์เสียงแบบ Spatial Audio
- Active Noise Cancellation (ANC) ตัดเสียงรอบข้างได้อัตโนมัติ
- Transparency Mode ได้ยินเสียงแวดล้อมอย่างเป็นธรรมชาติ
- Adaptive EQ จูนเสียงแบบเรียลไทม์ตามรูปทรงหุ้มฟหูของแต่ละคน
- แบตเตอรี่ใช้งานได้สูงสุด 20 ชั่วโมง ต่อการชาร์จ 1 ครั้ง
- ชิป H1 ประมวลผลเสียงได้สูงสุด 900 ล้านครั้งต่อวินาที

การเชื่อมต่อ
- Bluetooth 5.0 รัศมีใช้งานประมาณ 10 เมตร
- จับคู่อัตโนมัติกับอุปกรณ์ Apple ทั้งหมด

ในกล่อง
- AirPods Max
- Smart Case
- สาย Lightning to USB-C Cable
- เอกสารประกอบและใบรับประกัน`

const PRODUCT_COLOR_OPTIONS_DATA: ProductColorOption[] = [
    {
        id: "red",
        name: "Red",
        hex: "#dc2626",
        bg600: "bg-red-600",
        bg300: "bg-red-300",
    },
    {
        id: "blue",
        name: "Blue",
        hex: "#2563eb",
        bg600: "bg-blue-600",
        bg300: "bg-blue-300",
    },
    {
        id: "green",
        name: "Green",
        hex: "#059669",
        bg600: "bg-emerald-600",
        bg300: "bg-emerald-300",
    },
    {
        id: "zinc",
        name: "Silver",
        hex: "#52525b",
        bg600: "bg-zinc-600/90",
        bg300: "bg-zinc-300",
    },
]

const PRODUCT_SPECIFICATIONS_DATA: ProductSpecification[] = [
    { label: "Brand", value: "Apple" },
    { label: "Model", value: "AirPods Max" },
    { label: "Weight", value: "384.7 g" },
    { label: "Driver", value: "45mm dynamic driver" },
    { label: "Battery Life", value: "Up to 20 hours (ANC on)" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
    { label: "Chip", value: "Apple H1 (2 chips)" },
    { label: "Warranty", value: "1 year" },
]

const PRODUCT_REVIEWS_DATA: ProductReview[] = [
    {
        id: "r1",
        userName: "Somchai Jaidee",
        createdAt: "2026-09-12T10:30:00Z",
        rating: 5,
        attributes: [
            { name: "Color", value: "Midnight Black" },
            { name: "Warranty", value: "1 Year" },
        ],
        comment:
            "เสียงดีมาก ANC ตัดเสียงรอบข้างได้เนียนมาก\nใส่ทำงานทั้งวันไม่ป่าหรู คุ้มค่าราคาครับ",
        likes: 128,
        isVerified: true,
    },
    {
        id: "r2",
        userName: "Jane D.",
        createdAt: "2026-09-05T08:15:00Z",
        rating: 4,
        attributes: [
            { name: "Color", value: "Sky Blue" },
            { name: "Connector", value: "USB-C" },
        ],
        comment:
            "Sound quality is superb, spatial audio is impressive.\nBattery could be better for the price though.",
        likes: 56,
        isVerified: true,
    },
    {
        id: "r3",
        userName: "Mook KP",
        createdAt: "2026-08-28T14:45:00Z",
        rating: 5,
        attributes: [{ name: "Color", value: "Green" }],
        comment: "สีเขียวสวยมาก พร้อมเคสกันกระแทกได้ ส่งไวมากค่ะ",
        likes: 33,
    },
    {
        id: "r4",
        userName: "Guest Buyer",
        createdAt: "2026-08-20T19:05:00Z",
        rating: 3,
        attributes: [],
        comment: "สินค้าปกติดี แต่เสียงเบสไม่แน่นเท่าที่คิด",
        likes: 7,
    },
]

const PRODUCT_SERVICES_DATA: ProductService[] = [
    {
        id: "free-delivery",
        icon: "truck",
        title: "Free Delivery",
        availabilityNote: "Enter your Postal code for Delivery Availability",
    },
    {
        id: "return-delivery",
        icon: "return",
        title: "Return Delivery",
        description: "Free 30day Delivery Returns.",
        actionLabel: "Details",
    },
]

function createColorVariant(
    productId: string,
    color: ProductColorOption,
    isDefault: boolean,
): ProductVariant {
    return {
        id: `${productId}-${color.id}`,
        productId,
        sku: `AIRPODS-MAX-${color.id.toUpperCase()}`,
        name: color.name,
        priceCents: toCents(54_900),
        stockQuantity: 3,
        attributes: { Color: color.name },
        isDefault,
    }
}

const AIRPODS_MAX_IMAGES: ProductImage[] = Array.from({ length: 4 }, (_, index) => ({
    src: "/pg/headphone1-.png",
    alt: `AirPods Max product view ${index + 1}`,
}))

export const CURRENT_PRODUCT: Product = {
    id: "1",
    slug: "apple-airpods-max",
    name: "AirPods Max",
    shortDescription:
        "a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
    description: AIRPODS_MAX_DESCRIPTION,
    category: HEADPHONES_CATEGORY,
    basePriceCents: toCents(54_900),
    currency: "USD",
    images: AIRPODS_MAX_IMAGES,
    colors: PRODUCT_COLOR_OPTIONS_DATA,
    variants: PRODUCT_COLOR_OPTIONS_DATA.map((color, index) =>
        createColorVariant("1", color, index === 0),
    ),
    specifications: PRODUCT_SPECIFICATIONS_DATA,
    reviews: PRODUCT_REVIEWS_DATA,
    services: PRODUCT_SERVICES_DATA,
    financingOptions: [
        {
            id: "airpods-max-monthly",
            label: "Monthly plan",
            amountCents: toCents(9_999),
            currency: "USD",
        },
    ],
    rating: 4.8,
    reviewCount: 121,
    stockQuantity: 12,
    status: "active",
    isFeatured: true,
}

function createCatalogProduct(seed: ProductSeed): Product {
    const priceCents = toCents(seed.basePriceCents)
    const stockQuantity = seed.stockQuantity ?? 50
    const primaryImage: ProductImage = {
        src: seed.imageSrc,
        alt: seed.name,
    }
    const defaultVariantId = `${seed.id}-default`

    return {
        id: seed.id,
        slug: toSlug(seed.name),
        name: seed.name,
        shortDescription: seed.shortDescription,
        description: seed.shortDescription,
        category: seed.category,
        basePriceCents: priceCents,
        currency: "USD",
        images: [primaryImage],
        colors: [],
        variants: [
            {
                id: defaultVariantId,
                productId: seed.id,
                sku: `MOCK-${seed.id.toUpperCase()}`,
                name: "Default",
                priceCents,
                stockQuantity,
                attributes: {},
                image: primaryImage,
                isDefault: true,
            },
        ],
        specifications: [],
        reviews: [],
        services: [],
        rating: seed.rating,
        reviewCount: seed.reviewCount,
        stockQuantity,
        status: "active",
        isFeatured: seed.isFeatured ?? false,
    }
}

/** Twelve feed cards migrated from feedpage.tsx. */
export const FEED_PRODUCTS: readonly Product[] = Array.from(
    { length: 12 },
    (_, index) =>
        createCatalogProduct({
            id: `headphone${index + 1}`,
            name: "Bose BT Earphones",
            shortDescription: "Table with air purifier, stained venner/black",
            imageSrc: "/pg/headphone1-.png",
            basePriceCents: toCents(28_300),
            category: HEADPHONES_CATEGORY,
            rating: 5,
            reviewCount: 120,
        }),
)

const RELATED_PRODUCT_SEEDS: readonly ProductSeed[] = [
    {
        id: "2",
        name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        shortDescription: "Wireless noise-cancelling over-ear headphones",
        imageSrc: "/pg/headphone1.jpg",
        basePriceCents: toCents(39_999),
        category: HEADPHONES_CATEGORY,
        rating: 4.9,
        reviewCount: 0,
    },
    {
        id: "3",
        name: "Bose QuietComfort Ultra Headphones",
        shortDescription: "Wireless over-ear headphones with active noise cancellation",
        imageSrc: "/pg/headphonegire.png",
        basePriceCents: toCents(42_900),
        category: HEADPHONES_CATEGORY,
        rating: 4.7,
        reviewCount: 0,
    },
    {
        id: "4",
        name: "Sennheiser Momentum 4 Wireless Headphones",
        shortDescription: "Wireless over-ear headphones for focused listening",
        imageSrc: "/itemHeadphone.jpg",
        basePriceCents: toCents(34_995),
        category: HEADPHONES_CATEGORY,
        rating: 4.6,
        reviewCount: 0,
    },
    {
        id: "5",
        name: "JBL Tour One M2 Over-Ear Headphones",
        shortDescription: "Wireless over-ear headphones with adaptive noise cancellation",
        imageSrc: "/pg/headphone1-.png",
        basePriceCents: toCents(29_995),
        category: HEADPHONES_CATEGORY,
        rating: 4.5,
        reviewCount: 0,
    },
]

const RECOMMENDED_PRODUCT_SEEDS: readonly ProductSeed[] = [
    {
        id: "101",
        name: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
        shortDescription: "Apple iPhone 15 Pro Max with 256GB storage",
        imageSrc: "/pg/headphone1.jpg",
        basePriceCents: toCents(129_900),
        category: ELECTRONICS_CATEGORY,
        rating: 4.9,
        reviewCount: 0,
    },
    {
        id: "102",
        name: "Apple Watch Series 9 GPS 45mm Aluminium Case",
        shortDescription: "Apple Watch Series 9 with a 45mm aluminium case",
        imageSrc: "/pg/headphonegire.png",
        basePriceCents: toCents(42_900),
        category: WEARABLES_CATEGORY,
        rating: 4.7,
        reviewCount: 0,
    },
    {
        id: "103",
        name: "iPad Air 11-inch M2 128GB Wi-Fi",
        shortDescription: "11-inch iPad Air with an M2 chip and 128GB storage",
        imageSrc: "/itemHeadphone.jpg",
        basePriceCents: toCents(59_900),
        category: TABLETS_CATEGORY,
        rating: 4.8,
        reviewCount: 0,
    },
    {
        id: "104",
        name: "MacBook Air 13-inch M3 8GB 256GB SSD",
        shortDescription: "13-inch MacBook Air with an M3 chip, 8GB RAM, and 256GB SSD",
        imageSrc: "/pg/headphone1-.png",
        basePriceCents: toCents(109_900),
        category: COMPUTERS_CATEGORY,
        rating: 4.9,
        reviewCount: 0,
    },
    {
        id: "105",
        name: "Sony WF-1000XM5 True Wireless Earbuds",
        shortDescription: "True wireless earbuds with industry-leading noise cancellation",
        imageSrc: "/pg/headphone1.jpg",
        basePriceCents: toCents(32_999),
        category: HEADPHONES_CATEGORY,
        rating: 4.6,
        reviewCount: 0,
    },
]

export const RELATED_PRODUCT_ENTITIES: readonly Product[] =
    RELATED_PRODUCT_SEEDS.map(createCatalogProduct)

export const RECOMMENDED_PRODUCT_ENTITIES: readonly Product[] =
    RECOMMENDED_PRODUCT_SEEDS.map(createCatalogProduct)

/** Complete canonical catalog assembled from every product mock in scope. */
export const PRODUCTS: readonly Product[] = [
    CURRENT_PRODUCT,
    ...RELATED_PRODUCT_ENTITIES,
    ...RECOMMENDED_PRODUCT_ENTITIES,
    ...FEED_PRODUCTS,
]

function toProductSummary(product: Product): ProductSummary {
    const primaryImage = product.images[0]

    if (!primaryImage) {
        throw new Error(`Product ${product.id} must have at least one image.`)
    }

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        primaryImageUrl: primaryImage.src,
        priceCents: product.basePriceCents,
        currency: product.currency,
        rating: product.rating,
        reviewCount: product.reviewCount,
    }
}

export const PRODUCT_SUMMARIES: readonly ProductSummary[] = PRODUCTS.map(toProductSummary)

/**
 * Temporary projections retained for ProductMiniCard until its UI contract is
 * migrated in the next approved step. `price` is already stored as Cents.
 */
function toProductCardProjection(product: Product) {
    const summary = toProductSummary(product)

    return {
        id: summary.id,
        name: summary.name,
        price: summary.priceCents,
        image: summary.primaryImageUrl,
        rating: summary.rating,
    }
}

export const RELATED_PRODUCTS = RELATED_PRODUCT_ENTITIES.map(toProductCardProjection)
export const RECOMMENDED_PRODUCTS = RECOMMENDED_PRODUCT_ENTITIES.map(
    toProductCardProjection,
)

/** Compatibility projections for productpage.tsx; no values are re-declared here. */
export const CURRENT_PRODUCT_ID = CURRENT_PRODUCT.id
export const PRODUCT_COLOR_OPTIONS = CURRENT_PRODUCT.colors
export const PRODUCT_DESCRIPTION = CURRENT_PRODUCT.description
export const PRODUCT_SPECS = [...CURRENT_PRODUCT.specifications]
export const PRODUCT_REVIEWS = [...CURRENT_PRODUCT.reviews]
export const PRODUCT_SERVICE_TAGS = [...CURRENT_PRODUCT.services]
export const CURRENT_PRODUCT_IMAGES = CURRENT_PRODUCT.images
export const CURRENT_PRODUCT_VARIANTS = CURRENT_PRODUCT.variants
export const CURRENT_PRODUCT_FINANCING_OPTIONS =
    CURRENT_PRODUCT.financingOptions ?? []