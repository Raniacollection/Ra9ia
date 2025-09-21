"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PartnerApplicationModal } from "@/app/components/partner-application-modal"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { Gem, Globe2, Truck, Megaphone } from "lucide-react"

export default function BecomePartnerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
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

  const validateStep = (step: 1 | 2) => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("Please complete your name and email to continue.");
        return false;
      }
    } else {
      if (!formData.company) {
        alert("Please provide your company/brand name.");
        return false;
      }
    }
    return true;
  }

  const goNext = () => {
    if (validateStep(1)) setCurrentStep(2)
  }

  const goBack = () => setCurrentStep(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setIsModalOpen(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-14 md:py-20 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl md:text-5xl text-ra9ia-900">
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
                    <div className="text-[11px] uppercase tracking-[0.18em] text-ra9ia-900/60">Why partner with us</div>
                    <h2 className="text-2xl font-serif font-bold">Partner Benefits</h2>
                    <p className="text-muted-foreground max-w-prose">
                      A premium, minimalist retail presence for your brand — with thoughtful marketing and simplified logistics.
                    </p>
                  </div>
                  <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                    {/* Expanded Reach */}
                    <div className="group relative overflow-hidden rounded-xl border border-burgundy-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-50/40 via-transparent to-cream-50/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-5 flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-ra9ia-50 text-ra9ia-800 flex items-center justify-center ring-1 ring-burgundy-100">
                          <Globe2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg tracking-tight text-ra9ia-900">Expanded Reach</h3>
                          <p className="text-sm text-muted-foreground mt-1">Access an engaged audience of modest fashion customers across Ethiopia and beyond.</p>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-tr from-burgundy-200/20 to-transparent" />
                    </div>

                    {/* Brand Alignment */}
                    <div className="group relative overflow-hidden rounded-xl border border-burgundy-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-50/40 via-transparent to-cream-50/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-5 flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-ra9ia-50 text-ra9ia-800 flex items-center justify-center ring-1 ring-burgundy-100">
                          <Gem className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg tracking-tight text-ra9ia-900">Luxury Positioning</h3>
                          <p className="text-sm text-muted-foreground mt-1">Present your products within a curated, premium aesthetic that elevates your brand.</p>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-tr from-burgundy-200/20 to-transparent" />
                    </div>

                    {/* Simplified Logistics */}
                    <div className="group relative overflow-hidden rounded-xl border border-burgundy-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-50/40 via-transparent to-cream-50/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-5 flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-ra9ia-50 text-ra9ia-800 flex items-center justify-center ring-1 ring-burgundy-100">
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg tracking-tight text-ra9ia-900">Simplified Logistics</h3>
                          <p className="text-sm text-muted-foreground mt-1">We handle storefront and ordering; you focus on product. Dropship or consignment — your choice.</p>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-tr from-burgundy-200/20 to-transparent" />
                    </div>

                    {/* Marketing Support */}
                    <div className="group relative overflow-hidden rounded-xl border border-burgundy-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-50/40 via-transparent to-cream-50/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-5 flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-ra9ia-50 text-ra9ia-800 flex items-center justify-center ring-1 ring-burgundy-100">
                          <Megaphone className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg tracking-tight text-ra9ia-900">Marketing Support</h3>
                          <p className="text-sm text-muted-foreground mt-1">Features in social, email, and homepage partner spotlights to boost visibility.</p>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-tr from-burgundy-200/20 to-transparent" />
                    </div>
                  </div>
                </div>
                <div className="mt-10 relative h-[300px] overflow-hidden rounded-xl border border-burgundy-100">
                  <Image
                    src="/images/apply.webp"
                    alt="Partner with Ra9ia Collection"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
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
                  {/* Progress indicator */}
                  <div className="flex items-center gap-2">
                    <div className={`h-1 w-1/2 ${currentStep >= 1 ? 'bg-ra9ia-800' : 'bg-muted'} transition-colors`} />
                    <div className={`h-1 w-1/2 ${currentStep === 2 ? 'bg-ra9ia-800' : 'bg-muted'} transition-colors`} />
                  </div>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <div className="flex justify-end">
                          <Button type="button" onClick={goNext} className="bg-ra9ia-800 hover:bg-ra9ia-900">Continue</Button>
                        </div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="grid gap-4">
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
                        <div className="flex items-center justify-between gap-2">
                          <Button type="button" variant="outline" onClick={goBack}>Back</Button>
                          <Button type="submit" className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                            Submit Application
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      
      <PartnerApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applicationData={formData}
      />
    </div>
  )
}

