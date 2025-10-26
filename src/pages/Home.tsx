import Hero from '../components/layout/Hero'
import { ValueProps } from '../components/sections/ValueProps'
import { Bestsellers } from '../components/sections/Bestsellers'
import { ShopByActivity } from '../components/sections/ShopByActivity'
import { MantraSection } from '../components/sections/MantraSection'
import { BrandBanner } from '../components/sections/BrandBanner'
import { BlogSection } from '../components/sections/BlogSection'

export const Home = () => {
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
    </>
  )
}
