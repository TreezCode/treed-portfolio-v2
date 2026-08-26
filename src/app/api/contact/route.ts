import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

const REQUEST_SIZE_LIMIT = 10_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 4

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()
const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
}

function getEmailConfiguration() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_EMAIL_FROM
  const to = process.env.CONTACT_EMAIL_TO

  if (!apiKey || !from || !to) {
    throw new Error('Contact email service is not configured')
  }

  return { resend: new Resend(apiKey), from, to }
}

function getClientKey(request: Request) {
  return (
    request.headers.get('x-nf-client-connection-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

function isRateLimited(clientKey: string) {
  const now = Date.now()

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key)
  }

  const current = rateLimitStore.get(clientKey)
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEscapes[character] ?? character)
}

function jsonResponse(
  body: { success: boolean; message?: string; error?: string },
  status = 200
) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return jsonResponse(
        { success: false, error: 'Content type must be application/json.' },
        415
      )
    }

    const declaredLength = Number(request.headers.get('content-length') ?? 0)
    if (declaredLength > REQUEST_SIZE_LIMIT) {
      return jsonResponse(
        { success: false, error: 'Request is too large.' },
        413
      )
    }

    const rawBody = await request.text()
    if (rawBody.length > REQUEST_SIZE_LIMIT) {
      return jsonResponse(
        { success: false, error: 'Request is too large.' },
        413
      )
    }

    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      return jsonResponse(
        { success: false, error: 'Request body must contain valid JSON.' },
        400
      )
    }

    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return jsonResponse(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? 'Please check your input.',
        },
        400
      )
    }

    const validatedData = parsed.data

    // Honeypot submissions receive a normal response without sending email.
    if (validatedData.website) {
      return jsonResponse({
        success: true,
        message: 'Message sent successfully',
      })
    }

    if (isRateLimited(getClientKey(request))) {
      return jsonResponse(
        {
          success: false,
          error: 'Too many messages. Please wait before trying again.',
        },
        429
      )
    }

    const { resend, from, to } = getEmailConfiguration()
    const safeName = escapeHtml(validatedData.name)
    const safeEmail = escapeHtml(validatedData.email)
    const safeMessage = escapeHtml(validatedData.message).replace(/\r?\n/g, '<br />')
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `Portfolio Contact: ${validatedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
      text: `New portfolio contact\n\nFrom: ${validatedData.name}\nEmail: ${validatedData.email}\n\n${validatedData.message}`,
      replyTo: validatedData.email,
    })

    if (error) {
      console.error('Contact email delivery failed', {
        provider: 'resend',
        code: error.name,
      })
      return jsonResponse(
        { success: false, error: 'Message could not be sent. Please email me directly.' },
        502
      )
    }

    if (!data?.id) {
      return jsonResponse(
        { success: false, error: 'Message could not be sent. Please email me directly.' },
        502
      )
    }

    return jsonResponse({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Contact form request failed', {
      reason: error instanceof Error ? error.message : 'unknown',
    })
    return jsonResponse(
      { success: false, error: 'Message could not be sent. Please email me directly.' },
      500
    )
  }
}
