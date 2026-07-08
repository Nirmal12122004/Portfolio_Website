import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, BookOpen, Award, Calendar } from 'lucide-react'
import { education, certifications } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/4 w-72 h-72 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />

      <div className="section-container">
        <SectionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Academic background</span>
          </div>
          <h2 className="section-title">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            Academic journey and educational milestones
          </p>
        </SectionWrapper>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-purple-400" size={24} />
              <h3 className="text-xl font-bold text-white">Academic Timeline</h3>
            </div>

            <div className="relative pl-8 space-y-6">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-purple-600 to-transparent" />

              {education.map((edu, i) => (
                <EduCard key={edu.id} edu={edu} index={i} />
              ))}
            </div>
          </div>

          {/* Coursework + highlights */}
          <div className="space-y-6">
            <SectionWrapper delay={0.2}>
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-blue-400" size={20} />
                  <h3 className="text-lg font-bold text-white">Relevant Coursework</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {education[0].coursework.map(course => (
                    <span
                      key={course}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-blue-600/30 text-blue-300 bg-blue-600/10 hover:bg-blue-600/20 transition-colors cursor-default"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </SectionWrapper>

            <SectionWrapper delay={0.3}>
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-yellow-400" size={20} />
                  <h3 className="text-lg font-bold text-white">Academic Achievements</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Current CGPA', value: '9.18 / 10', desc: 'B.E. Information Technology' },
                    { label: 'H.S.C. Board', value: '82%', desc: 'Gujarat State Board' },
                    { label: 'S.S.C. Board', value: '83%', desc: 'Gujarat State Board' },
                  ].map(({ label, value, desc }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-zinc-300">{label}</p>
                        <p className="text-xs text-zinc-600">{desc}</p>
                      </div>
                      <span className="text-lg font-black gradient-text">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>

            {/* Quick cert summary */}
            <SectionWrapper delay={0.4}>
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-purple-400" size={20} />
                  <h3 className="text-lg font-bold text-white">Quick Facts</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Certifications', value: '7', color: 'text-purple-400' },
                    { label: 'Internships', value: '2', color: 'text-blue-400' },
                    { label: 'Projects Built', value: '7+', color: 'text-green-400' },
                    { label: 'Hackathon Rank', value: 'Semi-Final', color: 'text-yellow-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center p-4 rounded-xl bg-white/5">
                      <div className={`text-2xl font-black ${color}`}>{value}</div>
                      <div className="text-xs text-zinc-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}

function EduCard({ edu, index }: { edu: typeof education[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Dot */}
      <div className="absolute -left-8 top-3 timeline-dot" />

      <div className="card group hover:border-purple-600/40">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h4 className="font-bold text-white group-hover:text-purple-300 transition-colors">
              {edu.degree}
            </h4>
            <p className="text-purple-400 text-sm font-medium mt-0.5">{edu.institution}</p>
            {edu.university && (
              <p className="text-zinc-500 text-xs mt-0.5">{edu.university}</p>
            )}
          </div>
          <span className="text-xl font-black gradient-text whitespace-nowrap">
            {edu.grade.split(': ')[1] || edu.grade}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Calendar size={11} className="text-blue-400" />
            {edu.duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <GraduationCap size={11} className="text-purple-400" />
            {edu.location}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
