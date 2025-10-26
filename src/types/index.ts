/**
 * Core type definitions for the application
 */

export interface NavItem {
  label: string
  href: string
  submenu?: SubmenuItem[]
}

export interface SubmenuItem {
  label: string
  href: string
  description?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}
