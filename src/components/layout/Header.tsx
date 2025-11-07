/**
 * Header Component
 *
 * Main navigation header for the application.
 * Provides access to all major features and pages.
 *
 * Structure:
 * - Logo (left)
 * - Navigation menu (center) - desktop only
 * - Action icons (right): search, wishlist, cart, account
 * - Mobile menu button (hamburger) - mobile only
 *
 * Features:
 * - Responsive design (desktop/mobile layouts)
 * - Dropdown menus on desktop
 * - Slide-out mobile menu
 * - Search modal
 * - Cart panel
 * - Wishlist panel
 * - Badge counts for cart and wishlist
 * - Hover states and smooth transitions
 *
 * Desktop Navigation:
 * - NEW: New arrivals and bestsellers
 * - LEGGINGS: All leggings styles
 * - TOPS: All top styles
 * - SPORTS BRAS: All sports bra styles
 * - ACCESSORIES: All accessories
 * - SALE: Discounted items
 *
 * User Actions:
 * - Search: Opens search modal
 * - Heart: Opens wishlist panel
 * - Bag: Opens cart panel
 * - User: Goes to account/auth page
 *
 * @component
 */

import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToggle } from '../../hooks/useToggle'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { NavigationDropdown } from '../ui/NavigationDropdown'
import { SearchModal } from '../ui/SearchModal'
import { CartPanel } from '../ui/CartPanel'
import { WishlistPanel } from '../ui/WishlistPanel'
import { MobileMenu } from '../ui/MobileMenu'
import type { NavItem } from '../../types'
const Header = () => {
  const [isSearchOpen, , openSearch, closeSearch] = useToggle(false)
  const [isCartOpen, , openCart, closeCart] = useToggle(false)
  const [isWishlistOpen, , openWishlist, closeWishlist] = useToggle(false)
  const [isMobileMenuOpen, , openMobileMenu, closeMobileMenu] = useToggle(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { wishlist } = useWishlist()
  const { cartCount } = useCart()

  const navigation: NavItem[] = [
    {
      label: 'NEW',
      href: '/shop?new=true',
      submenu: [
        { label: 'New Arrivals', href: '/shop?new=true', description: 'Just landed' },
        { label: 'Bestsellers', href: '/shop?sort=popular', description: 'Customer favorites' },
        { label: 'All Products', href: '/shop', description: 'Browse everything' },
      ],
    },
    {
      label: 'LEGGINGS',
      href: '/shop/leggings',
      submenu: [
        { label: 'All Leggings', href: '/shop/leggings', description: 'Browse all styles' },
        { label: 'High-Waisted', href: '/shop/leggings?style=high-waisted', description: 'Flattering fit & support' },
        { label: 'Compression', href: '/shop/leggings?style=compression', description: 'Performance support' },
        { label: 'Seamless', href: '/shop/leggings?style=seamless', description: 'Second-skin comfort' },
      ],
    },
    {
      label: 'TOPS',
      href: '/shop/tops',
      submenu: [
        { label: 'All Tops', href: '/shop/tops', description: 'Browse all styles' },
        { label: 'Sports Bras', href: '/shop/sports-bras', description: 'Light to high support' },
        { label: 'Tank Tops', href: '/shop/tops?style=tank', description: 'Breathable essentials' },
        { label: 'Long Sleeve', href: '/shop/tops?style=long-sleeve', description: 'Layering pieces' },
      ],
    },
    {
      label: 'ACCESSORIES',
      href: '/shop/accessories',
      submenu: [
        { label: 'All Accessories', href: '/shop/accessories', description: 'Browse all' },
        { label: 'Yoga Mats', href: '/shop/accessories?type=mats', description: 'Premium quality' },
        { label: 'Bags', href: '/shop/accessories?type=bags', description: 'Gym & travel' },
        { label: 'Water Bottles', href: '/shop/accessories?type=bottles', description: 'Stay hydrated' },
      ],
    },
  ]

  return (
    <>
      <div className="sticky top-0 z-40">
        <div className="bg-[#f0efe9] text-gray-900">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 text-[0.7rem] md:text-xs tracking-[0.28em] uppercase">
              <span className="font-medium">Complimentary Shipping</span>
              <span className="hidden md:inline text-gray-500">•</span>
              <span className="tracking-[0.2em] text-gray-600">Enjoy delivery on all Flow Studios orders over $150</span>
            </div>
          </div>
        </div>

        <header className="bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={openMobileMenu}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex items-center gap-12">
              {navigation.map((item, index) => (
                <NavigationDropdown
                  key={index}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onToggle={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  onClose={() => setOpenDropdown(null)}
                />
              ))}
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="block text-center group">
                <h1 className="text-4xl font-serif tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                  FLOW
                </h1>
                <p className="text-xs tracking-widest text-gray-600 mt-1 transition-colors duration-300 group-hover:text-gray-500">STUDIO</p>
              </Link>
            </div>

            <nav className="flex items-center gap-6 lg:gap-8">
              <button
                onClick={openSearch}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide group"
                aria-label="Search"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">SEARCH</span>
              </button>

              <Link
                to="/account"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide group"
                aria-label="Account"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">ACCOUNT</span>
              </Link>

              <button
                onClick={openWishlist}
                className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide group relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">WISHLIST</span>
                {wishlist.size > 0 && (
                  <span className="absolute -top-1 -right-1 lg:relative lg:top-0 lg:right-0 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-scaleIn">
                    {wishlist.size}
                  </span>
                )}
              </button>

              <button
                onClick={openCart}
                className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide group relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">BAG ({cartCount})</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 lg:relative lg:top-0 lg:right-0 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-scaleIn lg:hidden">
                    {cartCount}
                  </span>
                )}
              </button>
            </nav>
            </div>
          </div>
        </header>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      <CartPanel isOpen={isCartOpen} onClose={closeCart} />
      <WishlistPanel isOpen={isWishlistOpen} onClose={closeWishlist} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} navigation={navigation} />
    </>
  )
}

export default Header
