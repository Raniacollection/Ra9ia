import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "heroText",
      title: "Hero Text",
      type: "text",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "twitter", type: "url", title: "Twitter" },
        { name: "pinterest", type: "url", title: "Pinterest" },
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Phone" },
        { name: "address", type: "text", title: "Address" },
      ],
    }),
    defineField({
      name: "shippingInfo",
      title: "Shipping Information",
      type: "object",
      fields: [
        { name: "freeShippingThreshold", type: "number", title: "Free Shipping Threshold" },
        { name: "shippingCost", type: "number", title: "Standard Shipping Cost" },
        { name: "estimatedDeliveryDays", type: "number", title: "Estimated Delivery Days" },
      ],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
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
      title: "title",
      media: "logo",
    },
  },
}) 