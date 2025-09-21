import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { getPartnerBySlug, getPartnerProducts } from "@/lib/sanity/queries"
import { urlFor } from "@/sanity/lib/client"
import { useState } from "react"

// TypeScript interfaces for partners and partner products
interface Partner {
  _id: string
  name: string
  slug: {
    current: string
  }
  logo?: any
  logoUrl?: string
  description?: string
  shortDescription?: string
}

interface PartnerProduct {
  _id: string
  name: string
  slug: {
    current: string
  }
  price: number
  description: string
  imageUrl?: string
  images: any[]
  rating?: number
  reviewCount?: number
  details?: string[]
  colors?: Array<{
    name: string
    value: string
    stockQuantity: number
  }>
  sizes?: string[]
  inventoryManagement?: {
    trackInventory: boolean
    totalStock: number
    lowStockThreshold: number
    showRemainingStock: boolean
  }
}

// Define the props for the page component
interface ProductPageProps {
  params: {
    slug: string
    productSlug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch partner data from Sanity
  const partner: Partner | null = await getPartnerBySlug(params.slug)
  
  // If partner doesn't exist, return 404
  if (!partner) {
    notFound()
  }
  
  // Fetch partner products
  const products: PartnerProduct[] = await getPartnerProducts(partner._id) || []
  
  // Find the specific product
  const product = products.find(p => p.slug.current === params.productSlug)
  
  // If product doesn't exist, return 404
  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container px-4 md:px-6 py-4">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/partners" className="hover:text-foreground">Partners</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={`/partners/${params.slug}`} className="hover:text-foreground">{partner.name}</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg border bg-muted">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : product.images && product.images.length > 0 ? (
                    <Image
                      src={urlFor(product.images[0]).url()}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative aspect-[3/4] overflow-hidden rounded-md border bg-muted">
                        <Image
                          src={urlFor(image).url()}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  
                  <p className="text-3xl font-bold">{formatCurrency(product.price, 'ETB')}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">{product.description}</p>
                  
                  {/* Product Details */}
                  {product.details && product.details.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Product Details</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {product.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Color Options */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Color</h3>
                        <span className="text-sm text-muted-foreground">Select a color</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="relative h-9 w-9 rounded-full border border-input cursor-pointer overflow-hidden"
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          >
                            {color.stockQuantity <= 0 && (
                              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                <span className="text-xs font-medium text-muted-foreground">OOS</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Options */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Size</h3>
                        <Link href="/size-guide" className="text-sm text-ra9ia-800 hover:underline">
                          Size Guide
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size, index) => (
                          <div
                            key={index}
                            className="flex h-9 items-center justify-center rounded-md border border-input px-3 cursor-pointer"
                          >
                            <span className="text-sm">{size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Quantity</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-l-md rounded-r-none">
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex h-9 w-12 items-center justify-center border-y border-input">
                          <span className="text-sm">1</span>
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-r-md rounded-l-none">
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                      
                      {/* Stock Information */}
                      {product.inventoryManagement?.trackInventory && product.inventoryManagement.showRemainingStock && (
                        <span className="text-sm text-muted-foreground">
                          {product.inventoryManagement.totalStock <= product.inventoryManagement.lowStockThreshold
                            ? `Only ${product.inventoryManagement.totalStock} left in stock!`
                            : `In stock (${product.inventoryManagement.totalStock} available)`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="bg-ra9ia-800 text-white hover:bg-ra9ia-900 flex-1">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    
                    <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
                      Quick Order via Telegram
                    </Button>
                  </div>
                </div>

                {/* Partner Info */}
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                      {partner.logoUrl ? (
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">{partner.name.substring(0, 2).toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {partner.shortDescription || 'Partner of Ra9ia Collection'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href={`/partners/${params.slug}`}>
                      <Button variant="outline" className="w-full">View All Products from {partner.name}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="w-full py-12 bg-cream-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">More Products from {partner.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p._id !== product._id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link 
                    key={relatedProduct._id} 
                    href={`/partners/${params.slug}/products/${relatedProduct.slug.current}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                      {relatedProduct.imageUrl ? (
                        <Image
                          src={relatedProduct.imageUrl}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <Image
                          src={urlFor(relatedProduct.images[0]).url()}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground">{formatCurrency(relatedProduct.price, 'ETB')}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
