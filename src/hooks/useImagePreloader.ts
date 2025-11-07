/**
 * useImagePreloader Hook
 *
 * Tracks loading state of all images on the page.
 * Returns true when all images have finished loading (or errored).
 *
 * @returns {boolean} imagesLoaded - True when all images are loaded
 */

import { useState, useEffect } from 'react'

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
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
  }, [])

  return imagesLoaded
}

