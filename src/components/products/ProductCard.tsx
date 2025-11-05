/**
 * ProductCard Component
 *
 * Displays a product in a card format with image, details, and action buttons.
 * Used in product grids on catalog and home pages.
 *
 * Features:
 * - Product image with hover state
 * - Quick add to cart with size selection
 * - Wishlist toggle with heart icon
 * - Product badges (new, bestseller, out of stock)
 * - Responsive layout
 * - Loading states for async actions
 * - Toast notifications for user feedback
 *
 * User Interactions:
 * - Click card to view product details
 * - Click heart to add/remove from wishlist
 * - Click shopping bag to add to cart (with size selector)
 * - Hover to see enhanced visuals
 *
 * @component
 */

import { Heart, ImageIcon, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product // Product data from database
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const inWishlist = isInWishlist(product.id)
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M')
  const [showSizeSelector, setShowSizeSelector] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addToCart(product, selectedSize)
    showToast(`Added ${product.name} to bag`, 'success')
    setTimeout(() => setIsAdding(false), 1000)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const wasInWishlist = isInWishlist(product.id)
    toggleWishlist(product)
    if (!wasInWishlist) {
      showToast(`Added ${product.name} to wishlist`, 'wishlist')
    } else {
      showToast(`Removed ${product.name} from wishlist`, 'success')
    }
  }

  return (
    <div className="group relative">
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden rounded-sm mb-4">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 group-hover:bg-gray-150 transition-colors duration-200">
          <div className="flex flex-col items-center gap-3 text-gray-400 group-hover:text-gray-500 transition-colors duration-200">
            <div className="border-4 border-dashed border-gray-400 rounded-lg p-6 group-hover:border-gray-500 transition-colors duration-200">
              <ImageIcon className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium tracking-wide">PRODUCT IMAGE</p>
              <p className="text-xs tracking-wide mt-1">600 × 800</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-105 z-10 ${
            inWishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              inWishlist ? 'fill-gray-900 text-gray-900 scale-110' : 'text-gray-900 fill-transparent'
            }`}
            strokeWidth={1.5}
          />
        </button>

        {product.is_new && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium tracking-wider">
            NEW
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {showSizeSelector ? (
            <div className="space-y-2 animate-fadeIn">
              <div className="flex gap-2 justify-center mb-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-gray-900 text-white py-3 text-xs font-medium tracking-wider hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAdding ? (
                  'ADDED!'
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    ADD TO BAG
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSizeSelector(true)}
              className="w-full bg-white text-gray-900 py-3 text-xs font-medium tracking-wider hover:bg-gray-100 transition-all duration-200"
            >
              SELECT SIZE
            </button>
          )}
        </div>
      </div>
      </Link>

      <Link to={`/product/${product.slug}`}>
        <div className="space-y-2 pt-2">
          <h3 className="text-base font-normal text-gray-900 tracking-wide group-hover:text-gray-600 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">{product.color}</p>
          <p className="text-base font-medium text-gray-900 mt-1">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price} USD</p>
        </div>
      </Link>
    </div>
  )
}
