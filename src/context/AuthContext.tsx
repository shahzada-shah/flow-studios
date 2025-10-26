/**
 * AuthContext
 *
 * Provides authentication state and methods throughout the application.
 * Handles user session management via Supabase Auth.
 *
 * Features:
 * - User session management
 * - Sign up with email/password
 * - Sign in with email/password
 * - Sign out functionality
 * - Real-time auth state updates
 *
 * @context
 * @example
 * ```tsx
 * const { user, signIn, signOut } = useAuth()
 * ```
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider Component
 *
 * Wraps the app to provide authentication context.
 * Initializes and manages auth state from Supabase.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    // Using async block inside callback to avoid deadlocks
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null)
      })()
    })

    return () => subscription.unsubscribe()
  }, [])

  /**
   * Sign up a new user with email and password
   * @param email - User's email address
   * @param password - User's password (min 6 characters)
   * @returns Promise with error if failed
   */
  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  /**
   * Sign in an existing user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with error if failed
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth Hook
 *
 * Custom hook to access authentication context.
 * Must be used within an AuthProvider.
 *
 * @throws Error if used outside AuthProvider
 * @returns Authentication context with user state and auth methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
