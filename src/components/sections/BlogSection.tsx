import { Clock } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface BlogPost {
  id: number
  category: string
  title: string
  description: string
  readTime: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: 'Wellness',
    title: 'Finding Confidence Through Movement',
    description:
      'Discover how embracing movement can boost self-love and body confidence every day.',
    readTime: '5 mins',
    image: '/images/blog/blog_left_01.png',
  },
  {
    id: 2,
    category: 'Wellness',
    title: 'The Power of Breathwork',
    description:
      'Unlock the benefits of mindful breathing to reduce stress and improve focus.',
    readTime: '10 min',
    image: '/images/blog/blog_center_01.png',
  },
  {
    id: 3,
    category: 'Wellness',
    title: 'Mindful Movement',
    description:
      'Discover how intentional movement can bring harmony to your mind and body.',
    readTime: '5 mins',
    image: '/images/blog/blog_right_01.png',
  },
]

export const BlogSection = () => {
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
    <section
      ref={sectionRef}
      className="max-w-[1600px] mx-auto px-8 py-24 lg:py-32 bg-gray-50"
    >
      {/* Header */}
      <div
        className={`mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 tracking-wide">
          BLOG
        </h2>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
        {blogPosts.map((post, index) => (
          <article
            key={post.id}
            className={`group cursor-pointer transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: `${index * 0.15}s`,
            }}
          >
            {/* Blog Image */}
            <div className="relative aspect-[4/5] bg-gray-200 mb-6 overflow-hidden rounded-sm">
              <img 
                src={post.image} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Category and Read Time */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium tracking-wide">{post.category}</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-serif text-gray-900 leading-tight group-hover:text-gray-600 transition-colors duration-300">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed font-light">
                {post.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Button */}
      <div
        className={`flex justify-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <button className="group relative px-12 py-4 border-2 border-gray-900 text-gray-900 font-medium tracking-wider text-sm lg:text-base hover:bg-gray-900 hover:text-white transition-all duration-500 overflow-hidden">
          <span className="relative z-10">MORE BLOG ARTICLES</span>
          {/* Sliding background effect */}
          <div className="absolute inset-0 bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        </button>
      </div>
    </section>
  )
}
