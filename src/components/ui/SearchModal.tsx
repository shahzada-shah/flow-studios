import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Search } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Full-screen search modal component
 * Independent modal implementation (not a slide-out panel)
 *
 * Why separate from SlideOutPanel:
 * - Full-screen overlay vs side panel
 * - Centered content with slide-down animation
 * - Different interaction pattern
 *
 * Features:
 * - Full-screen backdrop with blur
 * - Centered search box with slide-down animation
 * - Auto-focus on input field
 * - ESC key to close
 * - Popular search suggestions
 * - Smooth exit animations with state management
 * - Body scroll lock when open
 */
export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setShouldRender(false)
      onClose()
    }, 300)
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setIsClosing(false)

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleClose])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-400 ease-in-out ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop with smooth fade */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
        aria-label="Close search modal"
      />

      {/* Search content with smooth slide-down */}
      <div className="relative h-full flex items-start justify-center pt-32 pointer-events-none">
        <div
          className={`w-full max-w-2xl px-8 pointer-events-auto transition-all duration-400 ease-in-out ${
            isClosing ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="bg-white rounded-lg shadow-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif tracking-wide">Search</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
                aria-label="Close search"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {['Leggings', 'Sports Bras', 'Yoga', 'Running'].map((term, index) => (
                  <button
                    key={term}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 animate-slideUp"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
