/**
 * Netlify applies this rule before the Next.js contact route runs.
 * Returning no response continues the request chain for allowed requests.
 */
export default function contactRateLimit() {}

export const config = {
  path: '/api/contact',
  method: 'POST',
  rateLimit: {
    windowLimit: 5,
    windowSize: 180,
    aggregateBy: ['ip', 'domain'],
  },
}
