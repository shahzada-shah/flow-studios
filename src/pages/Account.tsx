/**
 * Account Page
 *
 * Main account management page with sidebar navigation and content sections.
 * Allows users to view orders, manage details, wishlist, and addresses.
 *
 * Features:
 * - Tab-based navigation
 * - Order history with reorder functionality
 * - User details management
 * - Wishlist view
 * - Address management
 * - Logout functionality
 *
 * @page
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { AccountSidebar } from '../components/account/AccountSidebar'
import { OrdersList } from '../components/account/OrdersList'
import { DetailsForm } from '../components/account/DetailsForm'
import { WishlistTab } from '../components/account/WishlistTab'
import { AddressesTab } from '../components/account/AddressesTab'
import type { Order } from '../components/account/OrderCard'

type Tab = 'details' | 'orders' | 'wishlist' | 'addresses'

const mockOrders: Order[] = [
  {
    id: '45678',
    productName: 'UltraFlex Leggings',
    color: 'Grey',
    size: 'S',
    quantity: 1,
    date: 'Feb 21, 2025',
    status: 'Delivered',
    totalPrice: 90,
  },
  {
    id: '55689',
    productName: 'Crop Legging',
    color: 'Black',
    size: 'S',
    quantity: 1,
    date: 'Jan 05, 2025',
    status: 'Delivered',
    totalPrice: 180,
  },
  {
    id: '52795',
    productName: 'Slim Flare Leggins',
    color: 'Black',
    size: 'S',
    quantity: 1,
    date: 'Dec 18, 2024',
    status: 'Delivered',
    totalPrice: 95,
  },
]

export const Account = () => {
  const [activeTab, setActiveTab] = useState<Tab>('orders')
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { showToast } = useToast()

  const handleLogout = async () => {
    try {
      await signOut()
      showToast('Logged out successfully', 'success')
      navigate('/auth')
    } catch (error) {
      showToast('Failed to logout', 'error')
    }
  }

  const handleReorder = (orderId: string) => {
    showToast(`Reordering item from order #${orderId}`, 'success')
  }

  const handleSaveDetails = (data: unknown) => {
    showToast('Details saved successfully', 'success')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="text-sm tracking-wide text-gray-600">
            <Link
              to="/"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              HOME
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">ACCOUNT</span>
          </div>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0">
          {/* Sidebar Navigation */}
          <AccountSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
          />

          {/* Content Area */}
          <div className="px-12 py-8">
            {activeTab === 'details' && (
              <DetailsForm onSave={handleSaveDetails} />
            )}

            {activeTab === 'orders' && (
              <OrdersList orders={mockOrders} onReorder={handleReorder} />
            )}

            {activeTab === 'wishlist' && <WishlistTab />}

            {activeTab === 'addresses' && <AddressesTab />}
          </div>
        </div>
      </div>
    </div>
  )
}
