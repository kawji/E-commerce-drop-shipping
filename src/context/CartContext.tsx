'use client'

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
    type ReactNode,
} from 'react'
import { PRODUCTS } from '@/data/productMockData'
import type {
    Cart,
    CartLineItem,
    CartQuantity,
    Cents,
    ProductVariant,
} from '@/type/product'

/**
 * The cart is intentionally kept in a client-side React context. This keeps the
 * store shared between the feed, product detail, and checkout routes while the
 * catalog remains the source of truth for product and variant lookups.
 */
type CartState = {
    lineItems: readonly CartLineItem[]
    updatedAt: string
}

type CartAction =
    | {
          type: 'add'
          productId: string
          variant: ProductVariant
          quantity: number
          updatedAt: string
      }
    | {
          type: 'remove'
          productId: string
          variantId: string
          updatedAt: string
      }
    | {
          type: 'updateQuantity'
          productId: string
          variantId: string
          quantity: number
          variant: ProductVariant
          updatedAt: string
      }
    | { type: 'clear'; updatedAt: string }

export type CartContextValue = {
    cart: Cart
    /** Aliases kept intentionally explicit for consumers that think in terms of items. */
    lineItems: readonly CartLineItem[]
    items: readonly CartLineItem[]
    subtotalCents: Cents
    totalCents: Cents
    itemCount: number
    addToCart: (productId: string, variantId: string, quantity?: number) => void
    removeFromCart: (productId: string, variantId: string) => void
    updateQuantity: (
        productId: string,
        variantId: string,
        quantity: number,
    ) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const INITIAL_UPDATED_AT = new Date(0).toISOString()

const INITIAL_STATE: CartState = {
    lineItems: [],
    updatedAt: INITIAL_UPDATED_AT,
}

function toCents(value: number): Cents {
    if (!Number.isSafeInteger(value) || value < 0) {
        throw new Error(`Invalid cents value: ${value}`)
    }

    return value as Cents
}

function toCartQuantity(value: number): CartQuantity {
    if (!Number.isSafeInteger(value) || value < 1) {
        throw new Error(`Invalid cart quantity: ${value}`)
    }

    return value as CartQuantity
}

function getVariant(
    productId: string,
    variantId: string,
): ProductVariant | undefined {
    const product = PRODUCTS.find((candidate) => candidate.id === productId)

    return product?.variants.find((variant) => variant.id === variantId)
}

function createLineItem(
    productId: string,
    variant: ProductVariant,
    quantity: number,
): CartLineItem {
    const safeQuantity = toCartQuantity(quantity)
    const unitPriceCents = variant.priceCents

    return {
        productId,
        variantId: variant.id,
        sku: variant.sku,
        quantity: safeQuantity,
        unitPriceCents,
        lineTotalCents: toCents(unitPriceCents * safeQuantity),
        currency: PRODUCTS.find((product) => product.id === productId)?.currency ?? 'USD',
    }
}

function calculateCart(state: CartState): Cart {
    const subtotal = state.lineItems.reduce(
        (sum, lineItem) => sum + lineItem.lineTotalCents,
        0,
    )
    const currency = state.lineItems[0]?.currency ?? 'USD'

    // Discounts, shipping, and tax are reserved for the checkout API. For the
    // current cart milestone they are explicitly zero, while Total remains
    // derived from the same cent-based line-item snapshot.
    const discountCents = 0
    const shippingCents = 0
    const taxCents = 0
    const total = subtotal - discountCents + shippingCents + taxCents

    return {
        id: 'cart',
        currency,
        lineItems: state.lineItems,
        subtotalCents: toCents(subtotal),
        discountCents: toCents(discountCents),
        shippingCents: toCents(shippingCents),
        taxCents: toCents(taxCents),
        grandTotalCents: toCents(total),
        updatedAt: state.updatedAt,
    }
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'add': {
            if (action.quantity < 1 || action.variant.stockQuantity < 1) {
                return state
            }

            const existingLineIndex = state.lineItems.findIndex(
                (lineItem) =>
                    lineItem.productId === action.productId &&
                    lineItem.variantId === action.variant.id,
            )
            const existingLine = state.lineItems[existingLineIndex]

            if (!existingLine) {
                return {
                    lineItems: [
                        ...state.lineItems,
                        createLineItem(
                            action.productId,
                            action.variant,
                            Math.min(action.quantity, action.variant.stockQuantity),
                        ),
                    ],
                    updatedAt: action.updatedAt,
                }
            }

            const nextQuantity = Math.min(
                existingLine.quantity + action.quantity,
                action.variant.stockQuantity,
            )
            const nextLineItems = [...state.lineItems]
            nextLineItems[existingLineIndex] = createLineItem(
                action.productId,
                action.variant,
                nextQuantity,
            )

            return {
                lineItems: nextLineItems,
                updatedAt: action.updatedAt,
            }
        }

        case 'updateQuantity': {
            const lineIndex = state.lineItems.findIndex(
                (lineItem) =>
                    lineItem.productId === action.productId &&
                    lineItem.variantId === action.variantId,
            )

            if (lineIndex < 0) {
                return state
            }

            if (action.quantity < 1) {
                return {
                    lineItems: state.lineItems.filter((_, index) => index !== lineIndex),
                    updatedAt: action.updatedAt,
                }
            }

            const nextLineItems = [...state.lineItems]
            nextLineItems[lineIndex] = createLineItem(
                action.productId,
                action.variant,
                Math.min(action.quantity, action.variant.stockQuantity),
            )

            return {
                lineItems: nextLineItems,
                updatedAt: action.updatedAt,
            }
        }

        case 'remove':
            return {
                lineItems: state.lineItems.filter(
                    (lineItem) =>
                        !(
                            lineItem.productId === action.productId &&
                            lineItem.variantId === action.variantId
                        ),
                ),
                updatedAt: action.updatedAt,
            }

        case 'clear':
            return {
                lineItems: [],
                updatedAt: action.updatedAt,
            }
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const addToCart = useCallback(
        (productId: string, variantId: string, quantity = 1) => {
            const variant = getVariant(productId, variantId)

            if (!variant || !Number.isSafeInteger(quantity) || quantity < 1) {
                return
            }

            dispatch({
                type: 'add',
                productId,
                variant,
                quantity,
                updatedAt: new Date().toISOString(),
            })
        },
        [],
    )

    const removeFromCart = useCallback((productId: string, variantId: string) => {
        dispatch({
            type: 'remove',
            productId,
            variantId,
            updatedAt: new Date().toISOString(),
        })
    }, [])

    const updateQuantity = useCallback(
        (productId: string, variantId: string, quantity: number) => {
            const variant = getVariant(productId, variantId)

            if (!variant || !Number.isSafeInteger(quantity)) {
                return
            }

            dispatch({
                type: 'updateQuantity',
                productId,
                variantId,
                quantity,
                variant,
                updatedAt: new Date().toISOString(),
            })
        },
        [],
    )

    const clearCart = useCallback(() => {
        dispatch({ type: 'clear', updatedAt: new Date().toISOString() })
    }, [])

    const cart = useMemo(() => calculateCart(state), [state])
    const value = useMemo<CartContextValue>(
        () => ({
            cart,
            lineItems: cart.lineItems,
            items: cart.lineItems,
            subtotalCents: cart.subtotalCents,
            totalCents: cart.grandTotalCents,
            itemCount: cart.lineItems.reduce(
                (count, lineItem) => count + lineItem.quantity,
                0,
            ),
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }),
        [
            addToCart,
            cart,
            clearCart,
            removeFromCart,
            updateQuantity,
        ],
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used inside a CartProvider')
    }

    return context
}
