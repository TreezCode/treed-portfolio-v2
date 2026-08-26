import { ImageResponse } from 'next/og'

export const alt = 'Joey Kubalak, product-minded software engineer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const geometryRings = [360, 270, 180]

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: '#17151d',
          color: '#f4f1f7',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: 18,
            height: '100%',
            backgroundColor: '#8b5cf6',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 760,
            padding: '64px 56px 56px 66px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 23,
              color: '#aaa2b7',
              letterSpacing: '0.08em',
            }}
          >
            SOFTWARE ENGINEER · COMPTIA SECURITY+
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 74,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.045em',
              }}
            >
              Joey Kubalak
            </div>
            <div
              style={{
                display: 'flex',
                maxWidth: 670,
                marginTop: 28,
                fontSize: 34,
                lineHeight: 1.25,
                color: '#d6d0dd',
              }}
            >
              Secure web products with thoughtful engineering and dimensional craft.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#a88df3',
            }}
          >
            buildwithtreez.com
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderLeft: '1px solid #3a3442',
            backgroundColor: '#1d1a23',
          }}
        >
          {geometryRings.map((diameter, index) => (
            <div
              key={diameter}
              style={{
                position: 'absolute',
                display: 'flex',
                width: diameter,
                height: diameter,
                border: `${index === 1 ? 3 : 2}px solid ${index === 1 ? '#8b5cf6' : '#5b5267'}`,
                transform: `rotate(${index % 2 === 0 ? 45 : 0}deg)`,
              }}
            />
          ))}
          <div
            style={{
              display: 'flex',
              width: 24,
              height: 24,
              backgroundColor: '#a88df3',
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      </div>
    ),
    size
  )
}
