"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { useWishlist } from "../contexts/wishlist-context"

export default function WishlistPage() {
  const { items: wishlistItems, removeItem } = useWishlist()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:py-12 lg:py-16 mx-auto">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-ra9ia-900 mb-8">My Wishlist</h1>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="border-burgundy-100 group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link href={`/product/${item.id}`}>
                        <div className="aspect-[3/4] overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={450}
                            height={600}
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-ra9ia-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <div className="p-4">
                      <Link href={`/product/${item.id}`} className="font-medium hover:text-ra9ia-700">
                        {item.name}
                      </Link>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-ra9ia-800 font-semibold">${item.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{item.color}</div>
                      </div>
                      <Button className="w-full mt-4 bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy-50 mb-4">
                <Heart className="h-8 w-8 text-ra9ia-700" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save your favorite items to your wishlist to purchase them later.
              </p>
              <Link href="/collections">
                <Button className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

