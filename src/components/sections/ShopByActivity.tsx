import { ImageIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ActivityCategory {
  id: number
  title: string
  image: string
  href: string
}

const categories: ActivityCategory[] = [
  {
    id: 1,
    title: 'YOGA ESSENTIALS',
    image: '',
    href: '#yoga',
  },
  {
    id: 2,
    title: 'PILATES PERFORMANCE',
    image: '',
    href: '#pilates',
  },
  {
    id: 3,
    title: 'STREETSTYLE',
    image: '',
    href: '#streetstyle',
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
          <a
            key={category.id}
            href={category.href}
            className={`group relative overflow-hidden bg-gray-200 aspect-[3/4] rounded-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${index * 0.15}s`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              <div className="flex flex-col items-center gap-4 text-gray-400">
                <div className="border-4 border-dashed border-gray-400 rounded-lg p-8">
                  <ImageIcon className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium tracking-wider">ACTIVITY IMAGE</p>
                  <p className="text-sm tracking-wide mt-1">800 × 1000</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl md:text-3xl font-serif tracking-wide text-white text-center font-light">
                {category.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
