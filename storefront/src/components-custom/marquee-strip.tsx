export default function MarqueeStrip() {
  const items = [
    'Softcare for little ones',
    'Free shipping from R600',
    'Softcare for little ones',
    'Free shipping from R600',
    'Softcare for little ones',
    'Free shipping from R600',
    'Softcare for little ones',
    'Free shipping from R600',
  ]

  return (
    <div className="w-full overflow-hidden py-3 border-y border-border/30 bg-background">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.concat(items).map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-8 text-[11px] tracking-[0.22em] uppercase text-muted-foreground font-sans"
          >
            {/* Cloud icon matching the original */}
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
              <path
                d="M5 11C2.8 11 1 9.2 1 7C1 5 2.5 3.3 4.4 3.05C4.9 1.3 6.5 0 8.5 0C9.9 0 11.1 0.6 12 1.5C12.5 1.2 13.1 1 13.8 1C15.8 1 17.4 2.5 17.5 4.4C19.5 4.7 21 6.5 21 8.5C21 10.4 19.6 12 17.7 12.3M8 13.5L11 10.5M11 10.5L14 13.5M11 10.5V14"
                stroke="currentColor"
                strokeWidth="0"
                fill="none"
              />
              {/* Simple cloud shape */}
              <ellipse cx="11" cy="8" rx="8" ry="5" fill="currentColor" opacity="0.25" />
              <ellipse cx="8" cy="6" rx="5" ry="4" fill="currentColor" opacity="0.25" />
              <ellipse cx="14" cy="6" rx="4" ry="3.5" fill="currentColor" opacity="0.25" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
