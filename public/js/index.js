const trackEl = document.querySelector(".carousel__track");
const slideEls = Array.from(trackEl.children);

const prevBtn = document.querySelector(".carousel__button-left");
const nextBtn = document.querySelector(".carousel__button-right");

const dotNavEl = document.querySelector(".carousel__nav");
const dotEls = Array.from(dotNavEl.children);

const slideSize = slideEls[0].getBoundingClientRect();

console.log(slideSize);
