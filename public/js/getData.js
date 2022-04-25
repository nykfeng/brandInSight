// get trending list of brand for front home page
async function trendingList() {
    const url = `/brands/trending`
    const res = await fetch(url, {
        method: "GET"
    });
    const data = await res.json();
    console.log(data);
    const listOfBrands = Array.from(data.docs)
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
    console.log(data);
    const listOfBrands = Array.from(data.docs);
    return listOfBrands;
  }


export default {
    trendingList,
    sendQuery
}