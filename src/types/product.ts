/**
 * Product-related type definitions
 *
 * These types define the structure of product data from the database
 * and related filtering/categorization functionality.
 */

/**
 * Product Category
 * Represents a product category from the database
 */
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  created_at: string
}

/**
 * Product
 * Represents a product from the database with all its properties
 *
 * Database Table: products
 * Related Tables: categories (via category_id)
 */
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category_id: string | null
  color: string
  image_url: string | null
  sizes: string[] // Array of available sizes (XS, S, M, L, XL, XXL)
  activities: string[] // Activities this product is suitable for
  is_sustainable: boolean // Whether product is made with sustainable materials
  is_new: boolean // New arrival flag
  in_stock: boolean // Inventory availability
  is_bestseller?: boolean // Bestseller flag (optional)
  created_at: string
  updated_at: string
}

/**
 * Product Filters
 * Defines all available filter options for the product catalog
 * Used to filter and sort products based on user preferences
 */
export interface ProductFilters {
  categories: string[] // Filter by category slugs
  sizes: string[] // Filter by available sizes
  colors: string[] // Filter by product colors
  activities: string[] // Filter by suitable activities
  priceRange: [number, number] | null // Min and max price range
  sustainable: boolean // Show only sustainable products
  newArrivals: boolean // Show only new arrivals
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular' // Sort order
}
