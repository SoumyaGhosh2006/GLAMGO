# GLAMGO

Production-ready Vite and React storefront for GLAMGO apparel essentials.

## Local Setup

```bash
npm install
npm run dev
```

## Production Checks

```bash
npm run lint
npm run build
```

## Vercel Environment Variables

Set these in the Vercel project settings before the production deployment:

```bash
VITE_SITE_URL=https://your-production-domain.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Use only the Supabase anon/public key in frontend environment variables. Never
add a service-role key to Vercel variables that start with `VITE_`.
