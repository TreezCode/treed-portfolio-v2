'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// Dynamically import 3D Sacred Geometry Orb component
// Loading placeholder prevents layout shift and improves perceived performance
const SacredGeometryOrbCanvas = dynamic(
  () => import('@/components/three/SacredGeometryOrbCanvas').then((mod) => mod.SacredGeometryOrbCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[280px] sm:h-[380px] lg:h-[550px] bg-transparent flex items-center justify-center" aria-label="Loading sacred geometry orb">
        <div className="w-12 h-12 border-2 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
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
    aria-hidden
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
    aria-hidden
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
    aria-hidden
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
    rootMargin: '300px',
    threshold: 0,
    triggerOnce: true,
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
    'w-full max-w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background-primary border border-border-primary rounded-xl text-text-primary placeholder-text-tertiary transition-colors duration-200 box-border text-sm sm:text-base focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/40 theme-transition'

  return (
    <section id="contact" aria-label="Contact" className="relative py-16 sm:py-28 overflow-x-clip bg-background-primary theme-transition">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10 sm:mb-14"
        >
          <span className="text-label text-text-tertiary block mb-3">05</span>
          <h2 className="text-headline text-text-primary theme-transition mb-4">Contact Me</h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
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
            <div className="rounded-2xl bg-surface-primary border border-border-primary p-6 sm:p-8 theme-transition">
              {/* Form header */}
              <div className="mb-6">
                <h3 className="text-title text-text-primary theme-transition">
                  Let&apos;s chat<span className="text-accent-primary">.</span>
                </h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={inputBaseClass}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1.5 text-sm text-error"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={inputBaseClass}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1.5 text-sm text-error"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className={`${inputBaseClass} resize-none`}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1.5 text-sm text-error"
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
                  className="w-full py-3 sm:py-3.5 px-6 rounded-xl font-semibold text-white bg-accent-fill hover:bg-accent-fill-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
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
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-xl border border-success/30 bg-success/10 text-success"
                      role="status"
                    >
                      <CheckIcon />
                      <p className="font-medium text-sm">
                        Message sent successfully! I&apos;ll be in touch soon.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-xl border border-error/30 bg-error/10 text-error"
                      role="alert"
                    >
                      <AlertIcon />
                      <p className="font-medium text-sm">
                        Failed to send message. Please try again or email me directly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
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
