import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#191c1b',
      }}
    >
      <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="#d5ed9b">
        <circle cx="50" cy="50" r="43" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <circle
            key={angle}
            cx="50"
            cy="29"
            r="21"
            strokeWidth=".8"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        <path d="M50 8 86 71H14L50 8ZM50 92 14 29H86L50 92Z" strokeWidth=".6" />
      </svg>
    </div>,
    size
  )
}
