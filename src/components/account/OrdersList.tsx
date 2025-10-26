/**
 * OrdersList Component
 *
 * Displays a list of user orders with proper spacing and animations.
 * Handles empty state and provides reorder functionality.
 *
 * @component
 * @example
 * ```tsx
 * <OrdersList
 *   orders={userOrders}
 *   onReorder={(orderId) => handleReorder(orderId)}
 * />
 * ```
 */

import { OrderCard, type Order } from './OrderCard'

interface OrdersListProps {
  orders: Order[]
  onReorder?: (orderId: string) => void
}

export const OrdersList = ({ orders, onReorder }: OrdersListProps) => {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-sm text-gray-500">Your order history will appear here</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl tracking-wide mb-8">ORDERS ({orders.length})</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onReorder={onReorder} />
        ))}
      </div>
    </div>
  )
}
