/**
 * CartContext
 *
 * Manages shopping cart state and operations.
 * Handles adding, removing, and updating product quantities in cart.
 *
 * Features:
 * - Add products to cart with size selection
 * - Remove products from cart
 * - Update product quantities
 * - Clear entire cart
 * - Calculate cart total and item count
 * - Fetches product data from Supabase
 *
 * @context
 * @example
 * ```tsx
 * const { cartItems, addToCart, cartTotal } = useCart()
 * ```
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Product } from '../types/product'

interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (productOrId: Product | string, size: string, quantity?: number) => Promise<void>
  removeFromCart: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  /**
   * Add a product to the cart
   * @param productOrId - Product object or Product ID to add
   * @param size - Selected size
   * @param quantity - Number of items to add (default: 1)
   */
  const addToCart = async (productOrId: Product | string, size: string, quantity: number = 1) => {
    try {
      let product: Product | null = null

      if (typeof productOrId === 'string') {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productOrId)
          .maybeSingle()

        if (error) throw error
        product = data
      } else {
        product = productOrId
      }

      if (!product) return

      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) => item.product.id === product!.id && item.size === size
        )

        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product!.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }

        return [...prev, { product: product!, quantity, size }]
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  /**
   * Remove a product from the cart
   * @param productId - Product ID to remove
   * @param size - Size of the item to remove
   */
  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    )
  }

  /**
   * Update quantity of a cart item
   * @param productId - Product ID
   * @param size - Item size
   * @param quantity - New quantity (removes if <= 0)
   */
  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/**
 * useCart Hook
 *
 * Custom hook to access cart context.
 * Must be used within a CartProvider.
 *
 * @throws Error if used outside CartProvider
 * @returns Cart context with items and cart operations
 */
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
