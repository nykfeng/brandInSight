import getData from "../getData.js";
import generateHTML from "./generateHTML.js";
import userActivity from "./userActivity.js";
import pagination from "./pagination.js";

// DOM elements to work with -------------------
const trendingBrandListEl = document.querySelector(".home-column .brand-list");
const subscribedBrandListEl = document.querySelector(
  ".right-brands-list__subscribed"
);
const viewedBrandListEl = document.querySelector(".right-brands-list__viewed");
const adSpendListEl = document.querySelector(".right-brands-list__adSpend");
// brand stories and news
const newsfeedListEl = document.querySelector(".home-newsfeed-list");

// DOM elements view more buttons -------------------
const viewMoreBtns = document.querySelectorAll(".view-more-btn");

// right panel three list icon
const subBrandIcon = document.querySelector(".home-subscribed-brands--media");
const viewedBrandIcon = document.querySelector(".home-recently-viewed--media");
const adSpendIcon = document.querySelector(".home-most-ad-spend--media");

// icon sentinel variables
let subBrandIconSentinel = { sentinel: false };
let viewedBrandIconSentinel = { sentinel: false };
let adSpendIconSentinel = { sentinel: false };

let trendingSubBtns; // Since these button have yet to generated at this point, using let

// Data variables, since they will be reused, setting them global
let subscribedBrands;
let trendingBrands;
let viewedBrands;
let adSpendBrands;

// maximum item per page for list item
const MAX_PER_PAGE = 5;

// when the client home page HTML is loaded, javascript will send request to get client data
window.onload = function () {
  init();
};

function init() {
  // things to do once page is loaded
  trendingListContentLoader();

  // Get data and render them
  trendingBrandList();
  subscribedBrandsList();
  viewedHistoryBrandsList();
  adSpendBrandsList();

  // Get the newsfeed and render them
  homeNewsfeed();
}

