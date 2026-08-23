import React from 'react';

export default function Logo({ size = 28, className = '' }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="silverGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3c2242" />
          <stop offset="100%" stopColor="#180b1b" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#silverGlassGrad)" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="3" />
      <path d="M 53 28 L 66 38 L 53 43 L 53 60 C 50 56 42 56 38 60 C 33 65 35 72 42 74 C 49 76 53 71 53 64 Z" fill="#FFFFFF" opacity="0.9" />
      <path d="M 53 28 L 53 64" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
      <path d="M 53 28 L 67 39" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
      <ellipse cx="43" cy="65" rx="9" ry="6.5" transform="rotate(-25 43 65)" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}
