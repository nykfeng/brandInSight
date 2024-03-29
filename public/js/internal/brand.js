import generateHTML from "./generateHTML.js";
import modal from "./modal.js";

// buttons that follow up with modal open
const addContactBtn = document.querySelector(".contacts-add");
const addLeadershipBtn = document.querySelector(".leadership-add");
const deleteBrandBtn = document.querySelector(".internal-delete-brand");

// Listener for modal to open
addContactBtn.addEventListener("click", function () {
  modal.open("Contact", brand);
});
addLeadershipBtn.addEventListener("click", function () {
  modal.open("Leadership", brand);
});
deleteBrandBtn.addEventListener("click", async function () {
  modal.open("DeleteBrand", brand);
  const confirmDeleteBtn = document.querySelector(
    ".delete-confirmation-modal .confirm_button--ok"
  );
  confirmDeleteBtn.addEventListener("click", async function () {
    await deleteBrand(brand._id);
    const modalEl = document.querySelector(".modal-background");
    if (modalEl) modalEl.remove();
  });
});

const renderListOfContacts = function () {
  if (brand.contact.length > 0) {
    // get the contacts section HTML element
    const contactContainerEl = document.querySelector(".contacts-list");
    // remove the default empty form
    // contactContainerEl.removeChild(contactContainerEl.firstChild);
    contactContainerEl.innerHTML = "";

    brand.contact.forEach((contact) => {
      contactContainerEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.listOfContacts(brand, contact)
      );
    });

    // Get all the delete contacts buttons
    const deleteContactBtns = document.querySelectorAll(".contacts-delete");
    deleteContactBtns.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        // Since the button is in the same form of save submit
        e.preventDefault();

        // Get the contact id from the data attribute
        const contactId = btn.dataset.id;
        // Need to reload 
        location.reload();
        await deleteContact(contactId);
      });
    });
  }
};

const renderListOfLeaderships = function () {
  console.log(brand);
  if (brand.leadership.length > 0) {
    // get the leadership list section HTML element
    const leadershipContainerEl = document.querySelector(
      ".brand-leadership-list"
    );

    // remove the default empty form
    leadershipContainerEl.innerHTML = "";

    brand.leadership.forEach((leadership) => {
      leadershipContainerEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.listOfLeaderships(brand, leadership)
      );
    });

    // Get all the delete contacts buttons
    const deleteLeadershipBtns =
      document.querySelectorAll(".leadership-delete");
    deleteLeadershipBtns.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        // Since the button is in the same form of save submit
        e.preventDefault();

        // Get the contact id from the data attribute
        const leadershipId = btn.dataset.id;
        // Need to reload the page
        location.reload();
        await deleteLeadership(leadershipId);
      });
    });
  }
};

async function deleteContact(contactId) {
  const url = `/brands/${brand._id}/contact/${contactId}`;
  await fetch(url, {
    method: "DELETE",
  });
}

async function deleteLeadership(leadershipId) {
  const url = `/brands/${brand._id}/leadership/${leadershipId}`;
  await fetch(url, {
    method: "DELETE",
  });
}

async function deleteBrand(brandId) {
  console.log(`brand id is ${brandId}`);
  const url = `/internal/brands/${brandId}`;
  await fetch(url, {
    method: "DELETE",
  });
  location.replace("/internal"); 
  // location.href = "/internal";
  // location.reload();
}

renderListOfContacts();
renderListOfLeaderships();
