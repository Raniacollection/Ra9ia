"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { CartDropdown } from "@/components/cart/cart-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { items, itemCount } = useCart()

  const navLinks = [
    { href: "/collections", label: "Collections" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/bestsellers", label: "Bestsellers" },
    { href: "/partners", label: "Partner Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold text-ra9ia-900">Ra9ia</span>
            <span className="font-light text-burgundy-800">Collection</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-ra9ia-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Desktop navigation icons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/search" className="text-muted-foreground hover:text-ra9ia-700">
              <span className="sr-only">Search</span>
              <Search className="h-5 w-5" />
            </Link>
            
            <Link href="/wishlist" className="text-muted-foreground hover:text-ra9ia-700 relative">
              <span className="sr-only">Wishlist</span>
              <Heart className="h-5 w-5" />
            </Link>
            
            {/* Cart Dropdown */}
            <CartDropdown telegramUsername="@Ra9ia" />
          </div>

          {/* Mobile navigation icons */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/search" className="text-muted-foreground hover:text-ra9ia-700">
              <span className="sr-only">Search</span>
              <Search className="h-5 w-5" />
            </Link>
            
            <Link href="/wishlist" className="text-muted-foreground hover:text-ra9ia-700 relative">
              <span className="sr-only">Wishlist</span>
              <Heart className="h-5 w-5" />
            </Link>
            
            {/* Mobile Cart Icon */}
            <Link href="/cart" className="text-muted-foreground hover:text-ra9ia-700 relative">
              <span className="sr-only">Cart</span>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-ra9ia-700">
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-muted-foreground hover:text-ra9ia-700"
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  
                  <nav className="flex flex-col gap-1 py-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-4 py-3 text-base font-medium transition-colors hover:bg-ra9ia-50 hover:text-ra9ia-700 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="mt-auto border-t pt-6">
                    <div className="flex flex-col gap-3 px-4">
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-2 text-base font-medium transition-colors hover:text-ra9ia-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <Heart className="h-5 w-5" />
                        <span>Wishlist</span>
                      </Link>
                      
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

