import React from 'react'

const SymbolIcon = () => (
  <svg width="16" height="16">
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
        <stop stopColor="#D941F1" offset="0%" />
        <stop stopColor="#B520DF" offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
        <stop stopColor="#982EA8" offset="0%" />
        <stop stopColor="#6C0B91" offset="100%" />
      </linearGradient>
    </defs>
    <g fillRule="nonzero" fill="none">
      <rect
        x=".5"
        y=".5"
        width="15"
        height="15"
        rx="4"
        fill="url(#a)"
        stroke="url(#b)"
      />
      <path
        d="M8 5.42v.869c0 .218.27.325.425.17L9.82 5.103c.1-.097.1-.247 0-.344L8.425 3.404C8.27 3.253 8 3.36 8 3.578v.87c-2.21 0-4 1.739-4 3.885 0 .505.1.991.285 1.433a.508.508 0 0 0 .82.165.457.457 0 0 0 .115-.505A2.758 2.758 0 0 1 5 8.333C5 6.726 6.345 5.42 8 5.42zm2.895 1.315a.46.46 0 0 0-.115.505c.14.34.22.71.22 1.093 0 1.608-1.345 2.914-3 2.914v-.869c0-.219-.27-.325-.425-.17L6.18 11.563c-.1.097-.1.248 0 .345l1.395 1.355c.155.15.425.044.425-.17v-.874c2.21 0 4-1.739 4-3.886 0-.505-.1-.99-.285-1.433a.508.508 0 0 0-.82-.165z"
        fill="#FFF"
      />
    </g>
  </svg>
)

export default SymbolIcon
