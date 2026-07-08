import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react'
import { certifications } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[180px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, #3B82F6)' }} />

      <div className="section-container">
        <SectionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Credentials</span>
          </div>
          <h2 className="section-title">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Industry-recognized certifications from leading organizations
          </p>
        </SectionWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="card group hover:border-purple-600/40 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              {/* Color accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: cert.color }}
              />

              <div className="pt-4">
                {/* Org badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: cert.color, boxShadow: `0 0 15px ${cert.color}60` }}
                  >
                    {cert.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm leading-tight">{cert.organization}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Calendar size={10} className="text-zinc-500" />
                      <span className="text-xs text-zinc-500">{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors mb-2 text-sm leading-snug">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Credential link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    <ExternalLink size={12} />
                    View Credential
                  </a>
                )}

                {/* Award icon */}
                <Award
                  size={60}
                  className="absolute bottom-3 right-3 opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{ color: cert.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
