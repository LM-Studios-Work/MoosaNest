export default function Footer() {
  const links = {
    Shop: ['Clothing', 'Toys & Games', 'Nursery', 'Garden', 'Gift Cards'],
    About: ['Our Story', 'Sustainability', 'Press', 'Careers'],
    Service: ['FAQ', 'Shipping & Returns', 'Track Order', 'Contact Us'],
  }

  return (
    <footer className="border-t border-border/40 px-6 md:px-10 py-14" style={{ backgroundColor: 'var(--secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light mb-3 font-serif" style={{ fontWeight: 300 }}>
              MoosaNest
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              Quality clothing, toys and accessories. Softcare for little ones.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-4 font-sans">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors font-sans"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-sans">
            &copy; 2025 MoosaNest. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
