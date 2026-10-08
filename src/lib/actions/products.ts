"use server";

/**
 * Product Server Actions (Step 2).
 *
 * Every function here runs on the server and talks to Supabase directly —
 * the UI never performs client-side fetching (no fetch()/SWR/react-query).
 *
 * Canonical money rule (enforced by `toCents`): every price is an integer
 * number of cents. USD 549.00 -> 54900. Major-unit -> cents conversion for
 * forms happens in the admin form; cents -> major-unit display happens only
 * in `formatPrice()`.
 *
 * Tables: `public.products`, `public.product_variants`
 * (see supabase/migrations/20261008000001_products_and_product_variants.sql)
 */

import { createClient } from "@/lib/supabase/server";
import type {
    Cents,
    CurrencyCode,
    Product,
    ProductCategory,
    ProductColorOption,
    ProductFinancingOption,
    ProductImage,
    ProductReview,
    ProductService,
    ProductSpecification,
    ProductStatus,
    ProductVariant,
} from "@/type/product";

// ---------------------------------------------------------------------------
// Input / result contracts
// ---------------------------------------------------------------------------

/** Variant payload accepted by `createProduct()`. All amounts are CENTS. */
export interface CreateProductVariantInput {
    sku?: string;
    name?: string;
    /** Integer cents (>= 0). */
    priceCents: number;
    compareAtPriceCents?: number;
    stockQuantity?: number;
    attributes?: Record<string, string>;
    image?: ProductImage;
    isDefault?: boolean;
}

/** Product payload accepted by `createProduct()`. All amounts are CENTS. */
export interface CreateProductInput {
    name: string;
    /** Optional; derived from `name` when omitted. */
    slug?: string;
    shortDescription?: string;
    description?: string;
    category?: ProductCategory;
    /** Integer cents (>= 0). */
    basePriceCents: number;
    compareAtPriceCents?: number;
    currency?: CurrencyCode;
    images?: ProductImage[];
    colors?: ProductColorOption[];
    specifications?: ProductSpecification[];
    reviews?: ProductReview[];
    services?: ProductService[];
    financingOptions?: ProductFinancingOption[];
    rating?: number;
    reviewCount?: number;
    stockQuantity?: number;
    status?: ProductStatus;
    isFeatured?: boolean;
    /** When omitted, a single default variant is created from the base price. */
    variants?: CreateProductVariantInput[];
}

export type CreateProductResult =
    | { ok: true; product: Product }
    | { ok: false; error: string };

// ---------------------------------------------------------------------------
// Row shapes (snake_case from PostgREST)
// ---------------------------------------------------------------------------

interface ProductVariantRow {
    id: string;
    product_id: string;
    sku: string;
    name: string;
    price_cents: number;
    compare_at_price_cents: number | null;
    stock_quantity: number;
    attributes: Record<string, string> | null;
    image: ProductImage | null;
    is_default: boolean;
}

interface ProductRow {
    id: string;
    slug: string;
    name: string;
    short_description: string;
    description: string;
    category: ProductCategory | null;
    base_price_cents: number;
    compare_at_price_cents: number | null;
    currency: string;
    images: ProductImage[] | null;
    colors: ProductColorOption[] | null;
    specifications: ProductSpecification[] | null;
    reviews: ProductReview[] | null;
    services: ProductService[] | null;
    financing_options: ProductFinancingOption[] | null;
    rating: number;
    review_count: number;
    stock_quantity: number;
    status: string;
    is_featured: boolean;
    product_variants?: ProductVariantRow[] | null;
}

const PRODUCT_SELECT = "*, product_variants(*)";
const CURRENCIES: readonly CurrencyCode[] = ["USD", "THB"];
const STATUSES: readonly ProductStatus[] = ["draft", "active", "archived"];
const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ---------------------------------------------------------------------------
// Cents helpers — single source of truth for the integer-cents rule
// ---------------------------------------------------------------------------

