import generateHTML from "./generateHTML.js";
// DOM elements to work with
const searchBarInput = document.querySelector(".search-bar__input");
const searchResultListEl = document.querySelector(".search-result__list");

// need a variable to hold the timeout and cancel it later
let timeout;
const MAX_SEARCH_RESULT = 5;
let resultToDisplay;

searchBarInput.addEventListener("keyup", async function () {
  // if the search bar is emptied, the dropdown list should be removed
  if (this.value === "") {
    searchResultListEl.innerHTML = "";
    return;
  }

  //clearTimeout method cancels a timeout previously established
  clearTimeout(timeout);

  timeout = setTimeout(async function () {
    if (searchBarInput.value === "") return;
    const query = searchBarInput.value;
    const listOfBrands = await sendQuery(query);
    console.log(listOfBrands);
    searchResultListEl.innerHTML = "";

    // If server returned no result
    if (listOfBrands.length === 0) {
      searchResultListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.searchResultListEmpty()
      );
      return;
    }

    // max result to display is currently at 5
    if (listOfBrands.length < MAX_SEARCH_RESULT) {
      resultToDisplay = listOfBrands.length;
    } else resultToDisplay = MAX_SEARCH_RESULT;

    for (let i = 0; i < resultToDisplay; i++) {
      searchResultListEl.insertAdjacentHTML(
        "beforeend",
        generateHTML.searchResultList(listOfBrands[i])
      );
    }
  }, 1500);
});

// to send search term to server
async function sendQuery(query) {
  const url = `/brands/searching?term=${query}`;
  const res = await fetch(url, {
    method: "GET",
    query: query,
  });
  const data = await res.json();
  console.log(data);
  const listOfBrands = Array.from(data.docs);
  // console.log(listOfBrands);
  return listOfBrands;
}

// After the dropdown result list was rendered
// add listener for clicking outside of the list to close it
document.addEventListener("click", function (e) {
  if (
    !e.target.closest(".search-result__list") &&
    !e.target.closest(".search-area")
  ) {
    searchResultListEl.innerHTML = "";
  }

  // Listen for clicking search button
  // which will default to searching the first result
  if (e.target.closest(".search-bar__submit")) {

    // targeting the first search result
    const firstResult = document.querySelector(
      ".search-result__list-item:first-child"
    );
    if (firstResult) {
      firstResult.querySelector("a").click();
    }
  }
});
