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

// SwiperJS Carousel
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,

    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    speed: 1200,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        620: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
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