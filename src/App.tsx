import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import ScrollProgress from './components/ui/ScrollProgress'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Projects from './components/sections/Projects'
import Certifications from './components/sections/Certifications'
import Achievements from './components/sections/Achievements'
import TechStack from './components/sections/TechStack'
import Contact from './components/sections/Contact'
import NotFound from './pages/NotFound'

import { useTheme } from './hooks/useTheme'

function PortfolioPage() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Achievements />
      <TechStack />
      <Contact />
    </main>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <HashRouter>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <>
          <ScrollProgress />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#161616',
                color: '#fff',
                border: '1px solid #1E1E1E',
              },
            }}
          />
        </>
      )}
    </HashRouter>
  )
}
