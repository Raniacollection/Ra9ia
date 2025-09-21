import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { getPartnerBySlug, getPartnerProducts } from "@/lib/sanity/queries"
import { urlFor } from "@/sanity/lib/client"

// TypeScript interfaces for partners and partner products
interface Partner {
  _id: string
  name: string
  slug: {
    current: string
  }
  logo?: any
  logoUrl?: string
  coverImage?: any
  coverImageUrl?: string
  description?: string
  shortDescription?: string
  contactInfo?: {
    email?: string
    phone?: string
    website?: string
    telegram?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
    twitter?: string
    tiktok?: string
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
}

// Define the props for the page component
interface PartnerPageProps {
  params: {
    slug: string
  }
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  // Fetch partner data from Sanity
  const partner: Partner | null = await getPartnerBySlug(params.slug)
  
  // If partner doesn't exist, return 404
  if (!partner) {
    notFound()
  }
  
  // Fetch partner products
  const products: PartnerProduct[] = await getPartnerProducts(partner._id) || []

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Partner Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl md:text-5xl text-ra9ia-900">
                    {partner.name}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {partner.shortDescription || partner.description?.substring(0, 160)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {partner.contactInfo?.website && (
                    <Link href={partner.contactInfo.website} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                        Visit Website
                      </Button>
                    </Link>
                  )}
                  {partner.contactInfo?.telegram && (
                    <Link href={`https://t.me/${partner.contactInfo.telegram}`} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="outline">
                        Contact on Telegram
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-xl">
                {partner.coverImageUrl ? (
                  <Image
                    src={partner.coverImageUrl}
                    alt={partner.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : partner.logoUrl ? (
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain p-12 bg-white"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xl">{partner.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Partner Products Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl md:text-5xl text-ra9ia-900">
                  Products by {partner.name}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our collection of products from {partner.name}
                </p>
              </div>
            </div>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {products.map((product) => (
                  <Card key={product._id} className="overflow-hidden border-0 shadow-sm">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover transition-transform hover:scale-105"
                          />
                        ) : product.images && product.images.length > 0 ? (
                          <Image
                            src={urlFor(product.images[0]).url()}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover transition-transform hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">${product.price}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-4">
                        <Link href={`/partners/${params.slug}/products/${product.slug.current}`}>
                          <Button variant="outline" className="w-full border-ra9ia-200 text-ra9ia-800 hover:bg-ra9ia-50">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products available from this partner yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Partner Description Section */}
        {partner.description && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
                <div className="space-y-4">
                  <h2 className="text-3xl font-serif font-bold tracking-tighter">About {partner.name}</h2>
                  <div className="prose max-w-none">
                    <p>{partner.description}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {(partner.contactInfo || partner.socialMedia) && (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-medium mb-4">Contact Information</h3>
                      <div className="space-y-2">
                        {partner.contactInfo?.email && (
                          <p className="flex items-center gap-2">
                            <span className="font-medium">Email:</span>
                            <a href={`mailto:${partner.contactInfo.email}`} className="text-ra9ia-800 hover:underline">
                              {partner.contactInfo.email}
                            </a>
                          </p>
                        )}
                        {partner.contactInfo?.phone && (
                          <p className="flex items-center gap-2">
                            <span className="font-medium">Phone:</span>
                            <a href={`tel:${partner.contactInfo.phone}`} className="text-ra9ia-800 hover:underline">
                              {partner.contactInfo.phone}
                            </a>
                          </p>
                        )}
                        {partner.contactInfo?.website && (
                          <p className="flex items-center gap-2">
                            <span className="font-medium">Website:</span>
                            <a href={partner.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-ra9ia-800 hover:underline">
                              {partner.contactInfo.website.replace(/(^\w+:|^)\/\//, '')}
                            </a>
                          </p>
                        )}
                      </div>
                      
                      {partner.socialMedia && Object.values(partner.socialMedia).some(value => value) && (
                        <div className="mt-4">
                          <h4 className="text-lg font-medium mb-2">Social Media</h4>
                          <div className="flex gap-4">
                            {partner.socialMedia.instagram && (
                              <a href={partner.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-ra9ia-800 hover:text-ra9ia-900">
                                <span className="sr-only">Instagram</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>
                              </a>
                            )}
                            {partner.socialMedia.facebook && (
                              <a href={partner.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-ra9ia-800 hover:text-ra9ia-900">
                                <span className="sr-only">Facebook</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                              </a>
                            )}
                            {partner.socialMedia.twitter && (
                              <a href={partner.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-ra9ia-800 hover:text-ra9ia-900">
                                <span className="sr-only">Twitter</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                              </a>
                            )}
                            {partner.socialMedia.tiktok && (
                              <a href={partner.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="text-ra9ia-800 hover:text-ra9ia-900">
                                <span className="sr-only">TikTok</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                                  <path d="M15 8v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4h8"></path>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
