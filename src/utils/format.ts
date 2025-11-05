/**
 * Formatting Utilities
 *
 * Common formatting functions for currency, dates, text, and URLs.
 * These utilities ensure consistent formatting across the application.
 */

/**
 * Format a number as USD currency
 *
 * Uses Intl.NumberFormat for proper currency formatting with locale support.
 *
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "$99.00")
 *
 * @example
 * formatCurrency(99) // "$99.00"
 * formatCurrency(1234.56) // "$1,234.56"
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Format a date string to a readable format
 *
 * Converts ISO date strings to human-readable format.
 *
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "Jan 15, 2024")
 *
 * @example
 * formatDate("2024-01-15T10:30:00Z") // "Jan 15, 2024"
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Truncate text to a specified length
 *
 * Shortens text and adds ellipsis if it exceeds the maximum length.
 * Useful for previews and limited display areas.
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 *
 * @example
 * truncateText("This is a long description", 10) // "This is a ..."
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Generate a URL-friendly slug from text
 *
 * Converts text to lowercase, removes special characters,
 * and replaces spaces with hyphens for use in URLs.
 *
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 *
 * @example
 * slugify("Women's Yoga Pants") // "womens-yoga-pants"
 * slugify("High-Performance Running Shoes!") // "high-performance-running-shoes"
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}
