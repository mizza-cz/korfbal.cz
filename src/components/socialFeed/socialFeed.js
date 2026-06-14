document.querySelectorAll(".socialFeedSlider").forEach((slider) => {
  new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 8,
    loop: true,
    speed: 1000,

    breakpoints: {
      460: {
        slidesPerView: 2,
      },

      721: {
        slidesPerView: 3,
      },

      1100: {
        slidesPerView: 4,
      },
    },
  });
});
