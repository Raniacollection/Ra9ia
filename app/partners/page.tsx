import Link from "next/link"
import Image from "next/image"
 

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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl md:text-5xl text-ra9ia-900">
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
              <div className="mb-8">
                <div className="mx-auto max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1">
                  <TabsList className="inline-flex min-w-max gap-1 bg-cream-50 border border-cream-200 rounded-none md:rounded">
                    <TabsTrigger value="all" className="px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-ra9ia-800">
                      All Partners
                    </TabsTrigger>
                    <TabsTrigger
                      value="accessories"
                      className="px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                    >
                      Accessories
                    </TabsTrigger>
                    <TabsTrigger
                      value="jewelry"
                      className="px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                    >
                      Jewelry
                    </TabsTrigger>
                    <TabsTrigger
                      value="scarves"
                      className="px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                    >
                      Scarves
                    </TabsTrigger>
                  </TabsList>
                </div>
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
                  src="/images/partner.webp"
                  alt="Partner with Ra9ia Collection"
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

