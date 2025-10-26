export interface Category {
  id: string
  name: string
  slug: string
  description: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category_id: string | null
  color: string
  image_url: string
  sizes: string[]
  activities: string[]
  is_sustainable: boolean
  is_new: boolean
  in_stock: boolean
  created_at: string
  updated_at: string
}

export interface ProductFilters {
  categories: string[]
  sizes: string[]
  colors: string[]
  activities: string[]
  priceRange: [number, number] | null
  sustainable: boolean
  newArrivals: boolean
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular'
}
