import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { FilterPanel } from '../components/products/FilterPanel'
import { ProductCard } from '../components/products/ProductCard'
import { QuickBuyModal } from '../components/products/QuickBuyModal'
import { NewsletterModal } from '../components/ui/NewsletterModal'
import { useToast } from '../context/ToastContext'
import type { Product, ProductFilters } from '../types/product'
import { PRODUCTS } from '../data/products'

const NEWSLETTER_MODAL_KEY = 'newsletter_modal_shown'
const MODAL_DELAY = 4000

export const ProductCatalog = () => {
  const { category } = useParams<{ category: string }>()
  const [searchParams] = useSearchParams()
  const activityParam = searchParams.get('activity')
  
  const { showToast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<ProductFilters>({
    categories: category ? [category] : [],
    sizes: [],
    colors: [],
    activities: activityParam ? [activityParam] : [],
    priceRange: null,
    sustainable: false,
    newArrivals: false,
    sortBy: 'newest',
  })
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [products, filters])

  useEffect(() => {
    const hasSeenModal = localStorage.getItem(NEWSLETTER_MODAL_KEY)

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsNewsletterOpen(true)
      }, MODAL_DELAY)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleNewsletterClose = () => {
    setIsNewsletterOpen(false)
    localStorage.setItem(NEWSLETTER_MODAL_KEY, 'true')
  }

  const handleQuickBuy = (product: Product) => {
    setQuickBuyProduct(product)
    setIsQuickBuyOpen(true)
    
    // Smooth scroll to center viewport where modal appears
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const viewportHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const currentScroll = window.scrollY
        
        // Calculate the middle of the document
        const documentMiddle = documentHeight / 2 - viewportHeight / 2
        
        // Only scroll if we're not already near the center
        if (Math.abs(currentScroll - documentMiddle) > 100) {
          window.scrollTo({
            top: Math.max(0, documentMiddle),
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const handleQuickBuyClose = () => {
    setIsQuickBuyOpen(false)
    setQuickBuyProduct(null)
  }

  const handleLoadMore = () => {
    showToast('No additional products are available right now. Check back soon.', 'success')
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    // Use local data instead of Supabase
    setProducts(PRODUCTS.filter((p) => p.in_stock))
    setIsLoading(false)
  }

  const applyFilters = () => {
    let filtered = [...products]

    if (filters.categories.length > 0) {
      // Local data has no categories table; match against product.slug prefix or noop
      filtered = filtered.filter((_product) => true)
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => filters.sizes.includes(size))
      )
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => filters.colors.includes(product.color))
    }

    if (filters.activities.length > 0) {
      filtered = filtered.filter((product) =>
        product.activities.some((activity) => filters.activities.includes(activity))
      )
    }

    if (filters.sustainable) {
      filtered = filtered.filter((product) => product.is_sustainable)
    }

    if (filters.newArrivals) {
      filtered = filtered.filter((product) => product.is_new)
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredProducts(filtered)
  }

  const activeFilterCount = [
    ...filters.categories,
    ...filters.sizes,
    ...filters.colors,
    ...filters.activities,
  ].length + (filters.sustainable ? 1 : 0) + (filters.newArrivals ? 1 : 0)

  const getCategoryTitle = () => {
    if (!category) return 'All Products'
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen bg-white">
      <NewsletterModal isOpen={isNewsletterOpen} onClose={handleNewsletterClose} />
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        product={quickBuyProduct}
        onClose={handleQuickBuyClose}
      />

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        activeFilterCount={activeFilterCount}
      />

      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-gray-900 mb-2 font-light">
              {getCategoryTitle()}
            </h1>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="text-sm font-medium tracking-wider text-gray-900 hover:text-gray-600 transition-colors duration-200 underline underline-offset-4"
            >
              FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-sm text-gray-600 tracking-wide">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-gray-600 mb-4">No products found</p>
            <button
              onClick={() =>
                setFilters({
                  categories: [],
                  sizes: [],
                  colors: [],
                  activities: [],
                  priceRange: null,
                  sustainable: false,
                  newArrivals: false,
                  sortBy: 'newest',
                })
              }
              className="text-sm font-medium tracking-wider text-gray-900 hover:text-gray-600 transition-colors duration-200 underline underline-offset-4"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickBuy={handleQuickBuy} />
              ))}
            </div>

            {filteredProducts.length >= 12 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="px-16 py-4 border border-gray-900 text-gray-900 text-sm font-medium tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-200"
                >
                  LOAD MORE
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
