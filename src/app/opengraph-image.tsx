import { ImageResponse } from 'next/og'

export const alt = 'Joey Kubalak, software engineer and creative maker'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const geometryRings = [360, 270, 180]

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: '#191c1b',
        color: '#f4f1e7',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 18,
          height: '100%',
          backgroundColor: '#d5ed9b',
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
            color: '#b6bdb7',
            letterSpacing: '0.08em',
          }}
        >
          SOFTWARE ENGINEER & CREATIVE MAKER
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
              color: '#b6bdb7',
            }}
          >
            Thoughtful software. Imaginative digital worlds.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#d5ed9b',
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
          borderLeft: '1px solid #424942',
          backgroundColor: '#252b27',
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
              border: `${index === 1 ? 3 : 2}px solid ${index === 1 ? '#d5ed9b' : '#697562'}`,
              transform: `rotate(${index % 2 === 0 ? 45 : 0}deg)`,
            }}
          />
        ))}
        <div
          style={{
            display: 'flex',
            width: 24,
            height: 24,
            backgroundColor: '#d5ed9b',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    </div>,
    size
  )
}