/** Strict guard used on the write path: rejects non-integers and negatives. */
function toCents(value: unknown, field: string): Cents {
    if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
        throw new Error(
            `${field} must be a non-negative integer number of cents (received: ${String(value)}). ` +
                "Convert major units with Math.round(major * 100) before calling createProduct().",
        );
    }
    return value as Cents;
}

/** Lenient cast used on the read path (columns are CHECK-constrained). */
function readCents(value: number | null | undefined, fallback = 0): Cents {
    if (value === null || value === undefined || !Number.isFinite(value)) {
        return fallback as Cents;
    }
    return Math.round(value) as Cents;
}

function toNonNegativeInt(value: unknown, field: string): number {
    if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
        throw new Error(
            `${field} must be a non-negative integer (received: ${String(value)}).`,
        );
    }
    return value;
}

function toSlug(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// Row -> domain mappers
// ---------------------------------------------------------------------------

function mapVariantRow(row: ProductVariantRow): ProductVariant {
    return {
        id: row.id,
        productId: row.product_id,
        sku: row.sku,
        name: row.name,
        priceCents: readCents(row.price_cents),
        compareAtPriceCents:
            row.compare_at_price_cents === null
                ? undefined
                : readCents(row.compare_at_price_cents),
        stockQuantity: Number(row.stock_quantity ?? 0),
        attributes: row.attributes ?? {},
        image: row.image ?? undefined,
        isDefault: row.is_default,
    };
}

function mapProductRow(row: ProductRow): Product {
    return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        shortDescription: row.short_description ?? "",
        description: row.description ?? "",
        category: row.category ?? { id: row.slug, name: row.name, slug: row.slug },
        basePriceCents: readCents(row.base_price_cents),
        compareAtPriceCents:
            row.compare_at_price_cents === null
                ? undefined
                : readCents(row.compare_at_price_cents),
        currency: (row.currency as CurrencyCode) ?? "USD",
        images: row.images ?? [],
        colors: row.colors ?? [],
        variants: (row.product_variants ?? []).map(mapVariantRow),
        specifications: row.specifications ?? [],
        reviews: row.reviews ?? [],
        services: row.services ?? [],
        financingOptions: row.financing_options ?? undefined,
        rating: Number(row.rating ?? 0),
        reviewCount: Number(row.review_count ?? 0),
        stockQuantity: Number(row.stock_quantity ?? 0),
        status: (row.status as ProductStatus) ?? "draft",
        isFeatured: Boolean(row.is_featured),
    };
}

// ---------------------------------------------------------------------------
// getProducts() — Feed (src/app/page.tsx -> Feedpage)
// ---------------------------------------------------------------------------

/**
 * Query every product (with its variants) for the home Feed.
 *
 * Runs entirely on the server; callers must not fetch this data client-side.
 * On a Supabase error (missing env, table not migrated, RLS) the error is
 * logged and an empty list is returned so the storefront still renders.
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("products")
            .select(PRODUCT_SELECT)
            .order("created_at", { ascending: false });

        if (error) {
            console.error(
                `[getProducts] Supabase query failed: ${error.message}. ` +
                    "Did you run supabase/migrations/20261008000001_products_and_product_variants.sql?",
            );
            return [];
        }

        return (data ?? []).map((row) => mapProductRow(row as ProductRow));
    } catch (error) {
        // Let Next.js propagate its internal signal so the route stays dynamic
        // (cookies() from the Supabase client) instead of being frozen at build.
        if (isDynamicServerError(error)) throw error;
        console.error(
            "[getProducts] Unexpected error:",
            error instanceof Error ? error.message : error,
        );
        return [];
    }
}

// ---------------------------------------------------------------------------
// getProductByIdOrSlug() — Product Detail (src/app/products/[id]/page.tsx)
// ---------------------------------------------------------------------------

/**
 * Query a single product by its id (uuid) or slug, including its variants.
 * Returns `null` when nothing matches so callers can `notFound()`.
 */
