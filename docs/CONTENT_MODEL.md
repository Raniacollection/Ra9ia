# Content Model (Sanity)

This document describes the Sanity schemas used by the storefront and how they map to the UI.

## Schemas

All schemas live in `sanity/schemas/`.

- `product.ts`
  - Fields:
    - `name` (string, required)
    - `slug` (slug, required)
    - `images` (array of image, hotspot enabled)
    - `price` (number, base price)
    - `description` (text)
    - `details` (string[])
    - `variants` (array of `productVariant`, required ≥ 1)
    - `inventoryManagement` (object)
      - `trackInventory` (boolean, default true)
      - `lowStockThreshold` (number, default 5)
      - `showRemainingStock` (boolean)
      - `enableRestockNotifications` (boolean)
      - `restockDate` (date)
    - `category` (reference → `category`, required)
    - `collection` (reference → `collection`)
    - `rating` (number, 1–5) — not emphasized in luxury surfaces
    - `reviewCount` (number)
    - `isNewArrival` (boolean)
    - `isBestseller` (boolean)
    - `isPartnerProduct` (boolean)
    - `partner` (reference → `partner`, required when `isPartnerProduct`)
    - `seo` (object)
  - UI usage:
    - PLP cards: first image shown; auto-cropped to 3:4 in UI
    - PDP: full gallery; main image 3:4, thumbnails 3:4

- `productVariant.ts`
  - Fields:
    - `name` (string, required)
    - `sku` (string)
    - `price` (number) – overrides product price
    - `stockQuantity` (number)
    - `images` (array of image, hotspot)

- `collection.ts`
  - Fields: `name`, `slug`, `description`, `image` (hotspot), `products` (refs), `seo`.
  - UI usage: homepage modules and collections listing.

- `category.ts`
  - Fields: `name`, `slug`, `description`, `image` (hotspot), `parent` (ref), `seo`.

- `partner.ts`
  - Fields: `name`, `slug`, `logo` (hotspot), `coverImage` (hotspot), `description`, `shortDescription`, `featured`, `contactInfo`, `socialMedia`, `partnerSince`, `seo`.
  - UI usage: `/partners`, `/partners/[slug]`, partner product PDP.

- `page.ts`
  - Generic CMS pages: `title`, `slug`, `content` (Portable Text + images), optional `heroImage`, `heroText`, `seo`.

- `siteSettings.ts`
  - `title`, `description`, `logo`, `heroImage`, `heroText`, `socialLinks`, `contactInfo`, `shippingInfo`, `seo`.

- `restockNotification.ts` and `telegramOrder.ts`
  - Used for collecting restock notifications and sending structured orders via Telegram integrations.

## Queries

- GROQ constants live in `sanity/lib/queries.ts`:
  - `productQuery` – single product by `_id`
  - `productsQuery` – list products for PLP
  - `collectionQuery`, `collectionsQuery`
  - `categoryQuery`, `categoriesQuery`
  - `pageQuery`, `siteSettingsQuery`

- Fetch helpers for pages live in `lib/sanity/queries.ts` with convenience filters for homepage and partners (e.g., `getFeaturedCollections`, `getBestsellerProducts`, `getFeaturedPartners`, `getNewArrivalProducts`).

## Images

- All images should have hotspots in Studio. The UI uses fixed aspect containers and `object-cover` so uploads auto-crop to fit.
- PDP uses `urlFor(image).width(800).height(1067)` to request a 3:4 portrait from Sanity.

## Editorial

- Editorial content can be implemented as dedicated pages under `app/editorial/` (e.g., `Art of Draping`).
- You may later add a `homeModules` union in `siteSettings` to build editorial home pages entirely from Sanity.
