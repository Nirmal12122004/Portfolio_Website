import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react'
import { experience } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      <div className="section-container">
        <SectionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Work history</span>
          </div>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Industry internships and hands-on experience with leading organizations
          </p>
        </SectionWrapper>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-600/60 via-blue-600/40 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {experience.map((exp, i) => {
              const isEven = i % 2 === 0
              return (
                <ExperienceCard key={exp.id} exp={exp} index={i} isEven={isEven} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ExpCardProps {
  exp: typeof experience[0]
  index: number
  isEven: boolean
}

function ExperienceCard({ exp, index, isEven }: ExpCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`relative sm:flex gap-8 ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-start`}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline dot (desktop) */}
      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{ backgroundColor: exp.color, boxShadow: `0 0 20px ${exp.color}60` }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
        >
          {exp.logo}
        </motion.div>
      </div>

      {/* Card */}
      <div className={`w-full sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}>
        <div className="card hover:border-purple-600/40 transition-all group">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              {/* Mobile logo */}
              <div
                className="sm:hidden w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ backgroundColor: exp.color }}
              >
                {exp.logo}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {exp.role}
                </h3>
                <p className="text-purple-400 font-semibold">{exp.company}</p>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Calendar size={12} className="text-blue-400" />
              {exp.duration}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Briefcase size={12} className="text-purple-400" />
              {exp.type}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <MapPin size={12} className="text-green-400" />
              {exp.location}
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">{exp.description}</p>

          {/* Responsibilities */}
          <ul className="space-y-2 mb-4">
            {exp.responsibilities.map((r, ri) => (
              <motion.li
                key={ri}
                className="flex items-start gap-2 text-sm text-zinc-400"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + ri * 0.07 + 0.3 }}
              >
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: exp.color }} />
                {r}
              </motion.li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {exp.technologies.map(tech => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md text-xs font-medium border border-white/10 text-zinc-400 bg-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for other side */}
      <div className="hidden sm:block w-[calc(50%-2.5rem)]" />
    </motion.div>
  )
}
