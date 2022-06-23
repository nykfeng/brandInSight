import generateHTML from "./generateHTML.js";

const bodyEl = document.querySelector("body");



const open = function (module, currentBrand) {
  if (module === "Contact") {
    bodyEl.insertAdjacentHTML("beforeend", generateHTML.newContactModal(currentBrand));
    closeModalListener();
  } else if (module === "Leadership") {
    bodyEl.insertAdjacentHTML("beforeend", generateHTML.newLeadershipModal());
    closeModalListener();
  } else if (module === "Brand") {
    bodyEl.insertAdjacentHTML("beforeend", generateHTML.newBrandModal());
    closeModalListener();
  } else if (module === "DeleteBrand") {
    bodyEl.insertAdjacentHTML("beforeend", generateHTML.deleteBrandConfirmation(currentBrand));
    closeModalListener();
  }
};

const closeModalListener = function () {
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
