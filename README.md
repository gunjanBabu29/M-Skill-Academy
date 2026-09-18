# Nexora Skills & Career Academy — Website

A complete, responsive, production-quality frontend for a skill-development
and career-readiness institute, built with **plain HTML, CSS and vanilla
JavaScript only** — no frameworks, no backend, no database.

---

## 1. Architecture

The site is built around **one principle: change a value once, it updates
everywhere.**

- **`js/config.js`** — the single source of truth for every piece of
  institute-level branding and contact info (`INSTITUTE` object): name,
  short name, tagline, logo, favicon, website, emails, phone, WhatsApp,
  address, city/state/country, established year, certificate ID prefix,
  social links, and default SEO text. **This is the file you edit to
  rebrand the site.**
- **`js/data.js`** — the course catalogue, categories, trainers,
  testimonials, FAQ, project showcase, site stats, and the
  certificate-verification demo records.
- **`js/components.js`** — renders the shared header (incl. mobile nav),
  footer, floating WhatsApp button, back-to-top button, and the three
  shared modals (Book Free Counselling / Course Enquiry / Download
  Brochure) into every page from **one template each**, using
  `INSTITUTE` as the data source. It also runs `populateInstituteData()`,
  which fills in every `data-institute-*` element on the page — in the
  header/footer it just rendered, and anywhere else in the page body too.
- **`js/main.js`** — global UI behavior: sticky header, mobile nav toggle,
  dark mode, modals, toasts, scroll reveal, counters, testimonial slider,
  FAQ accordion, and rendering the dynamic sections (categories, featured
  programs, roadmap, methodology, why-us, career flow, trainers, projects,
  stats) from `js/data.js`.
- **`js/courses.js`** — the searchable/filterable course explorer and the
  dynamic course-details page (`?id=course-slug`).
- **`js/forms.js`** — validates and "submits" (simulated — no backend yet)
  the enquiry/admission form.
- **`js/certificate.js`** — the certificate verification demo, including
  the "try a sample ID" buttons, generated dynamically from the actual
  certificate records (so they always match whatever `certificatePrefix`
  is configured).
- **`css/style.css`** / **`css/responsive.css`** — the full design system
  and breakpoint overrides. Unchanged in this upgrade — same colors,
  fonts, spacing, cards, animations as before.

### How a page loads

Every page has two empty placeholders and a fixed script order:

```html
<body>
  <div id="site-header"></div>
  <main> ...page content... </main>
  <div id="site-footer"></div>

  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
  <script src="js/config.js"></script>       <!-- INSTITUTE object -->
  <script src="js/data.js"></script>         <!-- courses, trainers, etc. -->
  <script src="js/components.js"></script>   <!-- fills the placeholders -->
  <script src="js/main.js"></script>         <!-- global UI behavior -->
  <!-- + js/courses.js / forms.js / certificate.js where a page needs them -->
</body>
```

`components.js` runs immediately (not on a delayed event), so by the time
`main.js` looks for `.site-header`, `.mobile-nav`, or the modals, they
already exist in the DOM.

---

## 2. Folder structure

```
/index.html
/404.html
/css/style.css
/css/responsive.css
/js/config.js          ← rebrand the site here
/js/data.js             ← courses, trainers, testimonials, FAQ, etc.
/js/components.js       ← renders header/footer/modals
/js/main.js
/js/courses.js
/js/forms.js
/js/certificate.js
/pages/about.html
/pages/courses.html
/pages/course-details.html
/pages/programs.html
/pages/trainers.html
/pages/projects.html
/pages/certificates.html
/pages/verify.html
/pages/contact.html
/pages/faq.html
/pages/privacy-policy.html
/pages/terms-conditions.html
/pages/refund-policy.html
/assets/logo/            ← drop logo.png / favicon.png here (see README inside)
/assets/images/           ← drop trainer/project photos here (see README inside)
/README.md
```

---

## 3. Running it locally

Static site, no build step.

```bash
cd nexora
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly by double-clicking also works in most
browsers, but a local server is more reliable.

---

## 4. How to rebrand the site (the whole point of this upgrade)

**Open `js/config.js`.** Change any of these values, save, and the entire
site updates — no other file needs to be touched:

| Field | Where it appears |
|---|---|
| `name` | Page titles, footer copyright, certificate previews, every `[data-institute-name]` element |
| `shortName` | Header logo text, footer brand name |
| `tagline` | Footer brand tagline |
| `logo` / `favicon` | Header logo, browser tab icon (see §5) |
| `logoInitials` | The text-mark logo shown until a real `logo` image exists |
| `website` | Anywhere using `[data-institute-website-href]` |
| `email` / `admissionsEmail` / `supportEmail` | Contact page, `mailto:` links |
| `phone` | Contact page, header/footer `tel:` links |
| `whatsapp` | Floating WhatsApp button, all WhatsApp CTAs (built as `https://wa.me/...`) |
| `address` / `city` / `state` / `country` | Contact page, legal pages |
| `establishedYear` | (available; footer copyright currently uses the live current year) |
| `certificatePrefix` | Every sample certificate ID, including the "try a sample ID" buttons on the verify page |
| `grievanceOfficerName` / `grievanceOfficerDesignation` | The named privacy/grievance contact shown on all three legal pages |
| `social.*` | Footer social icons — **leave any one empty to hide that icon automatically** |
| `seo.*` | Available for future use as default SEO text |

I tested this directly: changing `name` to `"SKILLORA Career Institute"`
and `certificatePrefix` to `"SKC"` correctly updated the page title,
header, footer copyright, and certificate sample IDs across every page
checked, with zero other edits.

---

## 5. How to replace the logo

