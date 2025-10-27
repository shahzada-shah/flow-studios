/**
 * ThemeContext
 *
 * Manages theme state (light/dark/system) with localStorage persistence.
 * Provides theme toggle functionality and syncs with system preferences.
 *
 * Theme Modes:
 * - light: Force light theme
 * - dark: Force dark theme
 * - system: Follow system preference
 *
 * @example
 * ```tsx
 * const { theme, setTheme, effectiveTheme } = useTheme()
 *
 * // Set theme
 * setTheme('dark')
 *
 * // Check current effective theme
 * if (effectiveTheme === 'dark') {
 *   // Dark mode is active
 * }
 * ```
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  effectiveTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'flow-studio-theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return (stored as Theme) || 'system'
  })

  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light')

  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const updateEffectiveTheme = (currentTheme: Theme) => {
    const effective = currentTheme === 'system' ? getSystemTheme() : currentTheme
    setEffectiveTheme(effective)

    if (effective === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    updateEffectiveTheme(theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        updateEffectiveTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    updateEffectiveTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
