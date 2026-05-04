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

**Admin (production):** Not linked from the public site. Use a **secret path** + **Google reCAPTCHA v3** — see **Security** below. Change the default password in `app/admin/layout.tsx`.

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

## Security (admin)

1. **Secret URL:** Set the **same** value in Vercel / `.env.local`:
   - `ADMIN_SECRET_PATH` — e.g. `hq-panel-a7k9m2x` (long random segment, not `admin`)
   - `NEXT_PUBLIC_ADMIN_PATH` — **must match** (needed for dashboard links)

   Then open `https://yoursite.vercel.app/<that-segment>` — ** `/admin` redirects home** when a custom secret is set.

2. **reCAPTCHA v3:** [Google Admin Console](https://www.google.com/recaptcha/admin) → register site → copy:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`

   Without keys, **production login is blocked**; local dev can still log in without keys.

3. **Password:** Still verified on the client today — change `ADMIN_PASSWORD` in `app/admin/layout.tsx`. For stronger protection later, move login to a server API + session cookie.

## Admin (local)

- With **no** custom path in `.env`: [http://localhost:3000/admin](http://localhost:3000/admin)
- With custom path: `http://localhost:3000/<ADMIN_SECRET_PATH>`
- Default password: `hakimi2024` — change in `app/admin/layout.tsx`.

## Stack

- Next.js 14 (App Router), React 18, Tailwind CSS
- GSAP + ScrollTrigger (`app/page.tsx`, `lib/gsapHooks.ts`)
- Product data + admin persistence: `lib/products.ts`, `lib/adminStore.ts`
- WhatsApp links: `lib/whatsapp.ts`, `components/WhatsAppButton.tsx`
