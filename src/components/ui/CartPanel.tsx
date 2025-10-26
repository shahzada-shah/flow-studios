import { ShoppingBag, X, Plus, Minus, ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SlideOutPanel } from './SlideOutPanel'
import { useCart } from '../../context/CartContext'

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <SlideOutPanel isOpen={isOpen} onClose={onClose} title="Shopping Bag">
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your bag is empty</h3>
          <p className="text-sm text-gray-500 mb-6">
            Start adding items to your bag to see them here
          </p>
          <button
            onClick={onClose}
            className="bg-gray-900 text-white px-8 py-3 text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors duration-200"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </SlideOutPanel>
    )
  }

  return (
    <SlideOutPanel isOpen={isOpen} onClose={onClose} title={`Shopping Bag (${cartCount})`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                <div className="w-24 h-32 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                  {item.product.image_url ? (
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.product.color}</p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors duration-150"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors duration-150"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 space-y-4">
          <div className="flex justify-between text-base">
            <span className="font-medium text-gray-900">Subtotal</span>
            <span className="font-medium text-gray-900">${cartTotal.toFixed(2)} USD</span>
          </div>
          <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout</p>
          <button
            onClick={handleCheckout}
            className="w-full bg-gray-900 text-white py-4 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors duration-200"
          >
            CHECKOUT
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-900 text-gray-900 py-4 text-sm font-medium tracking-wider hover:bg-gray-50 transition-colors duration-200"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </SlideOutPanel>
  )
}
