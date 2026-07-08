import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { navLinks } from '../../data/resumeData'

interface Props {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' },
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const isLight = theme === 'light'

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isLight
              ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm'
              : 'bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
              >
                N
              </div>
              <span className={`font-bold text-lg hidden sm:block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Nirmal<span className="gradient-text"> Patel</span>
              </span>
            </motion.button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => {
                const id = href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-purple-400'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900'
                          : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        className="absolute inset-x-2 bottom-0 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, #7C3AED, #3B82F6)' }}
                        layoutId="nav-indicator"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-zinc-400 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Nirmal_Patel_Resume.pdf"
                className="hidden md:flex btn-primary text-sm py-2 px-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={14} />
                Resume
              </motion.a>

              <button
                className={`md:hidden p-2 rounded-lg ${isLight ? 'text-slate-700' : 'text-white'}`}
                onClick={() => setMenuOpen(prev => !prev)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`fixed inset-0 z-40 pt-16 md:hidden ${
              isLight ? 'bg-white/98' : 'bg-[#0B0B0B]/98'
            } backdrop-blur-xl`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="section-container py-8 flex flex-col gap-2">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`text-left py-4 px-4 rounded-xl text-lg font-medium transition-all ${
                    activeSection === href.replace('#', '')
                      ? 'text-purple-400 bg-purple-600/10'
                      : isLight
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-zinc-300 hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {label}
                </motion.button>
              ))}

              <motion.a
                href="/resume.pdf"
                download="Nirmal_Patel_Resume.pdf"
                className="mt-4 btn-primary justify-center py-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
