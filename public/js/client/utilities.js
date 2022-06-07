// a function to shorten the string on display to fit in the box
// length is number of characters to display
function shortenString(str, length) {
  if (str) {
    return str.substring(0, length) + "...";
  } else return "";
}

// To trim white space
function trimWhiteSpace(str) {
 const newStr = str.replace(" ", "")
 return newStr
}

// set up number format with thousand as a separation
function numberFormat(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert javascript date to more readable date format
function customDateFormat(dateInput) {
  const articleDate = new Date(dateInput);
  return articleDate.toDateString()
}

export default {
  shortenString,
  trimWhiteSpace,
  numberFormat,
  customDateFormat
};
