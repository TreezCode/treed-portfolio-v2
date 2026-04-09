'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'
import { SeedOfLife } from '@/components/backgrounds/SeedOfLife'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// Dynamically import 3D Sacred Geometry Orb component
// Loading placeholder prevents layout shift and improves perceived performance
const SacredGeometryOrbCanvas = dynamic(
  () => import('@/components/three/SacredGeometryOrbCanvas').then((mod) => mod.SacredGeometryOrbCanvas),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[280px] sm:h-[380px] lg:h-[550px] bg-transparent flex items-center justify-center" aria-label="Loading sacred geometry orb">
        {/* Pink loading spinner matching contact section theme */}
        <div className="w-12 h-12 border-2 border-[#ff6b9d]/20 border-t-[#ff6b9d] rounded-full animate-spin" />
      </div>
    )
  }
)

const SendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
)

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const AlertIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Lazy load 3D orb when approaching viewport (300px before)
  const { ref: observerRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '300px', // Load 300px before entering viewport
    threshold: 0,
    triggerOnce: true, // Only load once
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setSubmitStatus('success')
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBaseClass =
    'w-full max-w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a14] border border-white/10 rounded-xl text-white placeholder-gray-500 transition-all duration-300 box-border text-sm sm:text-base focus:outline-none focus:border-transparent'

  return (
    <section id="contact" aria-label="Contact" className="relative py-12 sm:py-24 overflow-x-clip" style={{ background: '#0a0a0f' }}>
      {/* Sacred Geometry Background - Seed of Life */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <SeedOfLife size={2.5} opacity={0.04} position="center" color="#915eff" />
      </div>

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(145, 94, 255, 0.03), transparent 60%), radial-gradient(circle at 70% 50%, rgba(0, 212, 255, 0.03), transparent 60%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-14"
        >
          <p className="text-[#915eff] text-sm font-semibold uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact Me</h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Have a project in mind or want to collaborate? Drop me a message and I&apos;ll get
            back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start lg:items-center max-w-full">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Gradient border wrapper */}
            <div
              className="rounded-2xl p-px"
              style={{
                background: 'linear-gradient(135deg, rgba(145, 94, 255, 0.4), rgba(0, 212, 255, 0.4))',
              }}
            >
              <div className="relative rounded-2xl bg-[#0d0d1a] p-6 sm:p-8 overflow-hidden">
                {/* Subtle radial glow inside card */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(145, 94, 255, 0.06), transparent 50%)',
                  }}
                />

                {/* Form header */}
                <div className="relative mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Let&apos;s chat<span style={{ color: '#915eff' }}>.</span>
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Send a message</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4 sm:space-y-5">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className={inputBaseClass}
                      style={{
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 2px #915eff, 0 0 20px rgba(145, 94, 255, 0.15), inset 0 1px 3px rgba(0,0,0,0.3)'
                        e.currentTarget.style.borderColor = '#915eff'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      }}
                      placeholder="Your name"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1.5 text-sm text-[#ff6b9d]"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className={inputBaseClass}
                      style={{
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 2px #00d4ff, 0 0 20px rgba(0, 212, 255, 0.15), inset 0 1px 3px rgba(0,0,0,0.3)'
                        e.currentTarget.style.borderColor = '#00d4ff'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      }}
                      placeholder="your.email@example.com"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1.5 text-sm text-[#ff6b9d]"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={5}
                      className={`${inputBaseClass} resize-none`}
                      style={{
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 2px #915eff, 0 0 20px rgba(145, 94, 255, 0.15), inset 0 1px 3px rgba(0,0,0,0.3)'
                        e.currentTarget.style.borderColor = '#915eff'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      }}
                      placeholder="Tell me about your project..."
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1.5 text-sm text-[#ff6b9d]"
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base group"
                    style={{
                      background: 'linear-gradient(135deg, #915eff, #ff6b9d)',
                      boxShadow: '0 4px 20px rgba(145, 94, 255, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ff6b9d, #915eff)'
                        e.currentTarget.style.boxShadow = '0 6px 30px rgba(145, 94, 255, 0.4), 0 0 20px rgba(255, 107, 157, 0.2)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #915eff, #ff6b9d)'
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(145, 94, 255, 0.3)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <SendIcon />
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="flex items-center gap-3 p-4 rounded-xl border"
                        style={{
                          background: 'rgba(16, 185, 129, 0.08)',
                          borderColor: 'rgba(16, 185, 129, 0.2)',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(16, 185, 129, 0.15)' }}
                        >
                          <CheckIcon />
                        </div>
                        <p className="font-medium text-sm" style={{ color: '#10b981' }}>
                          Message sent successfully! I&apos;ll be in touch soon.
                        </p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="flex items-center gap-3 p-4 rounded-xl border"
                        style={{
                          background: 'rgba(255, 107, 157, 0.08)',
                          borderColor: 'rgba(255, 107, 157, 0.2)',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(255, 107, 157, 0.15)', color: '#ff6b9d' }}
                        >
                          <AlertIcon />
                        </div>
                        <p className="font-medium text-sm" style={{ color: '#ff6b9d' }}>
                          Failed to send message. Please try again or email me directly.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>

          {/* 3D Sacred Geometry Orb */}
          <motion.div
            ref={observerRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-first lg:order-last"
          >
            <div className="relative h-[280px] sm:h-[380px] lg:h-[550px] lg:-mr-16">
              <div className="absolute -inset-6">
                {/* Only load 3D orb when approaching viewport */}
                {isIntersecting && (
                  <SacredGeometryOrbCanvas className="w-full h-full" />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
