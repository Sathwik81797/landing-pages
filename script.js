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
