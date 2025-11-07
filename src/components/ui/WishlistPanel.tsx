import { Heart, X, ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { SlideOutPanel } from './SlideOutPanel'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

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
 * - Add all to cart functionality
 *
 * Layout uses fixed height calculation to accommodate header
 */
export const WishlistPanel = ({ isOpen, onClose }: WishlistPanelProps) => {
  const navigate = useNavigate()
  const { products: wishlistProducts, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  // Close drawer on page scroll
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      onClose()
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen, onClose])

  const handleAddAllToBag = () => {
    let addedCount = 0
    wishlistProducts.forEach((product) => {
      if (product.sizes && product.sizes.length > 0) {
        addToCart(product, product.sizes[0])
        addedCount++
      }
    })

    if (addedCount > 0) {
      showToast(`Added ${addedCount} item${addedCount > 1 ? 's' : ''} to bag`, 'success')
      clearWishlist()
      onClose()
    }
  }

  const handleContinueShopping = () => {
    onClose()
    navigate('/shop')
  }

  if (wishlistProducts.length === 0) {
    return (
      <SlideOutPanel isOpen={isOpen} onClose={onClose} title="Wishlist (0)">
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
      </SlideOutPanel>
    )
  }

  return (
    <SlideOutPanel isOpen={isOpen} onClose={onClose} title={`Wishlist (${wishlistProducts.length})`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
          <div className="space-y-4 pb-2">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0 group"
              >
                <div className="relative w-24 h-32 bg-gray-200 rounded-sm flex-shrink-0 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{product.color}</p>
                    <p className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)} USD</p>
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
            onClick={handleAddAllToBag}
            className="w-full bg-gray-900 text-white py-4 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors duration-200"
          >
            ADD ALL TO BAG
          </button>
          <button
            onClick={handleContinueShopping}
            className="w-full border border-gray-900 text-gray-900 py-4 text-sm font-medium tracking-wider hover:bg-gray-50 transition-colors duration-200"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </SlideOutPanel>
  )
}
