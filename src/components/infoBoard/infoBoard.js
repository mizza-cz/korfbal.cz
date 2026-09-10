document.querySelectorAll(".infoBoardSlider").forEach((slider) => {
  const swiperEl = slider.querySelector(".swiper");

  if (!swiperEl) return;

  new Swiper(swiperEl, {
    spaceBetween: 16,
    loop: false,
    speed: 1000,

    navigation: {
      nextEl: slider.querySelector(".infoBoardSlider__arrow--next"),
      prevEl: slider.querySelector(".infoBoardSlider__arrow--prev"),
      disabledClass: "is-disabled",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      410: {
        slidesPerView: 2,
      },
      720: {
        slidesPerView: "auto",
      },
    },
  });
});
