import generateHTML from "./generateHTML.js";

// DOM Element slector
const brandTableEl = document.querySelector(".brand-table");
const sortBtns = document.querySelectorAll(".row-number-sort");

window.onload = function () {
  renderTable();
};

// render the brand table list
function renderTable() {
  brands.forEach((brand, index) => {
    brandTableEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.brandListRow(brand, index)
    );
  });
}

// sorting table column buttons
sortBtns.forEach((sortBtn) => {
  sortBtn.addEventListener("click", function () {
    const asc = this.classList.contains("sort-asc");
    const column = this.parentNode.dataset.column; //Get the column name

    resetColumnSort(); // reset column sort status

    this.classList.remove("sort-pending");

    sortingBrandsTable(column, asc); // algo to sort brands array
    sortIcon(this, !asc);   // reset the asc or desc icon

    this.classList.toggle("sort-asc", !asc);    // sort status
    this.classList.toggle("sort-desc", asc);    // sort status

    rearrangeBrandTable();  // re-render the brand table with new order
  });
});

// reset the sort status to pending for all columns
function resetColumnSort() {
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

// sorting the brands array
const sortingBrandsTable = function (column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  brands.sort((a, b) => {
    return a[column] < b[column] ? dirModifier * 1 : dirModifier * -1;
  });
};

// after sort button was click, rearrange the order
function rearrangeBrandTable() {
  const allRows = brandTableEl.querySelectorAll(".brand-table-row");
  allRows.forEach((row) => {
    row.remove();
  });
  renderTable();
}
