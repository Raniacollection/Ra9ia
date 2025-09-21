# UX Guidelines

These guidelines encode the current luxury direction for Ra9ia.

## Typography

- Display: Fraunces (via `next/font`) bound to `--font-serif`.
- Body/UI: Inter bound to `--font-sans`.
- Use sentence case for nav/menu labels. Avoid ALL CAPS except small overlines (e.g., 10–11px, tracked caps for meta labels).

## Color & Tone

- Neutral, light canvas. Accents: `ra9ia` / `burgundy` scales from `tailwind.config.ts`.
- Restraint in chrome. Subtle borders: `border-burgundy-100`.

## Motion

- Subtle transitions (200–300ms), no bounce.
- Image zoom on hover can be gentle (`group-hover:scale-105`).

## Imagery & Aspect Ratios

- Primary portrait aspect: 3:4.
  - PLP cards (`app/components/product-card.tsx`): `aspect-[3/4]` + `Image fill` + `object-cover`.
  - PDP main (`app/products/[slug]/page.tsx`): `aspect-[3/4]`; Sanity builder `width(800).height(1067)`.
  - Product details gallery hero (`app/components/product-details.tsx`): `aspect-[3/4]`.
  - Quick View (`app/components/quick-view-modal.tsx`): `aspect-[3/4]`.
- Set Sanity hotspots to keep subject framed.
- Recommended upload: 1200×1600 (or 800×1067).

## Navigation

- Desktop `MegaMenu` (`app/components/mega-menu.tsx`), minimalist trigger text, no background change when closed, subtle when open.
- Mobile sheet (`app/components/site-header.tsx`), single close button (no duplicates), grouped links (Shop / Info).

## Content Elements

- Remove ratings/wishlist icons on luxury surfaces.
- Use short, evocative copy; avoid clutter.

## Currency & Locale

- Prices display in Ethiopian Birr using `formatCurrency(amount, 'ETB')` (default already set in `lib/utils.ts`).

## Accessibility

- Ensure adequate color contrast for text over images (use gradient overlays when necessary).
- Provide `alt` text for all images.
- Maintain focus states for interactive elements.
