// Animaciones con Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-up');
  const options = {
    threshold: 0.1,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(el => {
    observer.observe(el);
  });
});
