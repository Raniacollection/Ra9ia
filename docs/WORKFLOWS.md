# Workflows

Common tasks you will perform in this project.

## Add a new product

1. Create a product in Sanity (`product`):
   - Set `name`, `slug`, `price`, `description`.
   - Upload multiple `images` and set hotspots.
   - Optionally add `variants` with specific `price` and `stockQuantity`.
   - Link `category` and optional `collection`.
   - Mark `isNewArrival` or `isBestseller` if needed.
2. Verify it appears in the PLP at `/collections`.
3. Open the PDP via `/products/[slug]`.

## Ensure images crop correctly

- Upload any size; set a hotspot in Sanity Studio.
- The UI uses portrait `3:4` aspect containers and `object-cover`.
- Key places to check:
  - `app/components/product-card.tsx`
  - `app/products/[slug]/page.tsx`
  - `app/components/product-details.tsx`
  - `app/components/quick-view-modal.tsx`

## Change currency to Birr (ETB)

- Already done globally. Prices use `formatCurrency` from `lib/utils.ts` with default `ETB`.
- If you need a different currency temporarily, pass it explicitly: `formatCurrency(amount, 'USD')`.

## Create an editorial page

1. Add a new file under `app/editorial/<slug>/page.tsx`.
2. Use a hero image with overlay and serif headings.
3. Link it from the homepage teaser component `app/components/editorial-story.tsx` by setting `ctaHref`.

## Update navigation links

- Desktop: `app/components/site-header.tsx` and `app/components/mega-menu.tsx`.
- Mobile: same header file; the sheet groups links under Shop / Info. Keep sentence case.

## Fix Sanity client issues

- Always import `client` and `urlFor` from `@/sanity/lib/client`.
- Ensure `.env.local` defines `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
- If you see `Configuration must contain 'projectId'`, restart the dev server after setting env vars.

## Telegram checkout

- Configure `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` and `NEXT_PUBLIC_TELEGRAM_CHAT_ID` if you intend to send orders to Telegram.
- The helper functions live in `lib/telegram.ts` and the cart UI in `components/cart/`.
