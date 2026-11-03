import { createSocialImage, socialImageSize } from '@/lib/social-images'

export const alt =
  'Joey Kubalak, software engineer and creative maker. Useful things. Unexpected worlds.'
export const size = socialImageSize
export const contentType = 'image/png'

export default function Image() {
  return createSocialImage('home')
}
