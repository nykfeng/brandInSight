import generateHTML from "./generateHTML.js";
import userActivity from "./userActivity.js";
import pagination from "./pagination.js";
import getData from "../getData.js";

//Dom element selector
const subBrandListEl = document.querySelector(".user-subscribed-brands-list");
const saveContactListEl = document.querySelector(".user-saved-contacts-list");

// maximum of list item per page
const MAX_PER_PAGE = 10;

// -------------------------- profile subscribed brands -----------------------------------
// Rendering subscribed brand list if there are any
if (user.subscribedBrands.length > 0) {
  const subscribedBrandsEl = document.querySelector(
    ".profile-user-subscribed-brands"
  );
  const noDataEl = subscribedBrandsEl.querySelector(".no-data-yet");
  noDataEl.remove();
  user.subscribedBrands.forEach((brand, index) => {
    if (index < MAX_PER_PAGE) {
      subBrandListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.profileSubBrands(brand)
      );
    }
  });

  // after the list of brands are rendered
  const subBrandsBtns = document.querySelectorAll(
    ".user-subscribed-brands-list .brand-list__subscription-status i"
  );

  subBrandsBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let brandId = this.closest(".subscribed-brands-list-item").dataset
        .brandId;
      if (this.classList.contains("fa-circle-plus")) {
        this.classList.remove("fa-circle-plus");
        this.classList.add("fa-circle-check");
        userActivity.addBrandSubscription(brandId);
      } else {
        this.classList.remove("fa-circle-check");
        this.classList.add("fa-circle-plus");
        userActivity.deleteBrandSubscription(brandId);
      }
    });
  });

  // If there are more than 10, create pagination
  if (user.subscribedBrands.length > 10) {
    const html = `
    <div class="profile-subscribed-brands flex" data-module="profile-subscribed-brands">
        <button class="view-more-btn">View More</button>
    </div>
    `;
    subscribedBrandsEl.insertAdjacentHTML("beforeend", html);

    const paginationEl = subscribedBrandsEl.querySelector(
      ".profile-subscribed-brands"
    );

    const viewMoreBtn = subscribedBrandsEl.querySelector(".view-more-btn");

    viewMoreBtn.addEventListener("click", function () {
      this.style.display = "none";
      paginationEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons(
          "profile-subscribed-brands",
          user.subscribedBrands.length,
          MAX_PER_PAGE
        )
      );

      const module = this.parentNode.getAttribute("data-module"); // Get module name

      pagination.setupControl(
        subscribedBrandsEl,
        user.subscribedBrands,
        module
      );
    });
  }
}

// -------------------------- profile saved contacts -----------------------------------
// Rendering saved contact list if there are any
if (user.savedContacts.length > 0) {
  // need to get contact's associated brand logo url separately
  await setupContactBrandLogo();

  const savedContactsEl = document.querySelector(
    ".profile-user-saved-contacts"
  );
  const noDataEl = savedContactsEl.querySelector(".no-data-yet");
  noDataEl.remove(); // if there are contact data, remove the dummy text

  // render the initial first page of saved contact list
  user.savedContacts.forEach((contact, index) => {
    if (index < MAX_PER_PAGE) {
      saveContactListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.profleSavedContacts(contact)
      );
    }
  });

  // after rendering the saved contact list
  // listener for un saving the contact
  const saveContactBtns = document.querySelectorAll(
    ".user-saved-contacts-list .contact-list__subscription-status i"
  );

  // to listen for unsaving the any contact
  saveContactBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let contactId = this.closest(".saved-contacts-list-item").dataset
        .contactId;

      if (this.classList.contains("fa-circle-plus")) {
        this.classList.remove("fa-circle-plus");
        this.classList.add("fa-circle-check");
        userActivity.saveContact(contactId);
      } else {
        this.classList.remove("fa-circle-check");
        this.classList.add("fa-circle-plus");
        userActivity.unsaveContact(contactId);
      }
    });
  });

  // If there are more than 10, create pagination
  if (user.savedContacts.length > 10) {
    const html = `
    <div class="profile-saved-contacts flex" data-module="profile-saved-contacts">
        <button class="view-more-btn">View More</button>
    </div>
    `;
    savedContactsEl.insertAdjacentHTML("beforeend", html);
    const paginationEl = savedContactsEl.querySelector(
      ".profile-saved-contacts"
    );

    const viewMoreBtn = savedContactsEl.querySelector(".view-more-btn");
    viewMoreBtn.addEventListener("click", function () {
      this.style.display = "none";
      paginationEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons(
          "profile-saved-contacts",
          user.savedContacts.length,
          MAX_PER_PAGE
        )
      );

      const module = this.parentNode.getAttribute("data-module"); // Get module name
      pagination.setupControl(savedContactsEl, user.savedContacts, module);
    });
  }
}

// Set up contact list's brand logo
// add brand_logo to contact object
async function setupContactBrandLogo() {
  const contactWithLogoList = await getData.listOfBrandLogoURL();

  user.savedContacts.forEach((userContact) => {
    contactWithLogoList.forEach((contactLogo) => {
      if (userContact._id === contactLogo.contact_id) {
        userContact.brand_logo = contactLogo.brand_logo;
      }
    });
  });
}
