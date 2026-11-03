'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Preserve recipes and explanatory bookmarks shared before the Playground became a hub. */
export default function LegacyBenchRecipe() {
  const router = useRouter()

  useEffect(() => {
    const forward = () => {
      const { pathname, search, hash } = window.location
      if (pathname !== '/playground' && pathname !== '/playground/') return
      if (!hash.startsWith('#bench=') && hash !== '#how-it-works') return
      // The destination stays local; recipe parsing and validation remain with the instrument.
      router.replace(`/playground/geometry-bench${search}${hash}`)
    }
    let frame = requestAnimationFrame(forward)
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(forward)
    }
    window.addEventListener('hashchange', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', schedule)
    }
  }, [router])

  return null
}
