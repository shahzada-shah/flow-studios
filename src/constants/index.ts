/**
 * Application Constants
 *
 * Centralized configuration and constant values used throughout the application.
 * These constants ensure consistency and make it easy to update values in one place.
 */

/**
 * Available product sizes
 * Used in product filtering and selection
 */
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

/**
 * Activity categories for products
 * Used to categorize and filter products by intended activity
 */
export const ACTIVITIES = [
  'Yoga',
  'Running',
  'Training',
  'Cycling',
  'Swimming',
  'Hiking',
  'Dance',
  'Tennis',
  'Golf',
] as const

/**
 * Product sorting options
 * Defines available sorting methods for product catalog
 */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
] as const

/**
 * Toast notification duration in milliseconds
 * Controls how long toast messages are visible
 */
export const TOAST_DURATION = 3000

/**
 * Price range filters
 * Used in product catalog for price-based filtering
 */
export const PRICE_RANGES = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 150, label: '$100 - $150' },
  { min: 150, max: Infinity, label: 'Over $150' },
] as const

/**
 * Application route paths
 * Centralized route definitions for navigation
 */
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:slug',
  ACCOUNT: '/account',
  CHECKOUT: '/checkout',
} as const

/**
 * LocalStorage keys
 * Used to persist data in browser storage
 */
export const STORAGE_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  USER_PREFERENCES: 'userPreferences',
} as const
