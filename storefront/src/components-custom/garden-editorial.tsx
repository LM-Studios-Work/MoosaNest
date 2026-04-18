'use client'

import { useState } from 'react'

export default function GardenEditorial() {
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <section className="w-full flex flex-col md:flex-row min-h-[560px] md:min-h-[720px]" style={{ backgroundColor: 'var(--sage)' }}>
      {/* Left: editorial image */}
      <div className="md:w-1/2 aspect-[4/5] md:aspect-auto overflow-hidden relative">
        <img
          src="/placeholder.svg?height=900&width=900"
          alt="Child playing with a garden playhouse surrounded by flowers and plants"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: text content on sage-green bg */}
      <div className="md:w-1/2 flex flex-col items-center justify-center px-10 py-16 md:py-24 text-center" style={{ backgroundColor: 'var(--sage)' }}>
        <p className="text-[10px] tracking-[0.35em] uppercase mb-4 font-sans" style={{ color: 'var(--sage-foreground)' }}>
          spring collection
        </p>
        <h2
          className="text-4xl md:text-5xl font-light text-balance leading-tight mb-6 font-serif"
          style={{ color: 'var(--sage-foreground)' }}
        >
          Baby clothes
        </h2>
        <p className="text-sm leading-relaxed max-w-sm mb-8 font-sans" style={{ color: 'var(--sage-foreground)', opacity: 0.8 }}>
          Spring-soft for the little ones
        </p>
        {/* Outlined pill button: transparent default → sage fill + white text on hover */}
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          className="text-sm tracking-[0.12em] uppercase px-8 py-3 rounded-full font-sans transition-all duration-300"
          style={{
            border: `1.5px solid var(--sage-foreground)`,
            backgroundColor: btnHovered ? 'var(--primary)' : 'transparent',
            color: btnHovered ? 'white' : 'var(--sage-foreground)',
          }}
        >
          Discover the collection
        </button>
      </div>
    </section>
  )
}
