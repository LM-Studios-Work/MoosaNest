'use client'

const categories = [
  { label: 'Clothing', image: '/placeholder.svg?height=400&width=320' },
  { label: 'Toys', image: '/placeholder.svg?height=400&width=320' },
  { label: 'To sleep', image: '/placeholder.svg?height=400&width=320' },
  { label: 'Baby & nursery', image: '/placeholder.svg?height=400&width=320' },
  { label: 'Bath & Care', image: '/placeholder.svg?height=400&width=320' },
  { label: 'Eating & Drinking', image: '/placeholder.svg?height=400&width=320' },
]

export default function OurRange() {
  // Subtle vertical offsets for an organic, wave-like feel
  const verticalOffsets = [0, 24, 10, 28, 6, 20]

  return (
    <section className="w-full py-16 md:py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-sans text-foreground/60">
            Our range
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground leading-tight mb-6 font-serif text-balance max-w-3xl mx-auto">
            Everything for your little one, with love designed
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-foreground/70 font-sans">
            Discover the world of MoosaNest. From cozy baby room accessories to
            wooden toys. Stylish, soft and carefully made for the most beautiful
            moments together.
          </p>
        </div>

        {/* Oval grid — slightly tall ovals for organic, egg-like shapes */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-5 mb-20">
          {categories.map((cat, i) => (
            <a
              key={cat.label}
              href="#"
              className="group block"
              style={{ marginTop: `${verticalOffsets[i]}px` }}
            >
              <div
                className="relative overflow-hidden rounded-[50%] bg-secondary shadow-sm"
                style={{
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-base md:text-xl font-light font-serif text-center px-3 leading-tight">
                    {cat.label}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Enjoy the Little Things */}
        <div className="text-center pt-10">
          <h2 className="text-3xl md:text-5xl font-light text-foreground leading-tight mb-8 font-serif">
            Enjoy the Little Things
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-sm md:text-base leading-relaxed text-foreground/70 font-sans">
            <p>
              We believe that the small moments in life bring the greatest joy and
              connectedness. We want to inspire parents to cherish the beauty of
              these everyday miracles with their children.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
