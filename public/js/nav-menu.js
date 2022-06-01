// // DOM elements for working with hamburger button -------------------
const hamburgerBtn = document.querySelector(".main-nav-hamburger-button");
const mainNavEl = document.querySelector(".main-nav");
const mainNavListEl = document.querySelector(".main-nav-list");

// variable for hamburger button
let hambugerSentinel = false;

// hambuger button to show and close nav menu for smaller screens
hamburgerBtn.addEventListener("click", function () {
  if (!hambugerSentinel) {
    mainNavListEl.setAttribute("action", "open-dropdown");
    mainNavEl.setAttribute("action", "open-dropdown");
    hambugerSentinel = true;
    hamburgerBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  } else {
    mainNavListEl.setAttribute("action", "close-dropdown");
    mainNavEl.setAttribute("action", "close-dropdown");
    hambugerSentinel = false;
    hamburgerBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});
