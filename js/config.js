/* =========================================================================
   NEXORA — CENTRAL INSTITUTE CONFIGURATION
   -------------------------------------------------------------------------
   This is the SINGLE SOURCE OF TRUTH for every piece of institute-level
   branding and contact information used across the entire website.

   HOW TO REBRAND THE SITE:
   Change the values below and save. Every page — header, footer, forms,
   modals, certificate previews, legal pages, SEO metadata — reads from
   this one object, so nothing needs to be edited anywhere else.

   This file MUST be loaded before js/data.js, js/components.js and
   js/main.js on every page (see the <script> order at the bottom of
   each HTML file).
   ========================================================================= */

const INSTITUTE = {
  // ---- Identity ----
  name: "Mahira Skills & Career Academy",
  shortName: "MAHIRA",
  tagline: "Learn Skills. Build Confidence. Become Career Ready.",

  // ---- Branding assets ----
  // Point these at real files any time — every logo on the site will pick
  // them up automatically. Until a real file exists at this path, the
  // site quietly falls back to the existing text-mark logo (using
  // logoInitials below), so nothing breaks in the meantime.
  logo: "assets/logo/logo.png",
  favicon: "assets/logo/favicon.png",
  logoInitials: "M",

  // ---- Web presence ----
  website: "https://ksracademy.in",

  // ---- Contact ----
  email: "gunjansingh9752@gmail.com",
  admissionsEmail: "gunjansingh9752@gmail.com",
  supportEmail: "gunjansingh9752@gmail.com",

  phone: "+91 93341 31985",       // display format
  whatsapp: "919334131985",       // digits only, country code first, no symbols

  // ---- Address ----
  address: "Malviya Nagar, Jaipur, Rajasthan, India",
  city: "Jaipur",
  state: "Rajasthan",
  country: "India",

  // ---- Misc ----
  establishedYear: "2026",
  certificatePrefix: "MCA",

  // Named contact person for privacy/legal grievances, shown on the
  // legal pages (Privacy Policy, Terms & Conditions, Refund Policy).
  grievanceOfficerName: "Gunjan Kumar",
  grievanceOfficerDesignation: "Co-Founder",

  // ---- Social ----
  // Leave any of these as an empty string to automatically HIDE that
  // icon/link everywhere on the site (header, footer, contact page)
  // instead of showing a placeholder "#" link.
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  // ---- SEO defaults ----
  seo: {
    defaultTitle: "Mahira Skills & Career Academy",
    defaultDescription:
      "Skill development, career readiness and professional training programs.",
  },

  hours: [
    { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
};
