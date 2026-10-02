import clsx from "clsx"

/** A product upgrade or add-on that can change the checkout total. */
export interface VariantOption {
    /** Stable identifier used by the checkout state. */
    id: string
    /** Text displayed on the option chip. */
    label: string
    /** Optional supporting copy shown below the label. */
    description?: string
    /** Amount added to (or removed from) the product base price. */
    priceDelta: number
}

type Props = {
    /** Options supplied by the checkout page or, later, by the cart API. */
    options: readonly VariantOption[]
    /** Id of the currently selected option. */
    selectedId: string
    /** Called when the customer chooses another option. */
    onSelect: (id: string) => void
    /** Extra classes for the option group. */
    className?: string
    /** Name shared by the native radio inputs in this group. */
    name?: string
}

/** Format a price adjustment in a consistent, readable way. */
export function formatPriceDelta(delta: number): string {
    if (delta === 0) return "Included"

    const sign = delta > 0 ? "+" : "-"
    return `${sign}$${Math.abs(delta).toFixed(2)}`
}

/**
 * Single-select product options for checkout.
 *
 * The state intentionally lives in the checkout page. This component only
 * renders the current selection and reports changes upward, so the order
 * summary can derive its total from the same source of truth.
 */
export default function VariantOptions({
    options,
    selectedId,
    onSelect,
    className,
    name = "checkout-product-options",
}: Props) {
    if (options.length === 0) return null

    return (
        <fieldset className={clsx("min-w-0", className)}>
            <legend className="sr-only">Product options</legend>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
                {options.map((option) => {
                    const isActive = option.id === selectedId

                    return (
                        <label
                            key={option.id}
                            className={clsx(
                                "flex min-w-0 cursor-pointer flex-col items-start gap-1 rounded-md border px-3.5 py-2.5 text-left transition-all duration-200",
                                isActive
                                    ? "border-[#0f3612] bg-[#0f3612] text-zinc-50 shadow-sm"
                                    : "border-black/12 bg-zinc-50 text-zinc-700 hover:border-[#0f3612a4] hover:text-[#0f3612]"
                            )}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={option.id}
                                checked={isActive}
                                onChange={() => onSelect(option.id)}
                                className="sr-only"
                            />
                            <span className="text-[13px] font-semibold leading-tight sm:text-sm">
                                {option.label}
                            </span>
                            <span
                                className={clsx(
                                    "text-[11px] font-medium leading-relaxed sm:text-xs",
                                    isActive ? "text-zinc-100/80" : "text-black/45"
                                )}
                            >
                                {option.description ? `${option.description} · ` : ""}
                                {formatPriceDelta(option.priceDelta)}
                            </span>
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )
}