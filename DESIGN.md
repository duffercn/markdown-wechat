---
product: markdown-wechat
design_goal: Premium Markdown-to-WeChat longform publishing
last_reviewed: 2026-05-26
---

# Design Direction

This product should feel like a careful editorial tool, not a generic WeChat
template picker. The benchmark is world-class longform publishing and mature
design systems adapted to the constraints of WeChat rich-text paste.

## Reference Set

- BBC GEL Typography: accessible longform readability, resilient type sizing.
  https://bbc.github.io/gel/foundations/typography/
- Adobe Spectrum: disciplined typography, neutral surfaces, creative-tool polish.
  https://spectrum.adobe.com/page/typography/
- Shopify Polaris: purposeful color, restrained UI, semantic use of emphasis.
  https://polaris.shopify.com/design/colors
- Typewolf: real-world type pairing and editorial web typography.
  https://www.typewolf.com/
- Fonts In Use: proven typography in brands, publications, and cultural projects.
  https://fontsinuse.com/
- Awwwards Editorial Layout: contemporary editorial rhythm and hierarchy.
  https://www.awwwards.com/inspiration/editorial-layout
- Quaily Markdown to WeChat: restrained default WeChat article formatting,
  centered section titles, compact neutral quotes, and a phone-like preview.
  https://quaily.com/tools/markdown-to-wx/
- 135 Editor and iPaiban: local WeChat conventions and paste constraints.
  https://www.135editor.com/yangshi/weixin.html
  https://www.ipaiban.com/blog

## Taste Rules

- Ship fewer templates and make each one clearly opinionated.
- Avoid cheap WeChat template signals: loud gradients, decorative frames, busy
  badges, excessive rounded cards, stickers, and ornate dividers.
- Typography leads the design. Color supports tone and hierarchy; it should not
  compensate for weak layout.
- Each template uses one accent family plus neutrals. No rainbow palettes.
- Body text must remain the hero. Headings, quotes, tables, code, and captions
  should create rhythm without exhausting the reader.
- Templates must work with system font fallbacks. Do not rely on remote web fonts
  for copied WeChat output.
- Inline styles are intentional because WeChat paste fidelity matters.

## Template Set

### Editorial Journal

For essays, interviews, narrative writing, and reflective pieces. Serif-first,
generous spacing, centered title, calm brown-black neutrals, delicate rules.

### Clean Standard

For practical posts, tutorials, notes, and general publishing. Inspired by
Quaily's quiet WeChat formatter: neutral ink, 16px body text, centered section
titles, gray left-rule quotes, warm inline code, and low decoration.

### Quiet Gallery

For culture, books, art, travel, and refined lifestyle writing. Minimal and
poised, with gallery-like whitespace, near-black typography, muted red accent,
and careful image captions.

## Implementation Constraints

- The copied article HTML should stay simple: semantic elements with inline
  styles, no external stylesheet dependency.
- Template differences should be visible in h1, h2, lead paragraph, blockquote,
  code block, table, image, caption, link, and divider treatment.
- The app UI may use CSS classes, but article templates must survive clipboard
  paste independently.
- Keep mobile preview around WeChat reading width, approximately 390px.
