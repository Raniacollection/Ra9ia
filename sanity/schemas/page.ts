import { defineField, defineType } from "sanity"

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" }
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" }
          ]
        },
        {
          type: "image",
          options: {
            hotspot: true
          }
        }
      ],
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
      title: "title",
      media: "heroImage",
    },
  },
}) 