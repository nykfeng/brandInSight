import modal from "./modal.js";

const addContactBtn = document.querySelector(".contacts-add");
const addLeadershipBtn = document.querySelector(".leadership-add");

addContactBtn.addEventListener("click", function () {
  modal.open("Contact");
});
addLeadershipBtn.addEventListener("click", function () {
  modal.open("Leadership");
});

// console.log(currentBrand);

const renderListOfContacts = function () {
  if (brand.contact.length > 0) {
    // get the contacts section HTML element
    const contactContainerEl = document.querySelector(".contacts-list");
    // remove the default empty form
    // contactContainerEl.removeChild(contactContainerEl.firstChild);
    contactContainerEl.innerHTML = "";

    brand.contact.forEach((contact) => {
      console.log("Conact is: ");
      console.log(contact);
      contactContainerEl.insertAdjacentHTML(
        "beforeend",
        generateContactHTML(contact)
      );
    });

    const deleteContactBtns = document.querySelectorAll(".contacts-delete");
    deleteContactBtns.forEach((btn) => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const contactId = btn.dataset.id;
            deleteContact(contactId);
            location.reload();
        })
    });
  }
};

renderListOfContacts();

function generateContactHTML(contact) {
  const html = `<form action="/brands/${brand._id}/contact/${contact._id}?_method=PUT" method="POST" class="internal-contacts-form flex-column">
    <div class="contacts-personal-detail flex">
        <div class="internal-contacts-form-group flex-column">
            <div class="input-group flex">
                <label for="contacts-name">Name </label>
                <input type="text" id="contacts-name" name="contact[name]" value="${contact.name}" class="short-input-field">
            </div>
            <div class="input-group flex">
                <label for="contacts-rank">Rank </label>
                <input type="text" id="contacts-rank" name="contact[rank]" value="${contact.rank}" class="short-input-field">
            </div>
            <div class="input-group flex">
                <label for="contacts-position">Position</label>
                <input type="text" id="contacts-position" name="contact[position]" value="${contact.position}" class="short-input-field">
            </div>
        </div>

        <div class="internal-contacts-form-group flex-column">
            <div class="input-group flex">
                <label for="contacts-email">Email </label>
                <input type="text" id="contacts-email" name="contact[email]" value="${contact.email}">
            </div>
            <div class="input-group flex">
                <label for="contacts-location">Location </label>
                <input type="text" id="contacts-location" name="contact[location]" value="${contact.location}">
            </div>
            <div class="input-group flex">
                <label for="contacts-phone">Phone</label>
                <input type="text" id="contacts-phone" name="contact[phoneNumber]" value="${contact.phoneNumber}">
            </div>
        </div>
    </div>

    <div class="contacts-submit-container flex">
        <div class="contacts-linkedin-handle flex">
            <label for="contacts-linkedin-handle"><i
                    class="fa-brands fa-linkedin"></i></label>
            <input type="text" id="contacts-linkedin-handle" name="contact[linkedin]" value="${contact.linkedin}"
                class="short-input-field">
        </div>

        <div class="internal-contacts-btn-group flex ">

            <button class="contacts-delete internal-btn internal-btn-delete flex" data-id="${contact._id}">Delete
                Contact</button>


            <button type="submit" class="contacts-submit internal-btn internal-btn-save flex">Save
                Changes</button>
        </div>
    </div>

</form>
    `;
  return html;
}

async function deleteContact(contactId) {
  const url = `/brands/${brand._id}/contact/${contactId}`;
  await fetch(url, {
    method: "DELETE",
  });
}
