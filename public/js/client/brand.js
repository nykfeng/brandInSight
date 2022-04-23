import pagination from "./pagination.js";

// HTML elements Selectors
const brandHeaderEls = document.querySelectorAll(".brand-header-tab");
const viewMoreBtns = document.querySelectorAll(".view-more-btn");

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
    this.style.display = 'none';
    console.log("viewMoreParent ---------------");
    console.log(viewMoreParent);

    const moduleListEl = viewMoreParent.querySelector('.contacts-list');
    // moduleListEl.innerHTML = '';
    viewMoreContainerEl.insertAdjacentHTML('beforeend', pagination.setupButtons('contact', brand.contact.length, 3));
    pagination.setupControl(viewMoreParent, brand.contact, 'contacts');
  });
});
