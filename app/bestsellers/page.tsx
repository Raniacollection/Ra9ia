import { Filter, Grid3X3, GridIcon, SlidersHorizontal, Star } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "../components/product-card"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { NewsletterSignup } from "../components/newsletter-signup"

export default function BestsellersPage() {
  // Create sample product data for bestsellers
  const bestsellers = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 300,
    name: `Bestselling ${i % 3 === 0 ? "Classic" : i % 3 === 1 ? "Embroidered" : "Designer"} Abaya ${i + 1}`,
    price: 129.99 + i * 5,
    image: `/placeholder.svg?height=600&width=450`,
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: 10 + Math.floor(Math.random() * 90),
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-burgundy-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl text-ra9ia-900">
                  Bestsellers
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our most loved pieces chosen by our customers
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
                    All Bestsellers
                  </TabsTrigger>
                  <TabsTrigger
                    value="abayas"
                    className="data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                  >
                    Abayas
                  </TabsTrigger>
                  <TabsTrigger
                    value="hijabs"
                    className="data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                  >
                    Hijabs
                  </TabsTrigger>
                  <TabsTrigger
                    value="accessories"
                    className="data-[state=active]:bg-white data-[state=active]:text-ra9ia-800"
                  >
                    Accessories
                  </TabsTrigger>
                </TabsList>
              </div>

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
                          <h3 className="text-sm font-medium text-ra9ia-900">Rating</h3>
                          <div className="grid grid-cols-1 gap-2">
                            <Button variant="outline" size="sm" className="justify-start bg-ra9ia-50 border-ra9ia-200">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500" />
                                <span className="ml-2">& Up</span>
                              </div>
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500" />
                                <Star className="h-3 w-3 text-muted-foreground" />
                                <span className="ml-2">& Up</span>
                              </div>
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                                <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500" />
                                <Star className="h-3 w-3 text-muted-foreground mr-1" />
                                <Star className="h-3 w-3 text-muted-foreground" />
                                <span className="ml-2">& Up</span>
                              </div>
                            </Button>
                          </div>
                        </div>
                        <Separator className="bg-burgundy-100" />
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-ra9ia-900">Colors</h3>
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
                              Burgundy
                            </Button>
                          </div>
                        </div>
                        <Separator className="bg-burgundy-100" />
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-ra9ia-900">Price Range</h3>
                          <div className="grid grid-cols-1 gap-2">
                            <Button variant="outline" size="sm" className="justify-start">
                              Under $100
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              $100 - $150
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              $150 - $200
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
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                        <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                        <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                        <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500 mr-1" />
                        <Star className="h-3 w-3 fill-ra9ia-500 text-ra9ia-500" />
                        <span className="ml-1">& Up</span>
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        Sort by: Most Popular
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuRadioGroup value="popular">
                        <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="price-low-high">Price: Low to High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="price-high-low">Price: High to Low</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-center border rounded-md border-burgundy-100">
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

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {bestsellers.map((product) => (
                    <div key={product.id} className="space-y-3">
                      <ProductCard id={product.id} name={product.name} price={product.price} image={product.image} />
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-ra9ia-500 text-ra9ia-500" : i < product.rating ? "fill-ra9ia-500/50 text-ra9ia-500/50" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="abayas" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {bestsellers.slice(0, 8).map((product) => (
                    <div key={product.id} className="space-y-3">
                      <ProductCard
                        id={product.id}
                        name={product.name.replace("Designer", "Premium").replace("Embroidered", "Luxury")}
                        price={product.price}
                        image={product.image}
                      />
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-ra9ia-500 text-ra9ia-500" : i < product.rating ? "fill-ra9ia-500/50 text-ra9ia-500/50" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hijabs" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {bestsellers.slice(4, 8).map((product) => (
                    <div key={product.id + 100} className="space-y-3">
                      <ProductCard
                        id={product.id + 100}
                        name={product.name
                          .replace("Abaya", "Hijab")
                          .replace("Designer", "Silk")
                          .replace("Embroidered", "Premium")}
                        price={product.price - 50}
                        image={product.image}
                      />
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-ra9ia-500 text-ra9ia-500" : i < product.rating ? "fill-ra9ia-500/50 text-ra9ia-500/50" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="accessories" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {bestsellers.slice(8, 12).map((product) => (
                    <div key={product.id + 200} className="space-y-3">
                      <ProductCard
                        id={product.id + 200}
                        name={product.name
                          .replace("Abaya", "Accessory")
                          .replace("Designer", "Handcrafted")
                          .replace("Embroidered", "Beaded")
                          .replace("Classic", "Elegant")}
                        price={product.price - 80}
                        image={product.image}
                      />
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-ra9ia-500 text-ra9ia-500" : i < product.rating ? "fill-ra9ia-500/50 text-ra9ia-500/50" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

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
            </Tabs>
          </div>
        </section>

        <NewsletterSignup />
      </main>
      <SiteFooter />
    </div>
  )
}

