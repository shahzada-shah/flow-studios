import { X, Check, Heart, AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

export type ToastType = 'success' | 'wishlist' | 'error'

interface ToastProps {
  id: string
  message: string
  type: ToastType
  onClose: (id: string) => void
}

export const Toast = ({ id, message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 3500)

    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-sm p-4 min-w-[320px] animate-slideInRight">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {type === 'success' && (
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
          )}
          {type === 'wishlist' && (
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" strokeWidth={2} />
            </div>
          )}
          {type === 'error' && (
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
          )}
        </div>
        <p className="flex-1 text-sm text-gray-900 font-medium">{message}</p>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-150"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
