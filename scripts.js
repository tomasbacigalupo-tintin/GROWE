// Animaciones y parallax
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(
    ".fade-up, .slide-in-left, .slide-in-right",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  faders.forEach((el) => observer.observe(el));

  const parallaxElems = document.querySelectorAll(".parallax");
  window.addEventListener("scroll", () => {
    const scroll = window.pageYOffset;
    parallaxElems.forEach((el) => {
      el.style.backgroundPositionY = `${scroll * -0.3}px`;
    });
  });

  const modal = document.getElementById("contact-modal");
  const openModalBtn = document.getElementById("open-modal");
  const closeModalBtn = document.querySelector(".modal-close");
  const modalForm = document.getElementById("modal-form");

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        navToggle.classList.remove("active");
        nav.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    })
  );

  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });

  modalForm.addEventListener("submit", (e) => {
    if (!modalForm.checkValidity()) {
      e.preventDefault();
      modalForm.reportValidity();
    }
  });
});

