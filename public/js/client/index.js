import getData from "../getData.js";
import generateHTML from "./generateHTML.js";
import userActivity from "./userActivity.js";

// DOM elements to work with
const trendingBrandListEl = document.querySelector(".home-column .brand-list");
const subscribedBrandListEl = document.querySelector(
  ".right-brands-list__subscribed"
);
const viewedBrandListEl = document.querySelector(".right-brands-list__viewed");
let trendingSubBtns; // Since these button have yet to generated at this point, using let

// when the client home page HTML is loaded, javascript will send request to get client data
window.onload = function () {
  init();
};

function init() {
  // things to do once page is loaded

  trendingBrandList();
  subscribedBrandsList();
  viewedHistoryBrandsList();
}

// Set up the trending list with brands on home page
async function trendingBrandList() {
  // Send request and get data from server
  const brands = await getData.trendingList();
  console.log(brands);

  trendingBrandListEl.innerHTML = "";

  console.log("Current user in trending list function is ");
  console.log(user);

  brands.forEach((brand) => {
    let subscribed = false;

    if (user.subscribedBrands.length > 0) {
      user.subscribedBrands.forEach((subBrand) => {
        // subscribedBrands array contains only id value, so subBrand
        if (subBrand === brand._id) subscribed = true;
      });
    }

    trendingBrandListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.homeTrendingList(brand, subscribed)
    );
  });

  trendingSubBtns = document.querySelectorAll(".brand-list i");
  trendingSubBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let brandId = this.closest(".brand-list__brand").dataset.brandId;
      if (this.classList.contains("fa-circle-plus")) {
        this.classList.remove("fa-circle-plus");
        this.classList.add("fa-circle-check");
        console.log(brandId);
        userActivity.addBrandSubscription(brandId);
      } else {
        this.classList.remove("fa-circle-check");
        this.classList.add("fa-circle-plus");
        console.log(brandId);

        userActivity.deleteBrandSubscription(brandId);
      }
    });
  });

  trendingSubBtns.forEach((btn) => {
    btn.addEventListener("mouseover", function () {
      this.parentNode.parentNode.style.overflow = "auto";
    });
  });
}

// Get and make subscribed brands list on the right panel
async function subscribedBrandsList() {
  let listOfBrand;

  if (user.subscribedBrands.length > 0) {
    // get all the subscribed brands from server
    listOfBrand = await getData.listOfSubscribedBrands();
  }

  listOfBrand.forEach((brand) => {
    subscribedBrandListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.subscribedBrandList(brand)
    );
  });
}

// Get and make viewed history brands list on the right panel
async function viewedHistoryBrandsList() {
  let listOfBrand;

  if (user.viewedBrandHistory.length > 0) {
    // get all the subscribed brands from server
    listOfBrand = await getData.listOfViewedHistoryBrand();
  }

  listOfBrand.forEach((brand) => {
    viewedBrandListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.viewedHistoryBrandList(brand)
    );
  });
}
