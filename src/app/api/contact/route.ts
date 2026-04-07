import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(apiKey)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Send email using Resend
    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL_TO || 'your.email@example.com',
      subject: `Portfolio Contact: ${validatedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
      replyTo: validatedData.email,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email. Please try again later.',
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request. Please check your input and try again.',
      },
      { status: 400 }
    )
  }
}
