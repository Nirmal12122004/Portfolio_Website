import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Download, MapPin, Sparkles } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { personalInfo } from '../../data/resumeData'

const socials = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!blobRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 30
      const y = (clientY / window.innerHeight - 0.5) * 30
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0B0B]"
    >
      {/* Animated background blobs */}
      <div ref={blobRef} className="absolute inset-0 transition-transform duration-700 ease-out pointer-events-none">
        <div
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 blob"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 blob blob-delay-1"
          style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }}
        />
        <div
          className="absolute top-[50%] left-[50%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 blob blob-delay-2"
          style={{ background: 'radial-gradient(circle, #7C3AED, #3B82F6, transparent 70%)' }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-600/30 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-sm text-zinc-400">
                Available for opportunities
              </span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">Hi, I'm</span>
              <br />
              <span className="gradient-text">Nirmal Patel</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              className="text-xl md:text-2xl text-zinc-400 font-medium mb-4 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TypeAnimation
                sequence={[
                  'AI/ML Developer', 2000,
                  'Deep Learning Engineer', 2000,
                  'Agentic AI Builder', 2000,
                  'Computer Vision Dev', 2000,
                  'Web Developer', 2000,
                  'IoT Engineer', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-purple-400"
              />
            </motion.div>

            {/* Location */}
            <motion.div
              className="flex items-center gap-2 text-zinc-500 text-sm mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <MapPin size={14} className="text-purple-400" />
              <span>{personalInfo.location}</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="/resume.pdf"
                download="Nirmal_Patel_Resume.pdf"
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Download Resume
              </motion.a>
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={16} />
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-600/50 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
              <div className="flex items-center gap-2 text-zinc-600 text-sm">
                <div className="h-[1px] w-8 bg-zinc-700" />
                <span>Follow me</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              {/* Animated ring */}
              <div
                className="absolute -inset-4 rounded-full opacity-30 animate-spin-slow"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #7C3AED, transparent, #3B82F6, transparent)',
                }}
              />
              <div
                className="absolute -inset-2 rounded-full opacity-20 animate-spin-slow blur-sm"
                style={{
                  background: 'conic-gradient(from 180deg, transparent, #3B82F6, transparent, #7C3AED, transparent)',
                  animationDirection: 'reverse',
                }}
              />

              {/* Photo container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden glass-dark border-2 border-white/10"
                style={{ boxShadow: '0 0 60px rgba(124, 58, 237, 0.3), 0 0 120px rgba(59, 130, 246, 0.1)' }}>
                <img
                  src={personalInfo.photo}
                  alt="Nirmal Patel"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* CGPA badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 glass border border-white/10 rounded-2xl px-4 py-2 text-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}
              >
                <div className="text-2xl font-black gradient-text">{personalInfo.cgpa}</div>
                <div className="text-xs text-zinc-500">CGPA</div>
              </motion.div>

              {/* AI badge */}
              <motion.div
                className="absolute -top-2 -left-2 glass border border-white/10 rounded-2xl px-3 py-2 flex items-center gap-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-xs text-zinc-300 font-medium">AI/ML Dev</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToAbout}
        >
          <span className="text-zinc-600 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={18} className="text-purple-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
