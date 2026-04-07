'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Technology } from '@/data/technologies'

interface TechModalProps {
  tech: Technology | null
  onClose: () => void
}

export function TechModal({ tech, onClose }: TechModalProps) {
  if (!tech) return null

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'frontend':
        return {
          color: '#915eff',
          shape: 'Tetrahedron',
          element: 'Fire',
          description: 'Foundation of user interfaces and visual experiences'
        }
      case 'backend':
        return {
          color: '#00d4ff',
          shape: 'Cube',
          element: 'Earth',
          description: 'Server-side logic and data processing'
        }
      case 'database':
        return {
          color: '#ff6b9d',
          shape: 'Octahedron',
          element: 'Air',
          description: 'Data storage and retrieval systems'
        }
      case 'tools':
        return {
          color: '#915eff',
          shape: 'Dodecahedron',
          element: 'Ether',
          description: 'Development tools and utilities'
        }
      default:
        return {
          color: '#915eff',
          shape: 'Icosahedron',
          element: 'Water',
          description: 'Versatile technology'
        }
    }
  }

  const categoryInfo = getCategoryInfo(tech.category)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: `radial-gradient(circle at top left, ${categoryInfo.color}20, transparent 70%), 
                        radial-gradient(circle at bottom right, ${categoryInfo.color}10, transparent 70%),
                        rgba(10, 10, 20, 0.95)`,
            border: `1px solid ${categoryInfo.color}40`,
            boxShadow: `0 0 60px ${categoryInfo.color}30, inset 0 0 60px ${categoryInfo.color}10`,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            style={{ color: categoryInfo.color }}
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Sacred Geometry Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${categoryInfo.color}40, ${categoryInfo.color}10)`,
                  boxShadow: `0 0 30px ${categoryInfo.color}50`,
                  border: `2px solid ${categoryInfo.color}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full"
                  style={{
                    background: categoryInfo.color,
                    boxShadow: `0 0 20px ${categoryInfo.color}`,
                  }}
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider opacity-70">{tech.category}</p>
                <h2 className="text-4xl font-bold" style={{ color: categoryInfo.color }}>
                  {tech.name}
                </h2>
              </div>
            </div>

            {/* Sacred Geometry Info */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Sacred Form</p>
                <p className="text-lg font-semibold" style={{ color: categoryInfo.color }}>
                  {categoryInfo.shape}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Element</p>
                <p className="text-lg font-semibold" style={{ color: categoryInfo.color }}>
                  {categoryInfo.element}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Category</p>
                <p className="text-lg font-semibold capitalize" style={{ color: categoryInfo.color }}>
                  {tech.category}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider opacity-70 mb-3">Purpose</h3>
              <p className="text-lg text-text-secondary leading-relaxed">
                {categoryInfo.description}
              </p>
            </div>

            {/* Decorative geometric pattern */}
            <div className="flex justify-center gap-2 opacity-30">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: categoryInfo.color,
                    boxShadow: `0 0 10px ${categoryInfo.color}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              border: `1px solid ${categoryInfo.color}`,
              opacity: 0.5,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
