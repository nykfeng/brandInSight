import getData from "../getData.js";
import generateHTML from "./generateHTML.js";
import pagination from "./pagination.js";
import userActivity from "./userActivity.js";
import utilities from "./utilities.js";

// HTML elements Selectors
const brandHeaderEls = document.querySelectorAll(".brand-header-tab");
const viewMoreBtns = document.querySelectorAll(".view-more-btn");

const brandConctactsEl = document.querySelector("#contacts");

// Brand news stories element
const brandNewsListEl = document.querySelector(".brand-news-list");

// Brand stock and financial elements
const brandStockEl = document.querySelector(
  ".brand-financial-stock-information"
);
const brandFinancialsEl = document.querySelector(".stock-statistics");

// Brand top menu buttons
const subscribedEl = document.querySelector(".brand-subscribe-status");
const brandNoteEl = document.querySelector(".brand-add-notes");

// brand note
const brandNoteContent = document.querySelector(".brand-notes");

// Certain data variables have to be set up after html is loaded
init();

async function init() {
  checkCurrentBrandSubscriptionStatus();
  checkUserContactSubscription();
  resetContactButtons();
  showBrandStock();
  await showBrandNews();
}

// This is brand page, so check if the current brand is a subscribed from user
function checkCurrentBrandSubscriptionStatus() {
  const status = user.subscribedBrands.includes(brand._id);
  if (status) {
    subscribedEl.classList.remove("status-no");
    subscribedEl.classList.add("status-yes");
    subscribedEl.innerHTML = `<i class="fa-solid fa-circle-check"></i><span> Subscribed</span>`;
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

// listen for brand subscribe button
subscribedEl.addEventListener("click", function () {
  if (this.classList.contains("status-no")) {
    this.classList.remove("status-no");
    this.classList.add("status-yes");
    subscribedEl.innerHTML = `<i class="fa-solid fa-circle-check"></i><span> Subscribed</span>`;
    userActivity.addBrandSubscription(brand._id);
  } else {
    this.classList.remove("status-yes");
    this.classList.add("status-no");
    subscribedEl.innerHTML = `<i class="fa-solid fa-circle-plus"></i><span> Subscribe</span>`;
    userActivity.deleteBrandSubscription(brand._id);
  }
});

// listen for brand note button
brandNoteEl.addEventListener("click", async function () {
  // get brand note data from server
  const brandNote = await getData.brandNote();
  brandNoteContent.textContent = brandNote.note;

  // render the html with brand note
  if (brandNoteContent.dataset.status === "off") {
    // change the button style to show it has been clicked and responded
    this.style.backgroundColor = "#000";
    this.style.color = "#FFF";
    brandNoteContent.style.display = "block";
    brandNoteContent.dataset.status = "on";
  } else {
    // change the button style to show it has been clicked and responded
    this.style.backgroundColor = "#FFF";
    this.style.color = "#000";
    brandNoteContent.style.display = "none";
    brandNoteContent.dataset.status = "off";
  }

  // sensing keyup will save the change in textarea to server
  brandNoteContent.addEventListener("change", async function () {
    // only save when there was a change
    if (brandNote.note != this.value) {
      await userActivity.saveBrandNote(this.value);
    }
  });
});

// Get and render brand stock information
async function showBrandStock() {
  if (!checkBrandStockStatus()) {
    // show no financial information since not public
    return;
  }
  // there is stock
  
  // Get stock ticker from its full name, like NVDA from NASDAQ:NVDA
  const stockTicker = utilities.getStockTickerName(brand.typeOfCompany.stockTicker);

  // so get info from API
  // get stock basic numbers
  const stockQuote = await getData.brandStockQuote(stockTicker);

  console.log('stock quote from front end');
  console.log(stockQuote);


  // get stock stats
  // const stockStats = await getData.brandStockStats(stockTicker);

  

  // get stock financial info

  // use generate HTML to render

  // brandStockEl
}

// Check if the brand has a stock symbol
function checkBrandStockStatus() {
  if (brand.typeOfCompany.stockTicker != "N/A") {
    return true;
  } else return false;
}

// Get and render brand news
// Get 3 pieces of news
async function showBrandNews() {
  const brandName = brand.name;
  const newsStories = await getData.brandNews(brandName);

  if (newsStories) {
    newsStories.forEach((newsPiece) => {
      brandNewsListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.newsStories(newsPiece)
      );
    });
  } else {
    brandNewsListEl.innerHTML = "No news stories for the brand at the moment.";
  }
}

