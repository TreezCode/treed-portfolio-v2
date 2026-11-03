'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'

const CONTACT_EMAIL = 'jkubalak.dev@gmail.com'
type ContactFormInput = z.input<typeof contactSchema>

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

export function Contact() {
  const honeypotRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: honeypotRef.current?.value ?? '',
        }),
      })

      if (!response.ok) throw new Error('Contact request failed')

      setSubmitStatus('success')
      reset()
      if (honeypotRef.current) honeypotRef.current.value = ''
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="portfolio-section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="portfolio-container">
        <div className="contact-layout">
          <div className="contact-intro" data-motion-item>
            <span className="section-index" aria-hidden="true">
              04
            </span>
            <h2 id="contact-title" className="text-headline">
              Let&apos;s talk about the work.
            </h2>
            <p>
              Hiring for a software, product, front-end, or full-stack role? Send the role, the
              problem your team is solving, or the part of my work you want to discuss.
            </p>

            <dl className="contact-details">
              <div>
                <dt>Best fit</dt>
                <dd>Product-minded web engineering with a security-first edge</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Pennsylvania · Open to remote opportunities</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </dd>
              </div>
            </dl>

            <div className="contact-links" aria-label="Professional profiles">
              <a href="https://github.com/TreezCode" target="_blank" rel="noreferrer">
                GitHub
                <ArrowIcon />
              </a>
              <a href="https://www.linkedin.com/in/joey-kubalak" target="_blank" rel="noreferrer">
                LinkedIn
                <ArrowIcon />
              </a>
            </div>

            <aside className="client-route" aria-label="Business website services">
              <p>Looking for a business website instead of an engineering hire?</p>
              <a href="https://codorusweb.com/" target="_blank" rel="noreferrer">
                Visit Codorus Web
                <ArrowIcon />
              </a>
            </aside>
          </div>

          <div className="contact-form-shell" data-motion-item>
            <div className="contact-form-heading">
              <p className="text-label">Direct inquiry</p>
              <p>Tell me a little about what you’re working on. I reply personally.</p>
            </div>

            <noscript>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`}>Send me an email</a> to start a conversation.
              </p>
              <style>{'.contact-form-shell form.folio-contact-form { display: none; }'}</style>
            </noscript>
            <form
              className="folio-contact-form"
              onSubmit={handleSubmit(onSubmit)}
              action={`mailto:${CONTACT_EMAIL}`}
              method="post"
              encType="text/plain"
            >
              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  ref={honeypotRef}
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="field-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="field-error">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="message">What would you like to discuss?</label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={6}
                  maxLength={4000}
                  required
                  placeholder="Role, team, challenge, or project context"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : 'message-help'}
                />
                {errors.message ? (
                  <p id="message-error" className="field-error">
                    {errors.message.message}
                  </p>
                ) : (
                  <p id="message-help" className="field-help">
                    Please avoid including passwords or other sensitive information.
                  </p>
                )}
              </div>

              <button type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending…' : 'Send inquiry'}</span>
                {!isSubmitting && <ArrowIcon />}
              </button>

              <div className="contact-status" aria-live="polite" aria-atomic="true">
                {submitStatus === 'success' && (
                  <p key="success" className="contact-status--success" role="status">
                    Your message was sent. I&apos;ll reply as soon as I can.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p key="error" className="contact-status--error" role="alert">
                    The form could not send. Please{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>email me directly</a> instead.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
