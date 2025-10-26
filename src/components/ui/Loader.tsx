/**
 * Loader Component
 *
 * Full-screen loader with brand logo that appears on initial app load.
 * Features a smooth blur-out transition when loading completes.
 *
 * Animation Flow:
 * 1. Logo fades in with subtle scale animation
 * 2. Loading text pulses gently
 * 3. Entire loader blurs out and fades away
 * 4. Content becomes visible
 *
 * @component
 * @example
 * ```tsx
 * <Loader isLoading={loading} />
 * ```
 */

import { useEffect, useState } from 'react'

interface LoaderProps {
  isLoading: boolean
}

export const Loader = ({ isLoading }: LoaderProps) => {
  const [shouldRender, setShouldRender] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true)
      // Wait for blur animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!shouldRender) return null

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-white
        flex flex-col items-center justify-center
        transition-all duration-700 ease-in-out
        ${isExiting ? 'opacity-0 blur-xl' : 'opacity-100 blur-0'}
      `}
    >
      <div
        className={`
          flex flex-col items-center
          transition-all duration-500 ease-out
          ${isExiting ? 'scale-95' : 'scale-100'}
        `}
      >
        {/* Logo */}
        <div className="animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-serif tracking-wider text-gray-900 mb-2">
            MOVE
          </h1>
          <p className="text-xs tracking-widest text-gray-600 text-center">EST.2025</p>
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 flex flex-col items-center">
          {/* Animated Dots */}
          <div className="flex gap-2">
            <div
              className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Loading Text */}
          <p className="text-sm tracking-wider text-gray-500 mt-6 animate-pulse">
            LOADING
          </p>
        </div>
      </div>
    </div>
  )
}
