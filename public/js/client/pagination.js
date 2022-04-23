import generateHTML from "./generateHTML";

// name is the section name, like brand list, contact list, leadership list
// totalNumber is total number of data to display
// numberPerPage is the number of items to display per page
function setup(name, totalNumber, numberPerPage) {
  return generateHTML.pagination(name, Math.ceil(totalNumber / numberPerPage));
}

// element is parent node for the particular section to work with
// data is the module data to display, such as brands, contacts, leadership
// module is used to dtermine which data set to work with, such as brands, contacts, leadership
function setupClick(element, data, module) {
  const pageNumberEls = element.querySelector(".pagination-number-btn");
  const prevBtn = element.querySelector(".prev-page");
  const nextBtn = element.querySelector(".next-page");

  const numberPerPage = setNumberPerPage(module);

  let page;

  pageNumberEls.forEach((pgNum) => {
    pgNum.addEventListener("click", function () {
      // get the page number that was clicked
      page = pgNum.dataset.id;
      // determine the start index and size (number of items) to display for the data module
      const { startIndex, size } = determinePaginationDataIndex(
        data.length,
        page,
        numberPerPage
      );
      // delete and insert page html elements for the module

    });
  });
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
            moduleEl = element.querySelector('.brand-list');
          break;
        case "contacts":
          moduleEl = element.querySelector('.contacts-list');
          break;
        case "leaderships":
            moduleEl = element.querySelector('.leadership-list');
          break;
        default:
          numberPerPage = 0;
      }
      return moduleEl;
}