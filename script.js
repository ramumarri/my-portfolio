// Small, dependency-free interactions for navigation and scroll reveals.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    });
  });
}

// Reveal content as it enters the viewport; keep it visible when motion is reduced.
const revealItems = document.querySelectorAll(".reveal, .skill-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

// Set this to Marri's real email address to enable contact-form email drafts.
const contactEmail = "";
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactEmail) {
      formStatus.textContent = "The owner needs to add an email address in script.js before messages can be sent.";
      return;
    }

    const formData = new FormData(contactForm);
    const subject = `Portfolio message from ${formData.get("name")}`;
    const body = `From: ${formData.get("name")} (${formData.get("email")})\n\n${formData.get("message")}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = "Opening your email app…";
  });
}

// Rotate a small set of words to add a quiet motion cue without hiding the tagline.
const typedWord = document.querySelector(".typed-word");
const words = ["intelligent", "human", "meaningful"];
if (typedWord && !reduceMotion) {
  let wordIndex = 0;
  window.setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    typedWord.textContent = words[wordIndex];
  }, 2600);
}
