/* =========================================================================
   NEXORA — MAIN SITE SCRIPT
   Handles: header scroll state, mobile navigation, WhatsApp float,
   back-to-top, scroll-reveal, testimonial slider, FAQ accordion,
   modal system, toast notifications, animated stat counters.

   Institute branding/contact info (name, logo, phone, email, etc.) is
   now handled centrally by js/config.js (INSTITUTE) + js/components.js
   (which renders the header/footer and populates every data-institute-*
   element on the page). This file assumes that has already run.
   ========================================================================= */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. Header scroll shadow
     ------------------------------------------------------------------ */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     2. Mobile hamburger navigation
     ------------------------------------------------------------------ */
  function initMobileNav() {
    const toggle = document.querySelector(".hamburger");
    const nav = document.querySelector(".mobile-nav");
    if (!toggle || !nav) return;

    function close() {
      toggle.classList.remove("is-open");
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function open() {
      toggle.classList.add("is-open");
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", () => {
      nav.classList.contains("is-open") ? close() : open();
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ------------------------------------------------------------------
     2b. Dark mode toggle
     ------------------------------------------------------------------ */
  function initThemeToggle() {
    const root = document.documentElement;
    const stored = localStorage.getItem("nexora-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    if (initial === "dark") root.setAttribute("data-theme", "dark");

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", initial === "dark" ? "true" : "false");
      btn.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        if (isDark) {
          root.removeAttribute("data-theme");
          localStorage.setItem("nexora-theme", "light");
        } else {
          root.setAttribute("data-theme", "dark");
          localStorage.setItem("nexora-theme", "dark");
        }
        document.querySelectorAll("[data-theme-toggle]").forEach((b) =>
          b.setAttribute("aria-pressed", !isDark ? "true" : "false")
        );
      });
    });
  }

  /* ------------------------------------------------------------------
     3. Active navigation state based on current page/section
     ------------------------------------------------------------------ */
  function initActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a, .mobile-nav a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      // Skip in-page anchor links (e.g. "index.html#why-us") — they point
      // at a section of a page, not a distinct page, so they should never
      // be marked as the "current page" alongside Home/About/etc.
      if (href.includes("#")) return;
      const hrefFile = href.split("/").pop();
      if (hrefFile && hrefFile === path) {
        a.classList.add("active");
      }
    });
  }

  /* ------------------------------------------------------------------
     4. Back-to-top button
     ------------------------------------------------------------------ */
  function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      () => btn.classList.toggle("is-visible", window.scrollY > 500),
      { passive: true }
    );
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ------------------------------------------------------------------
     5. Scroll-reveal (IntersectionObserver)
     ------------------------------------------------------------------ */
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal:not(.is-visible), .roadmap-stage:not(.is-visible), .roadmap-mobile-item:not(.is-visible)");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach((i) => i.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((i) => io.observe(i));
  }

  // Exposed so scripts that render content after DOMContentLoaded
  // (e.g. the course explorer, course details) can re-scan for new
  // .reveal elements and make sure they get animated in correctly.
  window.refreshScrollReveal = initScrollReveal;

  /* ------------------------------------------------------------------
     6. Animated counters — only for factual/configurable numbers
     ------------------------------------------------------------------ */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (counters.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
          const suffix = el.getAttribute("data-counter-suffix") || "";
          const duration = 900;
          const start = performance.now();
          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* ------------------------------------------------------------------
     7. Report card bars (hero visual) — animate once visible
     ------------------------------------------------------------------ */
  function initReportBars() {
    const bars = document.querySelectorAll(".report-bar");
    if (bars.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((b) => io.observe(b));
  }

  /* ------------------------------------------------------------------
     8. FAQ accordion
     ------------------------------------------------------------------ */
  function buildAccordionItem(item) {
    const wrap = document.createElement("div");
    wrap.className = "accordion-item";
    wrap.innerHTML = `
      <button class="accordion-trigger" aria-expanded="false">
        <span>${item.q}</span>
        <i data-lucide="plus"></i>
      </button>
      <div class="accordion-panel">
        <div class="accordion-panel-inner"><p class="mb-0">${item.a}</p></div>
      </div>`;
    return wrap;
  }

  function initFaqAccordion() {
    const mount = document.querySelector("[data-faq-list]");
    if (!mount || typeof faqs === "undefined") return;
    faqs.forEach((item) => mount.appendChild(buildAccordionItem(item)));
    if (window.lucide) lucide.createIcons();

    mount.addEventListener("click", (e) => {
      const trigger = e.target.closest(".accordion-trigger");
      if (!trigger) return;
      const item = trigger.closest(".accordion-item");
      const panel = item.querySelector(".accordion-panel");
      const isOpen = item.classList.contains("is-open");

      mount.querySelectorAll(".accordion-item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
          openItem.querySelector(".accordion-panel").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  /* ------------------------------------------------------------------
     9. Testimonial slider
     ------------------------------------------------------------------ */
  function initTestimonialSlider() {
    const mount = document.querySelector("[data-testimonial-slider]");
    if (!mount || typeof testimonials === "undefined") return;

    const slidesHtml = testimonials
      .map(
        (t, i) => `
      <div class="testimonial-slide${i === 0 ? " is-active" : ""}">
        <p class="testimonial-quote">&ldquo;${t.quote}&rdquo;</p>
        <div class="testimonial-name">${t.name}</div>
        <div class="testimonial-meta">${t.course} &middot; <em>${t.type}</em></div>
      </div>`
      )
      .join("");

    const dotsHtml = testimonials.map((_, i) => `<button class="testimonial-dot${i === 0 ? " is-active" : ""}" aria-label="Show testimonial ${i + 1}"></button>`).join("");

    mount.innerHTML = `<div class="testimonial-track">${slidesHtml}</div><div class="testimonial-controls">${dotsHtml}</div>`;

    const slides = mount.querySelectorAll(".testimonial-slide");
    const dots = mount.querySelectorAll(".testimonial-dot");
    let current = 0;
    let timer;

    function show(index) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }

    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); resetTimer(); }));

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => show(current + 1), 6000);
    }
    resetTimer();
  }

  /* ------------------------------------------------------------------
     10. Toast notifications
     ------------------------------------------------------------------ */
  function ensureToastContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function (message, icon) {
    const container = ensureToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i data-lucide="${icon || "check-circle"}"></i><span>${message}</span>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  };

  /* ------------------------------------------------------------------
     11. Modal system (reusable) — supports data-modal-open / data-modal-close
     ------------------------------------------------------------------ */
  function initModals() {
    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-modal-open]");
      if (opener) {
        const id = opener.getAttribute("data-modal-open");
        const modal = document.getElementById(id);
        if (modal) openModal(modal, opener);
      }
      const closer = e.target.closest("[data-modal-close]");
      if (closer) {
        const overlay = closer.closest(".modal-overlay");
        if (overlay) closeModal(overlay);
      }
      if (e.target.classList.contains("modal-overlay")) {
        closeModal(e.target);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const openOverlay = document.querySelector(".modal-overlay.is-open");
      if (openOverlay) closeModal(openOverlay);
    });
  }

  function openModal(overlay, trigger) {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    overlay._trigger = trigger || null;

    // Pre-fill course enquiry modal if a course name was passed
    if (trigger && trigger.hasAttribute("data-course-title")) {
      const select = overlay.querySelector("[data-enquiry-course]");
      if (select) select.value = trigger.getAttribute("data-course-title");
    }

    const focusable = overlay.querySelector("input, select, textarea, button");
    if (focusable) setTimeout(() => focusable.focus(), 50);
  }

  function closeModal(overlay) {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (overlay._trigger) overlay._trigger.focus();
  }

  window.openModalById = function (id) {
    const modal = document.getElementById(id);
    if (modal) openModal(modal);
  };

  /* ------------------------------------------------------------------
     12. Render trust bar, category grid, methodology, roadmap, why-us,
         career flow, trainers, projects, stats — wherever mount points
         exist on the page. Keeps HTML free of duplicated content.
     ------------------------------------------------------------------ */
  function icon(name, extra) {
    return `<i data-lucide="${name}" ${extra || ""}></i>`;
  }

  function renderTrustBar() {
    const mount = document.querySelector("[data-trust-bar]");
    if (!mount || typeof trustBar === "undefined") return;
    mount.innerHTML = trustBar.map((t) => `<div class="trust-item">${icon(t.icon, 'width="18" height="18"')}<span>${t.label}</span></div>`).join("");
  }

  function renderCategoryGrid() {
    const mount = document.querySelector("[data-category-grid]");
    if (!mount || typeof categories === "undefined") return;
    mount.innerHTML = categories
      .map((cat) => {
        const count = courses.filter((c) => c.category === cat.id).length;
        return `
        <div class="card card-category reveal">
          <div class="card-icon">${icon(cat.icon, 'width="22" height="22"')}</div>
          <h3>${cat.name}</h3>
          <p class="text-muted" style="font-size:0.9rem;">${cat.description}</p>
          <div class="card-meta">${count} course${count === 1 ? "" : "s"}</div>
          <a class="btn-ghost" href="pages/courses.html?category=${cat.id}">Explore Courses</a>
        </div>`;
      })
      .join("");
  }

  function formatFee(course) {
    if (course.launchFee) {
      return `<div class="program-fee">₹${course.launchFee.toLocaleString("en-IN")}<small>Launch Fee &middot; Regular ₹${course.regularFeeMin.toLocaleString("en-IN")}–₹${course.regularFeeMax.toLocaleString("en-IN")}</small></div>`;
    }
    return `<div class="program-fee">₹${course.feeMin.toLocaleString("en-IN")}–₹${course.feeMax.toLocaleString("en-IN")}<small>Indicative fee</small></div>`;
  }

  function badgeHtml(course) {
    if (!course.badge) return "";
    const cls = course.badge === "Flagship" ? "badge-flagship" : course.badge === "Popular" ? "badge-popular" : "badge-career";
    return `<span class="badge ${cls}">${course.badge}</span>`;
  }

  function renderFeaturedPrograms() {
    const mount = document.querySelector("[data-featured-programs]");
    if (!mount || typeof courses === "undefined") return;
    const featured = courses.filter((c) => c.featured);
    mount.innerHTML = featured
      .map(
        (c) => `
      <div class="card program-card reveal">
        <div class="program-card-top">
          <div>
            <span class="badge badge-level">${levels[c.level].label}</span>
          </div>
          ${badgeHtml(c)}
        </div>
        <h3>${c.title}</h3>
        <div class="program-meta">
          <span>${icon("clock", 'width="14" height="14"')} ${c.duration}</span>
          <span>${icon("layers", 'width="14" height="14"')} ${c.modules.length} modules</span>
        </div>
        <p>${c.description}</p>
        <div class="program-skills">${c.skills.slice(0, 4).map((s) => `<span class="chip">${s}</span>`).join("")}</div>
        ${formatFee(c)}
        <div class="program-card-actions">
          <a class="btn btn-outline btn-sm" href="pages/course-details.html?id=${c.id}">View Program</a>
          <button class="btn btn-secondary btn-sm" data-modal-open="enquiryModal" data-course-title="${c.title}">Enquire Now</button>
        </div>
      </div>`
      )
      .join("");
    if (window.lucide) lucide.createIcons();
  }

  function renderMethodology() {
    const mount = document.querySelector("[data-methodology]");
    if (!mount || typeof methodology === "undefined") return;
    mount.innerHTML = methodology
      .map(
        (m) => `
      <div class="method-step reveal">
        <div class="roadmap-num">${String(m.step).padStart(2, "0")}</div>
        <h4>${m.title}</h4>
        <p class="text-muted" style="font-size:0.88rem;">${m.detail}</p>
      </div>`
      )
      .join("");
  }

  function renderRoadmap() {
    const desktopMount = document.querySelector("[data-roadmap-desktop]");
    const mobileMount = document.querySelector("[data-roadmap-mobile]");
    if (typeof dataScienceRoadmap === "undefined") return;

    if (desktopMount) {
      desktopMount.innerHTML = dataScienceRoadmap
        .map(
          (s) => `
        <div class="roadmap-stage reveal">
          <div class="roadmap-num">${String(s.stage).padStart(2, "0")}</div>
          <h4>${s.title}</h4>
          <p>${s.detail}</p>
        </div>`
        )
        .join("");
    }
    if (mobileMount) {
      mobileMount.innerHTML = dataScienceRoadmap
        .map(
          (s) => `
        <div class="roadmap-mobile-item reveal">
          <div class="roadmap-num">${String(s.stage).padStart(2, "0")}</div>
          <div><h4>${s.title}</h4><p class="text-muted" style="font-size:0.85rem;">${s.detail}</p></div>
        </div>`
        )
        .join("");
    }
  }

  function renderWhyChooseUs() {
    const mount = document.querySelector("[data-why-us]");
    if (!mount || typeof whyChooseUs === "undefined") return;
    mount.innerHTML = whyChooseUs
      .map(
        (w) => `
      <div class="card reveal">
        <div class="card-icon">${icon(w.icon, 'width="20" height="20"')}</div>
        <h4>${w.title}</h4>
        <p class="text-muted mb-0" style="font-size:0.88rem;">${w.detail}</p>
      </div>`
      )
      .join("");
    if (window.lucide) lucide.createIcons();
  }

  function renderCareerFlow() {
    const flowMount = document.querySelector("[data-career-flow]");
    const listMount = document.querySelector("[data-career-services]");
    if (flowMount && typeof careerSupportFlow !== "undefined") {
      flowMount.innerHTML = careerSupportFlow
        .map((step, i) => `<span class="career-flow-step">${step}</span>${i < careerSupportFlow.length - 1 ? `<span class="career-flow-arrow">${icon("arrow-right", 'width="16" height="16"')}</span>` : ""}`)
        .join("");
    }
    if (listMount && typeof careerSupportServices !== "undefined") {
      listMount.innerHTML = careerSupportServices.map((s) => `<li class="flex gap-sm" style="align-items:center; margin-bottom:0.7rem;">${icon("check", 'width="16" height="16"')} <span>${s}</span></li>`).join("");
    }
    if (window.lucide) lucide.createIcons();
  }

  function renderTrainers() {
    const mount = document.querySelector("[data-trainers-grid]");
    if (!mount || typeof trainers === "undefined") return;
    mount.innerHTML = trainers
      .map(
        (t) => `
      <div class="card trainer-card reveal">
        <div class="trainer-photo">
          <img class="trainer-photo-img" src="../assets/images/trainers/${t.id}.jpg" alt="${t.name} — ${t.designation}" loading="lazy" onerror="this.style.display='none'" />
          <span class="trainer-initials">${t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
        </div>
        ${t.sample ? '<span class="trainer-sample-tag">Sample Faculty Profile</span>' : ""}
        <h4>${t.name}</h4>
        <p class="text-muted" style="font-size:0.85rem; margin-bottom:0.3rem;">${t.designation}</p>
        <p style="font-size:0.85rem; margin-bottom:0.3rem;"><strong>Expertise:</strong> ${t.expertise}</p>
        <p class="text-muted" style="font-size:0.85rem;">${t.bio}</p>
      </div>`
      )
      .join("");
  }

  function renderProjects(filterCategory) {
    const mount = document.querySelector("[data-projects-grid]");
    if (!mount || typeof projects === "undefined") return;
    const list = filterCategory ? projects.filter((p) => p.category === filterCategory) : projects;
    mount.innerHTML = list
      .map(
        (p) => `
      <div class="card reveal">
        <div class="trainer-photo" style="aspect-ratio:16/10;">
          <img class="trainer-photo-img" src="../assets/images/projects/${p.id}.jpg" alt="${p.title} — ${p.category} project" loading="lazy" onerror="this.style.display='none'" />
          <span class="trainer-initials" style="font-size:0.85rem; color:var(--muted); font-family:var(--font-body);">${p.category}</span>
        </div>
        <span class="chip" style="margin-bottom:0.6rem; display:inline-block;">${p.tech}</span>
        <h4>${p.title}</h4>
        <p class="text-muted" style="font-size:0.88rem;">${p.description}</p>
      </div>`
      )
      .join("");
  }

  function renderStats() {
    const mount = document.querySelector("[data-stats-row]");
    if (!mount || typeof instituteStats === "undefined") return;
    mount.innerHTML = instituteStats
      .map(
        (s) => `
      <div>
        <div class="stat-value"><span data-counter="${s.value}" data-counter-suffix="${s.suffix}">0${s.suffix}</span></div>
        <div class="stat-label">${s.label}</div>
      </div>`
      )
      .join("");
  }

  /* ------------------------------------------------------------------
     13. Populate "Course Interested In" select dropdowns everywhere
         they appear, from the single shared course list.
     ------------------------------------------------------------------ */
  function renderEnquiryCourseSelects() {
    if (typeof courses === "undefined") return;
    document.querySelectorAll("select[data-enquiry-course]").forEach((select) => {
      courses.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.title;
        opt.textContent = c.title;
        select.appendChild(opt);
      });
    });
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initHeaderScroll();
    initMobileNav();
    initActiveNav();
    initBackToTop();
    initModals();
    renderTrustBar();
    renderCategoryGrid();
    renderFeaturedPrograms();
    renderMethodology();
    renderRoadmap();
    renderWhyChooseUs();
    renderCareerFlow();
    renderTrainers();
    renderProjects();
    renderStats();
    renderEnquiryCourseSelects();
    initFaqAccordion();
    initTestimonialSlider();

    if (window.lucide) lucide.createIcons();

    // Run reveal/counters/report-bars after dynamic content is in the DOM
    initScrollReveal();
    initCounters();
    initReportBars();
  });
})();