// Set up the trending list with brands on home page
async function trendingBrandList() {
  // Send request and get data from server
  trendingBrands = await getData.trendingList();

  trendingBrandListEl.innerHTML = "";

  trendingBrands.forEach((brand) => {
    let subscribed = false;

    if (user.subscribedBrands.length > 0) {
      user.subscribedBrands.forEach((subBrand) => {
        // subscribedBrands array contains only id value (string not object), so use subBrand
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
}

// Subscription buttons from different lists
function subscriptionButtons(subBtns) {
  subBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let brandId = this.closest(".brand-list__brand").dataset.brandId;
      if (this.querySelector("i").classList.contains("fa-circle-plus")) {
        this.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span class="right-brand-status-text">Subscribed</span>
      `;
        userActivity.addBrandSubscription(brandId);
      } else {
        this.innerHTML = `
        <i class="fa-solid fa-circle-plus"></i>
        <span class="right-brand-status-text">Subscribe</span>
      `;
        userActivity.deleteBrandSubscription(brandId);
      }
    });
  });
}

// Get and make subscribed brands list on the right panel
async function subscribedBrandsList() {
  if (user.subscribedBrands.length > 0) {
    // get all the subscribed brands from server
    subscribedBrands = await getData.listOfSubscribedBrands();

    subscribedBrands.forEach((brand, index) => {
      if (index < MAX_PER_PAGE) {
        subscribedBrandListEl.insertAdjacentHTML(
          "beforeend",
          generateHTML.subscribedBrandList(brand)
        );
      }
    });

    // listen for clicking subscribe buttons
    const subBtns = subscribedBrandListEl.querySelectorAll(
      ".right-brand-status"
    );
    subscriptionButtons(subBtns);
  }
}

// Get and make viewed history brands list on the right panel
async function viewedHistoryBrandsList() {
  if (user.viewedBrandHistory.length > 0) {
    // get all the user viewed brands from server
    viewedBrands = await getData.listOfViewedHistoryBrand();

    viewedBrands.forEach((brand, index) => {
      if (index < MAX_PER_PAGE) {
        viewedBrandListEl.insertAdjacentHTML(
          "beforeend",
          generateHTML.viewedHistoryBrandList(brand)
        );
      }
    });

    // listen for clicking subscribe buttons
    const subBtns = viewedBrandListEl.querySelectorAll(".right-brand-status");
    subscriptionButtons(subBtns);
  }
}

// Get and make brands list with ad spend descendingly on the right panel
async function adSpendBrandsList() {
  // get all the brands with ad spend from server
  adSpendBrands = await getData.listOfBrandsWithAdSpend();

  adSpendBrands.forEach((brand, index) => {
    if (index < MAX_PER_PAGE) {
      adSpendListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.adSpendBrandsList(brand)
      );
    }
  });
}

// trending brand list content loader
function trendingListContentLoader() {
  const COUNT = 5; // 5 content loader for trending brand list
  for (let i = 0; i < COUNT; i++) {
    trendingBrandListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.trendingBrandListContentLoader()
    );
  }
}

// view more button
viewMoreBtns.forEach((viewMoreBtn) => {
  viewMoreBtn.addEventListener("click", function () {
    const viewMoreParent = this.parentNode.parentNode;
    const paginationContainerEl = this.parentNode;
    const module = this.parentNode.getAttribute("data-module"); // Get module name

    this.style.display = "none"; // hide the viewmore button after getting clicked

    modulePagination(module, paginationContainerEl, viewMoreParent);
  });
});

// module pagination controller
function modulePagination(module, paginationContainerEl, viewMoreParent) {
  const COUNT_PER_PAGE = 5; // to display 5 items per page

  switch (module) {
    case "subscribed-brands":
      setUpPagination(
        paginationContainerEl,
        module,
        user.subscribedBrands.length,
        COUNT_PER_PAGE,
        viewMoreParent,
        subscribedBrands
      );
      break;
    case "viewed-brands":
      setUpPagination(
        paginationContainerEl,
        module,
        user.viewedBrandHistory.length,
        COUNT_PER_PAGE,
        viewMoreParent,
        viewedBrands
      );
      break;
    case "adSpend-brands":
      setUpPagination(
        paginationContainerEl,
        module,
        adSpendBrands.length,
        COUNT_PER_PAGE,
        viewMoreParent,
        adSpendBrands
      );
      break;
    case "trending-brands":
      setUpPagination(
        paginationContainerEl,
        module,
        trendingBrands.length,
        COUNT_PER_PAGE,
        viewMoreParent,
        trendingBrands
      );
      break;
    default:
  }
}

function setUpPagination(
  paginationEl,
  module,
  moduleLength,
  countPerPage,
  moduleEl,
  moduleData
) {
  paginationEl.insertAdjacentHTML(
    "beforeend",
    pagination.setupButtons(module, moduleLength, countPerPage)
  );
  pagination.setupControl(moduleEl, moduleData, module);
}

//  right panel clicking to open and close list panels
subBrandIcon.addEventListener("click", function () {
  if (!subBrandIconSentinel.sentinel) {
    setIconDisplayBlock(this, subBrandIconSentinel);
    setOtherIconsDisplayNone("subBrand");
  } else {
    setIconDisplayNone(this, subBrandIconSentinel);
  }
});
viewedBrandIcon.addEventListener("click", function () {
  if (!viewedBrandIconSentinel.sentinel) {
    setIconDisplayBlock(this, viewedBrandIconSentinel);
    setOtherIconsDisplayNone("viewBrand");
  } else {
    setIconDisplayNone(this, viewedBrandIconSentinel);
  }
});
adSpendIcon.addEventListener("click", function () {
  if (!adSpendIconSentinel.sentinel) {
    setIconDisplayBlock(this, adSpendIconSentinel);
    setOtherIconsDisplayNone("adSpend");
  } else {
    setIconDisplayNone(this, adSpendIconSentinel);
  }
});

function setIconDisplayBlock(element, elObj) {
  // element.style.display = "block";
  element.setAttribute("action", "open-panel");
  elObj.sentinel = true;
}

function setIconDisplayNone(element, elObj) {
  // element.style.display = "none";
  element.setAttribute("action", "close-panel");
  elObj.sentinel = false;
}

// set other lists to be no display
function setOtherIconsDisplayNone(currentIcon) {
  if (currentIcon === "subBrand") {
    setIconDisplayNone(viewedBrandIcon, viewedBrandIconSentinel);
    setIconDisplayNone(adSpendIcon, adSpendIconSentinel);
  } else if (currentIcon === "viewBrand") {
    setIconDisplayNone(subBrandIcon, subBrandIconSentinel);
    setIconDisplayNone(adSpendIcon, adSpendIconSentinel);
  } else if (currentIcon === "adSpend") {
    setIconDisplayNone(subBrandIcon, subBrandIconSentinel);
    setIconDisplayNone(viewedBrandIcon, viewedBrandIconSentinel);
  }
}

// getting and rendering the brand newsfeed and stories
async function homeNewsfeed() {
  const brandList = await getData.listOfBrandStoriesAndNews();
  for (const brand in brandList) {
    brandList[brand].articles.forEach((article) => {
      newsfeedListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.brandStoriesAndNews(article, brandList[brand].logoUrl)
      );
    });
  }
}
