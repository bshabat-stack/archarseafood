# Archar Seafood — Website

Production single-page site for Archar Seafood, a retail seafood market at 725 Hamilton St, Somerset, NJ. No build step — plain HTML/CSS/JS, deployable to any static host (GitHub Pages, Netlify, etc.).

## Structure

```
index.html        Production single-page site
css/styles.css    Design System v1.0 styles
js/main.js        Mobile nav toggle + form fallback
images/           Photos (currently review-sourced placeholders) + logo
prototype/        Original single-page prototype kept for reference
```

Reference documents: [website-plan.md](website-plan.md) · [archar-seafood-design-tokens.md](archar-seafood-design-tokens.md) · [archar-seafood-business-profile.md](archar-seafood-business-profile.md)

## Pre-launch checklist (blocking items from the owner interview)

- [ ] Confirm founding year (~1983). Copy currently says "over 40 years" to avoid overclaiming; switch to "since 1983" once confirmed.
- [ ] Confirm Fri–Sat closing time (5pm vs 6pm — sources conflict; site currently shows 5pm). Update the hours table **and** the JSON-LD `openingHoursSpecification` in `index.html` together.
- [ ] Owner interview: story behind the name "Archar", Michael's full name + photo permission, sustainability sourcing specifics.
- [ ] Replace review-sourced placeholder photos in `images/` with original photography (storefront, counter, crab bushels).
- [ ] Purchase domain (check archarseafood.com), then in `index.html` uncomment the `og:url` / `og:image` / `canonical` block and fill in the domain.
- [ ] Wire the inquiry form to a backend (e.g., Formspree/Netlify Forms) once the shop's email is confirmed, then remove the form-fallback handler in `js/main.js`.
- [ ] Link up Google Business Profile.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static server.
