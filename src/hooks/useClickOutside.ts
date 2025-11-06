/**
 * useClickOutside Hook
 *
 * Detects clicks outside of a referenced element and triggers a callback.
 * Useful for closing modals, dropdowns, and menus when clicking outside.
 *
 * Supports both mouse and touch events for mobile compatibility.
 */

import { useEffect, RefObject } from 'react'

/**
 * Hook that handles clicks outside of the passed ref
 *
 * @param ref - React ref object pointing to the element to monitor
 * @param handler - Callback function to execute when clicking outside
 *
 * @example
 * ```tsx
 * const modalRef = useRef<HTMLDivElement>(null)
 * useClickOutside(modalRef, () => setIsOpen(false))
 *
 * return <div ref={modalRef}>Modal content</div>
 * ```
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or its descendants
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      // Execute handler if clicking outside
      handler(event)
    }

    // Listen for both mouse and touch events
    // Use passive: true for touchstart to allow scrolling without blocking
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener, { passive: true })

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
