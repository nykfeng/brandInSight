// a function to shorten the string on display to fit in the box
// length is number of characters to display
function shortenString(str, length) {
  if (str) {
    return str.substring(0, length) + "...";
  } else return "";
}

// To trim white space
function trimWhiteSpace(str) {
  const newStr = str.replace(" ", "");
  return newStr;
}

// set up number format with thousand as a separation
function numberFormat(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert javascript date to more readable date format
function customDateFormat(dateInput) {
  const articleDate = new Date(dateInput);
  return articleDate.toDateString();
}

// Convert big number into decimates with units
// Trillion, Billion, Million
function convertBigNumber(bigNumber) {
  const decWithUnit =
    parseInt(bigNumber) >= 1000000000000
      ? (parseInt(bigNumber) / 1000000000000).toFixed(2) + " T"
      : parseInt(bigNumber) >= 1000000000
      ? (parseInt(bigNumber) / 1000000000).toFixed(2) + " B"
      : (parseInt(bigNumber) / 1000000).toFixed(2) + " B";
  return decWithUnit;
}

// Extract if necessary the stock exact ticker name
function getStockTickerName(fullTicker) {
  let finalTicker = "";
  if (fullTicker.includes(":")) {
    finalTicker = fullTicker.substring(fullTicker.indexOf(":")+1);
  } else {
    finalTicker = fullTicker;
  }
  
  return finalTicker;
}

export default {
  shortenString,
  trimWhiteSpace,
  numberFormat,
  customDateFormat,
  convertBigNumber,
  getStockTickerName
};
