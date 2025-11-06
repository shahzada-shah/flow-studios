/**
 * Bestsellers Section Component
 *
 * Displays a curated selection of bestselling products on the home page.
 * Fetches products marked as bestsellers from the database.
 *
 * Features:
 * - Fetches up to 4 bestseller products from Supabase
 * - Intersection Observer for scroll animations
 * - Responsive grid layout (1-2-4 columns)
 * - Loading states
 * - Links to product detail pages
 * - Placeholder images for products
 *
 * Data Source:
 * - Queries products table where is_bestseller = true
 * - Limited to 4 products
 *
 * Animation:
 * - Fade-in effect when scrolled into view
 * - Staggered animation for each product card
 *
 * @component
 */

import { ImageIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { PRODUCTS } from '../../data/products'

export const Bestsellers = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const data = PRODUCTS.filter((p) => p.is_bestseller).slice(0, 4)
    setProducts(data)
    setLoading(false)
  }, [])

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

  return (
    <section ref={sectionRef} className="max-w-[1400px] mx-auto px-8 py-24">
      <h2
        className={`text-5xl md:text-6xl font-serif tracking-wide text-gray-900 mb-20 transition-all duration-700 font-light ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        BESTSELLERS
      </h2>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading bestsellers...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-12">No bestsellers available</div>
      ) : (
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
              </div>
            </Link>

            <Link to={`/product/${product.slug}`}>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 tracking-wide group-hover:text-gray-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 font-light">{product.color}</p>
                <p className="text-base font-medium text-gray-900 pt-0.5">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price} USD
                </p>
              </div>
            </Link>
          </div>
          ))}
        </div>
      )}
    </section>
  )
}
