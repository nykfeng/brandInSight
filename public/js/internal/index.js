import modal from "./modal.js";
import generateHTML from "./generateHTML.js";

const addNewBrandBtn = document.querySelector(".brand-add");

// listener for add a new brand
addNewBrandBtn.addEventListener("click", function () {
  modal.open("Brand");
});

// make brand list
function internalBrandList() {
  // url route to pull from backend
  // const brands = 
} 
