/**
 * AuthTabs Component
 *
 * Tab switcher for authentication mode (Sign In / Sign Up).
 * Features animated underline indicator that slides to the active tab.
 *
 * @component
 * @example
 * ```tsx
 * <AuthTabs
 *   activeMode="signin"
 *   onModeChange={(mode) => setMode(mode)}
 * />
 * ```
 */

type AuthMode = 'signin' | 'signup'

interface AuthTabsProps {
  activeMode: AuthMode
  onModeChange: (mode: AuthMode) => void
}

export const AuthTabs = ({ activeMode, onModeChange }: AuthTabsProps) => {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        onClick={() => onModeChange('signin')}
        className={`
          flex-1 pb-4 text-sm font-medium tracking-wider
          transition-all duration-300 relative
          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
          ${activeMode === 'signin' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}
        `}
      >
        SIGN IN
        {activeMode === 'signin' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 animate-slideIn" />
        )}
      </button>
      <button
        onClick={() => onModeChange('signup')}
        className={`
          flex-1 pb-4 text-sm font-medium tracking-wider
          transition-all duration-300 relative
          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
          ${activeMode === 'signup' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}
        `}
      >
        SIGN UP
        {activeMode === 'signup' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 animate-slideIn" />
        )}
      </button>
    </div>
  )
}
