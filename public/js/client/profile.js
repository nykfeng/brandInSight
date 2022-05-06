import generateHTML from "./generateHTML.js";

//Dom element selector
const subBrandListEl = document.querySelector(".user-subscribed-brands-list");
const saveContactListEl = document.querySelector(".user-saved-contacts-list");

console.log("user is ");
console.log(user);

if (user.subscribedBrands.length > 0) {
  const noDataEl = document.querySelector(
    ".profile-user-subscribed-brands .no-data-yet"
  );
  noDataEl.remove();
  user.subscribedBrands.forEach((brand) => {
    subBrandListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.profileSubBrands(brand)
    );
  });
}

if (user.savedContacts.length > 0) {
  const noDataEl = document.querySelector(
    ".profile-user-saved-contacts .no-data-yet"
  );
  noDataEl.remove();
  user.savedContacts.forEach((contact) => {
    saveContactListEl.insertAdjacentHTML(
      "beforeend",
      generateHTML.profleSavedBrands(contact)
    );
  });
}