export async function getProductByIdOrSlug(id: string): Promise<Product | null> {
    const identifier = (id ?? "").trim();
    if (!identifier) return null;

    try {
        const supabase = await createClient();

        // 1) id lookup — only valid for uuid-shaped ids (the id column is uuid).
        if (UUID_PATTERN.test(identifier)) {
            const { data, error } = await supabase
                .from("products")
                .select(PRODUCT_SELECT)
                .eq("id", identifier)
                .maybeSingle();

            if (error) {
                console.error(`[getProductByIdOrSlug] id lookup failed: ${error.message}`);
            } else if (data) {
                return mapProductRow(data as ProductRow);
            }
        }

        // 2) slug lookup (works for any identifier).
        const { data, error } = await supabase
            .from("products")
            .select(PRODUCT_SELECT)
            .eq("slug", identifier)
            .maybeSingle();

        if (error) {
            console.error(`[getProductByIdOrSlug] slug lookup failed: ${error.message}`);
            return null;
        }

        return data ? mapProductRow(data as ProductRow) : null;
    } catch (error) {
        // See getProducts(): rethrow Next's dynamic-rendering signal.
        if (isDynamicServerError(error)) throw error;
        console.error(
            "[getProductByIdOrSlug] Unexpected error:",
            error instanceof Error ? error.message : error,
        );
        return null;
    }
}

// ---------------------------------------------------------------------------
// createProduct() — Admin form (src/app/admin/products/new)
// ---------------------------------------------------------------------------

function isDynamicServerError(error: unknown): boolean {
    return (
        error instanceof Error &&
        (error.message.includes("Dynamic server usage") ||
            error.message.includes("NEXT_DYNAMIC_SERVER_USAGE"))
    );
}

function humanizeWriteError(message: string, code?: string): string {
    if (code === "23505" || /duplicate key|unique constraint/i.test(message)) {
        if (/sku/i.test(message)) return "A variant with this SKU already exists for the product.";
        return "A product with this slug already exists. Change the product name or slug.";
    }
    if (/permission denied|row-level security/i.test(message)) {
        return "Supabase rejected the write (RLS). Check the insert policies in the migration.";
    }
    if (/relation .* does not exist/i.test(message)) {
        return "Table not found. Run supabase/migrations/20261008000001_products_and_product_variants.sql first.";
    }
    return message;
}

/**
 * Persist a product from the admin form into `products` + `product_variants`.
 *
 * Money rule: every price passed in MUST already be an integer number of cents
 * (`toCents` rejects anything else), so no rounding can happen mid-flow. The
 * insert order is product first, then its variants; if the variant insert
 * fails the product row is deleted again (compensating rollback) so the two
 * tables never drift apart.
 *
 * @returns `{ ok: true, product }` on success, `{ ok: false, error }` otherwise.
 */
