console.log("Here in the front end brand is ");
console.log(getBrand)

const addContactBtn = document.querySelector('.contacts-add');
const addLeadershipBtn = document.querySelector('.leadership-add');

addContactBtn.addEventListener('click', renderAddContactModal);
addLeadershipBtn.addEventListener('click', renderAddLeadershipModal);