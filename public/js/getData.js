// get trending list of brand for front home page
async function trendingList() {
  const url = `/brands/trending`;
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  const listOfBrands = Array.from(data.docs);
  return listOfBrands;
}

// to send search term to server
async function sendQuery(query) {
  const url = `/brands/searching?term=${query}`;
  const res = await fetch(url, {
    method: "GET",
    query: query,
  });
  const data = await res.json();
  const listOfBrands = Array.from(data.docs);
  return listOfBrands;
}

// get list of already subscribed brands
async function listOfSubscribedBrands() {
  const url = `/brands/subscribedList/${user._id}`;
  const res = await fetch(url, {
    method: "GET",
  });
  const listOfBrands = await res.json();

  return listOfBrands;
}

// get list of viewed history brands
async function listOfViewedHistoryBrand() {
  const url = `/brands/viewedList/${user._id}`;
  const res = await fetch(url, {
    method: "GET",
  });
  const listOfBrands = await res.json();

  return listOfBrands;
}

// get list of brands with ad spend descending
async function listOfBrandsWithAdSpend() {
  const url = `/brands/withAdSpend`;
  const res = await fetch(url, {
    method: "GET",
  });
  const listOfBrands = await res.json();

  return listOfBrands;
}

//--------------------------- Profile page ----------------
// ------- contact list associated brand logo url ----------
async function listOfBrandLogoURL() {
  const url = `/brands/logoURL`;
  const res = await fetch(url, {
    method: "GET",
  });

  const listOfContactsWithBrandLogos = await res.json();
  return listOfContactsWithBrandLogos;
}


//--------------------------- Internal main page ----------------
// -------  action history list  ----------
async function allActionHistory() {
  const url = `/history`;
  const res = await fetch(url, {
    method: "GET",
  });

  const historyList = await res.json();
  return historyList;
}

export default {
  trendingList,
  sendQuery,
  listOfSubscribedBrands,
  listOfViewedHistoryBrand,
  listOfBrandsWithAdSpend,
  listOfBrandLogoURL,
  allActionHistory
};