1. Save your logo as `assets/logo/logo.png` (roughly square works best).
2. Save a favicon as `assets/logo/favicon.png`.
3. That's it — `js/components.js` already points every logo `<img>` and
   the favicon `<link>` at `INSTITUTE.logo` / `INSTITUTE.favicon`.

Until you add a real file, the header quietly falls back to the existing
colored text-mark (using `logoInitials`), so nothing looks broken in the
meantime.

---

## 6. How to add/edit courses, trainers, testimonials, projects

Unchanged from before — everything lives in `js/data.js`:

- `courses` array — add a new object following the existing shape
  (id, title, category, duration, level, fee, description, prerequisites,
  skills, modules, projects, assessment, certificate). It automatically
  appears in the course explorer, featured programs (if `featured: true`),
  footer links (if referenced there), and its own detail page at
  `pages/course-details.html?id=your-new-id`.
- `trainers` — set `sample: false` for a real, verified profile; leave
  `sample: true` (and the "Sample Faculty Profile" tag shows automatically)
  for placeholder entries.
- `testimonials`, `projects`, `faqs`, `categories`, `dataScienceRoadmap`,
  `methodology`, `whyChooseUs`, `careerSupportFlow` — same pattern, edit
  the array in `js/data.js`.
- `certificates` — sample verification records only (see §8 below).

---

## 7. Legal pages

`pages/privacy-policy.html`, `pages/terms-conditions.html`, and
`pages/refund-policy.html` contain full policy text (not placeholder
content), each with:

- A breadcrumb and a "Last Updated" date (`<time datetime="...">`)
- A sticky table-of-contents sidebar that jumps to each section
  (collapses above the content on mobile/tablet)
- Semantic `<article>`/`<section id="...">` structure, one section per
  numbered clause, so any clause can be edited independently
- Contact details and the named grievance officer pulled from
  `js/config.js` via `data-institute-*` attributes, so they stay in sync
  automatically
- Quick links back to Home, Courses, Contact, and the other two legal
  pages
- No claims of government/UGC/AICTE/NCVET/NSQF accreditation or job
  guarantees — the Certificate of Completion section explicitly states
  it is not a regulatory qualification unless an external awarding body
  is actually involved

All three pages are linked from the footer's "Institute" area
(`Privacy Policy` / `Terms & Conditions` / `Refund Policy`) on every page
of the site.

This is real policy content as provided, but it is still a general
template — have it reviewed by a qualified professional before treating
it as legally binding, and update the "Governing Law" jurisdiction and
any other institute-specific clauses (e.g. actual payment providers used)
as needed.

---

## 8. Certificate system (still frontend-only demo)

The certificate verification page checks a Certificate ID against sample
records hard-coded in `js/data.js` (`certificates` object), built using
`INSTITUTE.certificatePrefix`. This is a **frontend demonstration only**.
Before issuing real certificates, replace this lookup with a call to a
secure backend/database — see the Phase 2 roadmap below.

---

## 9. Testing the website

- Click through every nav link (desktop + mobile menu) on a few different
  pages — header/footer should look identical everywhere.
- Open the "Book Free Counselling" modal from the header and from a course
  card's "Enquire Now" button; submit the form and confirm the toast
  appears.
- Try the course explorer's search/filters on `pages/courses.html`.
- Try the certificate verification demo on `pages/verify.html` with the
  sample IDs shown on the page.
- Toggle dark mode (sun/moon icon in the header) and refresh the page —
  your choice should persist.
- Resize the browser down to ~375px width and confirm the hamburger menu
  works and nothing overlaps.
- Open the browser console and confirm there are no errors.

---

## 10. Important limitations of a pure HTML/CSS/JS architecture

- **No server-side rendering.** Page titles/meta descriptions update via
  JavaScript after the page loads (using a `{{INSTITUTE_NAME}}` marker
  replaced at runtime), so a crawler or share-preview tool that doesn't
  execute JavaScript may see the unreplaced marker text. For most modern
  search engines and social platforms this isn't an issue, but it's worth
  knowing about.
- **No real data persistence.** The enquiry form, certificate verification,
  and all "data" on the site live in JavaScript files shipped to the
  browser — nothing is actually saved, checked against a real database,
  or protected from someone viewing the page source. This is expected and
  fine for Phase 1, but means: don't put real, sensitive certificate
  records or student data into `js/data.js`.
- **`components.js` runs on every page load.** Since there's no server,
  the header/footer are rebuilt from scratch (a few KB of JS execution)
  on every navigation, rather than being cached server-side fragments.
  This is invisible in practice but is a fundamental trade-off of static,
  client-rendered includes vs. a real templating backend.
- **Relative paths must stay consistent.** `components.js` detects whether
  it's running from `/` or `/pages/` by checking the URL, and builds all
  links accordingly. If you add new folders/pages, keep them either at the
  project root or directly inside `/pages/` — deeper nesting would need
  the path-detection logic in `js/components.js` extended.

---

## 11. Phase 2 — Backend Roadmap (not built yet)

```
Frontend (HTML/CSS/JS)
        ↓
   REST API layer
        ↓
   Backend service
        ↓
     Database
```

Suggested future stack: Python (FastAPI) or Node.js backend, MySQL or
PostgreSQL database, JWT/session auth, cloud storage for uploads, and a
backend-generated dynamic certificate QR/verification URL.

Planned future modules: student login & dashboard, trainer login &
dashboard, admin dashboard, attendance, fees & online payments,
examinations & results, certificate database + QR verification, LMS /
online learning, and placement/CRM tracking.

`js/config.js` is deliberately structured as a single, flat object so
that in Phase 2 it can be swapped for data fetched from an admin-panel
API with minimal changes to `js/components.js`.
