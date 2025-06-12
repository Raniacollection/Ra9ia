import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Variant Name',
      type: 'string',
      description: 'e.g., Color, Size, Material. Or a combination like \'Red / Small\'',
      validation: (Rule) => Rule.required(),
    }),
    // Optional: Link to predefined attributes like color or size if you manage them globally
    // defineField({
    //   name: 'color', 
    //   type: 'reference', 
    //   to: [{type: 'colorAttribute'}] // Assuming a 'colorAttribute' schema
    // }),
    // defineField({
    //   name: 'size', 
    //   type: 'reference', 
    //   to: [{type: 'sizeAttribute'}] // Assuming a 'sizeAttribute' schema
    // }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price for this specific variant. Overrides main product price if set.'
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'images',
      title: 'Variant Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    // Add other variant-specific fields as needed, e.g., weight, dimensions
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      stock: 'stockQuantity',
      media: 'images.0'
    },
    prepare(selection) {
      const {title, price, stock, media} = selection
      let subtitle = ''
      if (price !== undefined) {
        subtitle += `Price: ${price}`
      }
      if (stock !== undefined) {
        subtitle += `${subtitle ? ' | ' : ''}Stock: ${stock}`
      }
      return {
        title: title,
        subtitle: subtitle || 'No details',
        media: media
      }
    }
  }
}) 