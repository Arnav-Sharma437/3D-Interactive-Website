# Hakimi Hardware — Next.js catalog

Gold + black luxury hardware storefront with GSAP motion, WhatsApp enquiries, and a password-protected admin panel (localStorage CRUD).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default password: `hakimi2024` — change in `app/admin/layout.tsx` (`ADMIN_PASSWORD`).

## Stack

- Next.js 14 (App Router), React 18, Tailwind CSS
- GSAP + ScrollTrigger (`app/page.tsx`, `lib/gsapHooks.ts`)
- Product data + admin persistence: `lib/products.ts`, `lib/adminStore.ts`
- WhatsApp links: `lib/whatsapp.ts`, `components/WhatsAppButton.tsx`

## Deploy

Compatible with [Vercel](https://vercel.com): connect the GitHub repo and use default Next.js settings.
