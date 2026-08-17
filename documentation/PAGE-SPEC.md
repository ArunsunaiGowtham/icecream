# Sugar & Scoop — Template Build Spec

Premium Ice Cream & Dessert Parlour HTML template. Brand: **"Sugar & Scoop"**.
Project root: `C:\Users\aruns\OneDrive\Documents\Default Project\icecream-parlour\`

Reference page: `index.html` — ALWAYS read it first and copy its shared markup verbatim.

## Golden rules

1. **Local assets ONLY.** Allowed references:
   - `assets/fonts/fonts.css`, `assets/css/bootstrap.min.css`, `assets/css/bootstrap-icons.min.css`, `assets/css/style.css`
   - `assets/js/bootstrap.bundle.min.js`, `assets/js/main.js`
   - `assets/images/...` and `assets/images/favicon.svg`
   - NO external URLs, NO CDN links, NO Google Fonts `<link>`, NO remote images, NO `data:` images except inline SVG icons already used.
2. **NO dead links.** Every `href` must point to a real page from the Page list below. `href="#"` is allowed ONLY for: footer social icons, elements with `data-bs-toggle`/`data-search-open`/`data-bs-dismiss` attributes. Never link a nav/footer/menu item to `#`.
3. **Copy the shared shell from index.html** for every page:
   - `<head>`: same links; update `<title>` and `<meta name="description">` per page.
   - `<header class="site-header">`: identical structure; update the `.active` nav states (see Header active states).
   - Mobile offcanvas `#mobileMenu`, cart drawer `#cartDrawer`, search overlay `.search-overlay`, privacy/terms modals `#privacyModal`/`#termsModal`, `.toast-container`, `.back-to-top`, footer + newsletter CTA section (`id="newsletter"`): **verbatim copies**.
   - Only the `<main>` body content between the header and the newsletter section changes per page. Keep the newsletter CTA + footer on every page.
4. **HTML quality:** UTF-8, lowercase tags/attributes, double-quoted attributes, 2-space indentation, valid HTML5 + Bootstrap 5.3 classes, semantic sections with `id` attributes, `alt` text on every image, `loading="lazy"` on all below-the-fold images, `aria-label` on icon-only buttons.
5. Use the `.reveal` / `.reveal-delay-1|2|3` classes for scroll animations on cards/sections. Use design tokens (`var(--si-*)`) or Bootstrap utilities for colors so dark mode works.
6. Every page ends with exactly:
   ```html
     <script src="assets/js/bootstrap.bundle.min.js"></script>
     <script src="assets/js/main.js"></script>
   </body>
   </html>
   ```
7. Section comments only as separators, e.g. `<!-- ================= Page header ================= -->`.
8. Do NOT modify any file outside your assigned pages, and do not touch `index.html`, `assets/**`, or other agents' pages.

## Page list (canonical filenames — use EXACTLY)

`index.html`, `home-2.html`, `about.html`, `menu.html`, `ice-cream.html`, `sundaes.html`, `waffles.html`, `crepes.html`, `milkshakes.html`, `product-details.html`, `seasonal-specials.html`, `bulk-orders.html`, `blog.html`, `blog-details.html`, `contact.html`, `pricing.html`, `login.html`, `register.html`, `404.html`, `coming-soon.html`, `documentation/index.html`

## Design system (defined in assets/css/style.css — read it before building)

