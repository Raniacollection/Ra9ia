import { Filter, Grid3X3, GridIcon, SlidersHorizontal } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { productsQuery } from "@/sanity/lib/queries"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "../components/product-card"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"

export const revalidate = 60 // Revalidate every minute

async function getProducts() {
  return await client.fetch(productsQuery)
}

export default async function CollectionsPage() {
  const products = await getProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-14 md:py-20 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl md:text-5xl text-ra9ia-900">
                  Our Collections
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our carefully curated collections designed for every occasion
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 md:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Narrow down your product search with the following filters.</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80">Categories</h3>
                        <div className="grid grid-cols-1 gap-2">
                          <Button variant="outline" size="sm" className="justify-start bg-ra9ia-50 border-ra9ia-200">
                            Abayas
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            Jilbabs
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            Hijabs
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            Accessories
                          </Button>
                        </div>
                      </div>
                      <Separator className="bg-burgundy-100" />
                      <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80">Colors</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="justify-start">
                            Black
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            White
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            Navy
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            Beige
                          </Button>
                        </div>
                      </div>
                      <Separator className="bg-burgundy-100" />
                      <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80">Price Range</h3>
                        <div className="grid grid-cols-1 gap-2">
                          <Button variant="outline" size="sm" className="justify-start">
                            Under $50
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            $50 - $100
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            $100 - $200
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            Over $200
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    All Filters
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 bg-ra9ia-50 border-ra9ia-200 text-ra9ia-900">
                    Abayas
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    Jilbabs
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    Hijabs
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      Sort by: Featured
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value="featured">
                      <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-low-high">Price: Low to High</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-high-low">Price: High to Low</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center border rounded-none md:rounded border-burgundy-100">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-ra9ia-700">
                    <Grid3X3 className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <GridIcon className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image || '/placeholder.svg?height=600&width=450'}
                  slug={product.slug}
                  partnerMessaging={product.partner?.messaging}
                  description={product.description}
                  colors={product.colors}
                  sizes={product.sizes}
                />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
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
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 bg-ra9ia-50 border-ra9ia-200 text-ra9ia-800">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  3
                </Button>
                <Button variant="outline" size="icon">
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
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

