import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: Props) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B0B0B]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-black text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>
                N
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -inset-1 rounded-2xl opacity-50 blur-lg"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }} />
            </motion.div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xl font-bold text-white tracking-widest">NIRMAL PATEL</p>
              <p className="text-sm text-zinc-500 mt-1 tracking-widest uppercase">AI/ML Developer</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #7C3AED, #3B82F6)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-purple-600"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
