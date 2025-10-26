/**
 * WishlistContext
 *
 * Manages user's wishlist state and operations.
 * Stores products that users want to save for later.
 *
 * Features:
 * - Toggle products in/out of wishlist
 * - Remove products from wishlist
 * - Check if product is in wishlist
 * - Get all wishlist products
 *
 * Note: Uses numeric product IDs. Convert string IDs before use.
 *
 * @context
 * @example
 * ```tsx
 * const { isInWishlist, toggleWishlist } = useWishlist()
 * const productId = parseInt(product.id)
 * const inWishlist = isInWishlist(productId)
 * ```
 */

import { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  id: number
  name: string
  color: string
  price: number
  image: string
}

interface WishlistContextType {
  wishlist: Set<number>
  products: Product[]
  toggleWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  clearWishlist: () => void
  isInWishlist: (productId: number) => boolean
  getWishlistProducts: () => Product[]
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())
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
   * @param productId - Numeric product ID
   */
  const removeFromWishlist = (productId: number) => {
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

  const isInWishlist = (productId: number) => wishlist.has(productId)

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
