# CLAUDE.md

Guidance for Claude Code (and humans) working in this repo.

## Project

Webshop + marketing site for **Gröna Linjen Bryggeri** (small Swedish brewery).
Built with **SolidStart 2** (SolidJS + Vite 8 + Nitro), **Tailwind CSS v4**,
and **Stripe** as the single source of truth for products, variants (sizes),
and prices. Deployed on Vercel (analytics + speed insights are injected in
prod).

## Git workflow (important)

- The shop feature lives on the **`shop`** branch until it is merged to `main`.
- **Always create new branches from `shop`**, and **open PRs against `shop`** —
  not `main` — until the shop feature is merged.
- `main` is the live site. Do not push shop work directly to `main`.
- Note: `shop` history gets rebased occasionally — fetch and reset rather
  than merge when your local copy diverges.

## Commands

- `npm run dev` — dev server on port 2337
- `npm run build` — production build
- `npm run preview` — serve production build
- `npm run check` — prettier check + `tsc --noEmit` (both currently pass)
- `npm run format` — prettier write
- Node >= 24 per `engines` (build verified working on 22 as well). No test
  suite; prettier + tsc via `npm run check`.

## Environment variables

Declared in `env.d.ts`:

- `STRIPE_SECRET_KEY` — used in `src/api/stripe.ts` (server functions).
  Not needed at build time anymore (the new Vite/Nitro build doesn't execute
  the Stripe module), only at runtime.
