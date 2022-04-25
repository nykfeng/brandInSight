import generateHTML from "./generateHTML.js";

// name is the section name, like brand list, contact list, leadership list
// totalNumber is total number of data to display
// numberPerPage is the number of items to display per page
function setupButtons(name, totalNumber, numberPerPage) {
  return generateHTML.pagination(name, Math.ceil(totalNumber / numberPerPage));
}

// ------------- Pagination Control ------------------
// element is parent node for the particular section to work with
// data is the module data to display, such as brands, contacts, leadership
// module is used to dtermine which data set to work with, such as brands, contacts, leadership
function setupControl(element, data, module) {
  const pageNumberEls = element.querySelectorAll(".pagination-number-btn");
  const prevBtn = element.querySelector(".prev-page");
  const nextBtn = element.querySelector(".next-page");

  // calculate the number per page base on module
  const numberPerPage = setNumberPerPage(module);
  // calculate total number of pages
  const totalPageNumber = Math.ceil(data.length / numberPerPage);

  let currentPage = parseInt(getCurrentPageNumber(pageNumberEls));

  // event listener for each page number ----------->
  pageNumberEls.forEach((pgNum) => {
    pgNum.addEventListener("click", function () {
      pageSetup(pgNum, pageNumberEls, data, numberPerPage, element, module);
    });
  });

  // event listener for previous page button ----------->
  prevBtn.addEventListener("click", function () {
    // reset current page
    currentPage = parseInt(getCurrentPageNumber(pageNumberEls));

    // if current page is 1, there is no previous page to go
    if (currentPage === 1) return;

    // get the previous page DOM element
    let pgNum = element.querySelector(
      `.pagination-number-btn[data-id="${currentPage - 1}"]`
    );

    pageSetup(pgNum, pageNumberEls, data, numberPerPage, element, module);
  });

  // event listener for next page button ----------->
  nextBtn.addEventListener("click", function () {
    // reset current page
    currentPage = parseInt(getCurrentPageNumber(pageNumberEls));

    // if current page is the last page, there is no next page to go
    if (currentPage === totalPageNumber) return;

    // get the next page DOM element
    let pgNum = element.querySelector(
      `.pagination-number-btn[data-id="${currentPage + 1}"]`
    );

    pageSetup(pgNum, pageNumberEls, data, numberPerPage, element, module);
  });
}

// Set up page with data
function pageSetup(
  pageBtn,
  pageNumberEls,
  data,
  numberPerPage,
  element,
  module
) {
  //reset pagination page number status
  resetPaginationNumber(pageNumberEls);
  pageBtn.classList.add("active-pagination-btn");
  // get the page number that was clicked
  let currentPage = pageBtn.dataset.id;
  // determine the start index and size (number of items) to display for the data module
  const { startIndex, size } = determinePaginationDataIndex(
    data.length,
    currentPage,
    numberPerPage
  );
  // delete and insert page html elements for the module
  let moduleDataListEl = setModuleElement(element, module);
  console.log("module element is ");
  console.log(moduleDataListEl);
  // manipulate HTML content, delete old data
  moduleDataListEl.innerHTML = "";
  // moduleDataListEl insert new data
  insertModuleHTML(
    startIndex,
    startIndex + size,
    data,
    moduleDataListEl,
    module
  );
  //   for (let i = startIndex; i < startIndex + size; i++) {
  //     moduleDataListEl.insertAdjacentHTML(
  //       "beforeend",
  //       generateHTML.contactList(data[i])
  //     );
  //   }
}

function insertModuleHTML(
  startIndex,
  endIndex,
  data,
  moduleDataListEl,
  module
) {
  if (module === "contacts") {
    for (let i = startIndex; i < endIndex; i++) {
      moduleDataListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.contactList(data[i])
      );
    }
  } else if (module === "leaderships") {
    for (let i = startIndex; i < endIndex; i++) {
      moduleDataListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.leadershipList(data[i])
      );
    }
  }
}

// a function logics to determine what is the starting index of the data
// to display on certain page
// and the size (number of data) to display that page
function determinePaginationDataIndex(dataSize, pageNumber, numberPerPage) {
  let size;

  // starting index
  // if page 2 clicks, 2 - 1 = 1
  // if number of items to display is 6
  // then 1 * 6 = 6 is the starting index
  const startIndex = (pageNumber - 1) * numberPerPage;

  // if data size is more than the current page display item number
  // we are safe to display from the index with number per page items
  // if dataSize is 12, page number is 2, number per page is 6
  // Then 12 = 12, starting index of 6 , size of 6, end at position 11.
  if (pageNumber * numberPerPage <= dataSize) {
    size = numberPerPage;
  }
  // if dataSize is 11, then page 2 x 6 items will be 12
  // That is over the actual data size.
  // so calculate the difference and minus the size from numberPerPage
  else {
    size = dataSize - pageNumber * numberPerPage + numberPerPage;
  }

  return { startIndex, size };
}

// set number of items per page base on module
function setNumberPerPage(module) {
  let numberPerPage;
  switch (module) {
    case "brands":
      numberPerPage = 5;
      break;
    case "contacts":
      numberPerPage = 3;
      break;
    case "leaderships":
      numberPerPage = 6;
      break;
    default:
      numberPerPage = 0;
  }
  return numberPerPage;
}

// set html element selector base on module
function setModuleElement(element, module) {
  let moduleEl;
  switch (module) {
    case "brands":
      moduleEl = element.querySelector(".brand-list");
      break;
    case "contacts":
      moduleEl = element.querySelector(".contacts-list");
      break;
    case "leaderships":
      moduleEl = element.querySelector(".leadership-list");
      break;
    default:
      moduleEl = "";
  }
  return moduleEl;
}

// reset pagination page number active status
function resetPaginationNumber(allPageNumberEls) {
  allPageNumberEls.forEach((numberBtn) => {
    numberBtn.classList.remove("active-pagination-btn");
  });
}

// get current page number
function getCurrentPageNumber(allPageNumberEls) {
  let currentPage = 1;
  allPageNumberEls.forEach((numberBtn) => {
    if (numberBtn.classList.contains("active-pagination-btn")) {
      currentPage = numberBtn.dataset.id;
    }
  });
  return currentPage;
}

export default {
  setupButtons,
  setupControl,
};