# Setup

This document explains how to set up and run the Ra9ia Collection project locally.

## Prerequisites

- Node.js 20 LTS (recommended) or >= 18.18
- A package manager: pnpm (recommended), npm, or yarn
- A Sanity.io project (Project ID + Dataset). You can use the defaults already wired, or point to your own.

## Install dependencies

```bash
# using pnpm (recommended)
pnpm install

# or using npm
npm install

# or using yarn
yarn install
```

## Environment variables

Create a `.env.local` at the project root with the following values:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=o3e5wr0n
NEXT_PUBLIC_SANITY_DATASET=production
# Optional token (only if your dataset requires a read token)
# SANITY_API_READ_TOKEN=xxxxxxxxxxxxxxxx

# Telegram (optional, only if you want the Telegram checkout flows)
# NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
# NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id
```

Notes:
- The centralized Sanity client is defined in `sanity/lib/client.ts`. All pages/components should import `client` and `urlFor` from there.
- If you see an error like `Configuration must contain 'projectId'`, the env vars are missing or not loaded. See Troubleshooting.

## Run locally

```bash
# Start the dev server
pnpm dev   # or npm run dev / yarn dev
# Then open http://localhost:3000
```

Build for production:

```bash
pnpm build && pnpm start
```

## Image configuration

- In `next.config.mjs`, `images.unoptimized` is set to `true` to simplify local development.
- If you switch to Next.js Image Optimization (`unoptimized: false`), configure `images.remotePatterns` for Sanity image domains.

## Sanity project

- Schemas live in `sanity/schemas/`.
- Queries are defined in `sanity/lib/queries.ts` (GROQ string constants) and `lib/sanity/queries.ts` (fetch helpers used by pages).
- You can manage content in Sanity Studio (hosted from Sanity or embedded separately). This repo does not include an embedded Studio app.

## Fonts & CSS

- Fonts are configured in `app/layout.tsx` via `next/font` (Fraunces + Inter) and Tailwind is used for styling. Global styles in `app/globals.css`.
