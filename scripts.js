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
  const rubroSelect = document.getElementById("rubro");
  const rubroInfo = document.getElementById("rubro-info");
  if (rubroSelect) {
    const datos = {
      ecommerce: {
        amenazas: ["Robo de datos de tarjetas", "Interrupci\u00f3n del sitio"],
        solucion: "Protegemos tus transacciones y monitoreamos cada actividad.",
      },
      salud: {
        amenazas: ["Ransomware", "Filtraci\u00f3n de historiales m\u00e9dicos"],
        solucion: "Implementamos cifrado y copias de seguridad diarias.",
      },
      servicios: {
        amenazas: ["Suplantaci\u00f3n de identidad", "P\u00e9rdida de informaci\u00f3n"],
        solucion: "Capacitamos a tu personal y controlamos accesos.",
      },
    };

    rubroSelect.addEventListener("change", () => {
      const val = rubroSelect.value;
      if (!val) {
        rubroInfo.innerHTML = "";
        return;
      }
      const info = datos[val];
      rubroInfo.innerHTML = `
        <h4>Amenazas principales</h4>
        <ul>${info.amenazas.map((a) => `<li>${a}</li>`).join("")}</ul>
        <p><strong>Cómo te protege Arkangel:</strong> ${info.solucion}</p>
      `;
    });
  }
});