- **Palette:** pink `#ff5d8f`, peach `#ffa14f`, purple `#9b5cf6`, mint `#2ec4b6`, yellow `#ffc94d`. Light bg `#fff7f2`, surface `#fff`. Dark bg `#171022`, surface `#221a30`.
- **Fonts:** display "Baloo 2" (`h1`-`h6`, `.font-display`), body "Nunito Sans".
- **Key components/classes:**
  - Sections/headings: `.si-section`, `.si-section-head`, `.si-eyebrow`, `.si-divider`, `.si-text-gradient`
  - Buttons: `.btn-grad`, `.btn-grad-soft`, `.btn-outline-scoop`, `.btn-outline-soft`, `.btn-mint`, `.btn-purple`
  - Cards: `.feature-card`, `.icon-bubble` (+ `.icon-bubble-purple`, `.icon-bubble-mint`), `.product-card` (with `.product-media`, `.product-badge` + variants `.badge-mint`/`.badge-purple`/`.badge-soft`, `.product-actions`, `.product-action-btn`, `.product-body`, `.product-title`, `.stars`, `.product-desc`, `.product-price`), `.step-card`/`.step-num`, `.testimonial-card`, `.blog-card` (`.blog-media`, `.blog-cat`, `.blog-body`, `.blog-meta`), `.deal-card` (`.deal-bg`, `.deal-body`), `.team-card` (`.team-photo`, `.team-social`, `.team-body`, `.team-role`)
  - Highlights: `.cta-banner`, `.page-header` (+ Bootstrap `.breadcrumb`), `.si-card`, `.info-list`, `.price-list-item`, `.stat-card`/`.stat-num`, `.countdown-box`/`.countdown-item`, `.filter-pills`/`.filter-pill`, `.qty-stepper`, `.gallery-item`, `.si-shadow`/`.si-shadow-sm`, `.rounded-4`/`.rounded-5`
- **Header active states:**
  - `index.html` / `home-2.html`: Home dropdown → `nav-link active dropdown-toggle` + matching `dropdown-item active`.
  - `about.html`: About nav-link gets `active`.
  - `menu.html`, `ice-cream.html`, `sundaes.html`, `waffles.html`, `crepes.html`, `milkshakes.html`, `product-details.html`, `seasonal-specials.html`: Menu dropdown → `nav-link active dropdown-toggle` + the matching `dropdown-item active`.
  - `blog.html`, `blog-details.html`: Blog dropdown → `nav-link active dropdown-toggle` + matching item active.
  - `contact.html`: Contact nav-link gets `active`.
  - `login.html`, `register.html`, `pricing.html`, `bulk-orders.html`, `404.html`, `coming-soon.html`: no nav item active (remove `active` from the Home dropdown-toggle; dropdown items keep no active).

## JS hooks available (from main.js — wire them in)

- Search overlay: `data-search-open`, `data-search-close`.
- Theme toggle: `data-theme-switch`.
- Cart drawer: `data-bs-toggle="offcanvas" data-bs-target="#cartDrawer"`; badge `data-cart-count`; drawer body `data-cart-items`, `data-cart-empty`, `data-cart-total`.
- Add to cart button: attributes `data-add-to-cart` + `data-product-id`, `data-product-name`, `data-product-price`, `data-product-img` (on the button or an ancestor `[data-product]`).
- Wishlist: `data-wishlist` (heart toggle).
- Form validation: `data-validate` on `<form>`, `required` on fields, `data-success-message` on form. Adds `.is-invalid` automatically.
- Countdown: `data-countdown="2026-09-30T23:59:59"` on a container containing `.countdown-item` with `.num.cd-days`, `.cd-hours`, `.cd-mins`, `.cd-secs`.
- Quantity stepper: `.qty-stepper` containing `.qty-dec`, `.qty-inc`, `<input type="text">`.
- Filter pills: `data-filter="all|ice-cream|sundaes|waffles|crepes|milkshakes|bakes"` and cards with `data-category="..."` (space separated values).
- Blog filter: `data-blog-filter="all|recipe|news|guide|events"` and cards `data-blog-category="..."`.
- Live search: `<input data-menu-search>` filters `[data-searchable]` cards.
- Counters: `.stat-num` with `data-target`, optional `data-prefix`, `data-suffix`, `data-decimals`.
- Scroll reveal: `.reveal` (+ `.reveal-delay-*`).

## Image map (use ONLY these paths)

### hero/ (full-width page hero images)
- `assets/images/hero/hero-1.jpg` (lava cake + ice cream)
- `assets/images/hero/hero-2.jpg` (sundae in glass)
- `assets/images/hero/hero-3.jpg` (sprinkle cone)
- `assets/images/hero/hero-4.jpg` (chocolate shake w/ sprinkles)
- `assets/images/hero/hero-5.jpg` (strawberry cones)

