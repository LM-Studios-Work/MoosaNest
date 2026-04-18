'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  name: string
  price: string
  image: string
  alt: string
  badge?: string
  buttonLabel?: string
  buttonVariant?: 'select' | 'add'
  isSelected?: boolean
  handle?: string
}

export default function ProductCard({
  name,
  price,
  image,
  alt,
  badge,
  buttonLabel,
  buttonVariant = 'select',
  isSelected = false,
  handle = '',
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [selected, setSelected] = useState(isSelected)
  const [hovered, setHovered] = useState(false)

  return (
    <div className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/30 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image area with heart overlay */}
      <div className="relative">
        <Link
          href={`/products/${handle}`}
          className="relative aspect-[4/5] overflow-hidden bg-secondary/40 block"
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {badge && (
            <span
              className="absolute top-3 right-3 text-[10px] tracking-[0.12em] font-sans px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {badge}
            </span>
          )}
        </Link>

        {/* Heart wishlist button — sits at bottom-right of the image */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform z-10"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={20}
            strokeWidth={1.5}
            className={wishlisted ? 'fill-rose-400 text-rose-400' : 'text-foreground/60'}
          />
        </button>
      </div>

      {/* Info */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-4 flex-1">
        <Link href={`/products/${handle}`} className="flex-1">
          <p className="text-[15px] text-foreground font-normal leading-snug font-sans">
            {name}
          </p>
          <p className="text-[15px] text-foreground/80 mt-1 font-sans">
            {price}
          </p>
        </Link>

        {/* Buttons: cream default, sage-green on hover */}
        {buttonVariant === 'select' ? (
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="w-full text-xs tracking-[0.08em] uppercase py-3.5 rounded-full font-sans transition-all duration-200"
            style={{
              backgroundColor: hovered ? 'var(--primary)' : 'var(--btn-default)',
              color: hovered ? 'white' : 'var(--btn-default-foreground)',
            }}
          >
            {buttonLabel ?? 'Select size'}
          </button>
        ) : (
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setSelected(!selected)}
            className="w-full text-xs tracking-[0.08em] uppercase py-3.5 rounded-full font-sans transition-all duration-200"
            style={{
              backgroundColor: selected
                ? 'var(--primary)'
                : hovered
                ? 'var(--primary)'
                : 'var(--btn-default)',
              color: selected || hovered ? 'white' : 'var(--btn-default-foreground)',
            }}
          >
            {buttonLabel ?? 'Add to cart'}
          </button>
        )}
      </div>
    </div>
  )
}
