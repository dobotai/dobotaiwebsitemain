# DobotAI marketing website — Variant 1 (Clean Authority)

Standalone **Next.js** site for **your** hosting (designed for **[Vercel](https://vercel.com)**). This ZIP folder is **Variant 1 — Clean Authority**: light background, navy structure, cyan accent. One design only — no theme switcher.

---

## Quick start — run on your computer

1. Install **[Node.js 20 LTS](https://nodejs.org/)** (includes `npm`).
2. Open a terminal and go into **this folder** (where `package.json` lives):

```bash
cd path/to/site-v1
```

3. Install dependencies:

```bash
npm install
```

4. Start the **development** server (hot reload while you edit):

```bash
npm run dev
```

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Test a production build locally (optional but recommended)

Before deploying, confirm the same command Vercel runs succeeds on your machine:

```bash
npm install
npm run build
npm run start
```

Again open `http://localhost:3000`. Stop the server with `Ctrl+C` when finished.

---

## Preparing a ZIP (what to include / exclude)

**Ship:** All source files, `package.json`, **`package-lock.json`**, `public/`, `reference/`, `README.md`, `.env.example`.

**Do not ship** (recipient or Vercel will regenerate):

- `node_modules/`
- `.next/`

**Do not ship** unless you intend to share secrets:

- `.env`, `.env.local`

After unzipping, **`package.json` must sit at the root** of the folder they deploy from.

---

## Deploy on **your** Vercel account

Vercel runs `npm install` and `npm run build` for you when you connect this project.

### Method A — From a ZIP (no Git): Vercel CLI

1. Unzip this folder on your machine.
2. Install the CLI once: `npm i -g vercel`
3. In the terminal:

```bash
cd path/to/site-v1
vercel login
vercel
```

4. Follow the prompts (defaults are usually fine). For production traffic:

```bash
vercel --prod
```

5. In the Vercel dashboard: **Project → Settings → Environment Variables** — add **`NEXT_PUBLIC_SITE_URL`** (see below), then redeploy if needed.

### Method B — With Git (good for ongoing updates)

1. Put this folder’s contents in a **private** GitHub/GitLab/Bitbucket repo (repo root = this project root).
2. Vercel → **Add New → Project** → **Import** that repo.
3. Framework: **Next.js** (auto-detected). Build command **`npm run build`**, output **Next default**.
4. If this folder lives inside a bigger repo, set **Root Directory** to `site-v1` (or the folder name you used).
5. Add environment variables, then deploy.

### Environment variables (production)

| Variable | Required? | Purpose |
|----------|-----------|---------|
| **`NEXT_PUBLIC_SITE_URL`** | **Yes** for correct SEO | Your live site URL **without** trailing slash, e.g. `https://www.yourdomain.com`. Used for canonical URLs, Open Graph/Twitter absolute URLs, and JSON-LD. |
| **`NEXT_PUBLIC_SKOOL_HERO_POSTER`** | Optional | Set to `true` or `1` for poster image behind the Skool hero — see `.env.example`. |

**Local only:** copy `.env.example` to `.env.local`. Never commit `.env` or `.env.local` to Git.

### Custom domain

After deploy: **Project → Settings → Domains** in Vercel and follow their DNS instructions.

### Post-deploy checklist

- [ ] Build succeeded on Vercel  
- [ ] `NEXT_PUBLIC_SITE_URL` matches the URL visitors use  
- [ ] Homepage OK on mobile and desktop  
- [ ] Optional: test link previews (Open Graph / Twitter) with their debugging tools  

---

## What’s in this folder

| Path | Role |
|------|------|
| `src/app/page.tsx` | Main page: navigation, sections, footer |
| `src/app/layout.tsx` | Fonts + site-wide metadata (title, Open Graph, Twitter, canonical) |
| `src/app/globals.css` | Styles and design tokens |
| `src/lib/site-links.ts` | Default SEO text + outbound URLs (Calendly, Skool, socials) |
| `src/components/JsonLd.tsx` | Schema.org structured data |
| `public/` | Images (`og.png`, brand assets, etc.) |
| `reference/dobotai-components.html` | Extra UI patterns — open in a browser |

---

## Editing — main menu

File: **`src/app/page.tsx`**

1. Find `<nav className="nav" id="mainnav">`.
2. Inside `<ul className="nav-links">`, add or remove items:

```tsx
<li>
  <a href="#your-section-id">Your label</a>
</li>
```

3. Each `href` must match a section **`id`** later on the page, e.g. `<section id="your-section-id">`.

---

## Editing — footer

Same file: **`src/app/page.tsx`** → `<footer>`.

Update links and columns. Prefer changing shared URLs once in **`src/lib/site-links.ts`** (`SOCIAL_LINKS`, `SKOOL_URL`, `CALENDLY_AUDIT_URL`) so footer and JSON-LD stay in sync.

---

## Adding a new section

1. Copy an existing `<section>...</section>` block in **`page.tsx`**.
2. Give it a unique **`id`** if the menu should scroll to it.
3. Reuse layout classes from nearby sections; add styles in **`globals.css`** if needed.

---

## Optional components (HTML reference vs React)

- **`reference/dobotai-components.html`** — Open in a browser. Shows optional layouts (carousels, marquee, video blocks, etc.).
- Already implemented in React on this site:
  - **`src/components/ReviewsCarousel.tsx`** (testimonials carousel)
  - **`src/components/VideoModal.tsx`** used from **`ClientResultsSection.tsx`** and **`SkoolCommunitySection.tsx`**

To add a pattern from the HTML file, you usually create a new component under **`src/components/`** and matching CSS.

---

## SEO — title, description, Open Graph, Twitter

| What to change | Where |
|----------------|--------|
| Default **page title** and **meta description** | **`src/lib/site-links.ts`** — `SITE_DEFAULT_TITLE`, `SITE_DEFAULT_DESCRIPTION` |
| **Open Graph** & **Twitter** cards + **canonical** | **`src/app/layout.tsx`** — `export const metadata` (`openGraph`, `twitter`, `alternates.canonical`) |
| Social **preview image** | Replace **`public/og.png`** (about **1200×630** px works well). Keep the filename or update paths in `layout.tsx`. |
| Correct absolute URLs in production | Set **`NEXT_PUBLIC_SITE_URL`** on Vercel |

---

## SEO — Schema.org (JSON-LD)

File: **`src/components/JsonLd.tsx`**

1. Describes **Organization** and **WebSite** for search engines.
2. Keep **`sameAs`** social URLs aligned with **`src/lib/site-links.ts`**.
3. **Logo** in structured data uses your site URL + **`/brand/logo.avif`** — keep that file under **`public/brand/`** or update the path in code.

---

## Images — `title` and `alt`

- **`alt` on `next/image`:** Use clear text for meaningful images. Use **`alt=""`** only when the image is decorative and nearby text already conveys the same meaning (e.g. logo beside visible brand name).
- **`title` / `aria-label` on links:** Footer social links use these for accessibility — copy that pattern for new external links.

Common files: **`page.tsx`**, **`ClientResultsSection.tsx`**, **`SkoolCommunitySection.tsx`**, **`ReviewsCarousel.tsx`**.

---

## Appendix — dependencies & `npm audit`

This project pins **`postcss`** via **`package.json` → `overrides`** so transitive packages use a patched PostCSS (addresses advisory **GHSA-qx2v-qp2m-jg93** — stringify edge cases with `</style>` in **untrusted** CSS pipelines; low practical risk for first-party marketing CSS, but good hygiene).

After **`npm install`**, **`npm audit`** should report clean.

**Do not run `npm audit fix --force`** — it can suggest incompatible major downgrades of Next.js. Upgrade **`next`** and **`eslint-config-next`** together deliberately when you choose to bump versions.
