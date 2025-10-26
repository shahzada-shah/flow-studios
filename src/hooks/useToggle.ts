import { useState, useCallback } from 'react'

/**
 * Custom hook for managing boolean toggle state
 * @param initialValue - Initial boolean value (default: false)
 * @returns Tuple of [state, toggle, setTrue, setFalse]
 */
export const useToggle = (initialValue = false): [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setTrue, setFalse]
}
