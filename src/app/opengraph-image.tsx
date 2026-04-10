import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Joey Kubalak Portfolio - Interactive 3D Sacred Geometry'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0f',
          backgroundImage: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
          position: 'relative',
        }}
      >
        {/* Sacred geometry pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'radial-gradient(circle at 50% 50%, #915eff 0%, transparent 70%)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            zIndex: 10,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#f8f8f8',
              letterSpacing: '-0.02em',
            }}
          >
            Joey Kubalak
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: 40,
              color: '#b8b8c8',
              letterSpacing: '0.05em',
            }}
          >
            Junior Software Engineer
          </div>
          
          {/* Accent line */}
          <div
            style={{
              width: 400,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #915eff 50%, transparent)',
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          
          {/* Skills */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              fontSize: 28,
              color: '#888899',
            }}
          >
            <span style={{ color: '#915eff' }}>React</span>
            <span>•</span>
            <span style={{ color: '#00d4ff' }}>Next.js</span>
            <span>•</span>
            <span style={{ color: '#ff6b9d' }}>Three.js</span>
          </div>
          
          {/* Certification */}
          <div
            style={{
              fontSize: 24,
              color: '#b8b8c8',
              marginTop: 8,
            }}
          >
            CompTIA Security+ Certified
          </div>
          
          {/* Domain */}
          <div
            style={{
              fontSize: 28,
              color: '#00d4ff',
              marginTop: 24,
            }}
          >
            buildwithtreez.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
