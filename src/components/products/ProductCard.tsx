/**
 * ProductCard Component
 *
 * Displays a product in a card format with image, details, and action buttons.
 * Used in product grids on catalog and home pages.
 *
 * Features:
 * - Product image with hover state
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

import { Heart, ImageIcon } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product // Product data from database
  onQuickBuy?: (product: Product) => void
}

export const ProductCard = ({ product, onQuickBuy }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const inWishlist = isInWishlist(product.id)

  // Build candidate image sources: Only load if image_url is set
  const imageCandidates = useMemo(() => {
    if (!product.image_url) return [] // No image_url = show placeholder
    return [
      product.image_url,
      `/images/products/thumbs/${product.slug}-1.jpg`,
    ].filter(Boolean)
  }, [product.image_url, product.slug])

  const [imgIndex, setImgIndex] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgSrc = imageCandidates[imgIndex]

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
        {!imgLoaded && (
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
        )}

        {imgSrc && (
          <img
            src={imgSrc}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgIndex((i) => (i + 1 < imageCandidates.length ? i + 1 : i))}
          />
        )}

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

      {onQuickBuy && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onQuickBuy(product)
          }}
          className="mt-4 w-full border border-gray-900 text-gray-900 py-3 text-xs font-medium tracking-[0.35em] uppercase hover:bg-gray-900 hover:text-white transition-all duration-200"
        >
          Quick Buy
        </button>
      )}
    </div>
  )
}