### ice-cream/
- `cone-sprinkle.jpg` (rainbow sprinkle cone), `cone-strawberry.jpg` (two strawberry cones), `cone-choco.jpg` (chocolate dipped), `cone-straw-single.jpg`, `scoop-vanilla.jpg`, `scoop-duo.jpg`, `pop-flatlay.jpg`, `pop-strawberry.jpg`, `pop-choco.jpg`, `pop-pink.jpg`

### sundaes/
- `sundae-choco.jpg`, `sundae-brownie.jpg`, `sundae-pink.jpg`, `sundae-strawberry.jpg`, `sundae-glass.jpg`, `sundae-berries.jpg`

### waffles/
- `waffle-strawberry.jpg`, `waffle-plate.jpg`, `waffle-square.jpg`, `waffle-ceramic.jpg`, `waffle-icecream.jpg`, `waffle-syrup.jpg`, `waffle-top.jpg`, `waffle-belgian.jpg`, `waffle-banana.jpg`

### crepes/
- `crepe-icecream.jpg`, `crepe-sauce.jpg`, `crepe-classic.jpg`

### milkshakes/
- `shake-strawberry.jpg`, `shake-choco-sprinkles.jpg`, `shake-straw-whip.jpg`, `shake-duo.jpg`, `shake-caramel.jpg`, `shake-choco.jpg`

### bakes/
- `cake-chocolate.jpg`, `cake-berries.jpg`, `cake-birthday.jpg`, `donut-glazed.jpg`, `donuts-box.jpg`, `cookies.jpg`, `chocolate-bar.jpg`, `choco-strawberries.jpg`

### blog/
- `blog-truffle.jpg`, `blog-donut.jpg`, `blog-cookies.jpg`, `blog-cake.jpg`, `blog-chocostraw.jpg`, `blog-pancakes.jpg`

### events/
- `event-birthday.jpg`, `event-chocolate.jpg`, `event-lava.jpg`, `event-waffle.jpg`

### general/
- `interior-1.jpg`, `interior-2.jpg`, `interior-3.jpg`, `interior-4.jpg`, `story-waffles.jpg`, `story-brunch.jpg`, `story-shake.jpg`

### team/
- `team-1.jpg`..`team-6.jpg`

## Business details (use consistently on all pages)
- Address: 123 Dessert Lane, 5th Avenue, New York, NY 10001
- Phone: +1 (555) 234-8765
- Email: hello@sugarandscoop.com
- Hours: Mon–Fri 10am–10pm, Sat–Sun 9am–11pm
- Social: Facebook, Instagram, Twitter/X, YouTube (footer `#` links)
- Prices in USD. Delivery free over $25.

## Per-page briefs

### home-2.html — Home: Vibrant
- Page hero: `hero-3.jpg` full-width. Use a split layout: left text (eyebrow `si-eyebrow`, big `hero-title`-style heading inside `.page-header` style but brighter) — simpler: reuse `.hero` slider pattern but with `hero-3.jpg` and `hero-5.jpg` slides and brighter overlay `rgba(255,93,143,.2)`. Content: badge "Summer is here", heading, CTAs to `menu.html` + `seasonal-specials.html`, small stats row.
- Sections (in order):
  1. Marquee (copy the `.marquee` block from index.html).
  2. "Taste the rainbow" — 6 category pills linking to category pages (`.filter-pills` as links) + 6 `deal-card` images (use one image per category from the Image map).
  3. "Flavour of the month" — `cta-banner` with countdown to `2026-09-30T23:59:59` + image `sundaes/sundae-pink.jpg`, link to `seasonal-specials.html`.
  4. Product grid "Trending now" — 8 `product-card`s (mix ice-cream, sundaes, waffles, milkshakes images). Every card: `data-product`, `data-add-to-cart` button, wishlist, price, stars, Details link to `product-details.html`. Add `data-category` and `data-paginate`? No — keep simple, no pagination here.
  5. Steps "How to order" — 3 `step-card`s (Pick your treat, Customize toppings, We deliver chilled).
  6. Testimonials — reuse 3 `.testimonial-card`s with team avatars.
  7. Newsletter + footer (from shared shell).

