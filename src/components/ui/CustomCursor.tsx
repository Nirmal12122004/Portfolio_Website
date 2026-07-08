import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animateRing)
    }

    const addHover = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-cursor="pointer"]')) {
        dotRef.current?.classList.add('hovering')
        ringRef.current?.classList.add('hovering')
      }
    }

    const removeHover = () => {
      dotRef.current?.classList.remove('hovering')
      ringRef.current?.classList.remove('hovering')
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', addHover)
    document.addEventListener('mouseout', removeHover)
    rafRef.current = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', addHover)
      document.removeEventListener('mouseout', removeHover)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}
