import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { getFeaturedPartnerProducts } from "@/lib/sanity/queries"

// TypeScript interfaces for partner products
interface Partner {
  _id: string
  name: string
  slug: {
    current: string
  }
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
  partner: Partner
}

export default async function Home() {
  // Fetch featured partner products from Sanity
  const featuredPartnerProducts: PartnerProduct[] = await getFeaturedPartnerProducts() || []
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-burgundy-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Elegance in Modesty
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover our exquisite collection of Abayas and modest fashion pieces designed for the modern Muslim
                    woman.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/collections">
                    <Button size="lg" className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                      Shop Collection
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-xl">
                <Image
                  src="/images/hero.png"
                  alt="Woman in elegant red abaya in desert setting"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Collections
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our carefully curated collections designed for every occasion
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <Link
                href="/collections/everyday"
                className="group relative overflow-hidden rounded-lg border border-burgundy-100"
              >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src="/placeholder.svg?height=600&width=450"
                    alt="Everyday Collection"
                    width={450}
                    height={600}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ra9ia-900/70 to-transparent p-6 text-white">
                  <div>
                    <h3 className="text-xl font-medium">Everyday Elegance</h3>
                    <p className="text-sm text-white/80">Comfortable yet stylish pieces for daily wear</p>
                  </div>
                </div>
              </Link>
              <Link
                href="/collections/formal"
                className="group relative overflow-hidden rounded-lg border border-burgundy-100"
              >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src="/placeholder.svg?height=600&width=450"
                    alt="Formal Collection"
                    width={450}
                    height={600}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ra9ia-900/70 to-transparent p-6 text-white">
                  <div>
                    <h3 className="text-xl font-medium">Formal Occasions</h3>
                    <p className="text-sm text-white/80">Luxurious abayas for special events</p>
                  </div>
                </div>
              </Link>
              <Link
                href="/collections/seasonal"
                className="group relative overflow-hidden rounded-lg border border-burgundy-100"
              >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src="/placeholder.svg?height=600&width=450"
                    alt="Seasonal Collection"
                    width={450}
                    height={600}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ra9ia-900/70 to-transparent p-6 text-white">
                  <div>
                    <h3 className="text-xl font-medium">Seasonal Styles</h3>
                    <p className="text-sm text-white/80">Weather-appropriate modest fashion</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex justify-center mt-10">
              <Link href="/collections">
                <Button variant="outline" className="group">
                  View All Collections
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-burgundy-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">Bestsellers</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our most loved pieces chosen by our customers
                </p>
              </div>
            </div>
            <Tabs defaultValue="all" className="mt-10">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="abayas">Abayas</TabsTrigger>
                  <TabsTrigger value="hijabs">Hijabs</TabsTrigger>
                  <TabsTrigger value="accessories">Accessories</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="overflow-hidden border-0 shadow-sm">
                      <div className="relative">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=400&width=400`}
                            alt={`Bestseller ${item}`}
                            width={400}
                            height={400}
                            className="object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="sr-only">Add to wishlist</span>
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Classic Black Abaya</h3>
                            <p className="text-sm text-muted-foreground">$129.99</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-ra9ia-600 text-ra9ia-600" />
                            <span className="text-sm ml-1">4.9</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="abayas" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="overflow-hidden border-0 shadow-sm">
                      <div className="relative">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=400&width=400`}
                            alt={`Abaya ${item}`}
                            width={400}
                            height={400}
                            className="object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="sr-only">Add to wishlist</span>
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Embroidered Abaya</h3>
                            <p className="text-sm text-muted-foreground">$149.99</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-ra9ia-600 text-ra9ia-600" />
                            <span className="text-sm ml-1">4.8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              {/* Similar content for other tabs */}
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Partner Products
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Complementary products from our trusted business partners
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {featuredPartnerProducts.length > 0 ? (
                featuredPartnerProducts.map((product: PartnerProduct) => (
                  <Card key={product._id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                        {product.partner.name}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-medium">${product.price}</div>
                        <div className="flex items-center">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.round(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <Link href={`/partners/${product.partner.slug.current}/products/${product.slug.current}`}>
                        <Button variant="outline" className="w-full">
                          View Product
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-muted-foreground">No featured partner products available</p>
                </div>
              )}
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-xl font-medium mb-4">Are you a business owner?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Partner with Ra9ia Collection to showcase your complementary products to our customers.
              </p>
              <Link href="/become-partner">
                <Button>Become a Partner</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Stay updated with our latest collections, exclusive offers, and modest fashion tips.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                  <Button className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">Subscribe</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Newsletter subscription"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

