/* =========================================================================
   NEXORA — FORMS
   Validates and "submits" the Admission / Enquiry form. There is no backend
   in Phase 1, so submission is intercepted and simulated locally.

   FUTURE BACKEND INTEGRATION:
   Replace the body of `simulateSubmission()` with a real fetch() call to
   your API (PHP / Node.js / Firebase / Supabase / CRM webhook). The form
   field names below are already structured as a clean payload object, so
   no HTML changes should be needed — just swap the submission function.
   ========================================================================= */

(function () {
  "use strict";

  const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian mobile format, 10 digits starting 6-9
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(field, message) {
    field.classList.add("has-error");
    const errorEl = field.parentElement.querySelector(".field-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("is-visible");
    }
  }

  function clearError(field) {
    field.classList.remove("has-error");
    const errorEl = field.parentElement.querySelector(".field-error");
    if (errorEl) errorEl.classList.remove("is-visible");
  }

  function validateField(field) {
    const value = field.value.trim();
    const type = field.getAttribute("data-validate");

    if (field.hasAttribute("required") && !value && field.type !== "checkbox") {
      showError(field, "This field is required.");
      return false;
    }
    if (field.type === "checkbox" && field.hasAttribute("required") && !field.checked) {
      showError(field, "Please provide your consent to continue.");
      return false;
    }
    if (type === "name" && value && value.length < 2) {
      showError(field, "Please enter your full name.");
      return false;
    }
    if (type === "phone" && value && !PHONE_REGEX.test(value.replace(/\s+/g, ""))) {
      showError(field, "Enter a valid 10-digit Indian mobile number.");
      return false;
    }
    if (type === "email" && value && !EMAIL_REGEX.test(value)) {
      showError(field, "Enter a valid email address.");
      return false;
    }
    if (field.tagName === "SELECT" && field.hasAttribute("required") && !value) {
      showError(field, "Please make a selection.");
      return false;
    }

    clearError(field);
    return true;
  }

  function simulateSubmission(payload) {
    // ---- Phase 1 (current): no backend. Log locally and confirm to user. ----
    console.log("Enquiry form payload (demo — not sent anywhere):", payload);
    return Promise.resolve({ ok: true });

    // ---- Phase 2 (future) example ----
    // return fetch("https://api.example.com/enquiries", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // }).then((res) => res.json());
  }

  function initEnquiryForm() {
    const form = document.querySelector("[data-enquiry-form]");
    if (!form) return;

    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("has-error")) validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      fields.forEach((field) => {
        if (!validateField(field)) isValid = false;
      });
      if (!isValid) {
        showToast("Please check the highlighted fields.", "alert-circle");
        return;
      }

      const payload = {};
      fields.forEach((field) => {
        if (field.type === "checkbox") {
          payload[field.name] = field.checked;
        } else {
          payload[field.name] = field.value.trim();
        }
      });
      payload.submittedAt = new Date().toISOString();

      const submitBtn = form.querySelector("[type='submit']");
      if (submitBtn) submitBtn.setAttribute("disabled", "true");

      simulateSubmission(payload).then(() => {
        form.reset();
        fields.forEach(clearError);
        if (submitBtn) submitBtn.removeAttribute("disabled");

        const overlay = form.closest(".modal-overlay");
        if (overlay) overlay.classList.remove("is-open");

        showToast("Thank you! Your enquiry has been recorded for this demo.", "check-circle");
      });
    });
  }

  function initBrochureButton() {
    // Brochure modal itself opens via data-modal-open="brochureModal";
    // this just wires up any direct "Download Brochure" buttons that
    // don't already use the modal attribute pattern.
    document.querySelectorAll("[data-brochure-download]").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.openModalById("brochureModal");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initEnquiryForm();
    initBrochureButton();
  });
})();
