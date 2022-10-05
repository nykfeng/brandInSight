function convertToReadableDate(date) {
  const fullDate = new Date(date);
  const justDate =
    fullDate.getFullYear() +
    "/" +
    (fullDate.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    fullDate.getDate().toString().padStart(2, "0");

  const justTime =
    fullDate.getHours().toString().padStart(2, "0") +
    ":" +
    fullDate.getMinutes().toString().padStart(2, "0") +
    ":" +
    fullDate.getSeconds().toString().padStart(2, "0");

  return justDate + " - " + justTime;
}

export default {
  convertToReadableDate,
};
