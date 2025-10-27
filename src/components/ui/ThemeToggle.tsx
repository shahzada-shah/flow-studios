/**
 * ThemeToggle
 *
 * Elegant theme switcher component with three modes: light, dark, and system.
 * Displays current theme with smooth transitions and minimal design.
 *
 * Features:
 * - Three theme options: Light, Dark, System
 * - Dropdown menu with smooth transitions
 * - Visual indicator for current theme
 * - Click outside to close
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */

import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useToggle } from '../../hooks/useToggle'
import { useClickOutside } from '../../hooks/useClickOutside'

type ThemeOption = {
  value: 'light' | 'dark' | 'system'
  label: string
  icon: typeof Sun
}

const themes: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export const ThemeToggle = () => {
  const { theme, setTheme, effectiveTheme } = useTheme()
  const [isOpen, toggle, , close] = useToggle(false)

  const ref = useClickOutside(close)

  const currentThemeIcon = themes.find((t) => t.value === theme)?.icon || Sun

  const handleThemeSelect = (value: 'light' | 'dark' | 'system') => {
    setTheme(value)
    close()
  }

  const Icon = currentThemeIcon

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        className="
          p-2
          hover:bg-gray-100 dark:hover:bg-gray-800
          rounded-lg
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100
        "
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <Icon
          className="w-5 h-5 text-gray-900 dark:text-gray-100 transition-transform duration-200"
          strokeWidth={1.5}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 mt-2
            w-40
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            shadow-lg
            overflow-hidden
            animate-fadeIn
            z-50
          "
        >
          {themes.map(({ value, label, icon: ThemeIcon }) => (
            <button
              key={value}
              onClick={() => handleThemeSelect(value)}
              className="
                w-full
                flex items-center justify-between
                px-4 py-3
                text-sm text-gray-900 dark:text-gray-100
                hover:bg-gray-50 dark:hover:bg-gray-800
                transition-colors duration-150
                focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-800
              "
              role="menuitem"
            >
              <div className="flex items-center gap-3">
                <ThemeIcon className="w-4 h-4" strokeWidth={1.5} />
                <span className="font-medium">{label}</span>
              </div>
              {theme === value && (
                <Check className="w-4 h-4 text-gray-900 dark:text-gray-100" strokeWidth={2} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
