# Architecture

This document explains how the Ra9ia storefront is organized, how data flows through the app, and the key building blocks (UI, styling, images, and state).

## Overview

- Framework: Next.js 15 (App Router) + React 19
- Styling: Tailwind CSS + shadcn/ui (Radix primitives)
- CMS: Sanity.io (content source)
- Images: `next/image` + Sanity Image Builder (`urlFor`)
- Currency: Ethiopian Birr (ETB) by default via `formatCurrency`

## Directory Structure (high level)

```
app/
  components/
    product-card.tsx
    product-details.tsx
    order-now-modal.tsx
    quick-view-modal.tsx
    site-header.tsx
    site-footer.tsx
    editorial-story.tsx
    mega-menu.tsx
  products/[slug]/page.tsx
  partners/
  collections/
  editorial/
  layout.tsx
  page.tsx

components/ui/          # shadcn UI wrappers (Radix)
lib/                     # utilities
  utils.ts               # formatCurrency, classnames
  sanity/queries.ts      # homepage + partner fetch helpers (legacy location)

sanity/
  lib/client.ts          # centralized Sanity client + urlFor
  lib/queries.ts         # GROQ constants (productQuery, productsQuery, ...)
  schemas/               # content model

docs/                    # documentation
```

## Data Flow

- All Sanity access goes through the centralized client in `sanity/lib/client.ts`:
  ```ts
  import { client, urlFor } from "@/sanity/lib/client"
  ```
- Queries are defined as GROQ string constants in `sanity/lib/queries.ts` and fetch helpers exist in `lib/sanity/queries.ts`.
- Page-level data fetching examples:
  - `app/collections/page.tsx` uses `productsQuery` and sets `export const revalidate = 60` (revalidate every minute).
  - `app/page.tsx` (homepage) fetches featured collections, spotlight products, featured partners, and new arrivals with graceful fallbacks.

## Styling & Design Tokens

- Fonts: configured in `app/layout.tsx` via `next/font`.
  - Fraunces (serif) is bound to `--font-serif` and applied globally to body via `font-serif`.
  - Inter (sans) is bound to `--font-sans` for UI/body as needed.
- Tailwind configuration: `tailwind.config.ts` defines:
  - `ra9ia` and `burgundy` color scales for luxury tones
  - `cream` and `gold` scales for accents
  - basic keyframes/animations (accordion)

## Images & Cropping

- Strategy: UI containers enforce aspect ratios; images use `object-cover` so uploads auto-crop to fit.
- Primary portrait aspect: 3:4.
  - PLP cards: `app/components/product-card.tsx` → `aspect-[3/4]` with `Image fill`.
  - PDP main image: `app/products/[slug]/page.tsx` → `aspect-[3/4]` and Sanity `urlFor(img).width(800).height(1067)` for 3:4.
  - Product details gallery hero: `app/components/product-details.tsx` → `aspect-[3/4]`.
  - Quick view: `app/components/quick-view-modal.tsx` → `aspect-[3/4]`.
- Sanity Hotspot should be set in the Studio to keep the subject framed.
- Recommended upload: 1200×1600 (or 800×1067) portrait.

## Navigation

- Desktop: `app/components/site-header.tsx` with `MegaMenu` (`app/components/mega-menu.tsx`).
- Mobile: Sheet-based menu using `components/ui/sheet.tsx`.
- Sentence case labels, no ALL CAPS.

## State & Providers

- Cart: `hooks/use-cart.tsx` (localStorage backed), provided in `app/layout.tsx` via `CartProvider`.
- Wishlist: placeholder provider is wired; UI may be minimized per luxury brief.
- ThemeProvider: light theme only (no system preference) per luxury spec.

## Currency & Formatting

- `lib/utils.ts` exports `formatCurrency(amount, currency = 'ETB')` using locale `en-ET`.
- Use this helper everywhere for prices. To change currency, pass a different code or adjust the default.

## Performance Notes

- `next.config.mjs` sets `images.unoptimized: true` for simpler local/dev usage.
- If enabling optimization, configure `images.remotePatterns` for Sanity domains and consider blur placeholders.

## Testing Content

- Use the collections page (`/collections`) to verify PLP image cropping and metadata.
- Use a product detail page (`/products/[slug]`) to confirm 3:4 main gallery.
- The homepage "Lookbook" and "Spotlight" sections pull real data from Sanity with fallbacks.
