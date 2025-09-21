# Ra9ia Collection

A luxury, content-driven commerce site built with Next.js 15, React 19, Tailwind CSS, Radix UI, and Sanity CMS. This repo hosts the storefront; Sanity hosts content.

## Quick Start

```bash
# 1) Install deps
pnpm install   # or: npm install / yarn install

# 2) Add environment variables
# Create .env.local at the project root (see below)

# 3) Run the dev server
pnpm dev       # or: npm run dev / yarn dev

# 4) Open
http://localhost:3000
```

## Scripts

- `dev` – start Next.js dev server
- `build` – build for production
- `start` – run the production server
- `lint` – run Next.js ESLint
- `sanity:init` – helper to bootstrap Sanity content locally (optional script)

From `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "sanity:init": "tsx sanity/scripts/init.ts"
  }
}
```

## Environment Variables (.env.local)

Create `./.env.local` and set:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=o3e5wr0n
NEXT_PUBLIC_SANITY_DATASET=production
# Optional read token (only if accessing private content)
# SANITY_API_READ_TOKEN=xxxxxxxxxxxxxxxx

# Telegram (only if using Telegram bot checkout)
# NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
# NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id
```

Sanity client config lives in `sanity/lib/client.ts`. The app uses the centralized client everywhere (`import { client, urlFor } from "@/sanity/lib/client"`).

## Tech Stack

- Next.js 15, React 19
- Tailwind CSS, shadcn/ui (Radix primitives)
- Sanity CMS (`sanity/`), GROQ
- `next/image` for responsive images

## Project Structure

```
app/
  components/           # site-level components (header, footer, cards, modals...)
  products/[slug]/      # product detail page
  partners/             # partner listings and PD(P)
  collections/          # collection listing page
  editorial/            # editorial pages (e.g., Art of Draping)
  layout.tsx            # global fonts/providers
  page.tsx              # homepage

components/ui/          # shadcn (Radix) UI components
lib/                    # helpers (formatting, utils)
lib/sanity/             # fetchers (legacy)
sanity/
  lib/                  # centralized Sanity client + GROQ query constants
  schemas/              # Sanity schemas (product, collection, partner, ...)
  scripts/              # optional init scripts

docs/                   # project documentation
```

## Images & Aspect Ratios (Cropping)

- Product cards, PDP hero, and quick view use a portrait 3:4 aspect with `object-cover`.
- Upload any size to Sanity; cropping is handled by aspect containers in the UI. Use Sanity Hotspot to ensure the subject stays framed.
- Recommended upload for portrait: 1200×1600 (or 800×1067). The PDP uses `urlFor(image).width(800).height(1067)`.
- Key files:
  - `app/components/product-card.tsx` (3:4, `Image` uses `fill + object-cover`)
  - `app/products/[slug]/page.tsx` (main image 3:4, 800×1067)
  - `app/components/product-details.tsx` (gallery hero 3:4)
  - `app/components/quick-view-modal.tsx` (3:4)

## Currency & Locale

- Default currency is Ethiopian Birr (ETB), locale `en-ET`.
- Formatter: `lib/utils.ts -> formatCurrency(amount: number, currency = 'ETB')`.
- Update currency site-wide by passing a different code to `formatCurrency` if needed.

## Content Model (Sanity)

- Schemas: `sanity/schemas/`
  - `product` (images with hotspot, price, variants, inventory, category, collection, flags: bestseller/newArrival/partner)
  - `productVariant` (variant-specific price/stock, colors/sizes)
  - `collection`, `category`, `partner`, `page`, `siteSettings`, etc.
- GROQ queries:
  - Constants: `sanity/lib/queries.ts` (e.g., `productsQuery`, `productQuery`)
  - Fetchers: `lib/sanity/queries.ts` (homepage and partner helpers)

## Navigation & Editorial

- Desktop mega menu: `app/components/mega-menu.tsx`
- Mobile sheet menu: `app/components/site-header.tsx`
- Editorial page example: `app/editorial/art-of-draping/page.tsx`
- Homepage editorial teaser: `app/components/editorial-story.tsx`

## Docs Index

- `docs/SETUP.md` – prerequisites, environment, running locally
- `docs/ARCHITECTURE.md` – folders, data flow, providers, styling
- `docs/CONTENT_MODEL.md` – Sanity schemas & queries
- `docs/UX_GUIDELINES.md` – typography, color, motion, aspect ratios
- `docs/WORKFLOWS.md` – common tasks (add product, editorial, cropping, currency)
- `docs/TROUBLESHOOTING.md` – common issues and fixes
- `docs/luxury-redesign.md` – creative direction & roadmap (already present)

## Notes

- `next.config.mjs` has `images.unoptimized: true` to keep local dev simple. If you enable Next Image Optimization, configure `images.remotePatterns` for Sanity CDN domains.
- Ratings/wishlist UI is removed on luxury surfaces per the redesign plan.
