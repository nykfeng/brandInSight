import table from "./table.js";

// DOM Element slector
const contactTableEl = document.querySelector(".contact-table");
const sortBtns = document.querySelectorAll(".row-number-sort");

window.onload = function () {
  refactorContactData();
  table.render(contacts, contactTableEl);
  table.sort(sortBtns, contacts, contactTableEl);
};

//refactor some contacts data
function refactorContactData() {
  contacts.forEach((contact) => {
    contact.brandName = contact.brand.name;
  });
}
