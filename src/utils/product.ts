/**
 * Product Utilities
 *
 * Helper functions for working with product data.
 * These utilities handle product-related operations like filtering,
 * stock checking, and data transformation.
 */

import { Product } from '../types/product'

/**
 * Convert Product string ID to number for context compatibility
 *
 * Some contexts (Cart, Wishlist) use numeric IDs while the database
 * uses string UUIDs. This function handles the conversion.
 *
 * @param productId - Product ID string
 * @returns Numeric ID
 *
 * @example
 * getProductIdNumber("123") // 123
 */
export const getProductIdNumber = (productId: string): number => {
  return parseInt(productId, 10)
}

/**
 * Check if a product is in stock
 *
 * Simple utility to check product availability.
 *
 * @param product - Product to check
 * @returns True if product has stock
 *
 * @example
 * isProductInStock(product) // true or false
 */
export const isProductInStock = (product: Product): boolean => {
  return product.in_stock
}

/**
 * Get available sizes for a product
 *
 * Returns the array of available sizes, or empty array if none exist.
 *
 * @param product - Product to get sizes from
 * @returns Array of available sizes
 *
 * @example
 * getAvailableSizes(product) // ["S", "M", "L"]
 */
export const getAvailableSizes = (product: Product): string[] => {
  return product.sizes || []
}

/**
 * Filter products by search query
 *
 * Searches product name, description, and color fields.
 * Case-insensitive matching.
 *
 * @param products - Array of products to filter
 * @param query - Search query string
 * @returns Filtered products matching the query
 *
 * @example
 * filterProductsByQuery(products, "yoga") // Returns all products with "yoga" in name/description/color
 */
export const filterProductsByQuery = (products: Product[], query: string): Product[] => {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.color.toLowerCase().includes(lowerQuery)
  )
}
