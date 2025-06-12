"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PartnerApplicationModal } from "@/app/components/partner-application-modal"

export default function BecomePartnerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    website: "",
    productType: "",
    partnershipModel: "dropship", // Default value
    description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, partnershipModel: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Open the modal with the form data
    setIsModalOpen(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold">Ra9ia</span>
              <span className="font-light">Collection</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/collections" className="text-sm font-medium transition-colors hover:text-primary">
                Collections
              </Link>
              <Link href="/new-arrivals" className="text-sm font-medium transition-colors hover:text-primary">
                New Arrivals
              </Link>
              <Link href="/bestsellers" className="text-sm font-medium transition-colors hover:text-primary">
                Bestsellers
              </Link>
              <Link href="/partners" className="text-sm font-medium transition-colors hover:text-primary">
                Partner Products
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/search" className="hidden md:flex">
              <span className="sr-only">Search</span>
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
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </Link>
            <Link href="/wishlist">
              <span className="sr-only">Wishlist</span>
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart">
              <span className="sr-only">Cart</span>
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
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </Link>
            <Link href="/account" className="hidden md:flex">
              <span className="sr-only">Account</span>
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-burgundy-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Become a Partner
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our growing community of business partners and showcase your products to our customers
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-serif font-bold">Partner Benefits</h2>
                    <p className="text-muted-foreground">
                      Partnering with Ra9ia Collection offers numerous advantages for your business
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <Card className="border-burgundy-100 hover:border-burgundy-200 transition-colors">
                      <CardHeader className="bg-burgundy-50/50">
                        <CardTitle className="text-ra9ia-800">Expanded Reach</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Showcase your products to our established customer base of modest fashion enthusiasts across
                          the globe.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-burgundy-100 hover:border-burgundy-200 transition-colors">
                      <CardHeader className="bg-burgundy-50/50">
                        <CardTitle className="text-ra9ia-800">Brand Alignment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Associate your brand with Ra9ia Collection's reputation for quality and elegant modest
                          fashion.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-burgundy-100 hover:border-burgundy-200 transition-colors">
                      <CardHeader className="bg-burgundy-50/50">
                        <CardTitle className="text-ra9ia-800">Simplified Logistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          We handle the online presence while you focus on creating beautiful products. Options for
                          dropshipping or consignment available.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-burgundy-100 hover:border-burgundy-200 transition-colors">
                      <CardHeader className="bg-burgundy-50/50">
                        <CardTitle className="text-ra9ia-800">Marketing Support</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Benefit from our marketing efforts, including social media promotion, email campaigns, and
                          featured partner spotlights.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="mt-10 relative h-[300px] overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Partner with Ra9ia Collection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-serif font-bold">Partner Application</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below to apply to become a Ra9ia Collection partner
                    </p>
                  </div>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Enter your first name" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Enter your last name" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Brand Name</Label>
                        <Input 
                          id="company" 
                          placeholder="Enter your company or brand name" 
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website/Social Media</Label>
                        <Input 
                          id="website" 
                          placeholder="Enter your website or social media URL" 
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="productType">Product Type</Label>
                        <Select 
                          value={formData.productType} 
                          onValueChange={(value) => handleSelectChange("productType", value)}
                        >
                          <SelectTrigger id="productType">
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="jewelry">Jewelry</SelectItem>
                            <SelectItem value="scarves">Scarves & Hijabs</SelectItem>
                            <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                            <SelectItem value="home">Home Decor</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Partnership Model</Label>
                        <RadioGroup 
                          value={formData.partnershipModel} 
                          onValueChange={handleRadioChange}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dropship" id="dropship" className="text-ra9ia-600" />
                            <Label htmlFor="dropship">Dropshipping (you fulfill orders directly)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="consignment" id="consignment" className="text-ra9ia-600" />
                            <Label htmlFor="consignment">Consignment (we stock and ship your products)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="undecided" id="undecided" className="text-ra9ia-600" />
                            <Label htmlFor="undecided">Undecided (we can discuss options)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Tell us about your products</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your products, price range, and how they complement Ra9ia Collection"
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                      Submit Application
                    </Button>
                  </form>
                </div>
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
      
      <PartnerApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applicationData={formData}
      />
    </div>
  )
}

