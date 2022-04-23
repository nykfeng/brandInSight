import pagination from "./pagination.js";

// HTML elements Selectors
const brandHeaderEls = document.querySelectorAll(".brand-header-tab");
const viewMoreBtns = document.querySelectorAll(".view-more-btn");

// Set brand page header tabs (selected)
brandHeaderEls.forEach((brandHeader) => {
  brandHeader.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      brandHeaderEls.forEach((el) => {
        el.classList.remove("selected");
      });
      this.classList.add("selected");
    }
  });
});

// view more button
viewMoreBtns.forEach((viewMoreBtn) => {
  viewMoreBtn.addEventListener("click", function () {
    const viewMoreParent = this.parentNode.parentNode;
    const viewMoreContainerEl = this.parentNode;
    const module = this.parentNode.getAttribute("data-module"); // Get module name
    this.style.display = "none"; // hide the viewmore button after getting clicked
    console.log("viewMoreParent ---------------");
    console.log(viewMoreParent);

    modulePagination(
      module,
      viewMoreContainerEl,
      viewMoreParent
    );
  });
});

// module pagination controller
function modulePagination(module, viewMoreContainerEl, viewMoreParent) {
  switch (module) {
    case "contacts":
      viewMoreContainerEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons("contact", brand.contact.length, 3)
      );
      pagination.setupControl(viewMoreParent, brand.contact, "contacts");
      break;
    case "leaderships":
      viewMoreContainerEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons("leaderships", brand.leadership.length, 6)
      );
      pagination.setupControl(viewMoreParent, brand.leadership, "leaderships");
      break;
    default:
  }
}

