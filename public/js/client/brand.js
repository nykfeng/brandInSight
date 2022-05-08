import pagination from "./pagination.js";
import userActivity from "./userActivity.js";

// HTML elements Selectors
const brandHeaderEls = document.querySelectorAll(".brand-header-tab");
const viewMoreBtns = document.querySelectorAll(".view-more-btn");

const brandConctactsEl = document.querySelector("#contacts");

// Brand subscription status from top menu
const subscribedEl = document.querySelector(".brand-subscribe-status");

// Certain data variables have to be set up after html is loaded
init();

function init() {
  checkCurrentBrandSubscriptionStatus();
  checkUserContactSubscription();
  resetContactButtons();
}

// This is brand page, so check if the current brand is a subscribed from user
function checkCurrentBrandSubscriptionStatus() {
  const status = user.subscribedBrands.includes(brand._id);
  if (status) {
    subscribedEl.classList.remove("status-no");
    subscribedEl.classList.add("status-yes");
    subscribedEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Subscribed`;
  }
}

// Check if the brand contact is already saved by the user
function checkUserContactSubscription() {
  if (brand.contact.length > 0) {
    brand.contact.forEach((brandContact) => {
      brandContact.saved = false;
      if (user.savedContacts.length > 0) {
        user.savedContacts.forEach((saveContact) => {
          if (saveContact === brandContact._id) {
            brandContact.saved = true;
          }
        });
      }
    });
  }
}

// reset contacts section save buttons from view engine
function resetContactButtons() {
  const contactListItemEls =
    brandConctactsEl.querySelectorAll(".contacts-item");
  if (contactListItemEls) {
    contactListItemEls.forEach((listItem) => {
      const contactId = listItem.dataset.contactId;

      // cosmetically set up save buttons to save or saved
      if (brand.contact.length > 0) {
        brand.contact.forEach((contact) => {
          if (contactId === contact._id && contact.saved) {
            const btnEl = listItem.querySelector(".contacts-button");
            btnEl.classList.remove("contacts-save-button");
            btnEl.classList.add("contacts-saved-button");
            btnEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> SAVED`;
          }
        });
      }
    });
  }
}

// Set brand page header tabs (selected)
brandHeaderEls.forEach((brandHeader) => {
  brandHeader.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      brandHeaderEls.forEach((el) => {
        el.classList.remove("selected");
      });
      this.classList.add("selected");
    }
  });
});

// view more button
viewMoreBtns.forEach((viewMoreBtn) => {
  viewMoreBtn.addEventListener("click", function () {
    const viewMoreParent = this.parentNode.parentNode;
    const viewMoreContainerEl = this.parentNode;
    const module = this.parentNode.getAttribute("data-module"); // Get module name
    this.style.display = "none"; // hide the viewmore button after getting clicked
    console.log("viewMoreParent ---------------");
    console.log(viewMoreParent);

    modulePagination(module, viewMoreContainerEl, viewMoreParent);
  });
});

// module pagination controller
function modulePagination(module, viewMoreContainerEl, viewMoreParent) {
  switch (module) {
    case "contacts":
      viewMoreContainerEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons("contact", brand.contact.length, 3)
      );
      pagination.setupControl(viewMoreParent, brand.contact, "contacts");
      break;
    case "leaderships":
      viewMoreContainerEl.insertAdjacentHTML(
        "beforeend",
        pagination.setupButtons("leaderships", brand.leadership.length, 6)
      );
      pagination.setupControl(viewMoreParent, brand.leadership, "leaderships");
      break;
    default:
  }
}

// listener for brand contacts save button
brandConctactsEl.addEventListener("click", function (e) {
  const clickedEl = e.target;
  if (clickedEl.closest(".contacts-button")) {
    const contactId = clickedEl.closest(".contacts-item").dataset.contactId;

    // Making sure the element to work with is the button element
    // Not the font awesome i element inside
    let btnEl;
    if (clickedEl.classList.contains("contacts-button")) {
      btnEl = clickedEl;
    } else btnEl = clickedEl.parentNode;

    // change the button style based on save or saved
    // also send to server side to save or unsave
    if (btnEl.classList.contains("contacts-save-button")) {
      btnEl.classList.remove("contacts-save-button");
      btnEl.classList.add("contacts-saved-button");
      btnEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> SAVED`;
      userActivity.saveContact(contactId);
    } else {
      btnEl.classList.remove("contacts-saved-button");
      btnEl.classList.add("contacts-save-button");
      btnEl.innerHTML = `<i class="fa-solid fa-circle-plus"></i> SAVE`;
      userActivity.unsaveContact(contactId);
    }
  }
});

// listen for top menu buttons
subscribedEl.addEventListener("click", function () {
  if (this.classList.contains("status-no")) {
    this.classList.remove("status-no");
    this.classList.add("status-yes");
    subscribedEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Subscribed`;
    userActivity.addBrandSubscription(brand._id);
  } else {
    this.classList.remove("status-yes");
    this.classList.add("status-no");
    subscribedEl.innerHTML = `<i class="fa-solid fa-circle-plus"></i> Subscribe`;
    userActivity.deleteBrandSubscription(brand._id);
  }
});
