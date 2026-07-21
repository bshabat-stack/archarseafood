# Archar Seafood — Website

Production single-page site for Archar Seafood, a retail seafood market at 725 Hamilton St, Somerset, NJ. No build step — plain HTML/CSS/JS, deployable to any static host (GitHub Pages, Netlify, etc.).

## Structure

```
index.html          Production single-page site
css/styles.css      Design System v1.0 styles
js/main.js          Mobile nav toggle + inquiry form → Google Sheets
apps-script/        Code.gs webhook that lives in the leads Google Sheet
images/             Photos (currently review-sourced placeholders) + logo
prototype/          Original single-page prototype kept for reference
```

## Lead collection (Google Sheets)

Inquiry-form submissions append rows to the [leads sheet](https://docs.google.com/spreadsheets/d/1cDWXx4eMPdy2XhmNsEOuV0PsJfftmUufEkQotkI-XWs/edit) via an Apps Script web app — same pattern as SimplyCity, minus the serverless proxy (this site is fully static, so the form posts to the webhook directly; a honeypot field filters bots on both ends).

One-time activation:

1. Open the sheet → **Extensions → Apps Script**, paste in `apps-script/Code.gs`, save.
2. **Deploy → New deployment → Web app**, Execute as **Me**, Who has access: **Anyone** → authorize → copy the `/exec` URL.
3. Paste that URL into `SHEETS_WEBHOOK_URL` at the top of `js/main.js` and push.

Until step 3 the form shows a "call us" fallback on submit. `ensureHeader` writes — and repairs — the header row on every submission, so the columns always match the data even if the sheet was pre-seeded with a different schema. Columns: Timestamp, Name, Phone, Interested in, Message, Source (`?source=…` from shared links, else "direct").

To push a code change to an already-deployed script, edit `Code.gs` in the Apps Script editor, then **Deploy → Manage deployments → (pencil) Edit → Version: New version → Deploy** — this keeps the same `/exec` URL. Creating a *new* deployment would mint a new URL and require updating `js/main.js` again.

Reference documents: [website-plan.md](website-plan.md) · [archar-seafood-design-tokens.md](archar-seafood-design-tokens.md) · [archar-seafood-business-profile.md](archar-seafood-business-profile.md)

## Pre-launch checklist (blocking items from the owner interview)

- [ ] Confirm founding year (~1983). Copy currently says "over 40 years" to avoid overclaiming; switch to "since 1983" once confirmed.
- [ ] Confirm Fri–Sat closing time (5pm vs 6pm — sources conflict; site currently shows 5pm). Update the hours table **and** the JSON-LD `openingHoursSpecification` in `index.html` together.
- [ ] Owner interview: story behind the name "Archar", Michael's full name + photo permission, sustainability sourcing specifics.
- [ ] Replace review-sourced placeholder photos in `images/` with original photography (storefront, counter, crab bushels).
- [ ] Purchase domain (check archarseafood.com), then in `index.html` uncomment the `og:url` / `og:image` / `canonical` block and fill in the domain.
- [x] Activate lead collection: `apps-script/Code.gs` deployed as a web app; `SHEETS_WEBHOOK_URL` set in `js/main.js` and verified end-to-end (see "Lead collection" above).
- [ ] Link up Google Business Profile.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static server.
