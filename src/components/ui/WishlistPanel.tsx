import { Heart, X, ImageIcon } from 'lucide-react'
import { SlideOutPanel } from './SlideOutPanel'
import { useWishlist } from '../../context/WishlistContext'

interface WishlistPanelProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Wishlist panel component
 * Extends SlideOutPanel to display saved/favorited items
 *
 * Features:
 * - Grid display of wishlist items
 * - Remove from wishlist functionality
 * - Empty state with call-to-action
 * - Product details preview
 * - Future: Add all to cart functionality
 *
 * Layout uses fixed height calculation to accommodate header
 */
export const WishlistPanel = ({ isOpen, onClose }: WishlistPanelProps) => {
  const { getWishlistProducts, removeFromWishlist } = useWishlist()
  const wishlistProducts = getWishlistProducts()

  return (
    <SlideOutPanel isOpen={isOpen} onClose={onClose} title={`Wishlist (${wishlistProducts.length})`}>
      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-sm text-gray-500 mb-6">
            Save your favorite items for later by clicking the heart icon
          </p>
          <button
            onClick={onClose}
            className="bg-gray-900 text-white px-8 py-3 text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors"
          >
            START SHOPPING
          </button>
        </div>
      ) : (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 89px)' }}>
          <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
            <div className="space-y-4 pb-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 pb-4 border-b border-gray-200 group animate-fadeIn"
                >
                  <div className="relative w-24 h-32 bg-gray-200 rounded-sm flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{product.color}</p>
                      <p className="text-sm font-semibold text-gray-900">{product.price} USD</p>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 transition-colors w-fit"
                    >
                      <X className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-gray-200 p-6 space-y-3 bg-white shadow-lg">
            <button
              className="w-full bg-gray-900 text-white py-3 text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors"
            >
              ADD ALL TO BAG
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-900 text-gray-900 py-3 text-sm font-semibold tracking-wider hover:bg-gray-50 transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      )}
    </SlideOutPanel>
  )
}
