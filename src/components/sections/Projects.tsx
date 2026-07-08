import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, Users } from 'lucide-react'
import { projects } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

const categories = ['All', 'AI/Web', 'Web', 'Computer Vision', 'IoT/Hardware']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />

      <div className="section-container">
        <SectionWrapper className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">My work</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world projects spanning AI, web development, computer vision, and IoT
          </p>
        </SectionWrapper>

        {/* Filter tabs */}
        <SectionWrapper className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'text-white border-transparent shadow-lg'
                  : 'glass border border-white/10 text-zinc-400 hover:text-white hover:border-purple-600/40'
              }`}
              style={activeFilter === cat ? { background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' } : {}}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </SectionWrapper>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-600/50 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      style={{
        boxShadow: hovered ? '0 20px 60px rgba(124, 58, 237, 0.2)' : 'none',
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm border border-white/10 text-zinc-300">
            {project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-yellow-500/40 text-yellow-400 bg-yellow-500/10 flex items-center gap-1">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          </div>
        )}

        {/* Team lead badge */}
        {project.role === 'Team Leader' && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-blue-500/40 text-blue-300 bg-blue-500/10 flex items-center gap-1">
              <Users size={10} />
              Team Leader
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-xs text-purple-400 font-medium mb-3">{project.subtitle}</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Achievements */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.achievements.slice(0, 3).map(a => (
            <span key={a} className="px-2 py-0.5 rounded text-xs border border-green-600/30 text-green-400 bg-green-600/10">
              {a}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map(tech => (
            <span key={tech} className="px-2 py-0.5 rounded text-xs border border-white/10 text-zinc-500 bg-white/5">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
              whileHover={{ x: 2 }}
            >
              <ExternalLink size={14} />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white font-medium transition-colors ml-auto"
              whileHover={{ x: 2 }}
            >
              <Github size={14} />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
