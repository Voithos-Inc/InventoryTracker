import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, ClipPath, Path } from 'react-native-svg';

/* claude generated thank you llms we love you llms */

export default function WaveDivider() {
  return (
    <View
      style={{
        position: 'relative',
        width: '100%',
        height: 80,
        overflow: 'hidden',
        zIndex: 1,
        marginTop: -1,
        marginBottom: -1,
      }}
    >
      <Svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
      >
        <Defs>
          <ClipPath id="wavy-clip">
            <Path d="M 0,0 L 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90 L 1440,0 Z" />
          </ClipPath>
        </Defs>

        {/* Teal background clipped to wave shape */}
        <Path
          d="M 0,0 L 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90 L 1440,0 Z"
          fill="#0f575a"
        />

        {/* Cream background below the wave */}
        <Path
          d="M 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90 L 1440,180 L 0,180 Z"
          fill="#f2eee6"
        />

        {/* The mint stroke along the wave */}
        <Path
          d="M 0,90 C 240,90 240,30 480,30 C 720,30 720,150 960,150 C 1200,150 1200,90 1440,90"
          fill="none"
          stroke="#a2d3ca"
          strokeWidth="25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
