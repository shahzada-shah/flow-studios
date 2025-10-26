/**
 * ToastContext
 *
 * Provides toast notification system throughout the application.
 * Displays temporary messages for user feedback.
 *
 * Features:
 * - Show success, error, and wishlist toast messages
 * - Auto-dismiss after timeout
 * - Multiple toasts supported
 * - Fixed position at bottom-right
 *
 * @context
 * @example
 * ```tsx
 * const { showToast } = useToast()
 * showToast('Item added to cart', 'success')
 * showToast('Something went wrong', 'error')
 * ```
 */

import { createContext, useContext, useState, ReactNode } from 'react'
import { Toast, ToastType } from '../components/ui/Toast'

interface ToastMessage {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  /**
   * Show a toast notification
   * @param message - Message to display
   * @param type - Toast type: 'success', 'error', or 'wishlist'
   */
  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto space-y-3">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

/**
 * useToast Hook
 *
 * Custom hook to access toast notification system.
 * Must be used within a ToastProvider.
 *
 * @throws Error if used outside ToastProvider
 * @returns Toast context with showToast method
 */
export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
