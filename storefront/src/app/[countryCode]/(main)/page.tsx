import { Metadata } from "next"

import Hero from "@components-custom/hero"
import ShippingBanner from "@components-custom/shipping-banner"
import ProductGrid from "@components-custom/product-grid"
import MarqueeStrip from "@components-custom/marquee-strip"
import GardenEditorial from "@components-custom/garden-editorial"
import OurRange from "@components-custom/our-range"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "MoosaNest | Softcare for little ones",
  description: "Shop quality products for your little ones at MoosaNest.",
}

// Temporary mock data for UI visual completion until we fully connect standard data models
const gardenAdventuresMock = [
  {
    name: 'Garden gift set - 5-piece - Pink',
    price: 'R34.95',
    image: '/placeholder.svg?height=400&width=320',
    alt: 'Pink garden gift set with 5 pieces including watering can',
    badge: 'New',
    buttonVariant: 'add' as const,
  },
  {
    name: 'Wooden outdoor kitchen - Green',
    price: 'R129.95',
    image: '/placeholder.svg?height=400&width=320',
    alt: 'Green wooden outdoor mud kitchen',
    badge: 'New',
    buttonVariant: 'add' as const,
    isSelected: true,
  },
]

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch real products from Medusa
  const { response } = await listProducts({
    pageParam: 1,
    queryParams: { limit: 4 },
    countryCode,
  })

  // Map Medusa products to the shape expected by ProductGrid
  const springOutfits = response.products.map((p) => {
    // Find the cheapest price for display
    const price = p.variants?.[0]?.calculated_price?.calculated_amount
      ? `R${(p.variants[0].calculated_price.calculated_amount / 100).toFixed(2)}`
      : 'R0.00';

    return {
      name: p.title || 'Product',
      price: price,
      image: p.thumbnail || '/placeholder.svg?height=400&width=320',
      alt: p.title || 'Product image',
      buttonVariant: 'select' as const,
      handle: p.handle
    }
  })

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ShippingBanner />
      <ProductGrid
        title="Lovely, soft and cozy"
        linkLabel="View all"
        products={springOutfits}
      />
      <MarqueeStrip />
      <GardenEditorial />
      <OurRange />
      <ProductGrid
        title="Garden adventures"
        linkLabel="View collection"
        products={gardenAdventuresMock}
      />
    </main>
  )
}
