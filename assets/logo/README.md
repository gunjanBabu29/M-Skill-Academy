# Logo & Favicon

The header, footer, and browser tab all read the logo/favicon path from
`js/config.js` (`INSTITUTE.logo` and `INSTITUTE.favicon`), so dropping a
real file in here is all that's needed — no HTML or CSS changes required.

## Expected files
- `assets/logo/logo.png` — the main logo image, shown in the header's
  brand mark (currently a 40×40px colored square). A roughly square
  image works best since it's displayed at a small, fixed size.
- `assets/logo/favicon.png` — shown in the browser tab.

## What happens if a file is missing
Until a real `logo.png` exists here, the header quietly falls back to
the existing text-mark logo (the colored initials, e.g. "NX") — nothing
breaks. Once you add a real file at this path, it will automatically
replace the text mark everywhere the logo appears, because the `<img>`
tag and its fallback are wired up in `js/components.js`.

If you want to change just the initials shown in the text-mark fallback
(without adding a real logo image yet), edit `logoInitials` in
`js/config.js`.
