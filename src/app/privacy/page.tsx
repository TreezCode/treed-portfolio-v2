import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import { AnalyticsPreferencesButton } from '@/components/analytics/PortfolioAnalytics'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Privacy',
  description: 'How this portfolio handles contact messages, browser preferences and optional analytics.',
  path: '/privacy',
  image: { url: '/share/privacy', alt: 'Privacy and analytics preferences for Joey Kubalak’s portfolio' },
})

export default function PrivacyPage() {
  return (
    <PortfolioShell>
      <article className="folio-container privacy-content">
        <p className="folio-eyebrow">Last updated November 3, 2026</p>
        <h1>Privacy, plainly.</h1>
        <p>This is Joey Kubalak’s personal portfolio. You can explore the projects, use Geometry Bench and play Portal Keeper without allowing analytics.</p>
        <h2>Your analytics choice</h2>
        <p>If you allow analytics, Google Analytics helps me understand how people find the portfolio and which pages, projects and experiments they use. It can record page visits, public campaign labels, resume and demo clicks, successful contact submissions, and selected playground and game actions.</p>
        <p>Analytics uses cookies to understand visits. Advertising features and Google signals are disabled. Contact message contents, names, email addresses, recipe settings and full query strings are not included in the analytics events I send.</p>
        <p>The Google analytics tag loads only after you allow it. Choosing “No analytics” stops future analytics events and removes this site’s Google Analytics cookies. It does not delete information already sent to Google. You can change your choice here or in the footer.</p>
        <AnalyticsPreferencesButton />
        <h2>Contact messages</h2>
        <p>The contact form sends your name, email address and message to me through Resend so I can reply. These details are used for the conversation, not added to analytics. You can also email <a href="mailto:jkubalak.dev@gmail.com">jkubalak.dev@gmail.com</a> directly.</p>
        <h2>What stays in your browser</h2>
        <p>Your theme and analytics preferences, along with Portal Keeper’s saved progress, are stored in your browser. Geometry Bench recipe links encode the sculpture settings in the link. Clearing this site’s browser storage removes saved preferences and game progress.</p>
        <h2>Hosting and other websites</h2>
        <p>Hosting services process request information needed to deliver and protect the site. Project demos, social profiles and other external links open services with their own privacy practices. You can read <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google’s privacy policy</a> for details about its services.</p>
        <h2>Questions or requests</h2>
        <p>For a question about your information or a request relating to a contact message, email <a href="mailto:jkubalak.dev@gmail.com">jkubalak.dev@gmail.com</a>.</p>
      </article>
    </PortfolioShell>
  )
}
