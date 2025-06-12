import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/client"

// Fetch all partners
export async function getPartners() {
  return client.fetch(`
    *[_type == "partner"] {
      _id,
      name,
      slug,
      logo,
      shortDescription,
      featured,
      "logoUrl": logo.asset->url
    }
  `)
}

// Fetch featured partners
export async function getFeaturedPartners() {
  return client.fetch(`
    *[_type == "partner" && featured == true] {
      _id,
      name,
      slug,
      logo,
      shortDescription,
      "logoUrl": logo.asset->url
    }
  `)
}

// Fetch partner by slug
export async function getPartnerBySlug(slug: string) {
  return client.fetch(`
    *[_type == "partner" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      logo,
      coverImage,
      description,
      shortDescription,
      contactInfo,
      socialMedia,
      "logoUrl": logo.asset->url,
      "coverImageUrl": coverImage.asset->url
    }
  `, { slug })
}

// Fetch partner products by partner ID
export async function getPartnerProducts(partnerId: string) {
  return client.fetch(`
    *[_type == "product" && isPartnerProduct == true && partner._ref == $partnerId] {
      _id,
      name,
      slug,
      price,
      description,
      "imageUrl": images[0].asset->url,
      images,
      rating,
      reviewCount,
      isNewArrival,
      isBestseller,
      inventoryManagement
    }
  `, { partnerId })
}

// Fetch all partner products
export async function getAllPartnerProducts() {
  return client.fetch(`
    *[_type == "product" && isPartnerProduct == true] {
      _id,
      name,
      slug,
      price,
      description,
      "imageUrl": images[0].asset->url,
      images,
      rating,
      reviewCount,
      isNewArrival,
      isBestseller,
      inventoryManagement,
      "partner": partner->{
        _id,
        name,
        slug
      }
    }
  `)
}

// Fetch featured partner products for homepage
export async function getFeaturedPartnerProducts() {
  return client.fetch(`
    *[_type == "product" && isPartnerProduct == true && partner->featured == true][0...6] {
      _id,
      name,
      slug,
      price,
      description,
      "imageUrl": images[0].asset->url,
      images,
      rating,
      reviewCount,
      "partner": partner->{
        _id,
        name,
        slug
      }
    }
  `)
}

// Helper function to format Sanity image URLs
export function getSanityImageUrl(image: any) {
  return urlFor(image).url()
}
