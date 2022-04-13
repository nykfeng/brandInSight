import generateHTML from "./generateHTML.js";
import modal from "./modal.js";


const addContactBtn = document.querySelector(".contacts-add");
const addLeadershipBtn = document.querySelector(".leadership-add");

// console.log("current brand in brand js is ");
// console.log(brand);

addContactBtn.addEventListener("click", function () {
  modal.open("Contact", brand);
});
addLeadershipBtn.addEventListener("click", function () {
  modal.open("Leadership", brand);
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
        generateHTML.listOfContacts(brand,contact)
      );
    });

    // Get all the delete contacts buttons
    const deleteContactBtns = document.querySelectorAll(".contacts-delete");
    deleteContactBtns.forEach((btn) => {
        btn.addEventListener("click", async function(e) {
            // Since the button is in the same form of save submit
            e.preventDefault();

            // Get the contact id from the data attribute
            const contactId = btn.dataset.id;
            await deleteContact(contactId);
            // Need to reload the page after delete so the content is gone
            location.reload();
        })
    });
  }
};

async function deleteContact(contactId) {
  const url = `/brands/${brand._id}/contact/${contactId}`;
  await fetch(url, {
    method: "DELETE",
  });
}

renderListOfContacts();
