/**
 * App Component
 *
 * Root component that sets up routing and global layout structure.
 *
 * Application Structure:
 * - BrowserRouter: Client-side routing
 * - Header: Global navigation (on all pages)
 * - Routes: Page content
 * - Footer: Global footer (on all pages)
 * - Loader: Initial loading animation
 *
 * Routes:
 * - / : Home page with hero, bestsellers, and sections
 * - /shop : Product catalog with filters
 * - /shop/:category : Category-specific catalog
 * - /product/:slug : Individual product details
 * - /checkout : Checkout flow
 * - /account : User account management
 * - /auth : Sign in/sign up
 *
 * Features:
 * - Initial loading screen (1.5s)
 * - Smooth scroll to top on route change
 * - Blur effect during initial load
 * - Responsive layout
 *
 * Context Providers (from main.tsx):
 * - AuthProvider: User authentication
 * - CartProvider: Shopping cart
 * - WishlistProvider: Saved items
 * - ToastProvider: Notifications
 */

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Loader } from './components/ui/Loader'
import { Home } from './pages/Home'
import { ProductCatalog } from './pages/ProductCatalog'
import { ProductDetail } from './pages/ProductDetail'
import { Checkout } from './pages/Checkout'
import { Account } from './pages/Account'
import { Auth } from './pages/Auth'

/**
 * ScrollToTop Component
 *
 * Utility component that scrolls to top on route changes.
 * Provides smooth user experience when navigating between pages.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader isLoading={isLoading} />
      <BrowserRouter>
        <ScrollToTop />
        <div className={`min-h-screen bg-white transition-all duration-500 overflow-x-hidden w-full ${isLoading ? 'blur-sm' : 'blur-0'}`}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:category" element={<ProductCatalog />} />
            <Route path="/shop" element={<ProductCatalog />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
