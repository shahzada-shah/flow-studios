import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useClickOutside } from '../../hooks/useClickOutside'
import type { NavItem } from '../../types'

interface NavigationDropdownProps {
  item: NavItem
  isOpen?: boolean
  onToggle?: () => void
  onClose?: () => void
}

/**
 * Navigation dropdown component with hover and click interactions
 * Features smooth animations and accessible keyboard navigation
 */
export const NavigationDropdown = ({ item, isOpen: controlledIsOpen, onToggle, onClose }: NavigationDropdownProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onToggle || ((value: boolean) => setInternalIsOpen(value))

  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      handleClose()
    }
  })

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      if (onClose) {
        onClose()
      } else {
        setInternalIsOpen(false)
      }
    }, 200)
  }

  const handleToggle = () => {
    if (isOpen) {
      handleClose()
    } else {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false)
    }
  }, [isOpen])

  if (!item.submenu || item.submenu.length === 0) {
    return (
      <Link
        to={item.href}
        className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide"
        onClick={handleToggle}
        onMouseEnter={() => !isClosing && (onToggle ? onToggle() : setInternalIsOpen(true))}
      >
        {item.label}
      </button>

      {(isOpen || isClosing) && (
        <div
          className={`absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50 ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="py-2">
            {item.submenu.map((subItem, index) => (
              <Link
                key={index}
                to={subItem.href}
                className="block px-6 py-3.5 text-sm text-gray-900 hover:bg-gray-50 transition-all duration-200 hover:pl-7 animate-slideUp"
                style={{
                  animationDelay: `${index * 0.03}s`,
                  animationFillMode: 'backwards'
                }}
                onClick={handleClose}
              >
                <div className="font-medium">{subItem.label}</div>
                {subItem.description && (
                  <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
