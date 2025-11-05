/**
 * SlideOutPanel Component
 *
 * A reusable slide-out panel component for cart, wishlist, filters, and other overlay content.
 * Provides a consistent UX pattern for side panels throughout the application.
 *
 * Features:
 * - Slides in from the right with smooth animations (400ms ease-in-out)
 * - Semi-transparent backdrop with blur effect
 * - Keyboard accessibility (ESC key to close)
 * - Body scroll lock when panel is open
 * - Click outside to close
 * - Responsive width (full width on mobile, max-width on desktop)
 *
 * @component
 * @example
 * ```tsx
 * <SlideOutPanel
 *   isOpen={isCartOpen}
 *   onClose={() => setIsCartOpen(false)}
 *   title="Shopping Cart"
 * >
 *   <div>Cart content here</div>
 * </SlideOutPanel>
 * ```
 */

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface SlideOutPanelProps {
  isOpen: boolean // Controls panel visibility
  onClose: () => void // Callback when panel should close
  title: string // Panel header title
  children: React.ReactNode // Panel content
}
export const SlideOutPanel = ({ isOpen, onClose, title, children }: SlideOutPanelProps) => {
  // Handle keyboard events and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      // Add ESC key listener
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      // Cleanup on unmount or when panel closes
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop with smooth fade */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-400 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-out panel with smooth translation */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-all duration-400 ease-in-out ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-serif tracking-wide">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              aria-label="Close panel"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Content with stagger animation */}
          <div className={`flex-1 overflow-hidden transition-all duration-300 delay-100 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
