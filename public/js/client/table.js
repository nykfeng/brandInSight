import generateHTML from "./generateHTML.js";
import pagination from "./pagination.js";

// DOM element
const mainBrandListEl = document.querySelector("#brand-list-main");
const mainContactListEl = document.querySelector("#contact-list-main");
const brandListTableEl = document.querySelector('.brand-table-list');

// max number for items per table page
const MAX_BRAND_PER_PAGE = 15;
const MAX_CONTACT_PER_PAGE = 5;

// render the table list
function render(moduleData, tableEl) {
  // Brand list -------------------------------------------------------
  // render the first page
  if (tableEl.classList.contains("brand-table")) {
    moduleData.forEach((data, index) => {
      const tableListEl = tableEl.querySelector('.brand-table-list');
      // set up the initial page within the max number
      if (index < MAX_BRAND_PER_PAGE) {
        tableListEl.insertAdjacentHTML(
          "beforeend",
          generateHTML.brandListRow(data, index)
        );
      }
    });

    // if there are more than 1 page of data, render view more for pagination
    if (moduleData.length > MAX_BRAND_PER_PAGE) {
      const html = `
      <div class="main-brand-list-viewmore flex" data-module="main-brand-list">
        <button class="view-more-btn">View More</button>
      </div>
    `;

      mainBrandListEl.insertAdjacentHTML("beforeend", html);
      const paginationEl = mainBrandListEl.querySelector(
        ".main-brand-list-viewmore"
      );
      const viewMoreBtn = mainBrandListEl.querySelector(".view-more-btn");

      viewMoreBtn.addEventListener("click", function () {
        this.style.display = "none";
        paginationEl.insertAdjacentHTML(
          "beforeend",
          pagination.setupButtons(
            "main-brand-list",
            moduleData.length,
            MAX_BRAND_PER_PAGE
          )
        );

        const module = "main-brand-list";
        pagination.setupControl(mainBrandListEl, moduleData, module);
      });
    }
  }


  // Contact list -------------------------------------------------------
  if (tableEl.classList.contains("contact-table")) {
    moduleData.forEach((data, index) => {
      const tableListEl = tableEl.querySelector('.contact-table-list');
      // set up the initial page within the max number
      if (index < MAX_CONTACT_PER_PAGE) {
        tableListEl.insertAdjacentHTML(
          "beforeend",
          generateHTML.contactListRow(data, index)
        );
      }
    });
  
    // if there are more than 1 page of data, render view more for pagination
    if (moduleData.length > MAX_CONTACT_PER_PAGE) {
      const html = `
        <div class="main-contact-list-viewmore flex" data-module="main-contact-list">
          <button class="view-more-btn">View More</button>
        </div>
      `;

      mainContactListEl.insertAdjacentHTML("beforeend", html);
      const paginationEl = mainContactListEl.querySelector(
        ".main-contact-list-viewmore"
      );
      const viewMoreBtn = mainContactListEl.querySelector(".view-more-btn");

      viewMoreBtn.addEventListener("click", function () {
        this.style.display = "none";
        paginationEl.insertAdjacentHTML(
          "beforeend",
          pagination.setupButtons(
            "main-contact-list",
            moduleData.length,
            MAX_CONTACT_PER_PAGE
          )
        );

        const module = "main-contact-list";
        pagination.setupControl(mainContactListEl, moduleData, module);
      });
    }
  }
}

// sorting table column buttons
function sort(sortBtns, moduleData, tableEl) {
  sortBtns.forEach((sortBtn) => {
    sortBtn.addEventListener("click", function () {
      const asc = this.classList.contains("sort-asc");
      const column = this.parentNode.dataset.column; //Get the column name

      resetColumnSort(sortBtns); // reset column sort status

      this.classList.remove("sort-pending");

      sortingTable(moduleData, column, asc); // algo to sort brands array
      sortIcon(this, !asc); // reset the asc or desc icon

      this.classList.toggle("sort-asc", !asc); // sort status
      this.classList.toggle("sort-desc", asc); // sort status

      rearrangeTable(moduleData, tableEl); // re-render the brand table with new order
    });
  });
}

// reset the sort status to pending for all columns
function resetColumnSort(sortBtns) {
  sortBtns.forEach((sortBtn) => {
    sortBtn.classList.add("sort-pending");
    sortBtn.classList.remove("sort-asc");
    sortBtn.classList.remove("sort-desc");
    sortBtn.innerHTML = `<i class="fa-solid fa-sort"></i>`;
    sortBtn.style.color = `#FFF`;
  });
}

// change sort icon on display
function sortIcon(btn, asc) {
  if (asc) {
    btn.innerHTML = `<i class="fa-solid fa-sort-up"></i>`;
    btn.style.color = `#000`;
  } else {
    btn.innerHTML = `<i class="fa-solid fa-sort-down"></i>`;
    btn.style.color = `#000`;
  }
}

// sorting the data array
const sortingTable = function (module, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  module.sort((a, b) => {
    if (typeof a[column] === "string") {
      return a[column].toLowerCase() < b[column].toLowerCase()
        ? dirModifier * 1
        : dirModifier * -1;
    } else if (typeof a[column] === "number") {
      return a[column] < b[column] ? dirModifier * 1 : dirModifier * -1;
    }
  });
};

// after sort button was click, rearrange the order
function rearrangeTable(moduleData, tableEl) {
  const allRows = tableEl.querySelectorAll(".row");
  allRows.forEach((row) => {
    row.remove();
  });
  render(moduleData, tableEl);
}

export default {
  render,
  sort,
};
