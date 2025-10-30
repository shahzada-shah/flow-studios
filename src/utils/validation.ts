/**
 * Validate email format
 * @param email - Email address to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Password validation requirements
 */
export interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    test: (pwd) => pwd.length >= 8,
  },
  {
    label: 'One uppercase letter',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    label: 'One lowercase letter',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    label: 'One number',
    test: (pwd) => /[0-9]/.test(pwd),
  },
  {
    label: 'One special character',
    test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  },
]

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns True if password meets all requirements
 */
export const isValidPassword = (password: string): boolean => {
  return passwordRequirements.every((req) => req.test(password))
}

/**
 * Get password strength as percentage
 * @param password - Password to check
 * @returns Percentage of requirements met (0-100)
 */
export const getPasswordStrength = (password: string): number => {
  const metRequirements = passwordRequirements.filter((req) => req.test(password)).length
  return (metRequirements / passwordRequirements.length) * 100
}

/**
 * Validate required field
 * @param value - Value to check
 * @returns True if value is not empty
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0
}

/**
 * Validate phone number format (US)
 * @param phone - Phone number to validate
 * @returns True if phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s()+-]{10,}$/
  return phoneRegex.test(phone)
}
