'use client'

import { Heart, Menu, Search, User, X, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const menuTabs = ['Shop', 'Collections', 'Inspiration', 'About us'] as const
type MenuTab = (typeof menuTabs)[number]

const shopCategories = [
  { label: 'Coming soon', hasChevron: false },
  { label: 'New', hasChevron: false },
  { label: 'Bestsellers', hasChevron: false },
  { label: 'Gifts', hasChevron: true },
  { label: 'Clothing', hasChevron: true },
  { label: 'Toys', hasChevron: true },
  { label: 'To sleep', hasChevron: true },
  { label: 'Baby & nursery', hasChevron: true },
]

const collections = [
  { label: 'Dolls collection', image: '/placeholder.svg?height=300&width=300', href: '/collections/dolls' },
  { label: 'Garden collection', image: '/placeholder.svg?height=300&width=300', href: '/collections/garden' },
  { label: "Children's clothing collection", image: '/placeholder.svg?height=300&width=300', href: '/collections/clothing' },
  { label: 'Babywear Collection', image: '/placeholder.svg?height=300&width=300', href: '/collections/babywear' },
  { label: 'Summer collection', image: '/placeholder.svg?height=300&width=300', href: '/collections/summer' },
  { label: 'Baby & kids room', image: '/placeholder.svg?height=300&width=300', href: '/collections/room' },
  { label: 'Newborn Naturals', image: '/placeholder.svg?height=300&width=300', href: '/collections/newborn' },
  { label: 'Forest Friends', image: '/placeholder.svg?height=300&width=300', href: '/collections/forest' },
]

export default function Navbar({ cartButton }: { cartButton?: React.ReactNode }) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const isHome = segments.length === 1

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<MenuTab>('Shop')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const wishlistCount = 1

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const isTransparent = isHome && !scrolled && !menuOpen

  const navTextColor = isTransparent ? 'white' : '#8a7e5a'
  const logoColor = isTransparent ? 'white' : 'var(--foreground)'
  const iconColor = isTransparent ? 'white' : 'var(--foreground)'

  return (
    <>
      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute top-0 left-0 right-0 bg-white shadow-sm flex items-center px-6 py-4 gap-4">
            <Search size={18} className="text-muted-foreground shrink-0" strokeWidth={1.5} />
            <input
              autoFocus
              type="text"
              placeholder="Start typing to search ..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 text-base text-foreground placeholder:text-muted-foreground outline-none bg-transparent font-sans"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} aria-label="Close search">
              <X size={20} className="text-foreground" strokeWidth={1.5} />
            </button>
          </div>
          <div
            className="absolute inset-0 bg-black/40 pt-16"
            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
          />
        </div>
      )}

      {/* Menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[150] bg-white flex flex-col overflow-y-auto">
          {/* Tabs row */}
          <div className="flex items-center border-b border-border/40 px-8">
            {menuTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm py-4 px-5 relative transition-colors font-sans ${activeTab === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
              </button>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="ml-auto w-10 h-10 bg-muted flex items-center justify-center rounded-sm hover:bg-border transition-colors"
              aria-label="Close menu"
            >
              <X size={16} className="text-foreground" strokeWidth={1.5} />
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 px-8 py-10">
            {activeTab === 'Shop' && (
              <div className="flex gap-16">
                {/* Category list */}
                <div className="w-80 shrink-0">
                  <h2 className="text-4xl font-serif font-light text-foreground mb-8">Shop</h2>
                  <ul>
                    {shopCategories.map((cat, i) => (
                      <li key={cat.label}>
                        <Link
                          href={`/shop/${cat.label.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between py-4 text-base text-foreground hover:text-muted-foreground transition-colors font-sans"
                        >
                          {cat.label}
                          {cat.hasChevron && <ChevronRight size={16} strokeWidth={1.5} className="text-muted-foreground" />}
                        </Link>
                        {i < shopCategories.length - 1 && <div className="border-b border-border/40" />}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Editorial card */}
                <div className="flex-1 flex items-start pt-14">
                  <div className="relative w-[380px] h-[480px] rounded-[2rem] overflow-hidden">
                    <img
                      src="/placeholder.svg?height=480&width=380"
                      alt="New children's clothing collection"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-[2rem]" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <p className="text-xs tracking-[0.2em] uppercase mb-2 font-sans opacity-80">NEW</p>
                      <h3 className="text-4xl font-serif font-light leading-tight">Kinderkleding</h3>
                    </div>
                    <button className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-background transition-colors">
                      <ArrowRight size={16} className="text-foreground" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Collections' && (
              <div>
                <h2 className="text-4xl font-serif font-light text-foreground mb-8">Collections</h2>
                <div className="grid grid-cols-4 gap-4">
                  {collections.map(col => (
                    <Link
                      key={col.label}
                      href={col.href}
                      onClick={() => setMenuOpen(false)}
                      className="relative rounded-2xl overflow-hidden aspect-square bg-sage group"
                    >
                      <img
                        src={col.image}
                        alt={col.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <p className="absolute bottom-4 left-4 text-white text-base font-sans leading-snug">
                        {col.label}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Inspiration' && (
              <div>
                <h2 className="text-4xl font-serif font-light text-foreground mb-8">Inspiration</h2>
                <p className="text-muted-foreground font-sans">Stories, guides and ideas for little explorers.</p>
              </div>
            )}

            {activeTab === 'About us' && (
              <div>
                <h2 className="text-4xl font-serif font-light text-foreground mb-8">About us</h2>
                <p className="text-muted-foreground font-sans">The MoosaNest story — softcare for little ones.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navbar */}
      <header
        className={`${isHome ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 transition-all duration-300 ${
          isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'
        }`}
        style={{ paddingTop: '2.7rem', paddingBottom: '2.7rem' }}
      >
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-5">
          <button
            className="flex items-center gap-2 text-sm font-normal tracking-wide hover:opacity-70 transition-opacity"
            style={{ color: navTextColor }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={19} strokeWidth={1.5} style={{ color: navTextColor }} />
            <span>Menu</span>
          </button>
          <button
            className="flex items-center gap-2 text-sm font-normal tracking-wide hover:opacity-70 transition-opacity"
            style={{ color: navTextColor }}
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <Search size={17} strokeWidth={1.5} style={{ color: navTextColor }} />
            <span>Search</span>
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link href="/" className="block">
            <Image
              src="/logo-w-slogan.png"
              alt="MoosaNest - Softcare for little ones"
              width={360}
              height={100}
              className={`h-24 w-auto object-contain transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}
              priority
            />
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <Link href="/account/wishlist" className="relative hover:opacity-70 transition-opacity" aria-label="Wishlist">
            <Heart size={22} strokeWidth={1.5} style={{ color: iconColor }} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-orange-500 text-white text-[9px] leading-none flex items-center justify-center font-sans font-semibold">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/login" className="hover:opacity-70 transition-opacity" aria-label="Account" style={{ color: iconColor }}>
            <User size={22} strokeWidth={1.5} />
          </Link>
          <div className="hover:opacity-70 transition-opacity" style={{ color: iconColor }}>
            {cartButton}
          </div>
        </div>
      </header>
    </>
  )
}
