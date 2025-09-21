# Ra9ia Luxury Redesign Plan

Status: Approved (light minimal; Fraunces; remove ratings & wishlist; partners to dedicated page; hero video allowed)

## Creative Direction
- Tone: Light, minimal, editorial luxury.
- Typography: Fraunces for display; Inter for body.
- Color: Neutral canvas with restrained burgundy accents.
- Motion: Subtle, slow easings (200–300ms); gentle transitions; no bouncy effects.
- UI: Reduce chrome and decision density; focus on one-piece storytelling.

## Homepage Strategy
1. Featured Product Hero
   - Full-bleed portrait (3:4 desktop, 4:5/9:16 mobile).
   - Minimal copy: name + short line + primary CTA “View Piece”; optional secondary “View Story”.
   - Optional short silent loop video.
   - Source: pick a single product (temporary heuristic) until site settings include a featured pick.

2. Collection of the Month
   - One collection, full-width. Editorial image, concise CTA.

3. Editorial Story Block
   - Alternating full-bleed imagery and short narrative copy.
   - Optional “Shop the look” links to 1–2 hero pieces. You approved leaving this flexible.

4. Partner Spotlight
   - Single partner item or story (no grids). Partners get a dedicated page for full listing.

5. Remove Grids, Tabs, Ratings, Wishlist
   - Replace bestseller tabs with a single hero.
   - Remove star ratings and wishlist hearts across luxury contexts (homepage, lists, PDP).

## Collections (PLP)
- Layout: 1-up vertical flow; each product is its own “scene.”
- Minimal filters (hidden under a single Refine panel) and slim pagination.
- Optional alternate angle on hover for pointer devices.

## Product (PDP)
- Full-bleed gallery; 3–6 carefully art-directed images.
- Sticky summary panel: price, variants, one elegant “Add to Bag”/“Order Now.”
- Remove ratings/wishlist; keep size guide, materials/craftsmanship, care.
- Optional short mid-page video.

## Global Navigation
- Header overlays hero (transparent) → solid on scroll.
- Primary links: Collections, About/Story. Partners moved to dedicated page.
- Footer simplified with brand story excerpt.

## Content & Art Direction
- Image guidelines:
  - Hero: portrait 3:4 desktop; 4:5 / 9:16 mobile. Use Sanity hotspot/crop.
  - Editorial blocks: 16:9 and 4:5, consistent lighting and tone.
- Copy tone: short, evocative, no promotional clutter.

## Technical Plan
- Components (new)
  - `components/home/FeaturedProductHero.tsx`
  - `components/home/CollectionOfTheMonth.tsx`
  - `components/home/EditorialStory.tsx`
  - `components/home/PartnerSpotlight.tsx`
  - `components/ui/full-bleed-image.tsx` (responsive art direction & hotspots)

- Queries (new)
  - `getFeaturedProduct()` – temporary heuristic: first bestseller or newest non-partner product.
  - `getFeaturedCollection()` – from collections; later can be driven by site settings.
  - `getHomeModules()` – future: to drive a flexible editorial homepage.

- Sanity Schema (future, incremental)
  - `siteSettings`: featuredProduct (ref), featuredCollection (ref), homeModules[] union (Hero, EditorialStory, PartnerSpotlight).
  - `product`: optional hero fields (heroHeadline, heroSubhead, heroMedia video/image), editorialStory[], lookItems[].
  - `collection`: coverImagePortrait, coverImageLandscape.

- Styles & Tokens
  - Add Fraunces via `next/font` and wire as `--font-serif`.
  - Tailwind tokens: type scale, spacing, reduced borders/shadows.

- Performance
  - Next/Image art direction, priority hero, blurDataURL from Sanity.
  - Preconnect to Sanity CDN; defer non-critical scripts.

## Phased Roadmap
- Phase 1 (Now)
  - Adopt Fraunces; remove ratings and wishlist UI across primary surfaces.
  - Implement Featured Product Hero and remove homepage grids/tabs.
  - Keep partners on a dedicated page; add a minimal Partner Spotlight block on home.

- Phase 2
  - Add Collection of the Month and Editorial Story blocks.
  - Refine typography scale and whitespace rhythm.

- Phase 3
  - Refactor Collections (PLP) into 1-up luxury layout with slim pagination.

- Phase 4
  - Redesign PDP: full-bleed gallery + sticky summary; remove ratings/wishlist entirely.

- Phase 5
  - A11y & performance pass; finalize motion; content QA.

## Decisions (locked)
- Theme: Light minimal.
- Typeface: Fraunces (display) + Inter (body).
- Featured Product: pick automatically for now (bestseller/newest non-partner).
- Hero Video: allowed (silent loop, short).
- Ratings/Wishlist: remove site-wide.
- Partners: dedicated page; homepage spotlight kept minimal.
- Shop the Look: optional; implement at our discretion.

## Acceptance Criteria (Phase 1)
- Homepage shows a single Featured Product Hero with real product data.
- No star ratings or wishlist hearts on homepage, PLP, or PDP.
- Fraunces font is loaded and applied to serif headings.
- Partner grid removed from homepage; dedicated partners page remains accessible via nav.

## Rollback Plan
- Keep existing grid components behind feature flags in code for quick reversion.
- Non-destructive schema changes; retain legacy fields.

## Next Actions
- Implement font and homepage hero; remove ratings/wishlist UI.
- Prepare minimal Sanity query for featured product heuristic.
- Stage changes behind a PR for review.
