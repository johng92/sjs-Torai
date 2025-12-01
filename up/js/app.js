// MOBILE NAVIGATION MENU

let nav = document.querySelector(".header__nav");
let burger = document.querySelector(".hamburger");
let burgerFirstLine = document.querySelector(".hamburger__line:nth-child(1)");
let burgerSecondLine = document.querySelector(".hamburger__line:nth-child(2)");
let burgerThirdLine = document.querySelector(".hamburger__line:nth-child(3)");


burger.addEventListener("click", function() {
  burgerFirstLine.classList.toggle("hamburger__line-1");
  burgerSecondLine.classList.toggle("hamburger__line-2");
  burgerThirdLine.classList.toggle("hamburger__line-3");


  nav.classList.toggle("display__nav");
})

// ========= Dynamic News Ticker (NO swiper conflict) =========
function initNoticeTicker() {
  const container = document.querySelector('.notice-bar');
  const list = document.querySelector('.notice-bar__list');

  if (!container || !list) return;

  // Clone items once to create seamless loop
  const originalHTML = list.innerHTML;
  list.innerHTML = originalHTML + originalHTML;

  let x = 0;
  let lastTime = null;

  // speed in pixels per second (adjust if you want faster/slower)
  const SPEED = 60;

  function step(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000; // seconds
    lastTime = timestamp;

    // Move left
    x -= SPEED * delta;

    // Width of original content (half of the doubled list)
    const originalWidth = list.scrollWidth / 2;

    // When we've shifted past one full set, reset
    if (Math.abs(x) >= originalWidth) {
      x += originalWidth; // keep it seamless
    }

    list.style.transform = `translateX(${x}px)`;

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Run after everything (including Swipers) is ready
window.addEventListener('load', initNoticeTicker);


/* ==========================================================
   MASTER SWIPER INITIALIZER
   Works for: leadership, teachers, gallery, testimonials, etc.
   DO NOT change your HTML — this script adapts automatically.
========================================================== */

function initSwipers() {
  document.querySelectorAll('.swiper[data-swiper]').forEach(swiperRoot => {

    const type = swiperRoot.dataset.swiper;
    const wrapper = swiperRoot.querySelector('.slider-wrapper'); // REAL SWIPER
    const pagination = wrapper.querySelector('.swiper-pagination');
    const nextBtn = wrapper.querySelector('.swiper-button-next');
    const prevBtn = wrapper.querySelector('.swiper-button-prev');

    // Base config
    let options = {
      loop: true,
      grabCursor: true,
      speed: 1000,
      spaceBetween: 30,
      observer: true,
      observeParents: true,
      watchOverflow: true,

      breakpoints: {
        0:   { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024:{ slidesPerView: 3 }
      }
    };

    // Pagination attach (if exists)
    if (pagination) {
      options.pagination = {
        el: pagination,
        clickable: true,
        dynamicBullets: true
      };
    }

    // Variant rules
    if (type === "leadership") {
      options.autoplay = { delay: 2300, disableOnInteraction: false };
      if (window.innerWidth >= 500 && nextBtn && prevBtn) {
        options.navigation = { nextEl: nextBtn, prevEl: prevBtn };
      }
    }

    if (type === "teachers") {
      options.autoplay = { delay: 1800, disableOnInteraction: false };
       if (window.innerWidth >= 500 && nextBtn && prevBtn) {
        options.navigation = { nextEl: nextBtn, prevEl: prevBtn };
      }
    }

    if (type === "gallery") {
      options.autoplay = { delay: 2900 };
      if (nextBtn && prevBtn) {
        options.navigation = { nextEl: nextBtn, prevEl: prevBtn };
      }
    }

    if (type === "testimonials") {
      options.autoplay = { delay: 5500 };
      // no arrows unless added
       // Force 1 card per view everywhere
      options.breakpoints = {
        0:   { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024:{ slidesPerView: 1 }
      };
    }

    // Initialize REAL swiper
    new Swiper(wrapper, options);
  });
}

initSwipers();
// // BAck to Top
// // Create back to top button dynamically
// const createBackToTopBtn = () => {
//   const btn = document.createElement('button');
//   btn.className = 'back-to-top';
//   btn.setAttribute('aria-label', 'Back to top');
//   btn.innerHTML = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//       <polyline points="18 15 12 9 6 15"></polyline>
//     </svg>
//   `;
//   document.body.appendChild(btn);
//   return btn;
// };

// // Initialize button
// const backToTopBtn = createBackToTopBtn();
// const scrollThresholdBtn = 300;

// // Show/hide logic
// window.addEventListener('scroll', () => {
//   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
//   if (currentScroll > scrollThresholdBtn) {
//     backToTopBtn.classList.add('show-back-to-top');
//   } else {
//     backToTopBtn.classList.remove('show-back-to-top');
//   }
// });

// // Smooth scroll to top
// backToTopBtn.addEventListener('click', () => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
// });