import { defineField, defineType } from "sanity"

export const telegramOrder = defineType({
  name: "telegramOrder",
  title: "Telegram Order",
  type: "document",
  fields: [
    defineField({
      name: "orderId",
      title: "Order ID",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerInfo",
      title: "Customer Information",
      type: "object",
      fields: [
        { 
          name: "name", 
          type: "string", 
          title: "Name",
          validation: (Rule) => Rule.required(),
        },
        { 
          name: "email", 
          type: "string", 
          title: "Email",
          validation: (Rule) => Rule.required().email(),
        },
        { 
          name: "phone", 
          type: "string", 
          title: "Phone Number",
          validation: (Rule) => Rule.required(),
        },
        { 
          name: "telegramUsername", 
          type: "string", 
          title: "Telegram Username",
        },
      ],
    }),
    defineField({
      name: "orderItems",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1).integer(),
            },
            {
              name: "color",
              title: "Color",
              type: "string",
            },
            {
              name: "size",
              title: "Size",
              type: "string",
            },
            {
              name: "price",
              title: "Price at Order Time",
              type: "number",
              validation: (Rule) => Rule.required().positive(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        { name: "street", type: "string", title: "Street" },
        { name: "city", type: "string", title: "City" },
        { name: "state", type: "string", title: "State/Province" },
        { name: "postalCode", type: "string", title: "Postal Code" },
        { name: "country", type: "string", title: "Country" },
      ],
    }),
    defineField({
      name: "shippingNotes",
      title: "Shipping Notes",
      type: "text",
      description: "Any special instructions for shipping or delivery",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Sent to Telegram", value: "sent_to_telegram" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "sent_to_telegram",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "telegramMessageId",
      title: "Telegram Message ID",
      type: "string",
      description: "ID of the message sent to Telegram for tracking purposes",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "orderId",
      name: "customerInfo.name",
      status: "status",
      total: "totalAmount",
      date: "createdAt",
    },
    prepare({ title, name, status, total, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : "Unknown date";
      return {
        title: `Order ${title}`,
        subtitle: `${name || "Unknown customer"} | $${total || 0} | ${status || "Unknown status"} | ${formattedDate}`,
      }
    },
  },
})
