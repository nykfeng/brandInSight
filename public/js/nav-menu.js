// DOM elements for working with hamburger button -------------------
const hamburgerBtn = document.querySelector(".main-nav-hamburger-button");
const mainNavEl = document.querySelector(".main-nav");
const mainNavListEl = document.querySelector(".main-nav-list");

// DOM elements for search bar
const searchExpIconBtn = document.querySelector(".search-icon-to-expand");
const searchBarEl = document.querySelector(".search-bar");

// variable for hamburger button
let hambugerSentinel = false;
let searchIconSentinel = false;

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

// search icon dropdown for search bar to show or disappear
if (searchExpIconBtn) {
  searchExpIconBtn.addEventListener("click", function () {
    if (!searchIconSentinel) {
      this.setAttribute("action", "open-dropdown");
      searchIconSentinel = true;
      this.innerHTML = `<i class="fa-solid fa-magnifying-glass-minus"></i>`;
    } else {
      this.setAttribute("action", "close-dropdown");
      searchIconSentinel = false;
      this.innerHTML = `<i class="fa-solid fa-magnifying-glass-plus"></i>`;
    }
  });
}
