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

import { useState, useEffect } from 'react'
import { passwordRequirements, isValidPassword } from '../../utils/validation'
import { Check, X } from 'lucide-react'

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
  const [showPasswordHints, setShowPasswordHints] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  useEffect(() => {
    if (mode === 'signup' && confirmPassword) {
      setPasswordsMatch(password === confirmPassword)
    }
  }, [password, confirmPassword, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'signup') {
      if (!isValidPassword(password)) {
        return
      }
      if (password !== confirmPassword) {
        setPasswordsMatch(false)
        return
      }
    }

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
          onFocus={() => mode === 'signup' && setShowPasswordHints(true)}
          placeholder="••••••••"
          required
          autoComplete="new-password"
          className="
            w-full px-4 py-3 border border-gray-300
            focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
            text-sm transition-all duration-200
          "
        />

        {/* Password Requirements - Show only in signup mode */}
        {mode === 'signup' && showPasswordHints && password.length > 0 && (
          <div className="mt-3 p-4 bg-gray-50 rounded-sm space-y-2 animate-slideDown">
            <p className="text-xs font-medium text-gray-700 tracking-wide mb-2">PASSWORD REQUIREMENTS</p>
            {passwordRequirements.map((req, index) => {
              const isMet = req.test(password)
              return (
                <div key={index} className="flex items-center gap-2">
                  {isMet ? (
                    <Check className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                  ) : (
                    <X className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                  )}
                  <span className={`text-xs ${
                    isMet ? 'text-green-700 font-medium' : 'text-gray-600'
                  }`}>
                    {req.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
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
            autoComplete="new-password"
            className={`
              w-full px-4 py-3 border transition-all duration-200
              focus:outline-none focus:ring-1
              ${!passwordsMatch && confirmPassword
                ? 'border-red-500 focus:border-red-600 focus:ring-red-600'
                : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'
              }
              text-sm
            `}
          />
          {!passwordsMatch && confirmPassword && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <X className="w-3 h-3" strokeWidth={2.5} />
              Passwords do not match
            </p>
          )}
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
