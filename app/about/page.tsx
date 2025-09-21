import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { NewsletterSignup } from "../components/newsletter-signup"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Fatima Al-Zahra",
      role: "Founder & Creative Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Fatima founded Ra9ia Collection with a vision to create elegant modest fashion that empowers women to express their identity while honoring their values.",
    },
    {
      name: "Aisha Rahman",
      role: "Head of Design",
      image: "/placeholder.svg?height=400&width=400",
      bio: "With over 15 years of experience in fashion design, Aisha brings her expertise in creating timeless pieces that blend tradition with contemporary aesthetics.",
    },
    {
      name: "Noor Malik",
      role: "Production Manager",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Noor ensures that every Ra9ia Collection piece is crafted to perfection, overseeing our ethical production process from start to finish.",
    },
    {
      name: "Zainab Hassan",
      role: "Marketing Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Zainab is passionate about sharing the story of Ra9ia Collection with the world, creating meaningful connections with our community.",
    },
  ]

  // Values data
  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "Every piece is meticulously crafted with attention to detail, using premium fabrics and expert tailoring techniques.",
    },
    {
      title: "Ethical Production",
      description:
        "We ensure fair wages and safe working conditions for all artisans involved in creating our collections.",
    },
    {
      title: "Sustainable Practices",
      description:
        "We're committed to reducing our environmental impact through responsible sourcing and production methods.",
    },
    {
      title: "Inclusive Design",
      description: "Our designs celebrate diversity and cater to women of all backgrounds who value modest fashion.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-serif font-semibold tracking-tight sm:text-5xl xl:text-6xl/none text-ra9ia-900">
                    About Ra9ia Collection
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We import curated abayas and modest wear from trusted UAE brands to Ethiopia. Simple selection, clear
                    pricing, and easy ordering on Telegram.
                  </p>
                </div>
                <div>
                  <Link href="#our-mission">
                    <Button className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">Discover Our Mission</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-xl">
                <Image
                  src="/images/about.webp"
                  alt="Ra9ia Collection Founder"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section id="our-mission" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl text-ra9ia-900">
                  Our Mission
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Make elegant modest fashion accessible in Ethiopia—without complexity.
                </p>
              </div>
              <div className="mx-auto max-w-3xl space-y-4 md:space-y-6 mt-6">
                <p className="text-muted-foreground">
                  We source in the UAE, you order on Telegram, and we handle import and delivery in Ethiopia. We’ll
                  finalize address and delivery details directly in chat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section (hidden to keep About simple) */}
        {false && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-cream-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl text-ra9ia-900">
                  Our Values
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The principles that guide everything we do
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-burgundy-100 hover:border-burgundy-200 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-ra9ia-50 flex items-center justify-center">
                        <span className="text-ra9ia-800 font-serif text-xl font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-ra9ia-900">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Meet the Team Section (hidden to keep About simple) */}
        {false && (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl text-ra9ia-900">
                  Meet the Team
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The passionate individuals behind Ra9ia Collection
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-burgundy-100">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-medium text-ra9ia-900">{member.name}</h3>
                  <p className="text-sm text-ra9ia-700 mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Milestones Section (hidden to keep About simple) */}
        {false && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-burgundy-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl text-ra9ia-900">
                  Our Journey
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Key milestones in the Ra9ia Collection story
                </p>
              </div>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-burgundy-200"></div>

              <div className="space-y-12 relative">
                {/* 2018 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1 relative">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-burgundy-100">
                      <h3 className="text-lg font-medium text-ra9ia-900 mb-2">2018: The Beginning</h3>
                      <p className="text-muted-foreground">
                        Fatima Al-Zahra founded Ra9ia Collection with a small line of handcrafted abayas, working from
                        her home studio.
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-ra9ia-800 flex items-center justify-center text-white font-medium">
                      2018
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3 hidden md:block"></div>
                </div>

                {/* 2019 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 order-2 md:order-1 hidden md:block"></div>
                  <div className="relative z-10 order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-ra9ia-800 flex items-center justify-center text-white font-medium">
                      2019
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3 relative">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-burgundy-100">
                      <h3 className="text-lg font-medium text-ra9ia-900 mb-2">2019: First Boutique</h3>
                      <p className="text-muted-foreground">
                        Opened our first physical boutique and expanded our collection to include a wider range of
                        modest fashion pieces.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2021 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1 relative">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-burgundy-100">
                      <h3 className="text-lg font-medium text-ra9ia-900 mb-2">2021: Global Expansion</h3>
                      <p className="text-muted-foreground">
                        Launched our e-commerce platform, allowing us to share our designs with customers worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-ra9ia-800 flex items-center justify-center text-white font-medium">
                      2021
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3 hidden md:block"></div>
                </div>

                {/* 2023 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 order-2 md:order-1 hidden md:block"></div>
                  <div className="relative z-10 order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-ra9ia-800 flex items-center justify-center text-white font-medium">
                      2023
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3 relative">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-burgundy-100">
                      <h3 className="text-lg font-medium text-ra9ia-900 mb-2">2023: Sustainability Initiative</h3>
                      <p className="text-muted-foreground">
                        Launched our sustainability initiative, committing to eco-friendly practices and materials
                        across our entire production process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl text-ra9ia-900">
                    Join Our Journey
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We're excited to continue growing and evolving, creating beautiful modest fashion that resonates
                    with women around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/collections">
                    <Button size="lg" className="bg-ra9ia-800 text-white hover:bg-ra9ia-900">
                      Explore Our Collections
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/images/about2.webp"
                  alt="Ra9ia Collection Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <NewsletterSignup />
      </main>
      <SiteFooter />
    </div>
  )
}

