const hamburgerBtn = document.querySelector(".main-nav-hamburger-button");
const mainNavEl = document.querySelector(".main-nav");
const mainNavListEl = document.querySelector(".main-nav-list");

// variable for hamburger button
let hambugerSentinel = false;

// hambuger button to show and close nav menu for smaller screens
hamburgerBtn.addEventListener("click", function () {
  // const navListEl = document.querySelector('.main-nav-list');
  // const menuList = document.querySelectorAll(".main-nav-list li");

  if (!hambugerSentinel) {
    // menuList.forEach((list) => {
    //   list.style.display = "flex";
    // });
    mainNavListEl.setAttribute("action", "open-dropdown");
    mainNavEl.setAttribute("action", "open-dropdown");
    hambugerSentinel = true;
  } else {
    // menuList.forEach((list) => {
    //   list.style.display = "none";
    // });
    mainNavListEl.setAttribute("action", "close-dropdown");
    mainNavEl.setAttribute("action", "close-dropdown");
    hambugerSentinel = false;
  }
});
