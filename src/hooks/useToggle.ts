/**
 * useToggle Hook
 *
 * Simplifies boolean state management with convenient helper functions.
 * Useful for managing open/closed states, visibility, and other binary states.
 */

import { useState, useCallback } from 'react'

/**
 * Custom hook for managing boolean toggle state
 *
 * Provides functions to toggle, set to true, or set to false.
 * All functions are memoized with useCallback for optimal performance.
 *
 * @param initialValue - Initial boolean value (default: false)
 * @returns Tuple of [state, toggle, setTrue, setFalse]
 *
 * @example
 * ```tsx
 * const [isOpen, toggle, open, close] = useToggle(false)
 *
 * <button onClick={toggle}>Toggle</button>
 * <button onClick={open}>Open</button>
 * <button onClick={close}>Close</button>
 * {isOpen && <div>Content</div>}
 * ```
 */
export const useToggle = (initialValue = false): [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState(initialValue)

  // Toggle between true and false
  const toggle = useCallback(() => setValue(v => !v), [])

  // Set to true
  const setTrue = useCallback(() => setValue(true), [])

  // Set to false
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setTrue, setFalse]
}
