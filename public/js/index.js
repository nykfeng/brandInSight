const trackEl = document.querySelector(".carousel__track");
const slideEls = Array.from(trackEl.children);

const dotNavEl = document.querySelector(".carousel__nav");
const dotEls = Array.from(dotNavEl.children);

const prevBtn = document.querySelector(".carousel__button--left");
const nextBtn = document.querySelector(".carousel__button--right");

// variabel for carousel control
let currentSlide = 0;
let currentDot = 0;

// --------- For carousel -------------
prevBtn.addEventListener("click", function () {
  determinePrev(slideEls.length - 1);
  showCurrent();
});

nextBtn.addEventListener("click", function () {
  determineNext(slideEls.length - 1);
  showCurrent();
});

dotEls.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    currentSlide = index;
    currentDot = index;
    showCurrent();
  });
});

function determineNext(lastSlide) {
  if (currentSlide === lastSlide) {
    currentSlide = 0;
    currentDot = 0;
    return;
  }
  currentSlide++;
  currentDot++;
}

function determinePrev(lastSlide) {
  if (currentSlide === 0) {
    currentSlide = lastSlide;
    currentDot = lastSlide;
    return;
  }
  currentSlide--;
  currentDot--;
}

function showCurrent() {
  slideEls.forEach((slide) => {
    slide.classList.remove("current-slide");
  });
  dotEls.forEach((dot) => {
    dot.classList.remove("current-slide--dot");
  });
  slideEls[currentSlide].classList.add("current-slide");
  dotEls[currentDot].classList.add("current-slide--dot");
}


