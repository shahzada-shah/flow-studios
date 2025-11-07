import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import type { Product } from '../../types/product'

interface QuickBuyModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export const QuickBuyModal = ({ product, isOpen, onClose }: QuickBuyModalProps) => {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0])
    } else {
      setSelectedSize('')
    }
  }, [product])

  // Don't lock scroll - let users scroll to see the modal
  // useEffect removed to allow natural scrolling

  const imageSrc = useMemo(() => {
    if (!product?.image_url) return null
    return product.image_url
  }, [product])

  if (!isOpen || !product) return null

  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleAddToCart = async () => {
    if (product.sizes.length && !selectedSize) {
      showToast('Please select a size', 'error')
      return
    }

    setIsAdding(true)
    await addToCart(product, selectedSize || 'One Size')
    showToast(`Added ${product.name} to bag`, 'success')
    setIsAdding(false)
    onClose()
  }

  return (
    <>
      <div 
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={onClose} 
      />
      
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-full max-w-4xl p-6 transition-all duration-500 ease-out"
        style={{ animation: 'modalSlideIn 0.5s ease-out' }}
        onClick={handleContainerClick}
      >
        <div
          data-modal="quick-buy"
          className="w-full bg-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(event) => event.stopPropagation()}
        >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200"
              aria-label="Close quick buy"
            >
              <X className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </button>

          <div className="grid md:grid-cols-2">
              <div className="relative bg-gray-100 min-h-[320px]">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400 tracking-[0.3em] uppercase">
                    No Image
                  </div>
                )}
              </div>

              <div className="px-10 py-12 flex flex-col gap-8">
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.4em] text-gray-500 uppercase">Flow Studios</p>
                  <h3 className="text-3xl font-light text-gray-900 tracking-tight">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.color}</p>
                  <p className="text-lg font-medium text-gray-900 tracking-wide">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price} USD
                  </p>
                </div>

                {product.description && (
                  <p className="text-sm leading-relaxed text-gray-600">
                    {product.description}
                  </p>
                )}

                {product.sizes.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-xs tracking-[0.4em] text-gray-500 uppercase">Select Size</p>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 flex items-center justify-center text-xs font-medium transition-all duration-200 border ${
                            selectedSize === size
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-200 text-gray-900 hover:border-gray-900'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-gray-900 text-white py-4 text-sm tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? 'Adding...' : 'Add to Bag'}
                </button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

