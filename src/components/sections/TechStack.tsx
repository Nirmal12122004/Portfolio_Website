import { motion } from 'framer-motion'
import { techStackBadges } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

export default function TechStack() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />

      <div className="section-container">
        <SectionWrapper className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-zinc-500">Technologies I work with daily</p>
        </SectionWrapper>

        {/* Floating badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {techStackBadges.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="px-5 py-2.5 rounded-full border font-medium text-sm cursor-default select-none"
              style={{
                color: tech.color,
                borderColor: `${tech.color}40`,
                backgroundColor: tech.bg,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{
                scale: 1.1,
                y: -4,
                boxShadow: `0 8px 25px ${tech.color}40`,
              }}
              animate={{
                y: [0, -4, 0],
                transition: {
                  duration: 3 + (i % 4) * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (i % 5) * 0.4,
                },
              }}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-4 animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
            {[...techStackBadges, ...techStackBadges].map((tech, i) => (
              <span
                key={`m-${i}`}
                className="px-4 py-1.5 rounded-full border text-xs font-medium"
                style={{
                  color: tech.color,
                  borderColor: `${tech.color}30`,
                  backgroundColor: tech.bg,
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
