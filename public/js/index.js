const trackEl = document.querySelector(".carousel__track");
const slideEls = Array.from(trackEl.children);

const dotNavEl = document.querySelector(".carousel__nav");
const dotEls = Array.from(dotNavEl.children);

const prevBtn = document.querySelector(".carousel__button--left");
const nextBtn = document.querySelector(".carousel__button--right");

const hamburgerBtn = document.querySelector(".main-nav-hamburger-button");
const mainNavListEl = document.querySelector(".main-nav-list");

// variabel for carousel control
let currentSlide = 0;
let currentDot = 0;

// variable for hamburger button
let hambugerSentinel = false;

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

// for free user login
async function freeUserLogin() {
  const cred = {
    username: "testuser",
    password: "Tstu1234567",
  };
  const url = "/login";

  const data = new URLSearchParams();
  for (const [key, value] of Object.entries(cred)) {
    data.append(key, value);
  }
  console.log("data is ");
  console.log(data);

  await fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: data,
  });
}

const freeUserBtn = document.querySelector(".free-user-login");

freeUserBtn.addEventListener("click", async function () {
  console.log("free user clicked");
  await freeUserLogin();
});

// hambuger button to show and close nav menu for smaller screens
hamburgerBtn.addEventListener("click", function () {
  // const navListEl = document.querySelector('.main-nav-list');
  // const menuList = document.querySelectorAll(".main-nav-list li");

  if (!hambugerSentinel) {
    // menuList.forEach((list) => {
    //   list.style.display = "flex";
    // });
    mainNavListEl.setAttribute("action", "open-dropdown");
    hambugerSentinel = true;
  } else {
    // menuList.forEach((list) => {
    //   list.style.display = "none";
    // });
    mainNavListEl.setAttribute("action", "close-dropdown");

    hambugerSentinel = false;
  }
});
