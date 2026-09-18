/* =========================================================================
   NEXORA — CERTIFICATE VERIFICATION (FRONTEND DEMO)
   -------------------------------------------------------------------------
   This checks a Certificate ID against the `certificates` object in
   js/data.js. It is a FRONTEND-ONLY DEMONSTRATION.

   IMPORTANT FOR PRODUCTION:
   Replace this lookup with a call to a secure backend/database before
   issuing real certificates. Never ship real student data in a public
   JS file — this sample only contains placeholder records.
   ========================================================================= */

(function () {
  "use strict";

  function renderResult(container, id, record) {
    if (!record) {
      container.innerHTML = `
        <div class="verify-result invalid">
          <div class="verify-status invalid"><i data-lucide="x-circle"></i> Certificate not found</div>
          <p class="mb-0">Certificate not found. Please check the Certificate ID and try again, or contact us if you believe this is an error.</p>
        </div>`;
    } else {
      container.innerHTML = `
        <div class="verify-result valid">
          <div class="verify-status valid"><i data-lucide="check-circle"></i> Certificate Verified</div>
          <dl class="verify-grid">
            <div><dt>Student</dt><dd>${record.student}</dd></div>
            <div><dt>Course</dt><dd>${record.course}</dd></div>
            <div><dt>Duration</dt><dd>${record.duration}</dd></div>
            <div><dt>Issue Date</dt><dd>${record.issueDate}</dd></div>
            <div><dt>Certificate ID</dt><dd>${id}</dd></div>
            <div><dt>Status</dt><dd>${record.status}</dd></div>
          </dl>
        </div>`;
    }
    if (window.lucide) lucide.createIcons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("[data-verify-form]");
    const resultMount = document.querySelector("[data-verify-result]");
    if (!form || !resultMount) return;

    // Build the "try a sample ID" buttons straight from the certificates
    // data (js/data.js), so they always match whatever certificatePrefix
    // is configured in js/config.js — nothing hardcoded here.
    const sampleButtonsMount = document.querySelector("[data-sample-cert-buttons]");
    if (sampleButtonsMount && typeof certificates !== "undefined") {
      const sampleIds = Object.keys(certificates).slice(0, 2);
      sampleButtonsMount.innerHTML = sampleIds
        .map((id, i) => `<button class="btn-ghost btn-sm" data-sample-id="${id}" style="padding:0;">${id}</button>${i < sampleIds.length - 1 ? " &middot; " : ""}`)
        .join("");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("[data-verify-input]");
      const id = (input.value || "").trim().toUpperCase();
      if (!id) return;
      const record = certificates[id];
      resultMount.classList.remove("hidden");
      renderResult(resultMount, id, record);
    });

    document.querySelectorAll("[data-sample-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = form.querySelector("[data-verify-input]");
        input.value = btn.getAttribute("data-sample-id");
        form.dispatchEvent(new Event("submit"));
      });
    });
  });
})();
