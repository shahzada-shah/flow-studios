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
 * Validate password strength
 * @param password - Password to validate
 * @returns True if password meets requirements (min 8 chars)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8
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
