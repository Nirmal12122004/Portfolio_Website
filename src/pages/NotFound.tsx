import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />

      <div className="text-center z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[150px] font-black leading-none gradient-text mb-4">
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Link to="/" className="btn-primary">
              <Home size={16} />
              Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-ghost">
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
