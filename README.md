# Sugar & Scoop — Ice Cream & Dessert Parlour HTML Template

A premium, colourful, responsive, static HTML template for ice cream & dessert parlours, sweet shops, cafés and dessert catering businesses.

**Brand:** Sugar & Scoop · **Tech:** HTML5 + CSS3 + Bootstrap 5 + Vanilla JavaScript (no jQuery) · **Backend:** none required · **Dashboard:** none (frontend template only)

## Pages (20)

| Page | File | Purpose |
| --- | --- | --- |
| Home Classic | `index.html` | Hero, bestsellers, categories, why choose us, reviews, gallery, newsletter |
| Home Vibrant | `home-2.html` | Alternative editorial homepage |
| About Us | `about.html` | Story, mission, vision, values, team, stats |
| Full Menu | `menu.html` | All products with working filter + search |
| Ice Cream | `ice-cream.html` | Classic, Premium, Fruit, Chocolate, Signature |
| Sundaes | `sundaes.html` | Classic, Chocolate, Fruit, Premium sundaes |
| Waffles | `waffles.html` | Belgian, Chocolate, Fruit, Ice Cream, Signature |
| Crepes | `crepes.html` | Chocolate, Nutella-style, Fruit, Ice Cream, Signature |
| Milkshakes | `milkshakes.html` | Chocolate, Strawberry, Vanilla, Oreo-style, Mango, Premium |
| Product Details | `product-details.html` | Reusable single-product layout (gallery, ingredients, allergens, sizes) |
| Seasonal Specials | `seasonal-specials.html` | Limited-time flavours, promo banners, countdown |
| Bulk Orders | `bulk-orders.html` | Party/wedding/corporate packages + quote form |
| Blog | `blog.html` | Featured article, cards, search, category filter, pagination |
| Blog Details | `blog-details.html` | Article page with sharing, related posts, prev/next |
| Pricing | `pricing.html` | Event & party package cards |
| Contact / Find Us | `contact.html` | Map, hours, facilities, FAQ, validated contact form |
| 404 | `404.html` | Dessert-themed error page |
| Coming Soon | `coming-soon.html` | Maintenance page with working countdown + newsletter |

## Quick Start

Open `index.html` in a browser, or serve the folder:

```bash
# any static server, e.g.
npx serve .
```

No build step, no dependencies to install. All assets are local.

## Folder Structure

```text
sugar-scoop/
├── index.html
├── home-2.html
├── about.html
├── menu.html
├── ice-cream.html
├── sundaes.html
├── waffles.html
├── crepes.html
├── milkshakes.html
├── product-details.html
├── seasonal-specials.html
├── bulk-orders.html
├── blog.html
├── blog-details.html
├── contact.html
├── pricing.html
├── 404.html
├── coming-soon.html
├── assets/
│   ├── css/      # style.css + Bootstrap 5 (+ bootstrap.rtl.min.css for RTL)
│   ├── js/       # main.js (vanilla ES6)
│   ├── images/   # organised by category
│   ├── fonts/    # self-hosted Google Fonts
│   └── icons/
└── documentation/
    └── index.html   # full developer guide + PAGE-SPEC.md
```

## Key Features

- **Working interactions** — product filters, live search, blog filter/search, cart drawer (localStorage), quantity steppers, countdown timers, FAQ accordion, back-to-top, theme toggle.
- **Dark / Light mode** — persisted in `localStorage`, every page themed via CSS variables on `data-bs-theme`.
- **RTL ready** — swap to `bootstrap.rtl.min.css` and add `dir="rtl"` (see `documentation/index.html` → RTL Support).
- **SEO** — unique titles, meta descriptions, Open Graph + Twitter cards, canonical URL placeholders, semantic headings.
- **Accessibility** — semantic HTML5, labelled forms, visible `:focus-visible` rings, ARIA where needed, WCAG-conscious contrast.
- **Responsive** — mobile-first; tested 320px → 1920px; offcanvas mobile menu.

## Editing Images

Images live in `assets/images/` grouped by category (`ice-cream/`, `sundaes/`, `waffles/`, `crepes/`, `milkshakes/`, `bakes/`, `blog/`, `events/`, `general/`, `team/`, `hero/`). Keep the filename to avoid editing markup, or update the `src` / inline `background-image`.

## Credits

- **Bootstrap 5** — https://getbootstrap.com (MIT)
- **Bootstrap Icons** — https://icons.getbootstrap.com (MIT)
- **Google Fonts** — Baloo 2 & Nunito Sans (OFL)
- Demo photographs from free stock sources; replace with your own for production.

## License

Use this template for personal and commercial projects. Please replace demo content, photographs and placeholder business details before shipping.
