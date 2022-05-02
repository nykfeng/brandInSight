import generateHTML from "./generateHTML.js";

// render the table list
function render(moduleData, tableEl) {
  moduleData.forEach((data, index) => {
    if (tableEl.classList.contains("brand-table")) {
      tableEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.brandListRow(data, index)
      );
    } else if (tableEl.classList.contains("contact-table")) {
      tableEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.contactListRow(data, index)
      );
    }
  });
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
    if(typeof a[column] === 'string') {
      return a[column].toLowerCase() < b[column].toLowerCase() ? dirModifier * 1 : dirModifier * -1;
    } else if (typeof a[column] === 'number') {
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
