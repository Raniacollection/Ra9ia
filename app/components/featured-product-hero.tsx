import Image from "next/image"
import Link from "next/link"

interface FeaturedProductHeroProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    price: number
    description?: string
    imageUrl?: string
    images?: any[]
  } | null
}

export function FeaturedProductHero({ product }: FeaturedProductHeroProps) {
  if (!product) return null

  const href = `/products/${product.slug.current}`
  const cover = product.imageUrl || "/placeholder.svg?height=1200&width=900"

  return (
    <section className="relative w-full py-6 md:py-10">
      <div className="container px-0 md:px-6">
        <div className="relative overflow-hidden rounded-none md:rounded-xl">
          {/* Compact, cinematic height across breakpoints */}
          <div className="relative h-[42vh] md:h-[46vh] lg:h-[50vh]">
            <Image
              src={cover}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />

            {/* Minimal editorial overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl md:text-4xl font-serif tracking-tight">{product.name}</h1>
                {product.description && (
                  <p className="mt-3 md:mt-4 text-sm md:text-base text-white/85 line-clamp-3">{product.description}</p>
                )}
                <div className="mt-5 flex flex-col sm:flex-row gap-2">
                  <Link href={href} prefetch>
                    <button className="inline-flex h-10 items-center justify-center rounded-md border border-white/70 bg-white/0 px-6 text-sm font-medium text-white hover:bg-white/10">
                      View Piece
                    </button>
                  </Link>
                  <Link href={`${href}#story`} prefetch>
                    <button className="inline-flex h-10 items-center justify-center rounded-md border border-white/50 bg-white/0 px-6 text-sm font-medium text-white hover:bg-white/10">
                      View Story
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
