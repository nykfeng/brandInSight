import modal from "./modal.js";

// const addNewBrandBtn = document.querySelector(".brand-add");


const addNewBrandBtn = document.querySelector(".brand-add");

addNewBrandBtn.addEventListener("click", function () {
  modal.open("Brand");
});

// if (addNewBrandBtn!= undefined) {
//   addNewBrandBtn.addEventListener("click", function () {
//     modal.open("Brand");
//   });
// }
