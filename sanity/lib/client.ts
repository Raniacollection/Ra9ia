import { createClient as createSanityClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

const token = "skeLJ3xeZGW6sPKerZsD8QTY8Jjz8sK12ULebcMnPSroBpdSZppyEaUYKPV9cCavArqDp0UmQyJSF4rc57cxq7ViiHi3giTNOZjz5SV8tNTaPChmam9MV0McpkFg4FXi4xlu4OMYAIULIvLjCkj1CU0o9nr73FtFlwyjQfKw586rnzcTJcmy"

export const client = createSanityClient({
  projectId: "o3e5wr0n",
  dataset: "production",
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
    projectId: "o3e5wr0n",
    dataset: "production",
    apiVersion: "2024-03-02",
    useCdn: false,
    token,
  })
} 