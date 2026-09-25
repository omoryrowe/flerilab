(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      links.classList.toggle("is-open");
    });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      });
    });
  }

  // Contact form
  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot spam check
      var honeypot = form.querySelector('input[name="_honeypot"]');
      if (honeypot && honeypot.value) {
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      status.className = "form-status";
      status.textContent = "";

      var formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            status.textContent = "Thank you — your message has been sent. We'll be in touch soon.";
            status.className = "form-status show success";
          } else {
            status.textContent = "Something went wrong sending your message. Please try again or email us directly.";
            status.className = "form-status show error";
          }
        })
        .catch(function () {
          status.textContent = "We couldn't reach the server. Please check your connection and try again.";
          status.className = "form-status show error";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
    });
  }
})();
