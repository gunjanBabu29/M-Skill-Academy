/* =========================================================================
   NEXORA — COURSE EXPLORER & COURSE DETAILS
   Renders the searchable/filterable course grid on pages/courses.html and
   the full course detail view on pages/course-details.html. All content
   comes from the `courses` array defined in js/data.js — no HTML is
   duplicated per course.
   ========================================================================= */

(function () {
  "use strict";

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function icon(name, extra) {
    return `<i data-lucide="${name}" ${extra || ""}></i>`;
  }

  function badgeHtml(course) {
    if (!course.badge) return "";
    const cls = course.badge === "Flagship" ? "badge-flagship" : course.badge === "Popular" ? "badge-popular" : "badge-career";
    return `<span class="badge ${cls}">${course.badge}</span>`;
  }

  function feeHtml(course) {
    if (course.launchFee) {
      return `<div class="program-fee">₹${course.launchFee.toLocaleString("en-IN")}<small>Launch Fee &middot; Regular ₹${course.regularFeeMin.toLocaleString("en-IN")}–₹${course.regularFeeMax.toLocaleString("en-IN")}</small></div>`;
    }
    return `<div class="program-fee">₹${course.feeMin.toLocaleString("en-IN")}–₹${course.feeMax.toLocaleString("en-IN")}<small>Indicative fee</small></div>`;
  }

  function courseCard(c) {
    const catName = categories.find((cat) => cat.id === c.category)?.name || "";
    return `
    <div class="card program-card reveal" data-course-card data-category="${c.category}" data-duration="${c.durationMonths}" data-level="${c.level}" data-fee="${c.feeMax}" data-title="${c.title.toLowerCase()}">
      <div class="program-card-top">
        <span class="badge badge-level">${levels[c.level].label}</span>
        ${badgeHtml(c)}
      </div>
      <h3>${c.title}</h3>
      <div class="program-meta">
        <span>${icon("tag", 'width="14" height="14"')} ${catName}</span>
        <span>${icon("clock", 'width="14" height="14"')} ${c.duration}</span>
      </div>
      <p>${c.description}</p>
      <div class="program-skills">${c.skills.slice(0, 3).map((s) => `<span class="chip">${s}</span>`).join("")}</div>
      ${feeHtml(c)}
      <div class="program-card-actions">
        <a class="btn btn-outline btn-sm" href="course-details.html?id=${c.id}">View Details</a>
        <button class="btn btn-secondary btn-sm" data-modal-open="enquiryModal" data-course-title="${c.title}">Enquire Now</button>
      </div>
    </div>`;
  }

  function skeletonCard() {
    return `
    <div class="skeleton-card">
      <div class="skeleton-line h-badge"></div>
      <div class="skeleton-line w-70" style="height:18px; margin-top:0.8rem;"></div>
      <div class="skeleton-line w-40"></div>
      <div class="skeleton-line w-100"></div>
      <div class="skeleton-line w-100"></div>
      <div class="skeleton-line w-70" style="margin-bottom:1.2rem;"></div>
      <div class="skeleton-line h-btn"></div>
      <div class="skeleton-line h-btn"></div>
    </div>`;
  }

  function initCourseExplorer() {
    const grid = document.querySelector("[data-course-grid]");
    if (!grid) return;

    const searchInput = document.querySelector("[data-course-search]");
    const categorySelect = document.querySelector("[data-filter-category]");
    const durationSelect = document.querySelector("[data-filter-duration]");
    const levelSelect = document.querySelector("[data-filter-level]");
    const priceSelect = document.querySelector("[data-filter-price]");
    const resultsMeta = document.querySelector("[data-filter-results]");
    const emptyState = document.querySelector("[data-empty-state]");
    const filterBar = document.querySelector("[data-filter-bar]");

    if (filterBar) filterBar.classList.add("is-sticky");

    // Show skeleton placeholders first so the grid never appears empty,
    // and so this is ready for a real async data source later.
    grid.innerHTML = Array.from({ length: 6 }).map(skeletonCard).join("");

    // Populate category filter dynamically
    if (categorySelect) {
      categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        categorySelect.appendChild(opt);
      });
    }

    // Pre-select category from ?category= query param
    const presetCategory = getQueryParam("category");
    if (presetCategory && categorySelect) categorySelect.value = presetCategory;

    function renderRealGrid() {
      grid.innerHTML = courses.map(courseCard).join("");
      if (window.lucide) lucide.createIcons();
      if (window.refreshScrollReveal) window.refreshScrollReveal();
      applyFilters();
    }

    function applyFilters() {
      const query = (searchInput?.value || "").trim().toLowerCase();
      const cat = categorySelect?.value || "";
      const dur = durationSelect?.value || "";
      const level = levelSelect?.value || "";
      const price = priceSelect?.value || "";

      let visibleCount = 0;
      grid.querySelectorAll("[data-course-card]").forEach((card) => {
        const matchesQuery = !query || card.getAttribute("data-title").includes(query);
        const matchesCategory = !cat || card.getAttribute("data-category") === cat;
        const matchesDuration = !dur || card.getAttribute("data-duration") === dur;
        const matchesLevel = !level || card.getAttribute("data-level") === level;
        const fee = parseInt(card.getAttribute("data-fee"), 10);
        let matchesPrice = true;
        if (price === "low") matchesPrice = fee <= 10000;
        if (price === "mid") matchesPrice = fee > 10000 && fee <= 40000;
        if (price === "high") matchesPrice = fee > 40000;

        const visible = matchesQuery && matchesCategory && matchesDuration && matchesLevel && matchesPrice;
        card.classList.toggle("hidden", !visible);
        if (visible) visibleCount++;
      });

      if (resultsMeta) resultsMeta.textContent = `Showing ${visibleCount} of ${courses.length} courses`;
      if (emptyState) emptyState.classList.toggle("hidden", visibleCount !== 0);
    }

    [searchInput, categorySelect, durationSelect, levelSelect, priceSelect].forEach((el) => {
      if (el) el.addEventListener("input", applyFilters);
    });

    // Brief, deliberate delay so the skeleton state is visible (and this
    // code path is already shaped for a real async fetch() later — just
    // replace the setTimeout with the actual request).
    setTimeout(renderRealGrid, 350);
  }

  function renderCourseDetails() {
    const mount = document.querySelector("[data-course-details]");
    if (!mount) return;
    const id = getQueryParam("id");
    const course = courses.find((c) => c.id === id) || courses.find((c) => c.featured);

    if (!course) {
      mount.innerHTML = `<div class="empty-state"><h3>Course not found</h3><p>Please choose a course from our <a href="courses.html">course explorer</a>.</p></div>`;
      return;
    }

    document.title = `${course.title} | ${INSTITUTE.name}`;
    const catName = categories.find((cat) => cat.id === course.category)?.name || "";

    mount.innerHTML = `
      <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="courses.html">Courses</a> / ${course.title}</div>
      <div class="program-card-top" style="margin-bottom:0.8rem;">
        <span class="badge badge-level">${levels[course.level].label}</span>
        ${badgeHtml(course)}
      </div>
      <h1>${course.title}</h1>
      <div class="program-meta" style="margin-bottom:1.4rem;">
        <span>${icon("tag", 'width="15" height="15"')} ${catName}</span>
        <span>${icon("clock", 'width="15" height="15"')} ${course.duration}</span>
        <span>${icon("award", 'width="15" height="15"')} ${course.certificate}</span>
      </div>
      <p class="lede">${course.description}</p>
      ${feeHtml(course)}
      <div class="hero-cta-row">
        <button class="btn btn-secondary" data-modal-open="enquiryModal" data-course-title="${course.title}">Enquire About This Program</button>
        <button class="btn btn-outline" data-modal-open="brochureModal">Download Brochure</button>
      </div>

      <div class="section-tight">
        <h3>Who Should Join</h3>
        <p>${course.prerequisites.join(", ")}</p>
      </div>

      <div class="grid grid-2" style="align-items:start;">
        <div>
          <h3>Curriculum</h3>
          <ol style="padding-left:1.2rem; list-style:decimal;">
            ${course.modules.map((m) => `<li style="margin-bottom:0.6rem;">${m}</li>`).join("")}
          </ol>
        </div>
        <div>
          <h3>Skills You'll Build</h3>
          <div class="program-skills" style="margin-bottom:1.6rem;">${course.skills.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
          <h3>Projects</h3>
          <ul style="padding-left:1.2rem; list-style:disc;">
            ${course.projects.map((p) => `<li style="margin-bottom:0.5rem;">${p}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="section-tight">
        <h3>Assessment</h3>
        <ul style="padding-left:1.2rem; list-style:disc;">
          ${course.assessment.map((a) => `<li style="margin-bottom:0.5rem;">${a}</li>`).join("")}
        </ul>
      </div>

      <div class="section-tight">
        <h3>Career Outcomes</h3>
        <p class="text-muted">This program builds practical, job-relevant skills and is paired with career assistance — resume building, mock interviews and LinkedIn guidance — through our Career & Employability track. We do not promise guaranteed placement; outcomes depend on individual effort, practice and the job market.</p>
      </div>

      <div class="section-tight" style="border-top:1px solid var(--line); padding-top:2rem;">
        <button class="btn btn-secondary" data-modal-open="enquiryModal" data-course-title="${course.title}">Enquire About This Program</button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCourseExplorer();
    renderCourseDetails();
  });
})();
