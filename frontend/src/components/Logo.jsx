import React from 'react';

export default function Logo({ size = 32, className = '' }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      {/* Glossy Red Circular Badge */}
      <circle cx="50" cy="50" r="48" fill="#E50914" />
      <circle cx="50" cy="50" r="48" fill="url(#glossGrad)" />
      
      {/* Black Music Note matching user image */}
      <path d="M 53 26 L 66 36 L 53 42 L 53 60 C 50 56 42 56 38 60 C 33 65 35 72 42 74 C 49 76 53 71 53 64 Z" fill="#000000" />
      <path d="M 53 26 L 53 64" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <path d="M 53 26 L 66 36" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="43" cy="65" rx="10" ry="7" transform="rotate(-25 43 65)" fill="#000000" />

      <defs>
        <linearGradient id="glossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>
      </defs>
    </svg>
  );
}
