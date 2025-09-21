# Troubleshooting

Common issues and how to fix them.

## Sanity client error: Configuration must contain 'projectId'

- Cause: `.env.local` is missing `NEXT_PUBLIC_SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_DATASET` or the server needs a restart.
- Fix:
  1. Create/update `.env.local`:
     ```bash
     NEXT_PUBLIC_SANITY_PROJECT_ID=o3e5wr0n
     NEXT_PUBLIC_SANITY_DATASET=production
     ```
  2. Restart dev server: `pnpm dev`.
  3. Ensure imports use the centralized client: `import { client, urlFor } from '@/sanity/lib/client'`.

## Images look short or inconsistent in grids

- Cause: Mixed aspect ratios.
- Fix: The UI enforces 3:4 with `object-cover` in:
  - `app/components/product-card.tsx`
  - `app/products/[slug]/page.tsx`
  - `app/components/product-details.tsx`
  - `app/components/quick-view-modal.tsx`
  Ensure these files are unchanged; upload images with hotspots set.

## PDP image different size than collection card

- Cause: PDP used square images previously.
- Fix: Updated PDP to 3:4 aspect and Sanity builder set to `width(800).height(1067)`.

## Currency shows `$` instead of birr

- Cause: Hard-coded `$` in some components.
- Fix: Use `formatCurrency` from `lib/utils.ts`. We updated key surfaces, but if you see `$`, replace with `formatCurrency(amount)`.

## Next Image optimization errors

- Cause: `images.unoptimized` is true for dev; enabling optimization without `remotePatterns` can break Sanity images.
- Fix: Either keep `unoptimized: true` (dev) or configure `images.remotePatterns` for Sanity CDN domains when optimizing.

## Types/paths not resolving

- Cause: Wrong path alias usage.
- Fix: Use `@/*` per `tsconfig.json` paths. Example: `import { client } from '@/sanity/lib/client'`.
