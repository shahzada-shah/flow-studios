import { useState, useEffect } from 'react'
import Hero from '../components/layout/Hero'
import { ValueProps } from '../components/sections/ValueProps'
import { Bestsellers } from '../components/sections/Bestsellers'
import { ShopByActivity } from '../components/sections/ShopByActivity'
import { MantraSection } from '../components/sections/MantraSection'
import { BrandBanner } from '../components/sections/BrandBanner'
import { BlogSection } from '../components/sections/BlogSection'
import { NewsletterModal } from '../components/ui/NewsletterModal'

const MODAL_DELAY = 3000

export const Home = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNewsletterOpen(true)
    }, MODAL_DELAY)

    return () => clearTimeout(timer)
  }, [])

  const handleNewsletterClose = () => {
    setIsNewsletterOpen(false)
  }

  return (
    <>
      <Hero />

      <div className="bg-white">
        <Bestsellers />
      </div>

      <div className="bg-gray-50">
        <ShopByActivity />
      </div>

      <BrandBanner />

      <div className="bg-white">
        <ValueProps />
      </div>

      <BlogSection />

      <MantraSection />

      <NewsletterModal isOpen={isNewsletterOpen} onClose={handleNewsletterClose} />
    </>
  )
}
