import { useState } from 'react'
import { Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const footerColumns: FooterColumn[] = [
  {
    title: 'SHOP',
    links: [
      { label: 'New Arrivals', href: '#' },
      { label: 'Leggings', href: '#' },
      { label: 'Sports Bras', href: '#' },
      { label: 'Tops & Layers', href: '#' },
      { label: 'Accessories', href: '#' },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      { label: 'Shipping & Returns', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'Gift Cards', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    title: 'CONNECT',
    links: [
      { label: 'Our Story', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Wellness Journal', href: '#' },
    ],
  },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [showCredits, setShowCredits] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribe:', email)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Newsletter Section */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4 tracking-wide">
              Subscribe for Updates
            </h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Join our community for exclusive launches, wellness tips, and mindful movement inspiration.
            </p>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex gap-0 border-b border-gray-900 transition-all duration-300 hover:border-gray-600">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="flex-1 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="px-8 py-3 bg-gray-900 text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-6 mt-12">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  <span className="text-sm font-medium tracking-wider uppercase">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-sm font-medium text-gray-900 tracking-wider mb-6">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-base text-gray-600 hover:text-gray-900 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Credits Section */}
            <div className="flex-1">
              <div className="text-sm text-gray-600 text-center lg:text-left">
                <span>DEVELOPED BY </span>
                <button
                  onMouseEnter={() => setShowCredits(true)}
                  onMouseLeave={() => setShowCredits(false)}
                  className="font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300 tracking-wider"
                >
                  KAZI DIGITAL STUDIO
                </button>
              </div>

              {/* Credits Overlay */}
              <div
                className={`mt-3 text-sm text-gray-500 transition-all duration-500 text-center lg:text-left ${
                  showCredits
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'
                }`}
              >
                <span className="inline-block mr-4">
                  <span className="font-medium text-gray-700">Shahzada Shah</span>
                  <span className="text-gray-400"> - Lead Senior Developer</span>
                </span>
                <span className="inline-block">
                  <span className="font-medium text-gray-700">Jimmy Carrera</span>
                  <span className="text-gray-400"> - Lead Designer</span>
                </span>
              </div>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