### about.html — About Us
- `.page-header` (gradient, title "About Sugar & Scoop", breadcrumb Home / About).
- Sections:
  1. "Our story" — split image (`general/story-waffles.jpg` + small `general/interior-1.jpg`) + text with stats row (`.stat-num` data-target 12 → suffix "k+", 25 → " flavours", 4.9 decimals 1, 2012 → " est."). Include story paragraphs.
  2. "Why people love us" — 4 `.feature-card`s.
  3. "Meet the team" — 6 `.team-card`s using `team-1..6.jpg` with names/roles + social icons. Names: Ava Martinez (Head Chocolatier), Daniel Reyes (Head of Waffles), Sofia Chen (Gelato Artist), Marcus Johnson (Store Manager), Priya Nair (Events & Bulk), Elena Petrova (Milkshake Mixologist).
  4. "Our values" — 3 `.step-card`s or icon list.
  5. Gallery strip — 4-6 `.gallery-item` images (mix from categories).
  6. CTA banner linking to `contact.html`.
  7. Newsletter + footer.

### menu.html — Full Menu
- `.page-header` (title "Our Full Menu", breadcrumb Home / Menu).
- Top: search input `.form-control` with `data-menu-search` + filter pills with `data-filter` (All, Ice Cream, Sundaes, Waffles, Crepes, Milkshakes, Bakes). Cards carry `data-category` and `data-searchable` (name + description text).
- Grid: **12 product cards** with pagination: wrap cards in `#menuGrid` (row), each card inside `.col-md-6.col-lg-4`; card `data-paginate`; pagination wrap `<div class="si-pagination d-flex justify-content-center mt-4" data-target="#menuGrid" data-page-size="6">`. Use all categories: 3 ice-cream, 2 sundaes, 2 waffles, 1 crepe, 2 milkshakes, 2 bakes. Each card = `.product-card` with data-product attributes, wishlist + add-to-cart buttons, price, Details → `product-details.html`.
- Below: "Signature combos" — 3 `deal-card`s (2 for 1 etc.) linking to `bulk-orders.html` and `seasonal-specials.html`.

### ice-cream.html — Ice Cream
- `.page-header` (title "Ice Cream", breadcrumb Home / Menu / Ice Cream).
- Filter pills `data-filter` (All, Classic, Fruit, Chocolate, Vegan) with cards `data-category="ice-cream classic"` etc.
- Grid: **9 product cards** (`cone-sprinkle`, `cone-strawberry`, `cone-choco`, `cone-straw-single`, `scoop-vanilla`, `scoop-duo`, `pop-strawberry`, `pop-choco`, `pop-pink`). Each `.product-card` with wishlist + add-to-cart + price + stars + Details → `product-details.html`. Use names like: Rainbow Sprinkle Cone, Strawberry Duo, Belgian Dark Dip, Strawberry Fields, Madagascar Vanilla, Double Scoop, Berry Pop, Midnight Cacao Pop, Cherry Bomb Pop. Prices $3.99–$6.50.
- Banner: "Build your own sundae" `cta-banner` → `sundaes.html`.

### sundaes.html — Sundaes
- `.page-header` (title "Sundaes", breadcrumb Home / Menu / Sundaes).
- **6 product cards** using all 6 sundaes images (`sundae-choco`, `sundae-brownie`, `sundae-pink`, `sundae-strawberry`, `sundae-glass`, `sundae-berries`). Names: Midnight Fudge, Brownie Mountain, Pink Cloud, Strawberry Dream, Classic Float, Berry Festival. $6.00–$8.50.
- Countdown `cta-banner` for "Summer Berry Sundae — half price" → `seasonal-specials.html`.

### waffles.html — Waffles
- `.page-header` (title "Waffles", breadcrumb Home / Menu / Waffles).
- **6 product cards** from waffles images (pick: `waffle-strawberry`, `waffle-icecream`, `waffle-top`, `waffle-belgian`, `waffle-banana`, `waffle-syrup`). Names: Berry Blast, Ice Cream Topper, Scoop Stack, Belgian Original, Banana Split, Maple Syrup Classic. $5.50–$9.00.
- "Waffle workshop" info strip with `events/event-waffle.jpg` + CTA to `contact.html`.

