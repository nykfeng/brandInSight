import generateHTML from "./generateHTML.js";

const bodyEl = document.querySelector("body");

const currentBrand = brand;
console.log("current brand in modal js is ");
console.log(currentBrand);

const open = function (module) {
  if (module === "Contact") {
    bodyEl.insertAdjacentHTML("beforeend", generateHTML.newContactModal(currentBrand));
    closeModalListener();
  } else if (module === "Leadership") {
    bodyEl.insertAdjacentHTML("beforeend", generateHTML.newLeadershipModal());
    closeModalListener();
  } else if (module === "Brand") {
    bodyEl.insertAdjacentHTML("beforeend", generateHTML.newBrandModal());
    closeModalListener();
  }
};

const closeModalListener = function () {
  // const closeModalBtn = document.querySelector('.modal-cancel');
  // closeModalBtn.addEventListener('click', function() {
  //     const modalEl = document.querySelector('.modal-background');
  //     modalEl.remove();
  // })

  bodyEl.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("modal-background") ||
      e.target.classList.contains("modal-cancel")
    ) {
      const modalEl = document.querySelector(".modal-background");
      if (modalEl) modalEl.remove();
    }
  });
};



export default {
  open,
};
