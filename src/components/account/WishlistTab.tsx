/**
 * WishlistTab Component
 *
 * Displays the user's wishlist or an empty state if no items are saved.
 * Provides a clear call-to-action to continue shopping.
 *
 * @component
 * @example
 * ```tsx
 * <WishlistTab items={wishlistItems} />
 * ```
 */

import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

interface WishlistTabProps {
  items?: unknown[]
}

export const WishlistTab = ({ items = [] }: WishlistTabProps) => {
  return (
    <div>
      <h1 className="text-3xl tracking-wide mb-8">WISHLIST</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="
            w-20 h-20 bg-gray-100 rounded-full
            flex items-center justify-center mb-4
            group-hover:bg-gray-200 transition-colors duration-300
          "
        >
          <Heart className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-sm text-gray-500 mb-6">
          Start adding items to your wishlist to see them here
        </p>
        <Link
          to="/shop"
          className="
            bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-wider
            hover:bg-gray-800 hover:shadow-lg
            transition-all duration-200
            transform hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
          "
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  )
}
