'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import ProductCard from './product-card'

interface Product {
  name: string
  price: string
  image: string
  alt: string
  badge?: string
  buttonVariant?: 'select' | 'add'
  isSelected?: boolean
  handle?: string
}

interface ProductGridProps {
  title: string
  linkLabel: string
  products: Product[]
}

export default function ProductGrid({ title, linkLabel, products }: ProductGridProps) {
  const [arrowHovered, setArrowHovered] = useState(false)

  return (
    <section className="w-full px-6 md:px-10 py-10 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-light text-foreground font-serif">
          {title}
        </h2>
        <a
          href="#"
          className="flex items-center gap-3 group"
        >
          <span className="text-sm text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity font-sans">
            {linkLabel}
          </span>
          {/* Arrow button: sage default → near-charcoal on hover */}
          <span
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{
              backgroundColor: arrowHovered ? 'var(--arrow-btn-hover)' : 'var(--primary)',
            }}
          >
            <ArrowRight size={16} className="text-white" />
          </span>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <ProductCard
            key={i}
            name={product.name}
            price={product.price}
            image={product.image}
            alt={product.alt}
            badge={product.badge}
            buttonVariant={product.buttonVariant ?? 'select'}
            isSelected={product.isSelected}
            handle={product.handle}
          />
        ))}
      </div>
    </section>
  )
}
