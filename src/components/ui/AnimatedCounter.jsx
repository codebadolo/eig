import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', className = '' }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const animated = useRef(false)

  useEffect(() => {
    if (!isInView || animated.current) return
    const num = parseFloat(value)
    if (isNaN(num)) { setDisplay(value); return }
    animated.current = true
    let start = 0
    const duration = 1200
    const step = duration / 60
    const increment = num / 60
    const timer = setInterval(() => {
      start += increment
      if (start >= num) {
        setDisplay(String(num))
        clearInterval(timer)
      } else {
        setDisplay(String(Math.floor(start)))
      }
    }, step)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  )
}
