import getData from "../getData.js";
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

  trendingBrandListEl.innerHTML = "";

  brands.forEach((brand) => {
    let subscribed = false;

    console.log(user.subscribedBrands)
    if (user.subscribedBrands.length > 0) {
      user.subscribedBrands.forEach(subBrand => {
        if (subBrand._id === brand.id) subscribed = true;
      })
    }

    trendingBrandListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.homeTrendingList(brand, subscribed)
    );
  });
}

trendingBrandList();
