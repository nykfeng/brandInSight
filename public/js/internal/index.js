import modal from "./modal.js";
import generateHTML from "./generateHTML.js";
import pagination from "../client/pagination.js";
import getData from "../getData.js";

//DOM elements to work with
const addNewBrandBtns = document.querySelectorAll(".brand-add");
const viewHistoryBtn = document.querySelector(".view-history");

const brandListSection = document.querySelector(".internal-brand-list-section"); // brand list section
const historyListSection = document.querySelector(
  ".view-action-history-section"
); // brand list section
const brandListEl = document.querySelector(".internal-brand-list"); //brand list ul element
const historyListEl = document.querySelector(".internal-history-list"); //history list ul element

// Max number of item per page for pagination
const MAX_BRAND_PER_PAGE = 7;
const MAX_HISTORY_PER_PAGE = 10;

// listener for add a new brand
addNewBrandBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    modal.open("Brand");
  });
});

// rendering the list of brands
if (brands.length > 0) {
  // iterate the list and reneder at max 10 items at first
  brands.forEach((brand, index) => {
    if (index < MAX_BRAND_PER_PAGE) {
      brandListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.brandList(brand)
      );
    }
  });

  // if there are more than 1 page, render view more button for pagination
  if (brands.length > MAX_BRAND_PER_PAGE) {
    const html = `
    <div class="internal-list-viewmore flex" data-module="internal-brand-list">
        <button class="view-more-btn">View More</button>
    </div>
    `;
    brandListSection.insertAdjacentHTML("beforeend", html);

    const paginationEl = brandListSection.querySelector(
      ".internal-brand-list-section .internal-list-viewmore"
    );
    const viewMoreBtn = brandListSection.querySelector(".view-more-btn");

    viewMoreBtn.addEventListener("click", function () {
      this.style.display = "none";
      paginationEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons(
          "internal-brand-list",
          brands.length,
          MAX_BRAND_PER_PAGE
        )
      );

      const module = this.parentNode.getAttribute("data-module"); // Get module name
      pagination.setupControl(brandListSection, brands, module);
    });
  }
}

viewHistoryBtn.addEventListener("click", async function () {
  // getting the history list data from backend server
  const historyList = await getData.allActionHistory();

  // rendering the list (first page of the list)
  historyList.reverse().forEach((history, index) => {
    if (index < MAX_HISTORY_PER_PAGE)
      historyListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.historyList(history)
      );
  });

  if (historyList.length > MAX_HISTORY_PER_PAGE) {
    const html = `
    <div class="internal-list-viewmore flex" data-module="internal-history-list">
        <button class="view-more-btn">View More</button>
    </div>
    `;
    historyListSection.insertAdjacentHTML("beforeend", html);

    const paginationEl = historyListSection.querySelector(
      ".view-action-history-section .internal-list-viewmore"
    );
    const viewMoreBtn = historyListSection.querySelector(".view-more-btn");

    viewMoreBtn.addEventListener("click", function () {
      this.style.display = "none";
      paginationEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons(
          "internal-history-list",
          historyList.length,
          MAX_HISTORY_PER_PAGE
        )
      );

      const module = this.parentNode.getAttribute("data-module"); // Get module name
      pagination.setupControl(historyListSection, historyList, module);
    });
  }
});
