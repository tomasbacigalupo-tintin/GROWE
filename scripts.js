// Animaciones y parallax
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(el => observer.observe(el));

  const parallaxElems = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    parallaxElems.forEach(el => {
      el.style.backgroundPositionY = `${scroll * -0.3}px`;
    });
  });
});
