// DOM elements to work with
let timeout;
const searchBarInput = document.querySelector(".search-bar__input");

searchBarInput.addEventListener("keyup", async function () {
    //clearTimeout method cancels a timeout previously established
    clearTimeout(timeout);

    timeout = setTimeout( function() {
      console.log(searchBarInput.value);
      const query = searchBarInput.value;
       sendQuery(query);
    }, 2000);
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
  console.log(listOfBrands);
}


