import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { Button } from "@/components/ui/button"

export default function ArtOfDrapingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[46vh] md:h-[60vh]">
            <Image
              src="/images/hero-desert.jpeg"
              alt="The Art of Draping"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="container px-4 md:px-6 pb-10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/80">Editorial</p>
                <h1 className="mt-2 text-4xl md:text-6xl font-serif tracking-tight text-white">The Art of Draping</h1>
                <p className="mt-2 text-sm md:text-base text-white/90 max-w-2xl">
                  Exploring movement, proportion, and line in modern modest silhouettes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story body */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="prose prose-neutral prose-lg max-w-none">
              <p>
                Draping is the quiet choreography of fabric around the body—subtle lines that fall into place
                with intention. In our atelier, we focus on balance: the interplay of weighted hems and airy
                volumes, the ease of motion across soft textures, and the confidence that comes from comfort.
              </p>
              <p>
                Each piece is considered: where a seam lands, how a sleeve gathers, how light passes through the
                weave. Our silhouettes are designed to be lived in—effortless, modest, and resolutely modern.
              </p>
            </div>

            {/* Editorial images */}
            <div className="mt-10 grid gap-4 md:gap-6 md:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden border border-burgundy-100">
                <Image src="/images/hero.png" alt="Draping detail" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden border border-burgundy-100">
                <Image src="/images/hero-desert.jpeg" alt="Studio view" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>

            {/* Shop the story */}
            <div className="mt-12 md:mt-16 flex items-center justify-between gap-4 border-t border-burgundy-100 pt-6">
              <div>
                <h2 className="font-serif text-2xl tracking-tight text-ra9ia-900">Shop the Story</h2>
                <p className="text-sm text-ra9ia-900/70">Pieces inspired by the editorial—curated for this season.</p>
              </div>
              <div className="shrink-0">
                <Link href="/new-arrivals">
                  <Button className="rounded-none md:rounded">New Arrivals</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
