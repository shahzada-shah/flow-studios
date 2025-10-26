/**
 * WishlistContext
 *
 * Manages user's wishlist state and operations.
 * Stores products that users want to save for later.
 *
 * Features:
 * - Toggle products in/out of wishlist
 * - Remove products from wishlist
 * - Clear all wishlist items
 * - Check if product is in wishlist
 * - Get all wishlist products
 *
 * Note: Uses string product IDs matching the Product type from database
 *
 * @context
 * @example
 * ```tsx
 * const { isInWishlist, toggleWishlist } = useWishlist()
 * const inWishlist = isInWishlist(product.id)
 * ```
 */

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Product } from '../types/product'

interface WishlistContextType {
  wishlist: Set<string>
  products: Product[]
  toggleWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getWishlistProducts: () => Product[]
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [products, setProducts] = useState<Product[]>([])

  /**
   * Toggle a product in/out of wishlist
   * @param product - Product to add or remove
   */
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(product.id)) {
        newSet.delete(product.id)
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id))
      } else {
        newSet.add(product.id)
        setProducts((prevProducts) => [...prevProducts, product])
      }
      return newSet
    })
  }

  /**
   * Remove a product from wishlist
   * @param productId - String product ID
   */
  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newSet = new Set(prev)
      newSet.delete(productId)
      return newSet
    })
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId))
  }

  /**
   * Clear all items from wishlist
   */
  const clearWishlist = () => {
    setWishlist(new Set())
    setProducts([])
  }

  const isInWishlist = (productId: string) => wishlist.has(productId)

  const getWishlistProducts = () => products

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        products,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistProducts,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

/**
 * useWishlist Hook
 *
 * Custom hook to access wishlist context.
 * Must be used within a WishlistProvider.
 *
 * @throws Error if used outside WishlistProvider
 * @returns Wishlist context with products and operations
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
