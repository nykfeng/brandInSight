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


export default {
    trendingList,
}