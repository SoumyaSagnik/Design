const left = document.querySelector("#left");
const right = document.querySelector("#right");

const mySwiper = new Swiper("#myCarousel", {
  effect: "cube",
  loop: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  navigation: {
    nextEl: right,
    prevEl: left,
  },
});
