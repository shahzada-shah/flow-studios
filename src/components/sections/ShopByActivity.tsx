import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface ActivityCategory {
  id: number
  title: string
  image: string
  href: string
  activity: string
}

const categories: ActivityCategory[] = [
  {
    id: 1,
    title: 'PILATES PERFORMANCE',
    image: '/images/products/featured/mockup_feature_05.png',
    href: '/shop?activity=Pilates',
    activity: 'Pilates',
  },
  {
    id: 2,
    title: 'REFORMER ESSENTIALS',
    image: '/images/products/featured/mockup_feature_06.png',
    href: '/shop?activity=Reformer',
    activity: 'Reformer',
  },
  {
    id: 3,
    title: 'STUDIO STREETSTYLE',
    image: '/images/products/featured/mockup_feature_07.png',
    href: '/shop?activity=Lifestyle',
    activity: 'Lifestyle',
  },
]

export const ShopByActivity = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="max-w-[1400px] mx-auto px-8 py-24">
      <h2
        className={`text-5xl md:text-6xl font-serif tracking-wide text-gray-900 mb-20 transition-all duration-700 font-light ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        SHOP BY ACTIVITY
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={category.href}
            className={`group relative overflow-hidden bg-gray-200 aspect-[3/4] rounded-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${index * 0.15}s`,
            }}
          >
            {/* Image */}
            <img 
              src={category.image} 
              alt={category.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl md:text-3xl font-serif tracking-wide text-white text-center font-light">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