- `STRIPE_PUB_KEY` — declared but **not used yet** (only needed if checkout
  is built with client-side Stripe.js; hosted Stripe Checkout doesn't need it)
- `STRIPE_BASE_URL` — declared but **not used yet**

## Architecture notes

- Config lives in `vite.config.ts` (`solidStart()` + `nitro()` plugins);
  the old `app.config.ts`/vinxi setup is gone.
- File-based routes in `src/routes/`. Shop routes: `/shop/products`,
  `/shop/products/[id]`, `/shop/cart`.
- Server functions (`"use server"` + `query`) in `src/api/stripe.ts`:
  `getProducts`, `getProduct`, `getPrices`, `createPaymentIntent`.
- Product variants (t-shirt sizes etc.) are modeled as multiple Stripe
  **prices** on one product; the variant label comes from the price
  `nickname`, and sort order from `lookup_key` (`xs`–`xxl`). Keep this
  convention when adding products in the Stripe dashboard.
- Cart state: `src/store/cart.ts` — signal persisted to `localStorage`
  (stores `priceId` + `quantity` only; details re-fetched from Stripe).
- `redirectProd()` in `src/api/stripe.ts` redirects all shop data queries to
  `/` when `NODE_ENV !== "development"` — i.e. **the shop is intentionally
  gated off in production** while under development.

---

# Shop go-live audit (updated 2026-09-01, branch `shop`)

First audited 2026-07-18; re-audited after the SolidStart 2 / Vite 8 / Nitro
migration and dependency upgrades landed on `shop`.

## What is DONE ✅

- **Platform migration** (new since last audit): vinxi → SolidStart 2 with
  Vite 8 + Nitro, all deps upgraded (Stripe SDK v22, `@solidjs/router` v1,
  Tailwind 4.3, TypeScript 7). `npm run check` (prettier + tsc) passes
  clean, and the production build succeeds.
- **Branch hygiene** (new): `shop` is now rebased on top of `main` — the
  restaurant-list update is included, so a future `shop` → `main` merge
  won't drop it.
- **Product page hardening** (new): preload guards on `params.id`, and
  `useParams` is typed.
- **Product listing** (`/shop/products`): grid of Stripe products with image,
  name, and default price. Preloading wired up.
- **Product detail page** (`/shop/products/[id]`): image, description,
  size/variant selector (sorted xs→xxl), dynamic price tag, add-to-cart with
  the button disabled until a size is picked (auto-selects when only one
  price exists).
- **Cart store**: add/remove/quantity, persisted in `localStorage`, total
  item count.
- **Cart page** (`/shop/cart`): line items with image/name/variant, quantity
  +/- controls, per-item price, and order total.
- **Header/nav**: SHOP link in the logo lockup, cart button with quantity
  badge shown on shop routes.
- **Server-side price integrity**: `createPaymentIntent` recalculates the
  amount from Stripe prices on the server (client can't tamper with totals),
  validates quantities, and rejects mixed currencies. Good foundation.

## What is NOT done — the wall between you and go-live 🛑

**There is still no checkout.** The recent push modernized the toolchain but
did not touch the shop flow: `createPaymentIntent` exists on the server but
nothing ever calls it, `@stripe/stripe-js` is in `package.json` but never
imported, and the cart page has no checkout button.

Beyond that, even if a payment succeeded today:

- The PaymentIntent carries **no metadata about what was bought** and no
  shipping address — you'd get money with no way to know what to ship where.
- There's no order confirmation / success page, no failure handling, and no
  webhook or email, so neither you nor the customer gets notified.

### 💡 Recommendation

Instead of building a custom payment form (Payment Element + address form +
receipts + a success page), consider **Stripe Checkout (hosted)**: replace
`createPaymentIntent` with a `checkout.sessions.create` call using the cart's
`priceId`/`quantity` pairs as `line_items`, and redirect. Stripe then handles
the payment UI, shipping address collection, shipping rates, receipt emails,
and moms/VAT for you — it's the shortest path to go-live by far, and orders
become visible in the Stripe dashboard with full line items. `STRIPE_PUB_KEY`
isn't even needed for that flow.

## Go-live checklist

### Checkout (the main missing piece)

- [ ] Add a checkout button + flow from the cart page. Either:
  - [ ] **Option A (recommended):** Stripe Checkout — server fn creates a
        Checkout Session from cart items (`line_items`, `shipping_address_collection`,
        `shipping_options`, `success_url`, `cancel_url`) and redirects, **or**
  - [ ] **Option B:** custom flow — call `createPaymentIntent`, render Stripe
        Payment Element (`@stripe/stripe-js`), build your own address form,
        and attach cart contents as metadata to the PaymentIntent
- [ ] Success/thank-you page (and clear the cart on success)
- [ ] Cancel/failure handling back to the cart
- [ ] Shipping: decide rates and configure them (Checkout `shipping_options`
      or Stripe dashboard shipping rates)
- [ ] Order notification for fulfillment: Stripe dashboard email
      notifications at minimum, or a `checkout.session.completed` webhook

### Un-gate production

- [ ] Remove `redirectProd()` from `src/api/stripe.ts` (currently hides the
      shop in prod)
- [ ] Verify `STRIPE_SECRET_KEY` in Vercel is the **live** key, and products/
      prices exist in live mode (test mode data doesn't carry over)
- [ ] Do one real end-to-end test purchase in test mode first

### Verify the new build setup (post-migration)

- [ ] **Prerender of `/` appears broken**: `vite.config.ts` sets
      `nitro.prerender.routes: ["/"]` but `npm run build` produces no
      `index.html` in `.output/public` (the old vinxi build did prerender).
      Verify the home page still renders/deploys correctly on Vercel, or fix
      the prerender config for the new Nitro version
- [ ] `engines` requires Node >= 24 — make sure Vercel's Node version
      setting matches
- [ ] Deploy the migrated branch to a Vercel preview and smoke-test the
      whole site (home, restaurants, events, shop routes in dev mode)

### Branch hygiene

- [x] ~~Merge `main` into `shop`~~ — done; `shop` is now rebased on `main`
- [ ] When everything above is done: PR `shop` → `main`

### Polish / smaller fixes

- [ ] Empty-cart state on `/shop/cart` (currently a bare heading and a blank
      total) with a link back to `/shop/products`
- [ ] Cart page data fetch: `createResource` in `(cart).tsx` uses the
      fetcher-only form, so it does **not** refetch when the cart hydrates
      from `localStorage` — verify items actually appear on a hard refresh
      of `/shop/cart`; use the `createResource(source, fetcher)` form keyed
      on the price ids if not
- [ ] `src/store/cart.ts` calls `onMount`/`createEffect` at module scope
      (outside a component root) — works but logs Solid warnings; move the
      localStorage sync into a `createRoot` or the app root
- [ ] Product page: `priceToDisplayPrice(selected || defaultPrice!)` will
      crash if a product's `default_price` isn't in its price list — guard it
- [ ] Products page heading is "Prima merch" and cart heading is "Kassen" —
      confirm the copy is intentional
- [ ] Page titles/meta for shop pages (nothing sets `<title>` per route)

### Legal/compliance (Swedish e-commerce, consumer sales)

- [ ] Köpvillkor (terms of purchase) incl. 14-day ångerrätt/returns (EU
      distance-selling rules)
- [ ] Privacy policy (GDPR) — customer data lives in Stripe
- [ ] Company details (org.nr, contact) visible, e.g. in the footer
- [ ] Prices shown incl. moms, and VAT configured correctly in Stripe
- [ ] If you ever sell beer (not just merch) online, Swedish alcohol law
      applies — current products are merch, so this is N/A for now
