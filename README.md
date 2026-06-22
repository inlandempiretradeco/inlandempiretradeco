# Inland Empire Trading Co.

A fast, dark-luxury catalog site for watches and fragrance. No cart, no
checkout — every piece is "by inquiry," with Call / Text / Email buttons in
place of Add to Cart. Inventory is managed by Ramon through a private,
no-code editor at `/studio` — nothing in the public nav links to it.

**Stack:** Next.js (App Router) · Tailwind CSS v4 · Sanity (headless CMS) · Framer Motion · TypeScript

---

## 1. One-time setup

You'll need [Node.js 20+](https://nodejs.org) installed locally.

```bash
npm install
```

### Create the Sanity project (this powers the no-code admin)

1. Run `npx sanity@latest init` from the project root.
2. Choose **"Create new project"**, name it whatever you like (e.g. "Inland Empire Trading Co.").
3. Choose the **default dataset** name: `production`.
4. When it asks to add config/schema files, say **no** — they're already in this repo (`sanity.config.ts`, `src/sanity/schemaTypes/`).
5. It'll print a **Project ID** — copy it.

### Set environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-from-above
NEXT_PUBLIC_SANITY_DATASET=production
```

The phone/email values already match the current business info — update them
in `.env.local` only if they change (and again in your hosting provider's
dashboard when you deploy).

### Run it locally

```bash
npm run dev
```

- Site: http://localhost:3000
- Inventory editor: http://localhost:3000/studio (it'll ask you to log in with a Google/GitHub/email account — that becomes Ramon's login)

Add a watch or fragrance in `/studio`, hit **Publish**, then refresh the
public site — it appears within about a minute (pages re-check Sanity every
60 seconds).

---

## 2. Adding inventory (no code, for Ramon)

1. Go to `yoursite.com/studio` and log in.
2. Click **Watches** or **Fragrance** in the left panel.
3. Click the **+** button to create a new one.
4. Fill in brand, model, price (or leave price blank to show "Inquire for Price"), upload photos, and set **Condition**/**Status**.
5. Click **Publish** (top right). That's it — it's live on the site shortly after.
6. Brand names are free-text — type a new brand and it automatically becomes a filter option on the site. No code changes ever needed.
7. To take something down, set **Status** to "Sold" — it disappears from the public site automatically (no need to delete it).

Bookmark `/studio` somewhere private (it's not linked in the site's nav by
design — that's the "back room" feel we wanted).

---

## 3. Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

---

## 4. Deploying (Vercel is the easiest path for Next.js)

1. Go to [vercel.com](https://vercel.com), sign in, **Add New Project**, import this GitHub repo.
2. In the project's **Environment Variables** settings, add the same variables from `.env.local`.
3. Deploy. Vercel gives you a URL immediately; point your real domain at it under **Settings → Domains**.
4. Every `git push` to `main` auto-deploys — no manual redeploy needed when you change code. (Inventory changes via `/studio` don't need a redeploy at all — they're live within a minute.)

---

## 5. What's already built

- **Homepage** — animated seal-stamp hero, mission section, "Recent Acquisitions" pulling from Sanity, closing inquiry CTA
- **`/watches`** and **`/fragrance`** — filterable catalogs (brand, condition/category, movement/concentration, price range, sort), filters sync to the URL so filtered views are shareable and indexable
- **Product detail pages** — auto-generated per item, with Product schema markup for SEO
- **Call / Text / Email** buttons throughout — no cart, no checkout, no payment processing
- **`/studio`** — the private inventory editor, excluded from `robots.txt` and the sitemap
- **SEO basics** — per-page metadata, sitemap.xml, robots.txt, LocalBusiness + Product structured data
- **Performance** — static generation where possible, optimized images via `next/image` + Sanity's CDN, fonts loaded via `next/font` (no render-blocking font requests), minimal client JS

## 6. Reasonable next steps (not yet built)

- Real photography to replace placeholder states (the design expects clean, consistent product shots — worth budgeting for a shoot)
- Google Business Profile + Search Console setup for local SEO (separate from this codebase)
- An "Our Process" or "Authentication" page if you want to lean further into the trust/provenance angle
- Email notification to Ramon when a new inquiry comes in via the contact buttons (currently these just open the phone/SMS/email app directly — that's intentional for simplicity, but a form-based alternative could log inquiries somewhere if preferred)
