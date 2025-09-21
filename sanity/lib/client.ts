import { createClient as createSanityClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "o3e5wr0n"

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "production"

const token =
  process.env.SANITY_API_READ_TOKEN ||
  process.env.NEXT_PUBLIC_SANITY_TOKEN ||
  undefined

export const client = createSanityClient({
  projectId,
  dataset,
  apiVersion: "2024-03-02",
  useCdn: false,
  token,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Export a function to create a new client instance (for API routes)
export function createClient() {
  return createSanityClient({
    projectId,
    dataset,
    apiVersion: "2024-03-02",
    useCdn: false,
    token,
  })
}