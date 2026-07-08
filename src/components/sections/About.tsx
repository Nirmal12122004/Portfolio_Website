import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Mail, GraduationCap, Briefcase, Code2, Brain } from 'lucide-react'
import { personalInfo } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

const stats = [
  { icon: GraduationCap, label: 'CGPA', value: '9.18', color: 'text-purple-400' },
  { icon: Briefcase, label: 'Internships', value: '2', color: 'text-blue-400' },
  { icon: Code2, label: 'Projects', value: '7+', color: 'text-green-400' },
  { icon: Brain, label: 'Certifications', value: '7', color: 'text-yellow-400' },
]

const highlights = [
  { label: 'Degree', value: 'B.E. in Information Technology' },
  { label: 'University', value: 'Ahmedabad Institute of Technology (GTU)' },
  { label: 'Location', value: 'Ahmedabad, Gujarat, India' },
  { label: 'Email', value: personalInfo.email },
  { label: 'Status', value: 'Open to Opportunities' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      <div className="section-container">
        {/* Section header */}
        <SectionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Get to know me</span>
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Passionate AI/ML developer and software engineer crafting intelligent solutions
          </p>
        </SectionWrapper>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Bio + info */}
          <div className="space-y-8">
            <SectionWrapper>
              <div className="card space-y-6">
                <h3 className="text-xl font-bold text-white">Professional Summary</h3>
                <p className="text-zinc-400 leading-relaxed">
                  I'm a highly motivated B.E. Information Technology student at Ahmedabad Institute of Technology (GTU)
                  with an outstanding CGPA of 9.18. I'm deeply passionate about Artificial Intelligence, Machine Learning,
                  and Agentic AI systems.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  With hands-on experience from internships at Microsoft Elevate and CSRBOX by IBM, I've built real-world
                  AI-powered applications including an Agentic AI restaurant chatbot, AI movie recommendation system,
                  and Computer Vision projects using OpenCV. I specialize in bridging the gap between AI research
                  and practical, deployable applications.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  As a natural team leader — having led multiple hackathon and project teams — I combine
                  technical depth with strong communication and problem-solving skills to deliver impactful solutions.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {highlights.map(({ label, value }) => (
                    <div key={label} className="space-y-1">
                      <p className="text-xs text-zinc-600 uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-zinc-300 font-medium truncate">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>

            {/* Quick links */}
            <SectionWrapper delay={0.1}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 hover:border-purple-600/50 text-zinc-400 hover:text-white transition-all text-sm"
                >
                  <Mail size={14} className="text-purple-400" />
                  {personalInfo.email}
                </a>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-zinc-400 text-sm">
                  <MapPin size={14} className="text-green-400" />
                  {personalInfo.location}
                </div>
              </div>
            </SectionWrapper>
          </div>

          {/* Right: Stats + interests */}
          <div className="space-y-6">
            {/* Stats grid */}
            <SectionWrapper>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ icon: Icon, label, value, color }, i) => (
                  <motion.div
                    key={label}
                    className="card text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(124, 58, 237, 0.2)' }}
                  >
                    <Icon size={28} className={`${color} mx-auto mb-3`} />
                    <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                    <div className="text-zinc-500 text-sm">{label}</div>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* Interests */}
            <SectionWrapper delay={0.2}>
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Areas of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Machine Learning', 'Deep Learning', 'Agentic AI', 'Computer Vision',
                    'NLP', 'Prompt Engineering', 'Web Development', 'IoT',
                    'Robotics', 'Data Science',
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-purple-600/30 text-purple-300 bg-purple-600/10 hover:bg-purple-600/20 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SectionWrapper>

            {/* Languages */}
            <SectionWrapper delay={0.3}>
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Languages</h3>
                <div className="space-y-3">
                  {[
                    { lang: 'English', level: 'Professional', pct: 85 },
                    { lang: 'Hindi', level: 'Native', pct: 100 },
                    { lang: 'Gujarati', level: 'Native', pct: 100 },
                  ].map(({ lang, level, pct }) => (
                    <div key={lang} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-300">{lang}</span>
                        <span className="text-zinc-500">{level}</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${pct}%` } : {}}
                          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        />
                      </div>
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
