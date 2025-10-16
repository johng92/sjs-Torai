document.addEventListener('DOMContentLoaded', () => {
  // Sticky nav
  const sectionStats = document.querySelector('.admin-stats');
  const adminMain   = document.querySelector('.admin-main');

  const obs = new IntersectionObserver(
    (entries) => {
      const ent = entries[0];
      adminMain.classList.toggle('sticky', !ent.isIntersecting);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: '-120px'
    }
  );

  obs.observe(sectionStats);
  
// Search Icon
  const toggleBtn  = document.getElementById('searchToggle');
  const searchForm = document.getElementById('searchForm');

  toggleBtn.addEventListener('click', () => {
    const isOpen = searchForm.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      // Focus the input when shown
      searchForm.querySelector('input[type="search"]').focus();
    }
  });

  // Optional: close when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && !toggleBtn.contains(e.target)) {
      searchForm.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
});
