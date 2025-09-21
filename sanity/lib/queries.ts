import { groq } from "next-sanity"

export const productQuery = groq`*[_type == "product" && _id == $id][0] {
  _id,
  name,
  "slug": slug.current,
  "images": images[].asset->url,
  price,
  description,
  details,
  colors[] {
    name,
    value,
    stockQuantity
  },
  sizes,
  "category": category->{
    name,
    "slug": slug.current
  },
  "collection": collection->{
    name,
    "slug": slug.current
  },
  inventoryManagement {
    trackInventory,
    totalStock,
    lowStockThreshold,
    showRemainingStock
  },
  isNewArrival,
  isBestseller,
  rating,
  reviewCount
}`

export const bestsellersQuery = groq`*[_type == "product" && isBestseller == true] {
  _id,
  name,
  "slug": slug.current,
  "image": images[0].asset->url,
  price,
  description,
  isPartnerProduct,
  "partner": partner->{
    _id,
    name,
    "slug": slug.current,
    messaging
  },
  colors[] {
    name,
    value,
    stockQuantity
  },
  sizes,
  inventoryManagement {
    trackInventory,
    totalStock,
    lowStockThreshold,
    showRemainingStock
  },
  "category": category->name,
  "collection": collection->name,
  isNewArrival,
  isBestseller,
  rating,
  reviewCount
}`

export const collectionQuery = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "products": products[]->{
      _id,
      name,
      "slug": slug.current,
      images[0],
      price,
      description,
      colors[] {
        name,
        value,
        stockQuantity
      },
      inventoryManagement {
        trackInventory,
        totalStock,
        lowStockThreshold,
        showRemainingStock
      },
      rating,
      reviewCount
    },
    seo
  }
`

export const collectionsQuery = groq`
  *[_type == "collection"] {
    _id,
    name,
    "slug": slug.current,
    description,
    image
  }
`

export const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "parent": parent->{
      _id,
      name,
      "slug": slug.current
    },
    seo
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "parent": parent->{
      _id,
      name,
      "slug": slug.current
    }
  }
`

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    content,
    heroImage,
    heroText,
    seo
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    heroImage,
    heroText,
    socialLinks,
    contactInfo,
    shippingInfo,
    seo
  }
` 