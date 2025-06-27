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
  const mainForm = document.getElementById("main-contact-form");

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

  function handleSubmit(form) {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      e.preventDefault();
      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.querySelector("[name='nombre']").value,
          email: form.querySelector("[name='email']").value,
          mensaje: form.querySelector("[name='mensaje']")?.value || "",
        }),
      }).then(() => {
        form.reset();
        alert("Mensaje enviado con éxito");
      }).catch(() => alert("Error al enviar el mensaje"));
    });
  }

  handleSubmit(modalForm);
  if (mainForm) handleSubmit(mainForm);
  const contactPageForm = document.getElementById("contact-form");
  if (contactPageForm) handleSubmit(contactPageForm);

  const readMoreLinks = document.querySelectorAll(".btn-outline-primary");
  if (readMoreLinks.length) {
    readMoreLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const modal = document.createElement("div");
        modal.className = "modal fade";
        modal.tabIndex = -1;
        modal.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Información del Artículo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Este artículo estará disponible pronto.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>`;
        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      });
    });
  }
});

