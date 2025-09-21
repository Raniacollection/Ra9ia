import Image from "next/image"
import Link from "next/link"

interface EditorialStoryProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  ctaHref?: string
  ctaLabel?: string
}

export function EditorialStory({
  title = "The Art of Draping",
  subtitle = "Exploring movement, proportion, and line in modern modest silhouettes.",
  imageUrl = "/images/hero.png",
  ctaHref = "/editorial/art-of-draping",
  ctaLabel = "Read the Story",
}: EditorialStoryProps) {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="relative grid gap-6 md:grid-cols-2 items-center overflow-hidden rounded-none md:rounded-xl">
          <div className="relative aspect-[4/3] md:aspect-[5/4] bg-muted">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="p-2 md:p-6 lg:p-10">
            <p className="text-xs uppercase tracking-wider text-ra9ia-700/80">Editorial</p>
            <h2 className="mt-2 text-2xl md:text-4xl font-serif tracking-tight text-ra9ia-900">{title}</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-prose">
              {subtitle}
            </p>
            <div className="mt-5">
              <Link href={ctaHref} prefetch>
                <button className="inline-flex h-10 items-center justify-center rounded-md border border-burgundy-200 bg-white px-6 text-sm font-medium text-ra9ia-900 hover:bg-burgundy-50">
                  {ctaLabel}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
