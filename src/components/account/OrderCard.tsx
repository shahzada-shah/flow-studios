/**
 * OrderCard Component
 *
 * Displays a single order with product details, order information, and reorder action.
 * Features hover effects and smooth animations for better user experience.
 *
 * @component
 * @example
 * ```tsx
 * <OrderCard
 *   order={{
 *     id: '12345',
 *     productName: 'UltraFlex Leggings',
 *     color: 'Black',
 *     size: 'M',
 *     quantity: 1,
 *     date: 'Jan 15, 2025',
 *     status: 'Delivered',
 *     totalPrice: 89.99
 *   }}
 *   onReorder={(orderId) => handleReorder(orderId)}
 * />
 * ```
 */

import { ImageIcon } from 'lucide-react'

export interface Order {
  id: string
  productId: string
  productName: string
  color: string
  size: string
  quantity: number
  date: string
  status: string
  totalPrice: number
  imageUrl?: string
}

interface OrderCardProps {
  order: Order
  onReorder?: (orderId: string) => void
}

export const OrderCard = ({ order, onReorder }: OrderCardProps) => {
  const handleReorder = () => {
    onReorder?.(order.id)
  }

  return (
    <div
      className="
        border border-gray-200 p-8
        hover:border-gray-400 hover:shadow-md
        transition-all duration-300
        group
      "
    >
      <div className="flex gap-8">
        {/* Product Image */}
        <div
          className="
            w-32 h-40 bg-gray-100 flex-shrink-0
            overflow-hidden
            group-hover:bg-gray-200
            transition-colors duration-300
          "
        >
          {order.imageUrl ? (
            <img
              src={order.imageUrl}
              alt={order.productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon
                className="w-12 h-12 text-gray-400 group-hover:text-gray-500 transition-colors"
                strokeWidth={1.5}
              />
            </div>
          )}
        </div>

        {/* Order Information */}
        <div className="flex-1 flex justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-normal tracking-wide group-hover:text-gray-600 transition-colors">
              {order.productName}
            </h3>
            <p className="text-sm text-gray-600">Color: {order.color}</p>
            <p className="text-sm text-gray-600">Size: {order.size}</p>
            <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
          </div>

          <div className="text-right space-y-2">
            <p className="text-sm text-gray-600">Order #{order.id}</p>
            <p className="text-sm text-gray-600">Date: {order.date}</p>
            <p className="text-sm text-gray-600">Status: {order.status}</p>
            <p className="text-sm font-medium text-gray-900">
              Total Price: ${order.totalPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Reorder Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleReorder}
          className="
            bg-gray-900 text-white
            px-8 py-3 text-sm font-medium tracking-wider
            hover:bg-gray-800
            transition-all duration-200
            group-hover:scale-[1.02]
            transform
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
          "
        >
          REORDER
        </button>
      </div>
    </div>
  )
}
