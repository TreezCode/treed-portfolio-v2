import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

interface HeroContent {
  headText: string[]
  subText: string[]
}

export function useTyped(heroContent: HeroContent) {
  const headTextRef = useRef<HTMLSpanElement>(null)
  const subTextRef = useRef<HTMLSpanElement>(null)
  const typedHeadText = useRef<Typed | null>(null)
  const typedSubText = useRef<Typed | null>(null)

  useEffect(() => {
    if (!headTextRef.current || !subTextRef.current) return

    const headTextOptions = {
      strings: heroContent.headText,
      typeSpeed: 50,
      startDelay: 2000,
      showCursor: true,
      cursorChar: '&nbsp;',
      onComplete: (self: Typed) => {
        self.cursor.remove()
      },
    }

    const subTextOptions = {
      strings: heroContent.subText,
      typeSpeed: 40,
      backSpeed: 20,
      startDelay: 4500,
      backDelay: 2500,
      loop: true,
      loopCount: Infinity,
    }

    typedHeadText.current = new Typed(headTextRef.current, headTextOptions)
    typedSubText.current = new Typed(subTextRef.current, subTextOptions)

    return () => {
      typedHeadText.current?.destroy()
      typedSubText.current?.destroy()
    }
  }, [heroContent])

  return { headTextRef, subTextRef }
}
