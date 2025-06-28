// 1. Animaciones de scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateElements.forEach(el => observer.observe(el));

// 2. Validación de formulario en tiempo real
const form = document.querySelector('form');
if (form) {
  const fields = form.querySelectorAll('input, textarea');
  fields.forEach(field => {
    field.addEventListener('input', () => validateField(field));
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    fields.forEach(field => {
      if (!validateField(field)) valid = false;
    });
    if (valid) {
      showSuccessToast();
      form.reset();
      fields.forEach(field => clearError(field));
    }
  });
}

function validateField(field) {
  let valid = true;
  let message = '';
  if (field.required && !field.value.trim()) {
    valid = false;
    message = 'Este campo es obligatorio.';
  } else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      valid = false;
      message = 'Introduce un email válido.';
    }
  }
  setError(field, message);
  return valid;
}

function setError(field, message) {
  clearError(field);
  if (message) {
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.classList.add('input-error');
  } else {
    field.classList.remove('input-error');
  }
}

function clearError(field) {
  const error = field.parentNode.querySelector('.field-error');
  if (error) error.remove();
  field.classList.remove('input-error');
}

// 3. Notificación de envío exitoso
function showSuccessToast() {
  let toast = document.createElement('div');
  toast.className = 'success-toast';
  toast.textContent = '¡Formulario enviado con éxito!';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }, 10);
}

// 4. Menú móvil desplegable
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('menu-open');
    navToggle.classList.toggle('open');
  });
}
