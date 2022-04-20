import getData from "./getData.js";
import generateHTML from "./generateHTML.js";

// DOM elements to work with
const trendingBrandListEl = document.querySelector(".home-column .brand-list");

// when the client home page HTML is loaded, javascript will send request to get client data
window.onload = function () {
  init();
};

function init() {
  // things to do once page is loaded
}

async function trendingBrandList() {
  const brands = await getData.trendingList();
  console.log(brands);

  brands.forEach((brand) => {
    trendingBrandListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.homeTrendingList(brand)
    );
  });
}

trendingBrandList();
