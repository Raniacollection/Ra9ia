import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { client } from "@/sanity/lib/client"
import { productQuery } from "@/sanity/lib/queries"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { ProductDetails } from "@/app/components/product-details"

export const revalidate = 60 // Revalidate every minute

async function getProduct(id: string) {
  return await client.fetch(productQuery, { id })
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id
  const product = await getProduct(productId)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-12">
          <nav className="mb-4 md:mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
            <Link href="/" className="hover:text-ra9ia-700">
              Home
            </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li>
            <Link href="/collections" className="hover:text-ra9ia-700">
              Collections
            </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              {product.category && (
                <>
                  <li>
                    <Link href={`/category/${product.category.slug}`} className="hover:text-ra9ia-700">
                      {product.category.name}
            </Link>
                  </li>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
              <li className="font-medium text-foreground">{product.name}</li>
            </ol>
          </nav>

          <ProductDetails product={product} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

