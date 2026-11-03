import { createSocialImage, socialImageIds } from '@/lib/social-images'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return socialImageIds.map((id) => ({ id }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  return createSocialImage((await params).id)
}
