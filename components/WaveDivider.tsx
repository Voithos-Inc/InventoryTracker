import React from 'react';

/* claude generated thank you llms we love you llms */

export default function WaveDivider() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100dvw',
        height: '6vh',
        minHeight: '80px',
        overflow: 'hidden',
        zIndex: 1,
        marginTop: '-1px', // Prevents gap between header and divider
        marginBottom: '-1px', // Prevents gap below divider
        lineHeight: 0 // Removes any text baseline spacing
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          verticalAlign: 'bottom' // Prevents baseline gap in SVG
        }}
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="wavy-clip" clipPathUnits="userSpaceOnUse">
            <path d="M 0,0 L 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90 L 1440,0 Z" />
          </clipPath>
        </defs>

        {/* Teal background clipped to wave shape */}
        <path
          d="M 0,0 L 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90 L 1440,0 Z"
          fill="#0f575a"
        />

        {/* Cream background below the wave */}
        <path
          d="M 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90 L 1440,180 L 0,180 Z"
          fill="#f2eee6"
        />

        {/* The mint stroke along the wave */}
        <path
          d="M 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90"
          fill="none"
          stroke="#a2d3ca"
          strokeWidth="25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
