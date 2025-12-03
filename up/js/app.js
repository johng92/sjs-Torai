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
  const titleDesktop = document.querySelector('.notice-bar__title');
  const titleMobile = document.querySelector('.notice-bar__title-mobile');

  if (!container || !list) return;

  // Clone original content once
  const originalHTML = list.innerHTML;
  list.innerHTML = originalHTML + originalHTML;

  // Detect which title is visible (desktop or mobile)
  const activeTitle =
    titleMobile && window.getComputedStyle(titleMobile).display !== "none"
      ? titleMobile
      : titleDesktop;

  const titleWidth = activeTitle ? activeTitle.offsetWidth : 0;

  // Start position shifted **after** the title
  let x = titleWidth;
  let lastTime = null;

  const SPEED = 60; // px/sec (adjust as desired)

  function step(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    x -= SPEED * delta;

    const originalWidth = list.scrollWidth / 2;

    // Reset when one full cycle has passed
    if (Math.abs(x - titleWidth) >= originalWidth) {
      // Reset exactly after title width
      x = titleWidth;
    }

    list.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);

  // Recalculate on resize
  window.addEventListener("resize", () => {
    const updatedTitleWidth =
      titleMobile && window.getComputedStyle(titleMobile).display !== "none"
        ? titleMobile.offsetWidth
        : titleDesktop.offsetWidth;

    x = updatedTitleWidth; // new start offset
  });
}

initNoticeTicker();


// Time Ago Live Update for Notice Times  
// Run after everything (including Swipers) is ready
window.addEventListener('load', initNoticeTicker);

(function initTimeAgoLive() {
  const items = document.querySelectorAll(".notice-bar__time[data-date], .news-card__date[data-date]");
  if (!items.length) return;

  function timeAgo(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return "";

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const units = [
      { name: "year", sec: 31536000 },
      { name: "month", sec: 2592000 },
      { name: "day", sec: 86400 },
      { name: "hour", sec: 3600 },
      { name: "minute", sec: 60 }
    ];

    for (const u of units) {
      const count = Math.floor(seconds / u.sec);
      if (count >= 1)
        return `${count} ${u.name}${count > 1 ? "s" : ""} ago |`;
    }

    return "just now |";
  }

  function updateAll() {
    items.forEach(el => {
      const dateStr = el.dataset.date;
      el.textContent = timeAgo(dateStr);
    });
  }

  updateAll();
  setInterval(updateAll, 60000); // refresh every 1 minute
})();


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

document.querySelectorAll('.admission-faq__item').forEach(item => {
  const question = item.querySelector('.admission-faq__question');
  const icon = item.querySelector('.faq-icon');
  const answer = item.querySelector('.admission-faq__answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.admission-faq__item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-icon').classList.replace('fa-minus', 'fa-plus');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('active');
      icon.classList.replace('fa-plus', 'fa-minus');
    } else {
      item.classList.remove('active');
      icon.classList.replace('fa-minus', 'fa-plus');
    }
  });
});

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