export async function createProduct(data: CreateProductInput): Promise<CreateProductResult> {
    try {
        const name = (data.name ?? "").trim();
        if (!name) return { ok: false, error: "Product name is required." };

        const currency = data.currency ?? "USD";
        if (!CURRENCIES.includes(currency)) {
            return { ok: false, error: `Unsupported currency: ${currency}.` };
        }

        const status = data.status ?? "draft";
        if (!STATUSES.includes(status)) {
            return { ok: false, error: `Unsupported status: ${status}.` };
        }

        // Integer-cents guards (throw -> caught below and returned as { ok: false }).
        const basePriceCents = toCents(data.basePriceCents, "basePriceCents");
        const compareAtPriceCents =
            data.compareAtPriceCents == null || data.compareAtPriceCents === undefined
                ? null
                : toCents(data.compareAtPriceCents, "compareAtPriceCents");
        const stockQuantity =
            data.stockQuantity == null
                ? 0
                : toNonNegativeInt(data.stockQuantity, "stockQuantity");

        const slug = toSlug(data.slug?.trim() ? data.slug : name);
        if (!slug) {
            return { ok: false, error: "Could not derive a slug from the product name." };
        }

        const rating = data.rating ?? 0;
        if (typeof rating !== "number" || rating < 0 || rating > 5) {
            return { ok: false, error: "rating must be between 0 and 5." };
        }

        const category: ProductCategory =
            data.category ?? { id: slug, name, slug };

        // --- Normalize variant rows -------------------------------------
        const providedVariants = (data.variants ?? []).filter(
            (v) => (v.sku ?? "").trim() || (v.name ?? "").trim(),
        );

        interface VariantInsertRow {
            sku: string;
            name: string;
            price_cents: number;
            compare_at_price_cents: number | null;
            stock_quantity: number;
            attributes: Record<string, string>;
            image: ProductImage | null;
            is_default: boolean;
        }

        const variantRows: VariantInsertRow[] = providedVariants.map((v, index) => ({
            sku: (v.sku ?? "").trim() || `${slug.toUpperCase()}-V${index + 1}`,
            name: (v.name ?? "").trim() || `Variant ${index + 1}`,
            price_cents: toCents(v.priceCents, `variants[${index}].priceCents`),
            compare_at_price_cents:
                v.compareAtPriceCents == null || v.compareAtPriceCents === undefined
                    ? null
                    : toCents(v.compareAtPriceCents, `variants[${index}].compareAtPriceCents`),
            stock_quantity:
                v.stockQuantity == null
                    ? 0
                    : toNonNegativeInt(v.stockQuantity, `variants[${index}].stockQuantity`),
            attributes: v.attributes ?? {},
            image: v.image ?? null,
            is_default: Boolean(v.isDefault),
        }));

        if (variantRows.length === 0) {
            // A product always has at least one sellable variant.
            variantRows.push({
                sku: `${slug.toUpperCase()}-DEFAULT`,
                name: "Default",
                price_cents: basePriceCents,
                compare_at_price_cents: compareAtPriceCents,
                stock_quantity: stockQuantity,
                attributes: {},
                image: null,
                is_default: true,
            });
        } else if (!variantRows.some((row) => row.is_default)) {
            variantRows[0].is_default = true;
        }

        const supabase = await createClient();

        // 1) Insert the product row.
        const { data: inserted, error: productError } = await supabase
            .from("products")
            .insert({
                slug,
                name,
                short_description: (data.shortDescription ?? "").trim(),
                description: (data.description ?? "").trim(),
                category,
                base_price_cents: basePriceCents,
                compare_at_price_cents: compareAtPriceCents,
                currency,
                images: data.images ?? [],
                colors: data.colors ?? [],
                specifications: data.specifications ?? [],
                reviews: data.reviews ?? [],
                services: data.services ?? [],
                financing_options: data.financingOptions ?? null,
                rating,
                review_count: data.reviewCount ?? 0,
                stock_quantity: stockQuantity,
                status,
                is_featured: data.isFeatured ?? false,
            })
            .select("id")
            .single();

        if (productError || !inserted) {
            return {
                ok: false,
                error: humanizeWriteError(
                    productError?.message ?? "Product insert returned no row.",
                    productError?.code,
                ),
            };
        }

        const productId = inserted.id as string;

        // 2) Insert its variants; compensate by deleting the product on failure.
        const { error: variantError } = await supabase.from("product_variants").insert(
            variantRows.map((row) => ({ ...row, product_id: productId })),
        );

        if (variantError) {
            await supabase.from("products").delete().eq("id", productId);
            return {
                ok: false,
                error: humanizeWriteError(variantError.message, variantError.code),
            };
        }

        // 3) Read the saved entity back so the caller gets the canonical shape.
        const product = await getProductByIdOrSlug(productId);
        if (!product) {
            return {
                ok: false,
                error: "Product was saved but could not be read back. Check the products table.",
            };
        }

        return { ok: true, product };
    } catch (error) {
        return {
            ok: false,
            error: error instanceof Error ? error.message : "Failed to create product.",
        };
    }
}
