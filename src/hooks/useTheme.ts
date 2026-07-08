import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme
    return saved || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      body.classList.remove('light')
      body.style.backgroundColor = '#0B0B0B'
      body.style.color = '#ffffff'
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      body.classList.add('light')
      body.style.backgroundColor = '#F8FAFC'
      body.style.color = '#0F172A'
    }

    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return { theme, toggleTheme }
}
