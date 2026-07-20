# Archar Seafood — Design System v1.0 (July 2026)

Bold, friendly neighborhood-shop aesthetic. Chunky display headlines, white cards floating over full-bleed color sections, honest unfussy components. Brand themes: freshness, sustainability, hometown feel.

Companion file: `archar-seafood-design-system.html` (rendered style guide with live components).

## Color

| Token | Hex | Role | Contrast |
|---|---|---|---|
| Archar Red | `#C8102E` | Primary CTA, accent bands, prices, highlights | white text 5.9:1 (AA) |
| Red Dark | `#A00D26` | Red hover/pressed | white text 8.1:1 |
| Red Tint | `#FBE9EC` | Badges, notices | — |
| Harbor Navy | `#16355C` | Hero sections, secondary buttons | white text 12.4:1 |
| Navy Ink | `#0E2240` | Headings, footer text, near-black | on white 15.9:1 |
| Navy Tint | `#DCE8F5` | Alternate section backgrounds | navy text 10:1 |
| Sea Salt | `#EFF3F6` | Footer, quiet backgrounds | — |
| Body Text | `#33404F` | Paragraphs | — |
| Link Blue | `#2E5FB8` | Inline links | on white 6.1:1 |
| Border | `#D4DCE4` | Card borders, dividers | — |

Rules: navy does the heavy lifting; red is the signal color — one red CTA per screen. Never red text on navy (fails contrast).

## Typography

- **Display:** Archivo, weight 800–900 (Google Fonts). Sentence case, never all-caps headlines. Letter-spacing −0.01em.
- **Body:** Hanken Grotesk 400–700 (Google Fonts).

| Style | Size / line-height |
|---|---|
| H1 | clamp(2.4rem, 5vw, 3.4rem) / 1.2 (~54px) |
| H2 | clamp(1.9rem, 4vw, 2.45rem) / 1.2 (~39px) |
| H3 | 24px / 1.2 |
| H4 | 19px / 1.2 |
| Body | 17px / 1.6 |
| Small | 14px / 1.5 |

## Spacing, shape, elevation

- Spacing scale (8px base): 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96
- Section padding 96px vertical; card padding 48px; container max-width 1160px
- Radii: cards & buttons 8px · inputs 3px · badges pill
- One shadow only: `0 2px 12px rgba(14,34,64,.10)` on floating cards; everything else flat with 1px borders

## Components

- **Buttons:** display font, 800 weight, sentence case, 14×28px padding, 8px radius. Primary = red bg/white text; secondary = navy; tertiary = ghost (navy border, fills on hover); on dark = white ghost.
- **Header:** sticky white bar, wordmark left (navy, red fish glyph accent), nav links (navy, red on hover), one red CTA right.
- **Floating card:** white, 8px radius, card shadow, max-width 640px — the signature pattern, placed over full-bleed bands.
- **Section bands (alternate down the page):** navy hero → red accent (tilted photo cards) → photo with centered card → navy-tint content band.
- **Product card:** white, 1px border, 8px radius, image top, badge (pill, red-tint or navy-tint), H4 title, small description, red display-font price.
- **Inputs:** 3px radius, 1.5px border, 12×14px padding, navy focus ring (2px outline).
- **Footer:** Sea Salt background, logo, single link row, fine print above 1px top border.

## Do / Don't

**Do:** one red CTA per screen · alternate navy/red/tint bands · sentence-case headlines · real photography (fish, boats, people, counter) · generous 96px section spacing.

**Don't:** red on navy · all-caps paragraphs · multiple shadow styles · gradients on buttons · stock-photo clichés (nets over text, anchor icons).

## Open items

- Logo hexes are assumed (no logo file in project knowledge). If actual brand hexes differ, update `#C8102E` and `#16355C` and re-check contrast.
- Photography is load-bearing in this design language — commission real shots before launch.

## CSS variables (copy-paste)

```css
:root {
  --archar-red: #C8102E;      --archar-red-dark: #A00D26;  --archar-red-tint: #FBE9EC;
  --harbor-navy: #16355C;     --navy-ink: #0E2240;         --navy-tint: #DCE8F5;
  --white: #FFFFFF;           --sea-salt: #EFF3F6;
  --color-text: #33404F;      --color-link: #2E5FB8;       --color-border: #D4DCE4;
  --font-display: 'Archivo', sans-serif;
  --font-body: 'Hanken Grotesk', sans-serif;
  --radius-card: 8px; --radius-btn: 8px; --radius-input: 3px;
  --shadow-card: 0 2px 12px rgba(14,34,64,.10);
  --container: 1160px;
}
```
