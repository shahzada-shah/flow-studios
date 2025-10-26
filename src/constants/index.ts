export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

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

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
] as const

export const TOAST_DURATION = 3000

export const PRICE_RANGES = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 150, label: '$100 - $150' },
  { min: 150, max: Infinity, label: 'Over $150' },
] as const

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:slug',
  ACCOUNT: '/account',
  CHECKOUT: '/checkout',
} as const

export const STORAGE_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  USER_PREFERENCES: 'userPreferences',
} as const
