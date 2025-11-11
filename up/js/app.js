// Mobile Nav
let nav = document.querySelector(".header__nav-links");
let burger = document.querySelector(".header__nav-hamburger");
let burgerFirstLine = document.querySelector(".line-1");
let burgerSecondLine = document.querySelector(".line-2");
let burgerThirdLine = document.querySelector(".line-3");

burger.addEventListener("click", function() {
  burgerFirstLine.classList.toggle("line-1-toggled");
  burgerSecondLine.classList.toggle("line-2-toggled");
  burgerThirdLine.classList.toggle("line-3-toggled");

  nav.classList.toggle("display-nav");
});

// To Hide the Logo on scroll

const logo = document.querySelector('.header__nav-logo');
const scrollThreshold = 50; // Logo hides after scrolling 50px from top

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > scrollThreshold) {
    // Scrolled down - hide logo
    logo.classList.add('hide-logo');
  } else {
    // At the top of the page - show logo
    logo.classList.remove('hide-logo');
  }
});

// BAck to Top
// Create back to top button dynamically
const createBackToTopBtn = () => {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(btn);
  return btn;
};

// Initialize button
const backToTopBtn = createBackToTopBtn();
const scrollThresholdBtn = 300;

// Show/hide logic
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > scrollThresholdBtn) {
    backToTopBtn.classList.add('show-back-to-top');
  } else {
    backToTopBtn.classList.remove('show-back-to-top');
  }
});

// Smooth scroll to top
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});