"use client"

import { useState } from "react"
import { Filter, SearchIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { ProductCard } from "../components/product-card"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  // Mock search results
  const searchResults = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Elegant ${i % 2 === 0 ? "Embroidered" : "Classic"} Abaya ${i + 1}`,
    price: 99.99 + i * 10,
    image: `/placeholder.svg?height=600&width=450`,
  }))

  // Filter categories
  const categories = [
    { id: "abayas", label: "Abayas" },
    { id: "jilbabs", label: "Jilbabs" },
    { id: "hijabs", label: "Hijabs" },
    { id: "dresses", label: "Modest Dresses" },
    { id: "accessories", label: "Accessories" },
  ]

  // Filter colors
  const colors = [
    { id: "black", label: "Black" },
    { id: "navy", label: "Navy" },
    { id: "burgundy", label: "Burgundy" },
    { id: "beige", label: "Beige" },
    { id: "white", label: "White" },
  ]

  // Filter price ranges
  const priceRanges = [
    { id: "under-50", label: "Under $50" },
    { id: "50-100", label: "50 - $100" },
    { id: "100-150", label: "100 - $150" },
    { id: "150-200", label: "150 - $200" },
    { id: "over-200", label: "Over $200" },
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) => (prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedPriceRanges([])
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedColors.length > 0 || selectedPriceRanges.length > 0

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:py-12 lg:py-16 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-1/4 sticky top-24 self-start">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-ra9ia-900">Filters</h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 px-2 text-ra9ia-700 hover:text-ra9ia-800 hover:bg-burgundy-50"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3 text-ra9ia-800">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                            className="text-ra9ia-600 border-burgundy-200 data-[state=checked]:bg-ra9ia-600 data-[state=checked]:border-ra9ia-600"
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-burgundy-100" />

                  <div>
                    <h3 className="font-medium mb-3 text-ra9ia-800">Colors</h3>
                    <div className="space-y-2">
                      {colors.map((color) => (
                        <div key={color.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color.id}`}
                            checked={selectedColors.includes(color.id)}
                            onCheckedChange={() => handleColorChange(color.id)}
                            className="text-ra9ia-600 border-burgundy-200 data-[state=checked]:bg-ra9ia-600 data-[state=checked]:border-ra9ia-600"
                          />
                          <label
                            htmlFor={`color-${color.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {color.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-burgundy-100" />

                  <div>
                    <h3 className="font-medium mb-3 text-ra9ia-800">Price</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <div key={range.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`price-${range.id}`}
                            checked={selectedPriceRanges.includes(range.id)}
                            onCheckedChange={() => handlePriceRangeChange(range.id)}
                            className="text-ra9ia-600 border-burgundy-200 data-[state=checked]:bg-ra9ia-600 data-[state=checked]:border-ra9ia-600"
                          />
                          <label
                            htmlFor={`price-${range.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h1 className="text-2xl font-serif font-bold text-ra9ia-900">Search Products</h1>

                  {/* Filters - Mobile */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="md:hidden h-9 border-burgundy-200">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters{" "}
                        {hasActiveFilters &&
                          `(${selectedCategories.length + selectedColors.length + selectedPriceRanges.length})`}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>Narrow down your product search with the following filters.</SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-6 py-4">
                        {hasActiveFilters && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            className="justify-self-end h-8 px-2 text-ra9ia-700 hover:text-ra9ia-800 hover:bg-burgundy-50 border-burgundy-200"
                          >
                            Clear all
                          </Button>
                        )}

                        <div className="space-y-4">
                          <h3 className="font-medium text-ra9ia-800">Categories</h3>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-category-${category.id}`}
                                  checked={selectedCategories.includes(category.id)}
                                  onCheckedChange={() => handleCategoryChange(category.id)}
                                  className="text-ra9ia-600 border-burgundy-200 data-[state=checked]:bg-ra9ia-600 data-[state=checked]:border-ra9ia-600"
                                />
                                <label
                                  htmlFor={`mobile-category-${category.id}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {category.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator className="bg-burgundy-100" />

                        <div className="space-y-4">
                          <h3 className="font-medium text-ra9ia-800">Colors</h3>
                          <div className="space-y-2">
                            {colors.map((color) => (
                              <div key={color.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-color-${color.id}`}
                                  checked={selectedColors.includes(color.id)}
                                  onCheckedChange={() => handleColorChange(color.id)}
                                  className="text-ra9ia-600 border-burgundy-200 data-[state=checked]:bg-ra9ia-600 data-[state=checked]:border-ra9ia-600"
                                />
                                <label
                                  htmlFor={`mobile-color-${color.id}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {color.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator className="bg-burgundy-100" />

                        <div className="space-y-4">
                          <h3 className="font-medium text-ra9ia-800">Price</h3>
                          <div className="space-y-2">
                            {priceRanges.map((range) => (
                              <div key={range.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-price-${range.id}`}
                                  checked={selectedPriceRanges.includes(range.id)}
                                  onCheckedChange={() => handlePriceRangeChange(range.id)}
                                  className="text-ra9ia-600 border-burgundy-200 data-[state=checked]:bg-ra9ia-600 data-[state=checked]:border-ra9ia-600"
                                />
                                <label
                                  htmlFor={`mobile-price-${range.id}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {range.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 border-burgundy-200"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-ra9ia-700"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center bg-burgundy-50 text-ra9ia-800 text-sm rounded-full px-3 py-1"
                      >
                        <span>{categories.find((c) => c.id === category)?.label}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 text-ra9ia-700 hover:text-ra9ia-900 hover:bg-transparent"
                          onClick={() => handleCategoryChange(category)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove filter</span>
                        </Button>
                      </div>
                    ))}
                    {selectedColors.map((color) => (
                      <div
                        key={color}
                        className="flex items-center bg-burgundy-50 text-ra9ia-800 text-sm rounded-full px-3 py-1"
                      >
                        <span>{colors.find((c) => c.id === color)?.label}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 text-ra9ia-700 hover:text-ra9ia-900 hover:bg-transparent"
                          onClick={() => handleColorChange(color)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove filter</span>
                        </Button>
                      </div>
                    ))}
                    {selectedPriceRanges.map((range) => (
                      <div
                        key={range}
                        className="flex items-center bg-burgundy-50 text-ra9ia-800 text-sm rounded-full px-3 py-1"
                      >
                        <span>{priceRanges.find((r) => r.id === range)?.label}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 text-ra9ia-700 hover:text-ra9ia-900 hover:bg-transparent"
                          onClick={() => handlePriceRangeChange(range)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove filter</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Search Results */}
                <div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {searchResults.length} results {searchQuery && `for "${searchQuery}"`}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {searchResults.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                      />
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
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
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