### crepes.html — Crepes
- `.page-header` (title "Crepes", breadcrumb Home / Menu / Crepes).
- **3 product cards** (`crepe-icecream`, `crepe-sauce`, `crepe-classic`). Names: Ice Cream Fold, Berry Glaze, Classic Butter & Sugar. $6.00–$8.00.
- Add "how crepes are made" steps (3 `.step-card`s).

### milkshakes.html — Milkshakes
- `.page-header` (title "Milkshakes", breadcrumb Home / Menu / Milkshakes).
- **6 product cards** (all 6 shake images). Names: Strawberry Crush, Cookie Crunch, Strawberry Whip, Double Trouble, Salted Caramel, Classic Chocolate. $5.25–$7.50.
- Split banner: image `milkshakes/shake-choco-sprinkles.jpg` + "Thick. Creamy. Ours." text + CTA to `menu.html`.

### product-details.html — Product Details
- `.page-header` (title "Product Details", breadcrumb Home / Menu / Product Details).
- Main: 2-col layout. Left: big image `ice-cream/cone-sprinkle.jpg` (rounded). Right: category label (`.si-eyebrow`), h1 name "Rainbow Sprinkle Cone", stars + reviews, price `product-price` $4.50 (del $5.50), short description, qty stepper (`.qty-stepper`), Add to Cart button (`data-add-to-cart` + product attrs, qty from stepper — set qty 1 default), wishlist button, delivery info list (`.info-list`: Same-day delivery, Free over $25, Vegan options).
- Tabs (Bootstrap nav-tabs styled): Description / Ingredients / Reviews. Description paragraphs; ingredients list; 3 review cards (team avatars).
- "You may also like" — 4 `product-card`s (other ice-cream images), Details → `product-details.html`.

### seasonal-specials.html — Seasonal Specials
- `.page-header` (title "Seasonal Specials", breadcrumb Home / Menu / Seasonal Specials).
- Hero `cta-banner` with countdown `2026-09-30T23:59:59` + image `sundaes/sundae-berries.jpg`.
- Grid of 6 "limited edition" `deal-card`/product cards: Summer Berry Sundae ($6.00 from $12.00), Salted Caramel Shake, Peach Melba Waffle, Strawberry Cheesecake Pop, Lava Cake Duo (`bakes/cake-chocolate.jpg`), Birthday Box (`bakes/cake-birthday.jpg`). Use `badge-soft` "Limited" badges, add-to-cart where product-like.
- "Coming next season" — 3 teaser cards with blur-ish images (use `milkshakes/shake-caramel.jpg`, `sundaes/sundae-choco.jpg`, `waffles/waffle-plate.jpg`).
- CTA: join newsletter (already in footer) + "Book a tasting" → `contact.html`.

### bulk-orders.html — Bulk Orders
- `.page-header` (title "Bulk Orders", breadcrumb Home / Bulk Orders).
- Split intro: image `general/story-brunch.jpg` + text (corporate events, weddings, parties).
- Quantity + price calculator: `.qty-stepper` with `<input data-bulk-qty data-rate="9.5">` and live total `data-bulk-total` (JS auto-calculates; rate $9.5 per 1L tub; 5% off ≥25, 10% off ≥50 — the JS handles discount). Show tiers in a `.si-card`.
- Flavours to choose: 6 checkboxes (Bootstrap form-check) with flavours.
- Contact form `data-validate` (name, email, phone, date, qty, message) with `data-success-message="Thanks! Our events team will email you a quote within 24 hours."`.
- Info list: lead time 48h, free delivery over $150, custom branding.

### blog.html — Blog Grid
- `.page-header` (title "Blog", breadcrumb Home / Blog).
- Filter pills `data-blog-filter` (All, Recipes, News, Guides, Events).
- **6 blog cards** (`.blog-card`, each inside `.col`): images from `blog/*`, categories `data-blog-category` on card (`recipe`, `news`, `guide`, `events`). Each: `.blog-cat` label, date, title → `blog-details.html`, excerpt, read more.
  - blog-truffle (Chocolate Truffle Ice Cream — recipe), blog-donut (Donut Sundaes Are Back — news), blog-cookies (Secrets to Chewy Cookies — guide), blog-cake (Baking the Perfect Layer Cake — recipe), blog-chocostraw (Chocolate-Covered Strawberries — recipe), blog-pancakes (Weekend Pancake Stack — recipe).
