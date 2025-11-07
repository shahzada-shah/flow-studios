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

import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Loader } from './components/ui/Loader'
import { useImagePreloader } from './hooks/useImagePreloader'
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
function ScrollToTop({ onRouteChange }: { onRouteChange: () => void }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    onRouteChange()
  }, [pathname, onRouteChange])

  return null
}

/**
 * AppContent Component
 *
 * Main app content that tracks image loading and controls the loader.
 * Separated to use hooks that require Router context.
 */
function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false)
  const [routeChangeCounter, setRouteChangeCounter] = useState(0)
  const imagesLoaded = useImagePreloader(routeChangeCounter)

  // Handle route changes - reset loader and timers
  const handleRouteChange = useCallback(() => {
    setIsLoading(true)
    setMinLoadTimePassed(false)
    setRouteChangeCounter(prev => prev + 1)
    
    // Reset minimum load time for new page
    const timer = setTimeout(() => {
      setMinLoadTimePassed(true)
    }, 500) // Shorter delay for subsequent page loads
    
    return () => clearTimeout(timer)
  }, [])

  // Initial load - ensure minimum load time of 800ms for smooth experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadTimePassed(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Hide loader when both conditions are met
  useEffect(() => {
    if (imagesLoaded && minLoadTimePassed) {
      setIsLoading(false)
      console.log('✅ All images loaded and ready')
    }
  }, [imagesLoaded, minLoadTimePassed])

  useEffect(() => {
    console.log('🎨 Flow Studios App initialized successfully!')
  }, [])

  return (
    <>
      <Loader isLoading={isLoading} />
      <ScrollToTop onRouteChange={handleRouteChange} />
      <div className={`min-h-screen bg-white transition-all duration-500 w-full ${isLoading ? 'blur-sm' : 'blur-0'}`}>
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
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename="/flow-studios">
      <AppContent />
    </BrowserRouter>
  )
}

export default App
