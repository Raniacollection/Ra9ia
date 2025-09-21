import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-burgundy-100 bg-ra9ia-900 text-cream-50">
      <div className="container py-14 md:py-16">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12">
          {/* Brand + story */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-baseline space-x-2">
              <span className="font-serif text-2xl md:text-3xl font-semibold">Ra9ia</span>
              <span className="text-sm text-cream-200">Collection</span>
            </Link>
            <p className="text-sm leading-7 text-cream-200">
              Quiet luxury for everyday life. Considered silhouettes in refined fabrics—crafted in small, thoughtful runs.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-cream-300 hover:text-white"><Facebook className="h-5 w-5" /><span className="sr-only">Facebook</span></Link>
              <Link href="#" className="text-cream-300 hover:text-white"><Instagram className="h-5 w-5" /><span className="sr-only">Instagram</span></Link>
              <Link href="#" className="text-cream-300 hover:text-white"><Twitter className="h-5 w-5" /><span className="sr-only">Twitter</span></Link>
            </div>
          </div>

          {/* Links + editorial card */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-serif text-lg mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-cream-200">
                <li><Link href="/new-arrivals" className="hover:text-white">New arrivals</Link></li>
                <li><Link href="/bestsellers" className="hover:text-white">Bestsellers</Link></li>
                <li><Link href="/collections" className="hover:text-white">Collections</Link></li>
                <li><Link href="/partners" className="hover:text-white">Partner products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-3">Info</h4>
              <ul className="space-y-2 text-sm text-cream-200">
                <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-300">© 2025 Ra9ia Collection. All rights reserved.</p>
          <div className="text-xs text-cream-300 flex gap-4">
            <Link href="/shipping" className="hover:text-white">Shipping</Link>
            <span className="opacity-50">•</span>
            <Link href="/returns" className="hover:text-white">Returns</Link>
            <span className="opacity-50">•</span>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span className="opacity-50">•</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

