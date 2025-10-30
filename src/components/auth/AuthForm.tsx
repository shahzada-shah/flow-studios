/**
 * AuthForm Component
 *
 * Authentication form that handles both sign in and sign up flows.
 * Includes email, password, and confirm password fields with validation.
 *
 * Features:
 * - Email and password validation
 * - Password confirmation for sign up
 * - Loading states
 * - Accessible form controls
 * - Smooth animations
 *
 * @component
 * @example
 * ```tsx
 * <AuthForm
 *   mode="signin"
 *   onSubmit={(data) => handleAuth(data)}
 *   loading={false}
 * />
 * ```
 */

import { useState } from 'react'

type AuthMode = 'signin' | 'signup'

interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
}

interface AuthFormProps {
  mode: AuthMode
  onSubmit: (data: AuthFormData) => void
  loading?: boolean
}

export const AuthForm = ({ mode, onSubmit, loading = false }: AuthFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      email,
      password,
      ...(mode === 'signup' && { confirmPassword }),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
          autoComplete="off"
          className="
            w-full px-4 py-3 border border-gray-300
            focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
            text-sm transition-all duration-200
          "
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm tracking-wide mb-2 text-gray-700 font-medium"
        >
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
          autoComplete="new-password"
          className="
            w-full px-4 py-3 border border-gray-300
            focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
            text-sm transition-all duration-200
          "
        />
      </div>

      {/* Confirm Password Field (Sign Up Only) */}
      {mode === 'signup' && (
        <div className="animate-slideIn">
          <label
            htmlFor="confirmPassword"
            className="block text-sm tracking-wide mb-2 text-gray-700 font-medium"
          >
            CONFIRM PASSWORD
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            autoComplete="new-password"
            className="
              w-full px-4 py-3 border border-gray-300
              focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              text-sm transition-all duration-200
            "
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-wider
          hover:bg-gray-800 hover:shadow-lg
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
          transform hover:scale-[1.02]
        "
      >
        {loading ? 'LOADING...' : mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
      </button>
    </form>
  )
}
