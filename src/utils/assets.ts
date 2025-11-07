/**
 * Asset path helper for GitHub Pages deployment
 * Prepends the base URL to asset paths
 */

export const getAssetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/'
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Ensure base ends with slash
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`
  return `${baseWithSlash}${cleanPath}`
}

export const getImagePath = (path: string): string => getAssetPath(path)

