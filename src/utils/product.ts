import { Product } from '../types/product'

/**
 * Convert Product string ID to number for context compatibility
 * @param productId - Product ID string
 * @returns Numeric ID
 */
export const getProductIdNumber = (productId: string): number => {
  return parseInt(productId, 10)
}

/**
 * Check if a product is in stock
 * @param product - Product to check
 * @returns True if product has stock
 */
export const isProductInStock = (product: Product): boolean => {
  return product.in_stock
}

/**
 * Get available sizes for a product
 * @param product - Product to get sizes from
 * @returns Array of available sizes
 */
export const getAvailableSizes = (product: Product): string[] => {
  return product.sizes || []
}

/**
 * Filter products by search query
 * @param products - Array of products to filter
 * @param query - Search query string
 * @returns Filtered products
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
