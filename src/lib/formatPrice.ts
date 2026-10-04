import type { Cents, CurrencyCode } from "@/type/product"

/**
 * Format a monetary amount stored in the smallest currency unit for display.
 * The product domain keeps prices as cents; this adapter is the only place
 * that converts them to major units for the UI.
 */
export function formatPrice(
    cents: Cents | number,
    currency: CurrencyCode = "USD",
    locale = "en-US",
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(cents / 100)
}