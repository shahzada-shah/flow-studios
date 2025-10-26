import { Heart, ImageIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import { supabase } from '../../lib/supabase'
import type { Product as ProductType } from '../../types/product'

export const Bestsellers = () => {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { showToast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_bestseller', true)
          .limit(4)

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching bestsellers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBestsellers()
  }, [])

  const handleWishlistToggle = (e: React.MouseEvent, product: ProductType) => {
    e.preventDefault()
    e.stopPropagation()
    const productIdNumber = parseInt(product.id)
    const wasInWishlist = isInWishlist(productIdNumber)
    const productForWishlist = {
      id: productIdNumber,
      name: product.name,
      color: product.color,
      price: product.price,
      image: product.image_url || '',
    }
    toggleWishlist(productForWishlist)
    if (!wasInWishlist) {
      showToast(`Added ${product.name} to wishlist`, 'wishlist')
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  if (loading) {
    return (
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <h2 className="text-5xl md:text-6xl font-serif tracking-wide text-gray-900 mb-20 font-light">
          BESTSELLERS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-sm mb-4" />
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="max-w-[1400px] mx-auto px-8 py-24">
      <h2
        className={`text-5xl md:text-6xl font-serif tracking-wide text-gray-900 mb-20 transition-all duration-700 font-light ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        BESTSELLERS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`group transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${index * 0.15}s`,
            }}
          >
            <Link to={`/product/${product.slug}`}>
              <div className="relative overflow-hidden bg-gray-200 mb-4 aspect-[3/4] rounded-sm">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <div className="border-4 border-dashed border-gray-400 rounded-lg p-6">
                        <ImageIcon className="w-12 h-12" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium tracking-wider">PRODUCT IMAGE</p>
                        <p className="text-xs tracking-wide mt-1">600 × 800</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={(e) => handleWishlistToggle(e, product)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-105 z-10"
                  aria-label={isInWishlist(parseInt(product.id)) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-200 ${
                      isInWishlist(parseInt(product.id))
                        ? 'fill-gray-900 text-gray-900 scale-110'
                        : 'text-gray-900 fill-transparent'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </Link>

            <Link to={`/product/${product.slug}`}>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 tracking-wide group-hover:text-gray-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 font-light">{product.color}</p>
                <p className="text-base font-medium text-gray-900 pt-0.5">
                  ${product.price} USD
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
