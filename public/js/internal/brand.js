import modal from "./modal.js";

const addContactBtn = document.querySelector('.contacts-add');
const addLeadershipBtn = document.querySelector('.leadership-add');

addContactBtn.addEventListener('click', function() {
    modal.open('Contact');
});
addLeadershipBtn.addEventListener('click', function() {
    modal.open('Leadership');
});