import table from "./table.js";

// DOM Element slector
const brandTableEl = document.querySelector(".brand-table");
const sortBtns = document.querySelectorAll(".row-number-sort");

window.onload = function () {
  refactorBrandData();
  table.render(brands, brandTableEl);
  table.sort(sortBtns, brands, brandTableEl);
};

//refactor some brand data
function refactorBrandData() {
  brands.forEach((brand) => {
    brand.stock = brand.typeOfCompany.stockTicker;
  });
}
