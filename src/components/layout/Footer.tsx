import { Logo } from '@/components/ui/Logo'

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const

const professionalLinks = [
  { label: 'GitHub', href: 'https://github.com/TreezCode' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joey-kubalak' },
  { label: 'Email', href: 'mailto:jkubalak.dev@gmail.com' },
] as const

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="portfolio-container site-footer__grid">
        <div className="site-footer__identity">
          <a href="#hero" aria-label="Back to portfolio introduction">
            <Logo variant="full" size={172} />
          </a>
          <p>Secure systems. Dimensional interfaces. Reliable releases.</p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-label">Navigate</p>
          <ul>
            {navigation.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__connect">
          <p className="text-label">Connect</p>
          <ul>
            {professionalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__secondary">
          <p>
            Need a business website?{' '}
            <a href="https://codorusweb.com/" target="_blank" rel="noreferrer">
              Visit Codorus Web
            </a>
            .
          </p>
          <p>© {new Date().getFullYear()} Joey Kubalak.</p>
        </div>
      </div>
    </footer>
  )
}
