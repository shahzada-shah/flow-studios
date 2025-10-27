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
        <div className={`min-h-screen bg-white transition-all duration-500 ${isLoading ? 'blur-sm' : 'blur-0'}`}>
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
