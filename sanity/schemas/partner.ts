import { defineField, defineType } from "sanity"

export const partner = defineType({
  name: "partner",
  title: "Partner",
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
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Banner image displayed at the top of the partner page",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Brief description for cards and previews (max 160 characters)",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "featured",
      title: "Featured Partner",
      type: "boolean",
      initialValue: false,
      description: "Display this partner prominently on the homepage",
    }),
    // We'll use a custom view in the Sanity Studio to show partner products
    // This is a virtual field - the actual relationship is stored in the product schema
    defineField({
      name: "partnerProducts",
      title: "Partner Products",
      type: "string",
      readOnly: true,
      description: "Products associated with this partner (managed in the product schema)",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Phone" },
        { name: "website", type: "url", title: "Website" },
        { name: "telegram", type: "string", title: "Telegram Username" },
      ],
    }),
    defineField({
      name: "messaging",
      title: "Messaging (Overrides)",
      type: "object",
      description: "If provided, these will be used for this partner’s products instead of the site defaults.",
      fields: [
        { name: "telegramUsername", type: "string", title: "Telegram Username" },
        { name: "whatsappNumber", type: "string", title: "WhatsApp Number (international format)" },
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "twitter", type: "url", title: "Twitter" },
        { name: "tiktok", type: "url", title: "TikTok" },
      ],
    }),
    defineField({
      name: "partnerSince",
      title: "Partner Since",
      type: "date",
      description: "When the partnership began",
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
      media: "logo",
      featured: "featured",
    },
    prepare({ title, media, featured }) {
      return {
        title,
        media,
        subtitle: featured ? "✓ Featured Partner" : "Partner",
      }
    },
  },
})
