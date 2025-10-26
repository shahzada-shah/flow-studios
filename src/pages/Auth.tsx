/**
 * Auth Page
 *
 * Authentication page that handles both sign in and sign up flows.
 * Features a clean, minimal design with smooth transitions between modes.
 *
 * Features:
 * - Toggle between Sign In and Sign Up
 * - Email and password authentication via Supabase
 * - Password confirmation for sign up
 * - Toast notifications for success/error states
 * - Forgot password link (sign in mode only)
 * - Continue shopping link
 *
 * @page
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { AuthTabs } from '../components/auth/AuthTabs'
import { AuthForm } from '../components/auth/AuthForm'

type AuthMode = 'signin' | 'signup'

interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
}

export const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const { showToast } = useToast()

  const handleSubmit = async (formData: AuthFormData) => {
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          showToast('Passwords do not match', 'error')
          setLoading(false)
          return
        }

        const { error } = await signUp(formData.email, formData.password)
        if (error) {
          showToast(error.message, 'error')
        } else {
          showToast('Account created successfully!', 'success')
          navigate('/')
        }
      } else {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          showToast(error.message, 'error')
        } else {
          showToast('Welcome back!', 'success')
          navigate('/')
        }
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-block group mb-8 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
          >
            <h1 className="text-4xl font-serif tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors duration-200">
              MOVE
            </h1>
            <p className="text-xs tracking-widest text-gray-600 mt-1">EST.2025</p>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="border border-gray-200 p-8 hover:border-gray-300 transition-colors duration-200">
          <AuthTabs activeMode={mode} onModeChange={setMode} />
          <AuthForm mode={mode} onSubmit={handleSubmit} loading={loading} />

          {/* Forgot Password Link (Sign In Only) */}
          {mode === 'signin' && (
            <div className="mt-6 text-center">
              <button
                className="
                  text-sm text-gray-600 hover:text-gray-900 underline
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                "
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {/* Continue Shopping Link */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <Link
            to="/"
            className="
              hover:text-gray-900 underline transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded
            "
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
