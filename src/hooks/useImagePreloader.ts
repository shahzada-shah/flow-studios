/**
 * useImagePreloader Hook
 *
 * Tracks loading state of all images on the page.
 * Returns true when all images have finished loading (or errored).
 * Can be reset to track new images on route changes.
 *
 * @param {number} resetTrigger - Change this value to reset and re-track images
 * @returns {boolean} imagesLoaded - True when all images are loaded
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

      const checkIfAllLoaded = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }

      // Check if images are already loaded (cached)
      images.forEach((img) => {
        if (img.complete) {
          checkIfAllLoaded()
        } else {
          img.addEventListener('load', checkIfAllLoaded)
          img.addEventListener('error', checkIfAllLoaded) // Count errors as "loaded" to prevent infinite loading
        }
      })

      // Cleanup
      return () => {
        images.forEach((img) => {
          img.removeEventListener('load', checkIfAllLoaded)
          img.removeEventListener('error', checkIfAllLoaded)
        })
      }
    }, 100) // 100ms delay for content to render

    return () => clearTimeout(initTimer)
  }, [resetTrigger])

  return imagesLoaded
}

