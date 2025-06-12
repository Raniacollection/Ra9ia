"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { useCart } from "../contexts/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const shipping = subtotal > 100 ? 0 : 5.99
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:py-12 lg:py-16 mx-auto">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-ra9ia-900 mb-8">Shopping Cart</h1>

          {items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <Card key={item.id} className="border-burgundy-100">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative aspect-square sm:w-24 h-24 overflow-hidden rounded-md border border-burgundy-100">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between">
                            <Link href={`/product/${item.id}`} className="font-medium hover:text-ra9ia-700">
                              {item.name}
                            </Link>
                            <div className="font-medium text-ra9ia-800">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span>{item.color}</span> / <span>Size {item.size}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-md border-burgundy-200"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <div className="flex h-8 w-10 items-center justify-center rounded-md border border-burgundy-200 bg-transparent text-sm font-medium">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-md border-burgundy-200"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-ra9ia-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-between items-center">
                  <Link href="/collections" className="flex items-center text-ra9ia-700 hover:text-ra9ia-800">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              <div>
                <Card className="border-burgundy-100">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4 text-ra9ia-900">Order Summary</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <Separator className="my-2 bg-burgundy-100" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-ra9ia-900">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Promo Code</div>
                        <div className="flex space-x-2">
                          <Input placeholder="Enter code" className="border-burgundy-200" />
                          <Button variant="outline" className="border-burgundy-200 hover:bg-burgundy-50">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full bg-ra9ia-800 text-white hover:bg-ra9ia-900">Proceed to Checkout</Button>
                  </CardFooter>
                </Card>

                <div className="mt-6 bg-cream-50 p-4 rounded-lg border border-cream-200 text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="text-ra9ia-700 mt-0.5">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <p>Free shipping on orders over $100</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-ra9ia-700 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                    <p>Secure checkout with SSL encryption</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy-50 mb-4">
                <ShoppingBag className="h-8 w-8 text-ra9ia-700" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
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

