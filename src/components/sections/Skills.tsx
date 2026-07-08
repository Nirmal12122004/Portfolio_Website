import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

const categoryIcons: Record<string, string> = {
  'Programming Languages': '⌨️',
  'AI / Machine Learning': '🤖',
  'Web Development': '🌐',
  'Hardware / IoT': '🔧',
  'Tools & Platforms': '🛠️',
  'Soft Skills': '🧠',
}

const categoryColors: Record<string, string> = {
  'Programming Languages': 'from-blue-600 to-cyan-500',
  'AI / Machine Learning': 'from-purple-600 to-pink-500',
  'Web Development': 'from-green-600 to-teal-500',
  'Hardware / IoT': 'from-orange-600 to-yellow-500',
  'Tools & Platforms': 'from-gray-600 to-slate-500',
  'Soft Skills': 'from-rose-600 to-pink-500',
}

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
          {name}
        </span>
        <motion.span
          className="text-xs text-zinc-500 font-mono"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute left-0 top-1/3 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />

      <div className="section-container">
        <SectionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">My expertise</span>
          </div>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive set of skills across AI/ML, programming, web development, and more
          </p>
        </SectionWrapper>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map(([category, items], catIdx) => (
            <motion.div
              key={category}
              className="card group hover:border-purple-600/40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              whileHover={{ y: -4 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[category] || 'from-purple-600 to-blue-500'} flex items-center justify-center text-xl flex-shrink-0`}>
                  {categoryIcons[category] || '⚡'}
                </div>
                <h3 className="font-bold text-white text-sm leading-tight">{category}</h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {items.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={catIdx * 0.08 + i * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill tags cloud */}
        <SectionWrapper className="mt-16">
          <div className="card text-center">
            <h3 className="text-lg font-bold text-white mb-6">All Technologies</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.values(skills).flat().map((skill, i) => (
                <motion.span
                  key={`${skill.name}-${i}`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-zinc-400 hover:text-white hover:border-purple-600/50 hover:bg-purple-600/10 transition-all cursor-default"
                  whileHover={{ scale: 1.08 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
