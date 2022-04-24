// flash message close button
const flashCloseBtn = document.querySelector(".flash-alert button");
const flashAlertEl = document.querySelector(".flash-alert");

if (flashCloseBtn) {
  flashCloseBtn.addEventListener("click", function () {
    flashCloseBtn.parentElement.remove();
  });
}

if (flashAlertEl) {
  setTimeout(() => {
    flashAlertEl.remove();
  }, 2500);
}
