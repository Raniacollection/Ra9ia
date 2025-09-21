import Image from "next/image"
import Link from "next/link"

interface CollectionOfTheMonthProps {
  collection: {
    _id: string
    name: string
    slug: { current: string }
    description?: string
    imageUrl?: string
  } | null
}

export function CollectionOfTheMonth({ collection }: CollectionOfTheMonthProps) {
  if (!collection) return null

  const href = `/collections/${collection.slug.current}`
  const cover = collection.imageUrl || "/placeholder.svg?height=900&width=1400"

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-none md:rounded-xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] bg-muted">
            <Image
              src={cover}
              alt={collection.name}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="max-w-2xl text-white">
                <h2 className="text-2xl md:text-4xl font-serif tracking-tight">Collection of the Month</h2>
                <p className="mt-2 text-sm md:text-base text-white/85 line-clamp-2">
                  {collection.description || "A curated selection featuring our most refined silhouettes."}
                </p>
                <div className="mt-4">
                  <Link href={href} prefetch>
                    <button className="inline-flex h-10 items-center justify-center rounded-md border border-white/50 bg-white/10 px-6 text-sm font-medium text-white hover:bg-white/20">
                      Explore {collection.name}
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
