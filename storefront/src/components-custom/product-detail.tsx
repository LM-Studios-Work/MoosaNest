'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ShippingBanner from '@components-custom/shipping-banner'
import { Heart, Home, ShoppingBag, ChevronRight } from 'lucide-react'
import { HttpTypes } from '@medusajs/types'
import { addToCart } from '@lib/data/cart'
import { useParams } from 'next/navigation'

interface ProductDetailProps {
  product: HttpTypes.StoreProduct
  images: any[] // HttpTypes.StoreProductImage[]
}

export default function ProductDetail({ product, images }: ProductDetailProps) {
  const params = useParams()
  const countryCode = params.countryCode as string

  // We find the first option which is usually 'Size'
  const sizeOption = product.options?.find(o => o.title?.toLowerCase() === 'size')
  const sizes = sizeOption?.values?.map(v => v.value) || ['Standard']

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeThumb, setActiveThumb] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  const thumbnails = images?.length ? images.map(img => img.url) : [product.thumbnail || '/placeholder.svg?height=220&width=180']
  const mainImage = thumbnails[activeThumb] || '/placeholder.svg?height=680&width=520'

  // Map selected size to a variant
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return null
    if (!selectedSize && product.variants.length === 1) return product.variants[0]
    
    return product.variants.find(v => {
      // Find if this variant has an option that matches selectedSize
      return v.options?.some(opt => opt.value === selectedSize)
    })
  }, [product.variants, selectedSize])

  const price = useMemo(() => {
    const p = selectedVariant?.calculated_price?.calculated_amount ?? product.variants?.[0]?.calculated_price?.calculated_amount
    return p ? `€${(p / 100).toFixed(2)}` : '€0.00'
  }, [selectedVariant, product])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || isAdding) return

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
    } finally {
      setIsAdding(false)
    }
  }

  const inStock = selectedVariant ? (selectedVariant.manage_inventory === false || selectedVariant.allow_backorder || (selectedVariant.inventory_quantity || 0) > 0) : false

  return (
    <div className="bg-white flex flex-col pt-16">
      <ShippingBanner />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 px-6 md:px-10 py-4 text-sm text-muted-foreground font-sans">
        <Link href="/" className="hover:text-foreground transition-colors" aria-label="Home">
          <Home size={15} strokeWidth={1.5} />
        </Link>
        <ChevronRight size={13} strokeWidth={1.5} className="text-border" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      {/* Product layout */}
      <main className="flex-1 px-6 md:px-10 pb-16">
        <div className="flex gap-6 max-w-6xl mx-auto">

          {/* Thumbnails column */}
          <div className="hidden md:flex flex-col gap-3 pt-2">
            {thumbnails.map((thumb, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`w-28 h-36 rounded-xl overflow-hidden border-2 transition-colors ${
                  activeThumb === i ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={thumb}
                  alt={`Product view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative flex-1 max-w-[520px]">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-muted">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product info panel */}
          <div className="flex-1 pt-2 max-w-[340px]">
            {/* SKU + wishlist row */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-muted-foreground font-sans uppercase tracking-wide">
                {product.collection?.title || 'N/A'}
              </span>
              <button
                onClick={() => setWishlisted(v => !v)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="hover:opacity-70 transition-opacity"
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  fill={wishlisted ? 'currentColor' : 'none'}
                  className="text-foreground"
                />
              </button>
            </div>

            <h1 className="text-3xl font-serif font-light text-foreground mb-2 leading-snug">
              {product.title}
            </h1>
            <p className="text-xl text-foreground font-sans mb-8">{price}</p>

            {/* Size selector */}
            {sizes.length > 0 && sizes[0] !== 'Standard' && (
              <div className="mb-8">
                <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest mb-3">{sizeOption?.title || 'Variant'}</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-sm font-sans border transition-all duration-150 ${
                        selectedSize === size
                          ? 'border-foreground text-foreground bg-transparent'
                          : 'border-border text-muted-foreground bg-background hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="flex items-center gap-2 mb-5">
              <span className={`w-2.5 h-2.5 rounded-full inline-block ${selectedVariant && !inStock ? 'bg-red-500' : 'bg-primary'}`} />
              <span className="text-sm text-muted-foreground font-sans">{selectedVariant && !inStock ? 'Out of Stock' : 'Available'}</span>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || (selectedSize === null && product.variants?.length !== 1) || (selectedVariant && !inStock)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-sans text-white transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--primary)' }}
              onMouseEnter={e => { if(!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}}
              onMouseLeave={e => { if(!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--primary)'}}
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {isAdding ? "Adding..." : (!selectedVariant && product.variants?.length !== 1) ? "Select variant" : (selectedVariant && !inStock) ? "Out of stock" : "In shopping cart"}
            </button>

            <p className="text-xs text-center text-muted-foreground font-sans">
              Free shipping from &euro; 50,-
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
