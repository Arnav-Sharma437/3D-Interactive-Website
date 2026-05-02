# Hakimi Hardware — Next.js catalog

Gold + black luxury hardware storefront with GSAP motion, WhatsApp enquiries, and a password-protected admin panel (localStorage CRUD).

## Why GitHub Pages shows only README

**GitHub Pages** serves **static files** from a branch. This repo is **Next.js** — it needs a **Node build**. Pages has **no `index.html` at the repo root**, so GitHub renders **`README.md`** instead. That is expected until you use **Vercel** (or another Next.js host).

---

## Deploy on Vercel (recommended — ~2 minutes)

I **cannot** log into your Vercel account from here. Follow these steps once:

1. Open **[vercel.com](https://vercel.com)** → **Sign up** (choose **Continue with GitHub**).
2. **Add New…** → **Project** → **Import** your repo **`Arnav-Sharma437/3D-Interactive-Website`**.
3. Vercel auto-detects **Next.js**. Leave defaults:
   - **Framework Preset:** Next.js  
   - **Build Command:** `next build`  
   - **Output:** (default)  
4. Click **Deploy**. After the build, you get a live URL like `https://3d-interactive-website-xxx.vercel.app`.
5. Every future **`git push` to `main`** will **auto-deploy**.

**Admin on production:** `https://<your-vercel-url>/admin` — same password as local (`hakimi2024` until you change it in `app/admin/layout.tsx`).

### Optional: stop the confusing GitHub Pages site

**GitHub** → your repo → **Settings** → **Pages** → **Unpublish site** (so people don’t think the README page is the “real” app).

### Optional: deploy from this computer (CLI)

```bash
npm i -g vercel
vercel login
cd path/to/this/project
vercel --prod
```

---

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin (local)

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default password: `hakimi2024` — change in `app/admin/layout.tsx` (`ADMIN_PASSWORD`).

## Stack

- Next.js 14 (App Router), React 18, Tailwind CSS
- GSAP + ScrollTrigger (`app/page.tsx`, `lib/gsapHooks.ts`)
- Product data + admin persistence: `lib/products.ts`, `lib/adminStore.ts`
- WhatsApp links: `lib/whatsapp.ts`, `components/WhatsAppButton.tsx`
