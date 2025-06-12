import { config } from "dotenv"
import { resolve } from "path"
import { client } from "../lib/client"
import { v4 as uuidv4 } from "uuid"

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") })

async function createInitialContent() {
  try {
    // Create site settings
    await client.create({
      _type: "siteSettings",
      _id: "siteSettings",
      title: "Ra9ia Collection",
      description: "Your one-stop shop for trendy and fashionable clothing",
      socialLinks: {
        facebook: "https://facebook.com/ra9ia-collection",
        instagram: "https://instagram.com/ra9ia-collection",
        twitter: "https://twitter.com/ra9ia-collection",
        pinterest: "https://pinterest.com/ra9ia-collection",
      },
      contactInfo: {
        email: "contact@ra9ia-collection.com",
        phone: "+1 (555) 123-4567",
        address: "123 Fashion Street, Style City, FC 12345",
      },
      shippingInfo: {
        freeShippingThreshold: 100,
        shippingCost: 10,
        estimatedDeliveryDays: 5,
      },
      seo: {
        title: "Ra9ia Collection - Trendy Fashion Store",
        description: "Discover the latest trends in fashion at Ra9ia Collection. Shop for trendy and fashionable clothing.",
        keywords: ["fashion", "clothing", "trendy", "style", "shop"],
      },
    })
    console.log("✓ Site settings created")

    // Create main categories
    const categories = [
      {
        name: "Women",
        description: "Women's clothing and accessories",
        slug: { _type: "slug", current: "women" },
      },
      {
        name: "Men",
        description: "Men's clothing and accessories",
        slug: { _type: "slug", current: "men" },
      },
      {
        name: "Kids",
        description: "Kids' clothing and accessories",
        slug: { _type: "slug", current: "kids" },
      },
    ]

    for (const category of categories) {
      await client.create({
        _type: "category",
        _id: uuidv4(),
        ...category,
        seo: {
          title: `${category.name} - Ra9ia Collection`,
          description: category.description,
          keywords: [category.name.toLowerCase(), "fashion", "clothing"],
        },
      })
    }
    console.log("✓ Categories created")

    // Create a sample collection
    await client.create({
      _type: "collection",
      _id: uuidv4(),
      name: "Summer Collection 2024",
      slug: { _type: "slug", current: "summer-collection-2024" },
      description: "Stay cool and stylish with our latest summer collection",
      seo: {
        title: "Summer Collection 2024 - Ra9ia Collection",
        description: "Discover our latest summer collection featuring trendy and comfortable pieces.",
        keywords: ["summer", "collection", "2024", "fashion", "trendy"],
      },
    })
    console.log("✓ Sample collection created")

    // Create a sample page
    await client.create({
      _type: "page",
      _id: uuidv4(),
      title: "About Us",
      slug: { _type: "slug", current: "about-us" },
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Welcome to Ra9ia Collection! We are passionate about bringing you the latest trends in fashion at affordable prices.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
      seo: {
        title: "About Us - Ra9ia Collection",
        description: "Learn more about Ra9ia Collection and our mission to provide trendy fashion at affordable prices.",
        keywords: ["about", "fashion", "store", "mission"],
      },
    })
    console.log("✓ Sample page created")

    console.log("\n✨ Initial content created successfully!")
  } catch (error) {
    console.error("Error creating initial content:", error)
    process.exit(1)
  }
}

createInitialContent() 