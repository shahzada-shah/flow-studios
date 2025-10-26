import { Recycle, Brain, Sparkles, Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ValueProp {
  id: number
  icon: typeof Recycle
  title: string
  description: string
}

const valueProps: ValueProp[] = [
  {
    id: 1,
    icon: Recycle,
    title: 'Sustainably Made',
    description:
      'Eco-friendly materials & ethical production for a better planet.',
  },
  {
    id: 2,
    icon: Brain,
    title: 'Beyond Activewear',
    description:
      'Beyond activewear designed for movement, comfort, and confidence.',
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Movement Meets Style',
    description:
      'Movement meets style in every design, made for comfort and flow.',
  },
  {
    id: 4,
    icon: Heart,
    title: 'Designed for Every Body',
    description:
      'Inclusive designs that move with you, embracing every shape and size.',
  },
]

export const ValueProps = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
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
    <section
      ref={sectionRef}
      className="max-w-[1400px] mx-auto px-8 py-24 lg:py-32"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {valueProps.map((prop, index) => {
          const IconComponent = prop.icon
          return (
            <div
              key={prop.id}
              className={`flex flex-col items-center text-center group transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              {/* Icon Container */}
              <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500">
                <div className="relative">
                  <IconComponent
                    className="w-16 h-16 lg:w-20 lg:h-20 text-gray-800 stroke-[1.5]"
                    strokeWidth={1.5}
                  />
                  {/* Subtle circle background on hover */}
                  <div className="absolute inset-0 -m-4 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-serif text-gray-900 tracking-wide font-medium">
                  {prop.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed font-light max-w-xs mx-auto">
                  {prop.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
