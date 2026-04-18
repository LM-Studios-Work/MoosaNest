'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, ShoppingBag, Heart, CreditCard, LogOut } from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '/account', icon: LayoutGrid },
  { label: 'My Orders', href: '/account/orders', icon: ShoppingBag },
  { label: 'Wish list', href: '/account/wishlist', icon: Heart },
  { label: 'My details', href: '/account/details', icon: CreditCard },
  { label: 'Log', href: '/account/log', icon: LogOut },
]

export default function AccountSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 shrink-0 bg-muted/40 border-r border-border/30 py-10">
      <nav>
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-8 py-5 text-sm font-sans transition-colors ${
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className={isActive ? 'text-foreground' : 'text-muted-foreground'}
                />
                {item.label}
              </Link>
              {i < navItems.length - 1 && (
                <div className="mx-8 border-b border-border/40" />
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
