import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-burgundy-50/50">
      <div className="container flex flex-col md:flex-row justify-between gap-4 md:gap-8 md:py-12">
        <div className="flex flex-col gap-2 md:gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold text-ra9ia-900">Ra9ia</span>
            <span className="font-light text-burgundy-800">Collection</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Elegance in modesty. Discover our exquisite collection of Abayas and modest fashion pieces.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-medium text-ra9ia-900">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections" className="text-muted-foreground hover:text-ra9ia-700">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-muted-foreground hover:text-ra9ia-700">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-muted-foreground hover:text-ra9ia-700">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-muted-foreground hover:text-ra9ia-700">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-ra9ia-900">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-ra9ia-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-ra9ia-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-ra9ia-700">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-ra9ia-700">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-ra9ia-900">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-ra9ia-700">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-ra9ia-700">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-ra9ia-700">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-muted-foreground hover:text-ra9ia-700">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-ra9ia-900">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-ra9ia-700">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-ra9ia-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-ra9ia-700">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 border-t border-burgundy-100 py-6 md:h-16 md:py-0">
        <p className="text-xs text-muted-foreground">© 2023 Ra9ia Collection. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-ra9ia-700">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-ra9ia-700">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-ra9ia-700">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

