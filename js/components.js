/* =========================================================================
   NEXORA — REUSABLE COMPONENTS
   -------------------------------------------------------------------------
   Renders the site header (incl. mobile nav), footer, floating WhatsApp
   button, back-to-top button, and the three shared modals (Book Free
   Counselling / Course Enquiry / Download Brochure) into every page from
   ONE template each, using js/config.js (INSTITUTE) as the data source.

   This file must load AFTER js/config.js and js/data.js, and BEFORE
   js/main.js (and any page-specific script like js/courses.js).

   It runs immediately (not on DOMContentLoaded) because the <script> tag
   sits at the bottom of <body>, after the #site-header / #site-footer
   placeholder divs already exist in the DOM — this guarantees the real
   header/footer markup is in place before main.js's own DOMContentLoaded
   handlers try to query .site-header, .mobile-nav, .modal-overlay, etc.
   ========================================================================= */

(function () {
  "use strict";

  function isInPages() {
    return /\/pages\//.test(window.location.pathname);
  }

  // Path helpers so the same templates work from "/index.html" and
  // from "/pages/anything.html" without any server-side includes.
  const inPages = isInPages();
  const ROOT = inPages ? "../" : "";           // reach the project root
  const PAGE = inPages ? "" : "pages/";        // reach a file inside /pages/
  const HOME = inPages ? "../index.html" : "index.html";
  const WHY_US = HOME + "#why-us";

  function pageHref(name) {
    return PAGE + name;
  }
  function assetHref(path) {
    return ROOT + path;
  }
  function courseHref(id) {
    return pageHref("course-details.html") + "?id=" + id;
  }

  /* ------------------------------------------------------------------
     HEADER (desktop nav + mobile nav bundled together, as siblings —
     kept as siblings deliberately: nesting the fixed-position mobile
     nav inside the header caused a real bug previously if any filter/
     transform/backdrop-filter effect is ever reintroduced on <header>).
     ------------------------------------------------------------------ */
  function headerTemplate() {
    const desktopLinks = [
      { href: HOME, label: "Home" },
      { href: pageHref("about.html"), label: "About" },
      { href: pageHref("courses.html"), label: "Courses" },
      { href: pageHref("programs.html"), label: "Programs" },
      { href: WHY_US, label: "Why Us" },
      { href: pageHref("projects.html"), label: "Projects" },
      { href: pageHref("certificates.html"), label: "Certificates" },
      { href: pageHref("contact.html"), label: "Contact" },
    ];
    const mobileLinks = [
      { href: HOME, label: "Home" },
      { href: pageHref("about.html"), label: "About" },
      { href: pageHref("courses.html"), label: "Courses" },
      { href: pageHref("programs.html"), label: "Programs" },
      { href: WHY_US, label: "Why Us" },
      { href: pageHref("projects.html"), label: "Projects" },
      { href: pageHref("trainers.html"), label: "Trainers" },
      { href: pageHref("certificates.html"), label: "Certificates" },
      { href: pageHref("faq.html"), label: "FAQ" },
      { href: pageHref("contact.html"), label: "Contact" },
    ];
    const desktopNavHtml = desktopLinks.map((l) => `<a href="${l.href}">${l.label}</a>`).join("\n      ");
    const mobileNavHtml = mobileLinks.map((l) => `<a href="${l.href}">${l.label}</a>`).join("\n    ");

    return `
<header class="site-header">
  <div class="container">
    <a href="${HOME}" class="brand">
      <span class="brand-mark">
        <img class="brand-logo-img" data-institute-logo alt="" onerror="this.style.display='none'" />
        <span data-institute-logo-initials>NX</span>
      </span>
      <span class="brand-text">
        <span class="brand-name" data-institute-short-name>NEXORA</span>
        <span class="brand-sub">SKILLS &amp; CAREER ACADEMY</span>
      </span>
    </a>

    <nav class="main-nav" aria-label="Primary">
      ${desktopNavHtml}
    </nav>

    <div class="header-actions">
      <button class="btn btn-secondary btn-sm" data-modal-open="counsellingModal">Book Free Counselling</button>
      <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode" aria-pressed="false"><i data-lucide="sun" width="18" height="18" class="icon-sun"></i><i data-lucide="moon" width="18" height="18" class="icon-moon"></i></button>
      <button class="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<nav class="mobile-nav" aria-label="Mobile">
    ${mobileNavHtml}
    <button class="btn btn-secondary btn-block" data-modal-open="counsellingModal">Book Free Counselling</button>
  </nav>`;
  }

  /* ------------------------------------------------------------------
     FOOTER + floating buttons + shared modals
     ------------------------------------------------------------------ */
  function socialIconSvg(name) {
    const icons = {
      instagram: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
      linkedin: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
      youtube: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>',
      facebook: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    };
    return icons[name] || "";
  }

  function footerSocialsHtml() {
    // A social link only renders if INSTITUTE.social has a real, non-empty
    // URL for it — no broken/placeholder "#" links are ever shown.
    const social = (typeof INSTITUTE !== "undefined" && INSTITUTE.social) || {};
    const order = ["instagram", "linkedin", "youtube", "facebook"];
    const links = order
      .filter((key) => social[key] && social[key].trim() !== "")
      .map((key) => `<a href="${social[key]}" target="_blank" rel="noopener" aria-label="${key.charAt(0).toUpperCase() + key.slice(1)}">${socialIconSvg(key)}</a>`)
      .join("\n          ");
    return links; // empty string if nothing configured — container will be empty, which is fine
  }

  function footerTemplate() {
    return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="brand-name" data-institute-short-name>NEXORA</span>
        <span class="brand-sub" data-institute-tagline>Learn Skills. Build Confidence. Become Career Ready.</span>
        <p>A skill development and career readiness institute offering practical, offline training across Technology, Data, Communication and Professional Skills.</p>
        <div class="footer-socials">
          ${footerSocialsHtml()}
        </div>
      </div>
      <div class="footer-col">
        <h4>Courses</h4>
        <ul>
          <li><a href="${courseHref("python-programming")}">Python</a></li>
          <li><a href="${courseHref("data-analytics")}">Data Analytics</a></li>
          <li><a href="${courseHref("data-science-ml")}">Data Science</a></li>
          <li><a href="${courseHref("full-stack-web-development")}">Web Development</a></li>
          <li><a href="${courseHref("spoken-english")}">English</a></li>
          <li><a href="${courseHref("french-language")}">French</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Career</h4>
        <ul>
          <li><a href="${courseHref("pre-placement")}">Pre-Placement Training</a></li>
          <li><a href="${courseHref("interview-preparation")}">Interview Preparation</a></li>
          <li><a href="${courseHref("resume-linkedin")}">Resume &amp; LinkedIn</a></li>
          <li><a href="${courseHref("corporate-communication")}">Corporate Communication</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Institute</h4>
        <ul>
          <li><a href="${pageHref("about.html")}">About</a></li>
          <li><a href="${pageHref("trainers.html")}">Trainers</a></li>
          <li><a href="${pageHref("projects.html")}">Projects</a></li>
          <li><a href="${pageHref("certificates.html")}">Certificates</a></li>
          <li><a href="${pageHref("verify.html")}">Verify Certificate</a></li>
          <li><a href="${pageHref("contact.html")}">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-institute-year>2026</span> <span data-institute-name>Nexora Skills &amp; Career Academy</span>. All Rights Reserved.</span>
      <div class="footer-legal">
        <a href="${pageHref("privacy-policy.html")}">Privacy Policy</a>
        <a href="${pageHref("terms-conditions.html")}">Terms &amp; Conditions</a>
        <a href="${pageHref("refund-policy.html")}">Refund Policy</a>
      </div>
    </div>
  </div>
</footer>

<a class="whatsapp-float" data-institute-whatsapp target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i data-lucide="message-circle" width="26" height="26"></i></a>
<button class="back-to-top" aria-label="Back to top"><i data-lucide="arrow-up" width="20" height="20"></i></button>

<div class="modal-overlay" id="counsellingModal">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="counsellingTitle">
    <button class="modal-close" data-modal-close aria-label="Close"><i data-lucide="x" width="20" height="20"></i></button>
    <h3 class="modal-title" id="counsellingTitle">Book Free Counselling</h3>
    <p class="modal-sub">Tell us a little about your goals and we'll help you find the right course.</p>
    <form data-enquiry-form novalidate>
      <div class="form-row">
        <div class="form-group"><label for="c-name">Full Name <span class="required">*</span></label><input class="form-control" type="text" id="c-name" name="fullName" data-validate="name" required /><span class="field-error">This field is required.</span></div>
        <div class="form-group"><label for="c-phone">Mobile Number <span class="required">*</span></label><input class="form-control" type="tel" id="c-phone" name="mobile" data-validate="phone" required /><span class="field-error">This field is required.</span></div>
      </div>
      <div class="form-group"><label for="c-course">Course Interested In</label><select class="form-control" id="c-course" name="course" data-enquiry-course><option value="">Select a course</option></select></div>
      <div class="form-group">
        <label class="checkbox-row"><input type="checkbox" name="consent" required /><span>I agree to be contacted regarding course information and counselling.</span></label>
        <span class="field-error">Please provide your consent to continue.</span>
      </div>
      <button class="btn btn-secondary btn-block" type="submit">Submit Enquiry</button>
    </form>
  </div>
</div>

<div class="modal-overlay" id="enquiryModal">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="enquiryTitle">
    <button class="modal-close" data-modal-close aria-label="Close"><i data-lucide="x" width="20" height="20"></i></button>
    <h3 class="modal-title" id="enquiryTitle">Course Enquiry</h3>
    <p class="modal-sub">Share your details and our team will get in touch about this program.</p>
    <form data-enquiry-form novalidate>
      <div class="form-row">
        <div class="form-group"><label for="e-name">Full Name <span class="required">*</span></label><input class="form-control" type="text" id="e-name" name="fullName" data-validate="name" required /><span class="field-error">This field is required.</span></div>
        <div class="form-group"><label for="e-phone">Mobile Number <span class="required">*</span></label><input class="form-control" type="tel" id="e-phone" name="mobile" data-validate="phone" required /><span class="field-error">This field is required.</span></div>
      </div>
      <div class="form-group"><label for="e-email">Email <span class="required">*</span></label><input class="form-control" type="email" id="e-email" name="email" data-validate="email" required /><span class="field-error">This field is required.</span></div>
      <div class="form-group"><label for="e-course">Course</label><input class="form-control" type="text" id="e-course" name="course" data-enquiry-course readonly /></div>
      <div class="form-group">
        <label class="checkbox-row"><input type="checkbox" name="consent" required /><span>I agree to be contacted regarding course information and counselling.</span></label>
        <span class="field-error">Please provide your consent to continue.</span>
      </div>
      <button class="btn btn-secondary btn-block" type="submit">Submit Enquiry</button>
    </form>
  </div>
</div>

<div class="modal-overlay" id="brochureModal">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="brochureTitle">
    <button class="modal-close" data-modal-close aria-label="Close"><i data-lucide="x" width="20" height="20"></i></button>
    <h3 class="modal-title" id="brochureTitle">Download Brochure</h3>
    <p class="modal-sub mb-0">Brochure will be available soon. Please check back later or book a free counselling session for full program details.</p>
  </div>
</div>`;
  }

  /* ------------------------------------------------------------------
     Populate every data-institute-* element on the page (this runs
     AFTER header/footer injection, so it also fills the elements that
     were just added, in addition to anything already in the page body
     — one mechanism, used everywhere).
     ------------------------------------------------------------------ */
  function toTelHref(phone) {
    return "tel:" + String(phone).replace(/[^\d+]/g, "");
  }

  function populateInstituteData() {
    if (typeof INSTITUTE === "undefined") return;

    const textFields = {
      "data-institute-name": INSTITUTE.name,
      "data-institute-short-name": INSTITUTE.shortName,
      "data-institute-tagline": INSTITUTE.tagline,
      "data-institute-email": INSTITUTE.email,
      "data-institute-admissions-email": INSTITUTE.admissionsEmail,
      "data-institute-support-email": INSTITUTE.supportEmail,
      "data-institute-phone": INSTITUTE.phone,
      "data-institute-address": INSTITUTE.address,
      "data-institute-city": INSTITUTE.city,
      "data-institute-state": INSTITUTE.state,
      "data-institute-country": INSTITUTE.country,
      "data-institute-website": INSTITUTE.website,
      "data-institute-year": new Date().getFullYear(),
      "data-institute-logo-initials": INSTITUTE.logoInitials,
      "data-institute-grievance-name": INSTITUTE.grievanceOfficerName,
      "data-institute-grievance-designation": INSTITUTE.grievanceOfficerDesignation,
    };

    Object.keys(textFields).forEach((attr) => {
      const value = textFields[attr];
      if (value === undefined || value === null || value === "") return;
      document.querySelectorAll("[" + attr + "]").forEach((el) => {
        el.textContent = value;
      });
    });

    // href-building attributes
    document.querySelectorAll("[data-institute-phone-href]").forEach((el) => el.setAttribute("href", toTelHref(INSTITUTE.phone)));
    document.querySelectorAll("[data-institute-email-href]").forEach((el) => el.setAttribute("href", "mailto:" + INSTITUTE.email));
    document.querySelectorAll("[data-institute-website-href]").forEach((el) => el.setAttribute("href", INSTITUTE.website));
    document.querySelectorAll("[data-institute-whatsapp]").forEach((el) => el.setAttribute("href", "https://wa.me/" + INSTITUTE.whatsapp));

    // Existing convention for WhatsApp links that carry a custom preset message
    document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
      let presetMsg = el.getAttribute("data-whatsapp-link") || `Hi, I'd like to know more about ${INSTITUTE.name}.`;
      presetMsg = presetMsg.replace(/\{\{INSTITUTE_NAME\}\}/g, INSTITUTE.name);
      el.setAttribute("href", `https://wa.me/${INSTITUTE.whatsapp}?text=${encodeURIComponent(presetMsg)}`);
    });

    // Logo image + favicon (both fall back gracefully — see CSS/onerror)
    document.querySelectorAll("[data-institute-logo]").forEach((img) => {
      img.setAttribute("src", assetHref(INSTITUTE.logo));
      img.setAttribute("alt", INSTITUTE.name);
    });
    document.querySelectorAll("[data-institute-favicon]").forEach((link) => {
      link.setAttribute("href", assetHref(INSTITUTE.favicon));
    });

    // SEO: replace the {{INSTITUTE_NAME}} marker in <title> and any meta tag
    document.title = document.title.replace(/\{\{INSTITUTE_NAME\}\}/g, INSTITUTE.name);
    document.querySelectorAll('meta[content*="{{INSTITUTE_NAME}}"]').forEach((m) => {
      m.setAttribute("content", m.getAttribute("content").replace(/\{\{INSTITUTE_NAME\}\}/g, INSTITUTE.name));
    });

    // Illustrative certificate ID shown in preview mockups (not the demo
    // lookup table — see js/data.js for the actual verifiable sample IDs)
    document.querySelectorAll("[data-cert-sample-id]").forEach((el) => {
      el.textContent = `${INSTITUTE.certificatePrefix}-DA-26-00142`;
    });
  }

  /* ------------------------------------------------------------------
     Mount
     ------------------------------------------------------------------ */
  const headerMount = document.getElementById("site-header");
  if (headerMount) headerMount.outerHTML = headerTemplate();

  const footerMount = document.getElementById("site-footer");
  if (footerMount) footerMount.outerHTML = footerTemplate();

  populateInstituteData();

  // Exposed in case a page needs to re-run population after changing
  // something at runtime (not needed today, but keeps the door open
  // for a future admin-panel-driven config reload).
  window.populateInstituteData = populateInstituteData;
})();