- Sidebar: skip sidebar; keep grid only with pagination `data-target` + `data-page-size="6"` on 6 items (optional: 9 items by duplicating).

### blog-details.html — Blog Details
- `.page-header` (title "Blog Details", breadcrumb Home / Blog / Blog Details).
- Article: hero image `blog/blog-truffle.jpg`, title "How We Make Our Chocolate Truffle Ice Cream", meta (author team-4, date, category), lead paragraph, 3-4 subheadings + paragraphs, a quote block, an image `bakes/chocolate-bar.jpg` inline, a list of ingredients, share buttons (social-circle).
- "Popular tags" chips: link to `blog.html`.
- Comments: 2-3 comment rows (team avatars) + comment form `data-validate` (name, email, message) → success toast.
- "More posts" — 3 `.blog-card`s → `blog-details.html`.

### contact.html — Contact Us (all Find-Us info lives here)
- `.page-header` (title "Contact Us", breadcrumb Home / Contact).
- Info cards row (4): address + phone + email + hours (`.feature-card` + `.info-list`).
- 2-col: left contact form `data-validate` (name, email, subject, message) with `data-success-message="Message sent! We reply within one business day."`; right: `.si-card` with an embedded map — use a styled static map placeholder built with CSS (gradient + grid + pin icon), NO external iframe, plus directions text (link `https://maps.google.com/?q=123+Dessert+Lane+New+York` allowed as external link).
- FAQ: Bootstrap `.accordion` (5 questions: opening hours, delivery areas, allergies, bookings, gift cards).
- CTA banner: "Planning an event?" → `bulk-orders.html`.

### pricing.html — Pricing
- `.page-header` (title "Pricing", breadcrumb Home / Pricing).
- Toggle (`.filter-pills` style) Individual / Corporate — simple: two groups.
- 3 `.si-card` pricing tiers: Scoop ($9/mo — "Perk Scooper": 1 free topping monthly, 5% off), Sundae ($19/mo — most popular, badge "Bestseller"): 2 free toppings, 10% off, free delivery over $15, Waffle ($39/mo): unlimited toppings, 15% off, priority delivery, birthday free sundae. Highlight middle with `.si-card` + border primary + "Popular".
- Corporate plans row (3 simple tiers) + CTA to `bulk-orders.html`.
- FAQ accordion (4 questions).

### login.html — Login
- `.page-header` (title "Login", breadcrumb Home / Login).
- Centered `.si-card` (max-width 460px): brand mark, heading, form `data-validate` (email, password required), remember-me check, submit "Sign In" (btn-grad w-100). Links: "New here? Create an account" → `register.html`, "Forgot password?" → `#` (open a small inline note) — use `href="#"` with data-bs-toggle modal? Simpler: link to `login.html#forgot` won't work; use a `<button type="button" class="btn btn-link">Forgot password?</button>` that toggles a `.collapse` with hint text.
- Side note: social login buttons (Google/Facebook icons) linking `#` (social placeholders).

### register.html — Register
- `.page-header` (title "Register", breadcrumb Home / Register).
- Centered `.si-card` (max-width 540px): form `data-validate` (name, email, phone optional, password, confirm password, terms checkbox required) → success message "Account created! Check your email to verify." Links: "Already have an account? Sign in" → `login.html`. Password strength hint using `.form-text`.

### 404.html — 404
- `.page-header` (title "404", breadcrumb Home / 404).
- Centered section: big `si-text-gradient` "404" (display-1 font-weight 800), "Oops! That page melted." text, illustration using `hero/hero-3.jpg` small rounded image, buttons: "Back to Home" (`index.html`) + "Browse Menu" (`menu.html`). Search box (`data-menu-search` style but plain form action menu.html).

### coming-soon.html — Coming Soon
- Full-screen gradient background (`.cta-banner`-like full height) with brand, "Something sweet is coming" heading, countdown `data-countdown="2026-10-31T23:59:59"` (`.countdown-item` layout, larger), newsletter form `data-validate` (email) → success message, social icons. No header/footer shell needed BUT keep consistent fonts/links: build standalone page with same `<head>` assets, no nav. Include links back to `index.html`.
