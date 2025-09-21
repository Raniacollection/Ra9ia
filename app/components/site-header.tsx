"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, ShoppingBag, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { CartDropdown } from "@/components/cart/cart-dropdown"
import { useMessagingSettings } from "@/hooks/use-messaging"
import { DEFAULT_TELEGRAM_USERNAME } from "@/lib/telegram"
import { MegaMenu } from "./mega-menu"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { items, itemCount } = useCart()
  const { messaging } = useMessagingSettings()
  const telegramForCart = (messaging.telegramUsername || DEFAULT_TELEGRAM_USERNAME).replace('@','')

  const navLinks = [
    { href: "/collections", label: "Collections" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/bestsellers", label: "Bestsellers" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-burgundy-100 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold text-ra9ia-900">Ra9ia</span>
            <span className="font-light text-burgundy-800">Collection</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <MegaMenu />
            {/* Simple links */}
            <Link href="/about" className="text-sm leading-6 text-ra9ia-900/80 hover:text-ra9ia-900">
              About
            </Link>
            <Link href="/contact" className="text-sm leading-6 text-ra9ia-900/80 hover:text-ra9ia-900">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Desktop navigation icons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Dropdown */}
            <CartDropdown telegramUsername={telegramForCart} />
          </div>

          {/* Mobile navigation icons */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile Cart Icon */}
            <Link href="/cart" className="text-ra9ia-900/70 hover:text-ra9ia-900 relative">
              <span className="sr-only">Cart</span>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-ra9ia-800 text-white">
                  {itemCount}
                </Badge>
              )}
            </Link>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-ra9ia-900/70 hover:text-ra9ia-900">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b pb-4">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <span className="font-serif text-2xl font-bold text-ra9ia-900">Ra9ia</span>
                      <span className="font-light text-burgundy-800">Collection</span>
                    </Link>
                  </div>
                  
                  <nav className="flex flex-col gap-1 py-6">
                    <div className="px-4 py-2 text-sm text-ra9ia-900/60">Shop</div>
                    <Link href="/new-arrivals" className="px-4 py-3 text-base transition-colors hover:bg-ra9ia-50 hover:text-ra9ia-700 rounded-md" onClick={() => setIsOpen(false)}>
                      New arrivals
                    </Link>
                    <Link href="/bestsellers" className="px-4 py-3 text-base transition-colors hover:bg-ra9ia-50 hover:text-ra9ia-700 rounded-md" onClick={() => setIsOpen(false)}>
                      Bestsellers
                    </Link>
                    <Link href="/collections" className="px-4 py-3 text-base transition-colors hover:bg-ra9ia-50 hover:text-ra9ia-700 rounded-md" onClick={() => setIsOpen(false)}>
                      Collections
                    </Link>
                    <Link href="/partners" className="px-4 py-3 text-base transition-colors hover:bg-ra9ia-50 hover:text-ra9ia-700 rounded-md" onClick={() => setIsOpen(false)}>
                      Partner products
                    </Link>

                    <div className="px-4 pt-6 pb-2 text-sm text-ra9ia-900/60">Info</div>
                    <Link href="/about" className="px-4 py-3 text-base transition-colors hover:bg-ra9ia-50 hover:text-ra9ia-700 rounded-md" onClick={() => setIsOpen(false)}>
                      About
                    </Link>
                    <Link href="/contact" className="px-4 py-3 text-base transition-colors hover:bg-ra9ia-50 hover:text-ra9ia-700 rounded-md" onClick={() => setIsOpen(false)}>
                      Contact
                    </Link>
                  </nav>
                  
                  <div className="mt-auto border-t pt-6">
                    <div className="flex flex-col gap-3 px-4">
                      
                      <Link
                        href="/cart"
                        className="flex items-center gap-2 text-base font-medium transition-colors hover:text-ra9ia-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span>Cart</span>
                        {itemCount > 0 && (
                          <Badge variant="destructive" className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {itemCount}
                          </Badge>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

