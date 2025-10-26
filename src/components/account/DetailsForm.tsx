/**
 * DetailsForm Component
 *
 * Form for updating user account details including email, name, and phone.
 * Provides validation and smooth transitions.
 *
 * @component
 * @example
 * ```tsx
 * <DetailsForm
 *   onSave={(data) => handleSave(data)}
 *   initialData={{
 *     email: 'user@example.com',
 *     fullName: 'John Doe',
 *     phone: '+1 (555) 000-0000'
 *   }}
 * />
 * ```
 */

import { useState } from 'react'

interface DetailsFormData {
  email: string
  fullName: string
  phone: string
}

interface DetailsFormProps {
  onSave?: (data: DetailsFormData) => void
  initialData?: Partial<DetailsFormData>
}

export const DetailsForm = ({ onSave, initialData }: DetailsFormProps) => {
  const [formData, setFormData] = useState<DetailsFormData>({
    email: initialData?.email || '',
    fullName: initialData?.fullName || '',
    phone: initialData?.phone || '',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      onSave?.(formData)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof DetailsFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <h1 className="text-3xl tracking-wide mb-8">DETAILS</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm tracking-wide mb-2 text-gray-700 font-medium"
          >
            EMAIL
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="
              w-full px-4 py-3 border border-gray-300
              focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              text-sm transition-all duration-200
            "
          />
        </div>

        {/* Full Name Field */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm tracking-wide mb-2 text-gray-700 font-medium"
          >
            FULL NAME
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="
              w-full px-4 py-3 border border-gray-300
              focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              text-sm transition-all duration-200
            "
          />
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm tracking-wide mb-2 text-gray-700 font-medium"
          >
            PHONE
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="
              w-full px-4 py-3 border border-gray-300
              focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              text-sm transition-all duration-200
            "
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="
            bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-wider
            hover:bg-gray-800 hover:shadow-lg
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
            transform hover:scale-[1.02]
          "
        >
          {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
      </form>
    </div>
  )
}
