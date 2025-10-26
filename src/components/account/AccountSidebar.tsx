/**
 * AccountSidebar Component
 *
 * Navigation sidebar for the account page with tab-based navigation.
 * Provides visual feedback for the active tab with smooth transitions.
 *
 * @component
 * @example
 * ```tsx
 * <AccountSidebar
 *   activeTab="orders"
 *   onTabChange={(tab) => setActiveTab(tab)}
 *   onLogout={() => handleLogout()}
 * />
 * ```
 */

import { LogOut } from 'lucide-react'

type Tab = 'details' | 'orders' | 'wishlist' | 'addresses'

interface AccountSidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onLogout: () => void
}

interface NavButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

const NavButton = ({ active, onClick, children }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left px-8 py-6 border-b border-gray-200
      text-lg tracking-wide transition-all duration-300
      ${active
        ? 'bg-gray-900 text-white shadow-lg'
        : 'bg-white text-gray-900 hover:bg-gray-50 hover:pl-10'
      }
    `}
  >
    {children}
  </button>
)

export const AccountSidebar = ({ activeTab, onTabChange, onLogout }: AccountSidebarProps) => {
  return (
    <nav className="border-r border-gray-200" role="navigation" aria-label="Account navigation">
      <NavButton active={activeTab === 'details'} onClick={() => onTabChange('details')}>
        DETAILS
      </NavButton>
      <NavButton active={activeTab === 'orders'} onClick={() => onTabChange('orders')}>
        ORDERS
      </NavButton>
      <NavButton active={activeTab === 'wishlist'} onClick={() => onTabChange('wishlist')}>
        WISHLIST
      </NavButton>
      <NavButton active={activeTab === 'addresses'} onClick={() => onTabChange('addresses')}>
        ADDRESSES
      </NavButton>
      <button
        onClick={onLogout}
        className="
          w-full text-left px-8 py-6 border-b border-gray-200
          text-lg tracking-wide text-gray-900
          hover:bg-gray-50 hover:pl-10 transition-all duration-300
          underline flex items-center gap-2
        "
      >
        LOG OUT
        <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </nav>
  )
}
