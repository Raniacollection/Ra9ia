import Link from "next/link"
import Image from "next/image"
import { Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPartners, getAllPartnerProducts } from "@/lib/sanity/queries"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"

// TypeScript interfaces for partners and partner products
interface Partner {
  _id: string
  name: string
  slug: {
    current: string
  }
  logo?: any
  logoUrl?: string
  shortDescription?: string
  featured?: boolean
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

export default async function PartnersPage() {
  // Fetch partners and partner products from Sanity
  const partners: Partner[] = await getPartners() || []
  const partnerProducts: PartnerProduct[] = await getAllPartnerProducts() || []
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-burgundy-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Partner Products
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover complementary products from our trusted business partners
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-cream-50 border border-cream-200">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-ra9ia-800">
                    All Partners
                  </TabsTrigger>
                  <TabsTrigger
                    value="accessories"
                    className="data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                  >
                    Accessories
                  </TabsTrigger>
                  <TabsTrigger
                    value="jewelry"
                    className="data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                  >
                    Jewelry
                  </TabsTrigger>
                  <TabsTrigger
                    value="scarves"
                    className="data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                  >
                    Scarves
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partners.length > 0 ? (
                    partners.map((partner: Partner) => (
                      <Card key={partner._id} className="overflow-hidden">
                        <div className="relative aspect-video">
                          {partner.logoUrl ? (
                            <Image
                              src={partner.logoUrl}
                              alt={partner.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-ra9ia-800">
                            {partner.name}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-2">{partner.name}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {partner.shortDescription || 'Partner of Ra9ia Collection'}
                          </p>
                          <Link href={`/partners/${partner.slug.current}`}>
                            <Button variant="outline" className="w-full border-ra9ia-200 text-ra9ia-800 hover:bg-ra9ia-50">
                              View Products
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <p className="text-muted-foreground">No partners available</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="accessories" className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partnerProducts.length > 0 ? (
                    partnerProducts
                      .filter((product: PartnerProduct) => product.name.toLowerCase().includes('accessory') || product.description.toLowerCase().includes('accessory'))
                      .map((product: PartnerProduct) => (
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
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-ra9ia-800">
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
                              <Button variant="outline" className="w-full border-ra9ia-200 text-ra9ia-800 hover:bg-ra9ia-50">
                                View Product
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <p className="text-muted-foreground">No accessory products available</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="jewelry" className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partnerProducts.length > 0 ? (
                    partnerProducts
                      .filter((product: PartnerProduct) => product.name.toLowerCase().includes('jewelry') || product.description.toLowerCase().includes('jewelry'))
                      .map((product: PartnerProduct) => (
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
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-ra9ia-800">
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
                              <Button variant="outline" className="w-full border-ra9ia-200 text-ra9ia-800 hover:bg-ra9ia-50">
                                View Product
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <p className="text-muted-foreground">No jewelry products available</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="scarves" className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partnerProducts.length > 0 ? (
                    partnerProducts
                      .filter((product: PartnerProduct) => product.name.toLowerCase().includes('scarf') || product.description.toLowerCase().includes('scarf') || product.name.toLowerCase().includes('scarves') || product.description.toLowerCase().includes('scarves'))
                      .map((product: PartnerProduct) => (
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
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-ra9ia-800">
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
                              <Button variant="outline" className="w-full border-ra9ia-200 text-ra9ia-800 hover:bg-ra9ia-50">
                                View Product
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <p className="text-muted-foreground">No scarf products available</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Become a Partner
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join our growing community of business partners and showcase your products to our customers.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ra9ia-800 text-white">
                      1
                    </div>
                    <p className="font-medium">Apply to become a partner through our simple application process</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ra9ia-800 text-white">
                      2
                    </div>
                    <p className="font-medium">Our team will review your products and brand alignment</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ra9ia-800 text-white">
                      3
                    </div>
                    <p className="font-medium">Once approved, showcase your products on our platform</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/become-partner">
                    <Button size="lg" className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                      Apply Now
                    </Button>
                  </Link>
                  <Link href="/partner-faq">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=1200&width=800"
                  alt="Partner with Ra9ia Collection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between gap-4 md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-serif text-xl font-bold">Ra9ia</span>
              <span className="font-light">Collection</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Elegance in modesty. Discover our exquisite collection of Abayas and modest fashion pieces.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="font-medium">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/collections" className="text-muted-foreground hover:text-foreground">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="text-muted-foreground hover:text-foreground">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/bestsellers" className="text-muted-foreground hover:text-foreground">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="/sale" className="text-muted-foreground hover:text-foreground">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="text-muted-foreground hover:text-foreground">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 border-t py-6 md:h-16 md:py-0">
          <p className="text-xs text-muted-foreground">© 2023 Ra9ia Collection. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

