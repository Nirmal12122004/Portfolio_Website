import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Star, Zap } from 'lucide-react'
import { achievements } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
  const isFloat = target.includes('.')
  const isText = isNaN(numericTarget)

  useEffect(() => {
    if (!inView || isText) return
    const duration = 2000
    const steps = 50
    const increment = numericTarget / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, numericTarget)
      setCount(current)
      if (current >= numericTarget) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, numericTarget, isText])

  if (isText) {
    return <span ref={ref}>{target}</span>
  }

  const display = isFloat ? count.toFixed(2) : Math.round(count).toString()

  return <span ref={ref}>{display}{suffix}</span>
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      <div className="section-container">
        <SectionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Milestones</span>
          </div>
          <h2 className="section-title">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Numbers that tell the story of dedication and growth
          </p>
        </SectionWrapper>

        {/* Animated counter grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.label}
              className="card text-center py-8 group hover:border-purple-600/40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.2)' }}
            >
              <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
                <AnimatedCounter target={ach.value} suffix={ach.suffix} />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{ach.label}</div>
              <div className="text-xs text-zinc-600 leading-tight">{ach.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Trophy,
              color: 'text-yellow-400',
              bg: 'bg-yellow-500/10',
              border: 'border-yellow-500/30',
              title: 'National Hackathon Semi-Finalist',
              desc: 'Led the team to reach the Semi-Finals at a National Level Hackathon with an innovative Arduino-based Fire Safety Car project.',
            },
            {
              icon: Star,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10',
              border: 'border-purple-500/30',
              title: 'CGPA 9.18 – Top Performer',
              desc: 'Maintaining an outstanding CGPA of 9.18 in B.E. Information Technology at Ahmedabad Institute of Technology (GTU).',
            },
            {
              icon: Zap,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10',
              border: 'border-blue-500/30',
              title: 'Microsoft Elevate Intern',
              desc: 'Successfully completed a 3-month virtual internship at Microsoft Elevate on AI, ML, and Microsoft Copilot technologies.',
            },
          ].map(({ icon: Icon, color, bg, border, title, desc }, i) => (
            <motion.div
              key={title}
              className={`card border ${border} hover:scale-[1.02] group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-12 h-12 ${bg} border ${border} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={24} className={color} />
              </div>
              <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
