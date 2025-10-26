import { useEffect, useRef, useState } from 'react'

interface Mantra {
  id: number
  text: string
}

const mantras: Mantra[] = [
  {
    id: 1,
    text: 'Move with purpose, shine with confidence.',
  },
  {
    id: 2,
    text: 'Embrace your strength, celebrate your journey.',
  },
  {
    id: 3,
    text: 'Flow with intention, live with grace.',
  },
]

export const MantraSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
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

  const handleDotClick = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      setIsAnimating(true)
      setCurrentIndex(index)
      setTimeout(() => setIsAnimating(false), 800)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative max-w-[1400px] mx-auto px-8 py-32 lg:py-40 bg-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl lg:text-3xl font-light text-gray-900 tracking-wider mb-2">
            Mantra of the Day
          </h2>
        </div>

        {/* Mantra Text */}
        <div className="relative min-h-[200px] lg:min-h-[240px] flex items-center justify-center mb-16">
          {mantras.map((mantra, index) => (
            <div
              key={mantra.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ease-out ${
                currentIndex === index
                  ? 'opacity-100 translate-y-0'
                  : index < currentIndex
                  ? 'opacity-0 -translate-y-8'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <blockquote
                className={`transition-all duration-1000 delay-100 ${
                  isVisible && currentIndex === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
              >
                <p className="text-4xl lg:text-5xl xl:text-6xl font-serif italic text-gray-900 leading-tight px-8">
                  "{mantra.text}"
                </p>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div
          className={`flex items-center justify-center gap-3 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {mantras.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="group relative p-2 focus:outline-none"
              aria-label={`View mantra ${index + 1}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  currentIndex === index
                    ? 'bg-gray-900 scale-110'
                    : 'bg-gray-400 hover:bg-gray-600 group-hover:scale-110'
                }`}
              />
              {/* Pulse effect on active dot */}
              {currentIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-900/20 rounded-full animate-ping" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className={`absolute top-1/2 left-8 lg:left-24 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-all duration-1500 ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      />
      <div
        className={`absolute top-1/2 right-8 lg:right-24 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-all duration-1500 ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      />
    </section>
  )
}
