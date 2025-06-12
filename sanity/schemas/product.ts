import { defineField, defineType } from "sanity"

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Main Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            accept: "image/*",
          },
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Base Price",
      type: "number",
      description: "Base price for the product. Variants can override this.",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "details",
      title: "Product Details",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [{ type: "productVariant" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "inventoryManagement", 
      title: "Inventory Management",
      type: "object",
      fields: [
        { 
          name: "trackInventory", 
          title: "Track Inventory", 
          type: "boolean",
          initialValue: true,
          description: "Enable stock tracking for this product (overall setting, variants manage individual stock)"
        },
        { 
          name: "lowStockThreshold", 
          title: "Low Stock Threshold", 
          type: "number",
          description: "Threshold at which to show 'Low Stock' warnings (per variant or overall)",
          initialValue: 5,
          validation: (Rule) => Rule.required().min(0).integer()
        },
        { 
          name: "showRemainingStock", 
          title: "Show Remaining Stock", 
          type: "boolean",
          initialValue: true,
          description: "Show exact quantity remaining to customers (per variant)"
        },
        { 
          name: "enableRestockNotifications", 
          title: "Enable Restock Notifications", 
          type: "boolean",
          initialValue: true,
          description: "Allow customers to sign up for restock notifications (per variant or overall)"
        },
        { 
          name: "restockDate", 
          title: "Expected Restock Date", 
          type: "date",
          description: "The expected date when this product will be restocked (overall or per variant)"
        }
      ]
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "isNewArrival",
      title: "Is New Arrival",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isBestseller",
      title: "Is Bestseller",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPartnerProduct",
      title: "Is Partner Product",
      type: "boolean",
      initialValue: false,
      description: "Enable this if the product is from a partner and should be displayed separately from main collection",
    }),
    defineField({
      name: "partner",
      title: "Partner",
      type: "reference",
      to: [{ type: "partner" }],
      hidden: ({ document }) => !document?.isPartnerProduct,
      validation: Rule => Rule.custom((value, context) => {
        // If it's a partner product, partner reference is required
        if (context.document?.isPartnerProduct && !value) {
          return 'Partner is required for partner products'
        }
        return true
      }),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
        { name: "keywords", type: "array", of: [{ type: "string" }], title: "Keywords" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      price: "price",
    },
    prepare({ title, media, price }) {
      return {
        title,
        media,
        subtitle: price ? `$${price}` : 'No base price',
      }
    },
  },
}) 