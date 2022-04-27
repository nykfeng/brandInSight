import getData from "../getData.js";
import generateHTML from "./generateHTML.js";
import userActivity from "./userActivity.js";

// DOM elements to work with
const trendingBrandListEl = document.querySelector(".home-column .brand-list");
let trendingSubBtns; // Since these button have yet to generated at this point, using let

// when the client home page HTML is loaded, javascript will send request to get client data
window.onload = function () {
  init();
};

function init() {
  // things to do once page is loaded

  trendingBrandList();
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
      console.log(this.parentNode.parentNode);
      this.parentNode.parentNode.style.overflow = "auto";
    });
  });
}

const subBtns = document.querySelectorAll(".brand-list i");
subBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function () {
    console.log(this.parentNode.parentNode);
    this.parentNode.parentNode.style.overflow = "visible";
  });
});
