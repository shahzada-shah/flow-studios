/**
 * useImagePreloader Hook
 *
 * Tracks loading state of images on the page.
 * Returns true when 50% of images have loaded for faster content display.
 * Can be reset to track new images on route changes.
 *
 * @param {number} resetTrigger - Change this value to reset and re-track images
 * @returns {boolean} imagesLoaded - True when 50% of images are loaded
 */

import { useState, useEffect } from 'react'

export const useImagePreloader = (resetTrigger = 0) => {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    // Reset loading state when resetTrigger changes
    setImagesLoaded(false)

    // Small delay to allow new page content to render
    const initTimer = setTimeout(() => {
      // Get all images currently in the DOM
      const images = Array.from(document.images)
      
      if (images.length === 0) {
        // No images on page, consider loaded
        setImagesLoaded(true)
        return
      }

      let loadedCount = 0
      const totalImages = images.length
      // Show content after 50% of images load instead of waiting for all
      const threshold = Math.ceil(totalImages * 0.5)

      const checkProgress = () => {
        loadedCount++
        // Show content once we hit 50% threshold
        if (loadedCount >= threshold) {
          setImagesLoaded(true)
        }
      }

      // Check if images are already loaded (cached)
      images.forEach((img) => {
        if (img.complete) {
          checkProgress()
        } else {
          img.addEventListener('load', checkProgress)
          img.addEventListener('error', checkProgress) // Count errors as "loaded" to prevent infinite loading
        }
      })

      // Cleanup
      return () => {
        images.forEach((img) => {
          img.removeEventListener('load', checkProgress)
          img.removeEventListener('error', checkProgress)
        })
      }
    }, 100) // 100ms delay for content to render

    return () => clearTimeout(initTimer)
  }, [resetTrigger])

  return imagesLoaded
}

