import { useEffect } from 'react'
import { X, ChevronRight } from 'lucide-react'
import type { NavItem } from '../../types'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: NavItem[]
}

/**
 * Mobile navigation menu with slide-in animation
 * Features expandable submenus and smooth transitions
 */
export const MobileMenu = ({ isOpen, onClose, navigation }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop with smooth fade */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-400 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in menu with smooth animation */}
      <div className={`absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-all duration-400 ease-in-out ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-serif tracking-wide">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className={`flex-1 overflow-y-auto p-6 transition-all duration-300 delay-100 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="space-y-1">
              {navigation.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                    {item.submenu && item.submenu.length > 0 && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </a>
                </div>
              ))}
            </div>
          </nav>

          <div className="border-t border-gray-200 p-6">
            <a
              href="#account"
              className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              SIGN IN
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
