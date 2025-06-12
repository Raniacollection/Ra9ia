import { defineField, defineType } from "sanity"

export const restockNotification = defineType({
  name: "restockNotification",
  title: "Restock Notification",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "The specific color the customer is interested in",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: "The specific size the customer is interested in",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "notificationSent",
      title: "Notification Sent",
      type: "boolean",
      initialValue: false,
      description: "Whether a restock notification has been sent to the customer",
    }),
    defineField({
      name: "notificationSentAt",
      title: "Notification Sent At",
      type: "datetime",
      description: "When the restock notification was sent",
    }),
  ],
  preview: {
    select: {
      title: "email",
      productName: "product.name",
      color: "color",
    },
    prepare({ title, productName, color }) {
      return {
        title: title,
        subtitle: `${productName || 'Unknown product'}${color ? ` - ${color}` : ''}`,
      }
    },
  },
}) 