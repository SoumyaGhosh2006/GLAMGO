# GLAMGO

Production-ready Vite + React storefront for GLAMGO apparel essentials.

## Overview

This project powers the GLAMGO catalog experience with:

- category-based product browsing
- individual product detail pages
- SEO metadata for storefront and product routes
- Supabase-backed product loading
- local fallback product data when Supabase is not configured or unavailable
- realtime product refresh support through Supabase channels

## Tech Stack

- Vite
- React 19
- React Router
- Supabase JavaScript client
- ESLint

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

3. Add your environment values to `.env`.

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

The app reads these client-side environment variables:

```bash
VITE_SITE_URL=https://glamgo.vercel.app
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Variable Notes

- `VITE_SITE_URL`: canonical public site URL used for SEO metadata
- `VITE_SUPABASE_URL`: your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: your Supabase public anon key

Only use the Supabase anon/public key in frontend environment variables. Do not
expose a service-role key through any `VITE_` variable.

## Product Data Behavior

Product loading is designed to degrade gracefully:

- If Supabase is configured, products are fetched from the `products` table.
- If Supabase is missing, empty, or temporarily unavailable, the app falls back
  to the local catalog in `src/data/products.js`.
- Product rows are normalized so the UI can work with either Supabase data or
  local fallback data.
- Realtime subscriptions are enabled when Supabase is available.

## Expected Supabase Product Fields

The current product normalization supports these fields from Supabase rows:

- `id`
- `name` or `title`
- `slug`
- `price`
- `image_url` or `image`
- `category`
- `description`
- `fabric` or `material`
- `sizes`

`sizes` can be either:

- an array like `["S", "M", "L"]`
- a comma-separated string like `"S, M, L"`

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Production Checks

Run these before deployment:

```bash
npm run lint
npm run build
```

## Vercel Deployment

Set these in the Vercel project environment settings before production
deployment:

```bash
VITE_SITE_URL=https://your-production-domain.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

This project is compatible with Vercel static deployment through the existing
Vite build output.
