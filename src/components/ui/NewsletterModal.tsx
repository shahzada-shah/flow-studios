import { X } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useToast } from '../../context/ToastContext'

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }

    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    showToast('Successfully subscribed to newsletter!', 'success')
    setIsSubmitting(false)
    setEmail('')
    onClose()
  }

  const handleDecline = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-6xl bg-white shadow-2xl animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
        </button>

        <div className="grid md:grid-cols-2 min-h-[600px]">
          <div className="relative bg-gray-900 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1308484/pexels-photo-1308484.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Newsletter"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          <div className="flex flex-col justify-center px-12 py-16 bg-white">
            <div className="mb-12">
              <h2 className="text-4xl font-light tracking-[0.2em] text-gray-900 mb-2">
                MOVE
              </h2>
              <p className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                Active Living
              </p>
            </div>

            <h3 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Discover More
            </h3>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Exclusive news and iconic products are waiting for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email*"
                  required
                  className="w-full px-6 py-4 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors duration-200 text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-4 text-sm tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>

              <button
                type="button"
                onClick={handleDecline}
                className="w-full text-gray-900 py-2 text-sm tracking-[0.3em] uppercase font-medium underline hover:no-underline transition-all duration-200"
              >
                Decline
              </button>
            </form>

            <p className="mt-8 text-sm text-gray-500 leading-relaxed">
              By signing up you are providing consent to be contacted by us. You'll get the latest news, exclusives and offers right in your inbox. For more details, read our{' '}
              <a href="#" className="underline hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
