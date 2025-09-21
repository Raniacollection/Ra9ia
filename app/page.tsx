import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { EditorialStory } from "./components/editorial-story"
import { ProductCard } from "./components/product-card"
import { Truck, RotateCcw, Shield } from "lucide-react"
import { getFeaturedCollections, getBestsellerProducts, getNewArrivalProducts } from "@/lib/sanity/queries"
import { SocialFeed } from "@/components/social/social-feed"

export default async function Home() {
  // Fetch real data with graceful fallbacks to avoid runtime 500s
  let featuredCollections: any[] = []
  let spotlightProducts: any[] = []
  let newArrivalProducts: any[] = []

  try {
    const [fc, sp, nap] = await Promise.all([
      getFeaturedCollections().catch(() => []),
      getBestsellerProducts().catch(() => []),
      getNewArrivalProducts().catch(() => []),
    ])
    featuredCollections = Array.isArray(fc) ? fc : []
    spotlightProducts = Array.isArray(sp) ? sp : []
    newArrivalProducts = Array.isArray(nap) ? nap : []
  } catch {
    // Network issue (e.g., ENOTFOUND). Keep fallbacks as defined above.
  }
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[68vh] md:h-auto md:aspect-[16/9] bg-cream-50">
            {/* Use picture for broad compatibility: WebP first, fallback to PNG */}
            <picture>
              <source srcSet="/images/hero.webp" type="image/webp" />
              {/* Fall back to PNG */}
              <img
                src="/images/hero.png"
                alt="Ra9ia Editorial — Abayas & Mukhawirs from UAE, brought to Ethiopia"
                className="absolute inset-0 h-full w-full object-cover md:object-contain object-[88%_50%] sm:object-[84%_50%] md:object-center"
                loading="eager"
              />
            </picture>
            {/* Text on wall: left column; right column is a reserved safe zone (no text) */}
            <div className="absolute inset-0">
              <div className="container h-full px-4 md:px-6">
                <div className="grid h-full grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(280px,38vw)]">
                  <div className="flex items-center py-10 md:py-0">
                    <div className="wall-placard max-w-[52ch] pr-[28vw] sm:pr-[24vw] md:pr-0">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-ra9ia-900/70">Ra9ia Collection</p>
                      <h1 className="mt-2 text-4xl md:text-6xl font-serif tracking-tight text-ra9ia-900 leading-[1.05]">
                        Elegant Modest Fashion for Every Occasion
                      </h1>
                      <p className="mt-3 text-base md:text-lg text-ra9ia-900/85 max-w-[45ch]">
                        Curated abayas, mukhawirs, and modest essentials — sourced globally, delivered locally.
                      </p>
                      <div className="mt-5 flex gap-2">
                        <Link href="/collections" prefetch>
                          <Button className="bg-ra9ia-900 text-white hover:bg-ra9ia-900/90">Shop Collections</Button>
                        </Link>
                        <Link href="/bestsellers" prefetch>
                          <Button variant="outline" className="border-ra9ia-900/30 text-ra9ia-900 hover:bg-black/5">
                            Bestsellers
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USP Strip */}
        <section className="w-full py-6 bg-white border-y border-burgundy-100">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Truck className="h-5 w-5 text-ra9ia-900/70" />
                <span className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80">Fast delivery</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <RotateCcw className="h-5 w-5 text-ra9ia-900/70" />
                <span className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80">Easy returns</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Shield className="h-5 w-5 text-ra9ia-900/70" />
                <span className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/80">Secure checkout</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lookbook (Creative large-format horizontal cards) */}
        {newArrivalProducts && newArrivalProducts.length > 0 && (
          <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <p className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/70">Lookbook</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-serif tracking-tight text-ra9ia-900">AW25 Scenes</h2>
              <div className="mt-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-4 md:gap-6 snap-x snap-mandatory">
                  {newArrivalProducts.slice(0, 6).map((p: any, idx: number) => (
                    <Link
                      key={p._id}
                      href={p.slug?.current ? `/products/${p.slug.current}` : "/bestsellers"}
                      className="snap-start relative group shrink-0 w-[85%] sm:w-[70%] md:w-[55%] aspect-[3/4] overflow-hidden rounded-none md:rounded border border-burgundy-100"
                    >
                      <Image
                        src={p.imageUrl || "/placeholder.svg"}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 55vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
                      <div className="absolute left-4 bottom-4 right-4 text-white">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/80">Look {String(idx + 1).padStart(2, "0")}</div>
                        <div className="font-serif text-2xl md:text-3xl tracking-tight line-clamp-1">{p.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The Capsule (Creative Mosaic) */}
        {featuredCollections && featuredCollections.length > 0 && (
          <section className="w-full py-12 md:py-16 bg-cream-50">
            <div className="container px-4 md:px-6">
              <p className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/70">The Capsule</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-serif tracking-tight text-ra9ia-900">Editor’s Curations</h2>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
                {/* Feature tile */}
                {featuredCollections[0] && (
                  <Link
                    href={`/collections/${featuredCollections[0].slug.current}`}
                    className="relative col-span-2 md:col-span-3 row-span-2 overflow-hidden rounded-none md:rounded border border-burgundy-100 group"
                  >
                    <Image src={featuredCollections[0].imageUrl || "/placeholder.svg"} alt={featuredCollections[0].name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                    <div className="absolute left-4 bottom-4 text-white">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/80">Collection</div>
                      <div className="font-serif text-2xl md:text-3xl tracking-tight">{featuredCollections[0].name}</div>
                    </div>
                  </Link>
                )}
                {/* Secondary tiles */}
                {featuredCollections.slice(1, 3).map((c) => (
                  <Link
                    key={c._id}
                    href={`/collections/${c.slug.current}`}
                    className="relative col-span-1 md:col-span-1 lg:col-span-1 row-span-1 overflow-hidden rounded-none md:rounded border border-burgundy-100 group"
                  >
                    <Image src={c.imageUrl || "/placeholder.svg"} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    <div className="absolute left-3 bottom-3">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/80">Collection</div>
                      <div className="font-serif text-lg tracking-tight text-white">{c.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Link href="/collections">
                  <Button variant="outline" className="rounded-none md:rounded border-burgundy-200">View all Collections</Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Spotlight (Real products, minimal horizontal scroll) */}
        {spotlightProducts && spotlightProducts.length > 0 && (
          <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-ra9ia-900/70">Spotlight</p>
                  <h2 className="mt-2 text-3xl md:text-4xl font-serif tracking-tight text-ra9ia-900">Editor’s Select</h2>
                </div>
                <Link href="/bestsellers" className="hidden sm:inline-flex">
                  <Button variant="outline" className="rounded-none md:rounded border-burgundy-200">View all</Button>
                </Link>
              </div>
              <div className="mt-6 relative">
                <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex gap-4 md:gap-6 snap-x snap-mandatory">
                    {spotlightProducts.map((p) => (
                      <div key={p._id} className="snap-start shrink-0 w-[72%] sm:w-[46%] md:w-[32%] lg:w-[24%]">
                        <ProductCard
                          id={p._id}
                          name={p.name}
                          price={p.price}
                          image={p.imageUrl || "/placeholder.svg"}
                          slug={p.slug?.current}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sm:hidden mt-4">
                <Link href="/bestsellers">
                  <Button variant="outline" className="w-full border-burgundy-200">View all</Button>
                </Link>
              </div>
            </div>
          </section>
        )}


        {/* Editorial Story */}
        <EditorialStory />

        {/* Social Feed (optional; shows when Instagram env vars are configured) */}
        <SocialFeed />
      </main>
      <SiteFooter />
    </div>
  )
}

