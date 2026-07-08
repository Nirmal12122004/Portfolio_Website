import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'
import { personalInfo } from '../../data/resumeData'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5 bg-[#0A0A0A] py-12 mt-0">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #3B82F6, transparent)' }} />

      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
              >
                N
              </div>
              <span className="font-bold text-white">Nirmal Patel</span>
            </div>
            <p className="text-zinc-500 text-sm text-center md:text-left">
              AI/ML Developer & Software Engineer
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: personalInfo.github, label: 'GitHub' },
              { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-600/50 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group"
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:border-purple-600/50 transition-all">
              <ArrowUp size={14} />
            </div>
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <p>
            © {new Date().getFullYear()} Nirmal Patel. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built using React, TypeScript & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
