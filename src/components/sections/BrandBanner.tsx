import { useEffect, useRef, useState } from 'react'

export const BrandBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
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
    <section ref={sectionRef} className="relative w-full bg-gray-100 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
          {/* Text Content - Left Side */}
          <div className="flex items-center px-8 lg:px-16 py-16 lg:py-20">
            <div className="max-w-xl">
              <h2
                className={`text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 mb-8 leading-tight transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-12'
                }`}
              >
                We believe that{' '}
                <em className="italic font-medium">
                  fashion should empower both your body and the planet.
                </em>
              </h2>

              <p
                className={`text-lg lg:text-xl text-gray-700 leading-relaxed font-light transition-all duration-1000 delay-200 ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-12'
                }`}
              >
                Our commitment to sustainability drives everything we do - from
                ethically sourced materials to eco-conscious production
                practices.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative bg-gray-200 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <img src="/images/products/featured/mockup_feature_01.png" alt="Flow Studios banner" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-300/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
