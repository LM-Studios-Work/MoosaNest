import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full h-[88vh] min-h-[600px] overflow-hidden">
      {/* Hero image */}
     <Image
  src="/homepage-hero.webp"
  alt="Two children playing on beach dunes in MoosaNest clothing"
  fill
  className="object-cover object-center"
  priority
/>

      {/* Subtle dark gradient at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      {/* Hero text — centered, lower third */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center pb-16 px-4 w-full">
        <h1
          className="text-white text-5xl md:text-6xl font-light leading-tight font-serif"
          style={{ fontWeight: 300, textAlign: 'center', width: '100%' }}
        >
          children&apos;s clothing
        </h1>
        <p className="text-white/90 text-sm tracking-widest uppercase mt-1 mb-5 font-sans" style={{ letterSpacing: '0.25em', textAlign: 'center', width: '100%' }}>
          Soft care for little ones
        </p>
        <a
          href="#"
          className="border border-white text-white text-xs tracking-[0.2em] uppercase px-7 py-2.5 rounded-full hover:bg-white hover:text-foreground transition-all duration-300 font-sans"
        >
          Shop the collection
        </a>
      </div>
    </section>
  )
}
