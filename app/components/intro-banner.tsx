import Image from "next/image"
import Link from "next/link"

export function IntroBanner() {
  const banner = "/images/hero-desert.jpeg"
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[42vh] md:h-[48vh] lg:h-[52vh]">
        <Image
          src={banner}
          alt="Ra9ia Collection"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container px-4 md:px-6 py-6 md:py-8">
            <div className="max-w-2xl text-white">
              <p className="text-[11px] md:text-xs uppercase tracking-widest/relaxed text-white/80">Ra9ia Collection</p>
              <h1 className="mt-1 text-2xl md:text-4xl font-serif tracking-tight">Elegance in Modesty</h1>
              <p className="mt-2 text-sm md:text-base text-white/85">
                Refined silhouettes and enduring fabrics—curated abayas and modest pieces for the modern woman.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/collections" prefetch>
                  <button className="inline-flex h-10 items-center justify-center rounded-md bg-ra9ia-800 px-6 text-sm font-medium text-white hover:bg-ra9ia-900">
                    Explore Collections
                  </button>
                </Link>
                <Link href="/partners" prefetch>
                  <button className="inline-flex h-10 items-center justify-center rounded-md border border-burgundy-200 bg-white/90 px-6 text-sm font-medium text-ra9ia-900 hover:bg-white">
                    Our Partners
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
