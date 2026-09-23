const form = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

function setUtmFields() {
  const params = new URLSearchParams(window.location.search);
  const fields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  fields.forEach((field) => {
    document.getElementById(field).value = params.get(field) || "";
  });

  document.getElementById("page_url").value = window.location.href;
}

setUtmFields();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!window.APP_SCRIPT_URL || window.APP_SCRIPT_URL.includes("PASTE_YOUR")) {
    formMessage.className = "form-message error";
    formMessage.textContent = "Add your Google Apps Script Web App URL in config.js first.";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  formMessage.textContent = "";
  formMessage.className = "form-message";

  const formData = new FormData(form);
  formData.append("submitted_at_client", new Date().toISOString());

  try {
    // Apps Script web apps are easiest to submit to from a static site using no-cors.
    // The response is intentionally opaque, so the frontend shows success after the request is sent.
    await fetch(window.APP_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(formData),
    });

    formMessage.className = "form-message success";
    formMessage.textContent = "Thank you. Your enquiry has been submitted.";
    form.reset();
    setUtmFields();

    // Optional Meta Pixel conversion event:
    // if (typeof fbq === "function") fbq("track", "Lead");

    // Optional Google Ads / GA4 conversion event:
    // gtag("event", "generate_lead");
  } catch (error) {
    console.error(error);
    formMessage.className = "form-message error";
    formMessage.textContent = "Submission failed. Please try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Enquiry";
  }
});

/* CTA BUTTON FUNCTIONS */

const applySection = document.getElementById("apply");
const nameField = document.getElementById("full_name");

function goToApplicationForm() {
  if (!applySection) return;

  applySection.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  applySection.classList.remove("form-highlight");
  void applySection.offsetWidth;
  applySection.classList.add("form-highlight");

  setTimeout(() => {
    if (nameField) {
      nameField.focus({ preventScroll: true });
    }
  }, 600);
}

/* Make Apply Now and Request Program Details work */

document.querySelectorAll('a[href="#apply"]').forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    goToApplicationForm();
  });
});

/* Mobile Apply Button */

const mobileCTA = document.createElement("button");

mobileCTA.type = "button";
mobileCTA.className = "mobile-apply-cta";

mobileCTA.innerHTML = `
  <span>Interested in the program?</span>
  <strong>Apply Now</strong>
`;

document.body.appendChild(mobileCTA);

mobileCTA.addEventListener("click", goToApplicationForm);

/* Hide mobile button while form is visible */

if ("IntersectionObserver" in window && applySection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        mobileCTA.classList.toggle(
          "hide-mobile-cta",
          entry.isIntersecting
        );
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(applySection);
}


/* =====================================================
   ADVANCED DOCTYN CTA SYSTEM
===================================================== */

const applyModal = document.getElementById("applyModal");
const applicationSection = document.getElementById("apply");
const fullNameInput = document.getElementById("full_name");

function openApplyModal() {
  if (!applyModal) return;

  applyModal.classList.add("active");
  applyModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

function closeApplyModal() {
  if (!applyModal) return;

  applyModal.classList.remove("active");
  applyModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

function focusApplicationForm() {
  closeApplyModal();

  if (!applicationSection) return;

  applicationSection.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  applicationSection.classList.remove("form-highlight");
  void applicationSection.offsetWidth;
  applicationSection.classList.add("form-highlight");

  setTimeout(() => {
    if (fullNameInput) {
      fullNameInput.focus({
        preventScroll: true
      });
    }
  }, 650);
}

/* Apply Now */

document
  .querySelectorAll(".apply-now-trigger")
  .forEach((button) => {
    button.addEventListener("click", openApplyModal);
  });

/* Close modal */

document
  .querySelectorAll("[data-close-modal]")
  .forEach((item) => {
    item.addEventListener("click", closeApplyModal);
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeApplyModal();
  }
});

/* Modal actions */

document
  .querySelectorAll("[data-action]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const action = button.dataset.action;

      if (action === "application") {
        focusApplicationForm();
      }

      if (action === "details") {
        focusApplicationForm();

        const course = document.getElementById("course");

        setTimeout(() => {
          if (course) course.focus();
        }, 750);
      }

      if (action === "explore") {
        closeApplyModal();

        const section =
          document.querySelector(".section");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }

    });

  });


/* =====================================================
   HERO FEATURE CARDS
===================================================== */

document
  .querySelectorAll(".feature-action")
  .forEach((card) => {

    card.addEventListener("click", () => {

      const type = card.dataset.feature;

      if (type === "structure") {
        showFeatureMessage(
          "12-Month Structured Journey",
          "Explore a progressive learning pathway designed to build specialty knowledge step by step."
        );
      }

      if (type === "faculty") {
        showFeatureMessage(
          "Specialty-Focused Faculty",
          "Understand how expert-led sessions, clinical discussions and specialty teaching support structured learning."
        );
      }

      if (type === "flexible") {
        showFeatureMessage(
          "Designed Around Clinical Practice",
          "See how structured learning can be integrated alongside professional and clinical responsibilities."
        );
      }

    });

  });


function showFeatureMessage(title, description) {

  let panel =
    document.getElementById("featureInfoPanel");

  if (!panel) {

    panel = document.createElement("div");

    panel.id = "featureInfoPanel";

    panel.className = "feature-info-panel";

    panel.innerHTML = `
      <button
        class="feature-panel-close"
        type="button">
        ×
      </button>

      <span class="eyebrow">
        Program Insight
      </span>

      <h3 id="featurePanelTitle"></h3>

      <p id="featurePanelDescription"></p>

      <button
        type="button"
        class="feature-panel-cta">
        Get Program Details
      </button>
    `;

    document.body.appendChild(panel);

    panel
      .querySelector(".feature-panel-close")
      .addEventListener("click", () => {
        panel.classList.remove("active");
      });

    panel
      .querySelector(".feature-panel-cta")
      .addEventListener("click", () => {
        panel.classList.remove("active");
        focusApplicationForm();
      });

  }

  document.getElementById(
    "featurePanelTitle"
  ).textContent = title;

  document.getElementById(
    "featurePanelDescription"
  ).textContent = description;

  panel.classList.add("active");
}

