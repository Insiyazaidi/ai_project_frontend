import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <svg
        className="animate-spin"
        width="50"
        height="50"
        viewBox="0 0 50 50"
      >
        {/* Background circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="rgba(56,116,120,0.2)"   // light primary
          strokeWidth="4"
          fill="none"
        />

        {/* Animated arc */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="90 150"
        />

        {/* Gradient using your theme */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#387478" />       {/* primary */}
            <stop offset="100%" stopColor="#243642" />     {/* primary-dark */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Spinner