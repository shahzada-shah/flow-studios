import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ImageIcon, ChevronRight, Package, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import type { Product } from '../types/product'
import { PRODUCTS } from '../data/products'

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [openSections, setOpenSections] = useState({
    details: true,
    features: true,
    care: true,
  })
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { showToast } = useToast()

  useEffect(() => {
    if (!slug) return
    const item = PRODUCTS.find((p) => p.slug === slug)
    if (item) {
      setProduct(item)
      setSelectedSize(item.sizes[0] || '')
    } else {
      setNotFound(true)
    }
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Package className="w-24 h-24 text-gray-300 mb-6" strokeWidth={1} />
            <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">
              No Item Details Found
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="px-8 py-3 bg-gray-900 text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-200"
              >
                BROWSE CATALOG
              </Link>
              <Link
                to="/"
                className="px-8 py-3 border border-gray-900 text-gray-900 text-sm font-medium tracking-wider hover:bg-gray-50 transition-all duration-200"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isInWishlistState = isInWishlist(product.id)

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size', 'error')
      return
    }
    addToCart(product, selectedSize)
    showToast(`Added ${product.name} to bag`, 'success')
  }

  const handleWishlistToggle = () => {
    const wasInWishlist = isInWishlist(product.id)
    toggleWishlist(product)
    if (!wasInWishlist) {
      showToast(`Added ${product.name} to wishlist`, 'wishlist')
    } else {
      showToast(`Removed ${product.name} from wishlist`, 'success')
    }
  }

  const toggleSection = (section: 'details' | 'features' | 'care') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Use product images only if image_url is set; otherwise show placeholder
  const images = product.image_url ? [
    product.image_url,
    `/images/products/thumbs/${product.slug}-1.jpg`,
    `/images/products/thumbs/${product.slug}-2.jpg`,
  ] : []

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <nav className="flex items-center gap-2 text-sm mb-12 tracking-wide">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/shop" className="text-gray-600 hover:text-gray-900 transition-colors">
            BESTSELLERS
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 uppercase">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // fallback to placeholder icon if the image path is missing
                    const parent = (e.currentTarget.parentElement as HTMLElement)
                    e.currentTarget.style.display = 'none'
                    if (parent) {
                      parent.innerHTML = `
                        <div class='w-full h-full flex items-center justify-center'>
                          <div class='flex flex-col items-center gap-3 text-gray-400'>
                            <div class='border-4 border-dashed border-gray-400 rounded-lg p-12'>
                              <svg class='w-20 h-20' viewBox='0 0 24 24' fill='none' stroke='currentColor'><rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect><circle cx='8.5' cy='8.5' r='1.5'></circle><path d='M21 15l-5-5L5 21'></path></svg>
                            </div>
                            <div class='text-center'>
                              <p class='text-base font-medium tracking-wider'>PRODUCT IMAGE</p>
                              <p class='text-sm tracking-wide mt-1'>600 × 800</p>
                            </div>
                          </div>
                        </div>`
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <div className="border-4 border-dashed border-gray-400 rounded-lg p-12">
                      <ImageIcon className="w-20 h-20" strokeWidth={1.5} />
                    </div>
                    <div className="text-center">
                      <p className="text-base font-medium tracking-wider">PRODUCT IMAGE</p>
                      <p className="text-sm tracking-wide mt-1">600 × 800</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((src, idx) => {
                const index = idx + 1
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden transition-all duration-200 ${
                      selectedImage === index ? 'ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} thumbnail ${index}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-normal text-gray-900">{product.price.toFixed(2)} USD</p>
            </div>

            {product.description && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-base leading-relaxed text-gray-700">
                  {product.description || 'Performance compression with targeted support zones'}
                </p>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium tracking-wider text-gray-900">SIZE OPTIONS:</h3>
                  <button className="text-sm underline text-gray-600 hover:text-gray-900 transition-colors">
                    SIZE GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 flex items-center justify-center text-sm font-medium tracking-wide transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-300 text-gray-900 hover:border-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wider text-gray-900">SIZE OPTIONS:</h3>
                <p className="text-sm text-gray-500">No sizes available for this product</p>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.sizes || product.sizes.length === 0}
                className="w-full bg-gray-900 text-white py-4 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD TO BAG
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`w-full py-4 text-sm font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01] ${
                  isInWishlistState
                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                    : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    isInWishlistState ? 'fill-white scale-110' : 'fill-transparent'
                  }`}
                  strokeWidth={1.5}
                />
                {isInWishlistState ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {product.is_sustainable && (
              <div className="bg-gray-50 p-6 rounded-sm space-y-2">
                <h4 className="text-sm font-medium tracking-wider text-gray-900">SUSTAINABLE CHOICE</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Made from eco-friendly, moisture-wicking fabric, these leggings hug your body while
                  providing breathability and stretch.
                </p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 transition-colors"
                >
                  <h4 className="text-sm font-medium tracking-wider text-gray-900">PRODUCT DETAILS</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openSections.details ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections.details ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <div className="space-y-2 text-sm text-gray-700">
                    {product.color && (
                      <div className="flex">
                        <span className="w-32 text-gray-500">Color:</span>
                        <span>{product.color}</span>
                      </div>
                    )}
                    {product.activities && product.activities.length > 0 && (
                      <div className="flex">
                        <span className="w-32 text-gray-500">Best For:</span>
                        <span>{product.activities.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex">
                      <span className="w-32 text-gray-500">Availability:</span>
                      <span className={product.in_stock ? 'text-green-600' : 'text-red-600'}>
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    {product.is_new && (
                      <div className="flex">
                        <span className="w-32 text-gray-500">Status:</span>
                        <span className="text-gray-900 font-medium">New Arrival</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('features')}
                  className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 transition-colors"
                >
                  <h4 className="text-sm font-medium tracking-wider text-gray-900">FEATURES</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openSections.features ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections.features ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Four-way stretch fabric for maximum comfort</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Moisture-wicking technology keeps you dry</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>High-waisted design for added support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Flatlock seams prevent chafing</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('care')}
                  className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 transition-colors"
                >
                  <h4 className="text-sm font-medium tracking-wider text-gray-900">CARE INSTRUCTIONS</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openSections.care ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections.care ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Machine wash cold with like colors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Do not bleach or use fabric softener</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Tumble dry low or hang to dry</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Do not iron or dry clean</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
