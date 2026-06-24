const competitionContentPartners = document.querySelector(
  ".competitionContentPartners"
);

if (competitionContentPartners) {
  new Swiper(competitionContentPartners, {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    speed: 500,
    navigation: {
      nextEl: competitionContentPartners.querySelector(
        ".competitionContentPartners__arrow--next"
      ),
      prevEl: competitionContentPartners.querySelector(
        ".competitionContentPartners__arrow--prev"
      ),
      disabledClass: "is-disabled",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      621: { slidesPerView: 2 },
      741: { slidesPerView: 2 },
      931: { slidesPerView: 3 },
      1200: { slidesPerView: 3 },
    },
  });
}
