const nameInputEl = document.querySelector("#name");
const emailInputEl = document.querySelector("#email");
const password1InputEl = document.querySelector("#password1");
const password2InputEl = document.querySelector("#password2");
const passwordNotMatchEl = document.querySelector(".password-not-match");

const nameExclaimationEl = document.querySelector(".name-exclaimation");
const emailExclaimationEl = document.querySelector(".email-exclaimation");
const passwordExclaimation1El = document.querySelector(".password-1");
const passwordExclaimation2El = document.querySelector(".password-2");

const formSubmissionBtn = document.querySelector("#signup-form .submit");

const greenColor = "#85C88A";
const redColor = "#E83A14";

let isNameValid = false;
let isEmailValid = false;
let isPassword1Valid = false;
let isPassword2Valid = false;

// user name input
nameInputEl.addEventListener("keyup", function () {
  isNameValid = validate(this, nameExclaimationEl, nameValidation);
});

// user email input
emailInputEl.addEventListener("keyup", function () {
  isEmailValid = validate(this, emailExclaimationEl, emailValidation);
});

// user password 1 input
password1InputEl.addEventListener("keyup", function () {
  isPassword1Valid = validate(
    this,
    passwordExclaimation1El,
    passwordValidation
  );
});

// user password 2 input
password2InputEl.addEventListener("keyup", function () {
  if (this.value) {
    if (passwordValidation(this.value)) {
      if (!passwordMatch(this.value, password1InputEl.value)) {
        restyleValidation(this, passwordExclaimation2El, redColor);
        passwordNotMatchEl.style.display = "block";
        isPassword2Valid = false;
        return;
      }
      passwordNotMatchEl.style.display = "none";
      restyleValidation(this, passwordExclaimation2El, greenColor, true);
      isPassword2Valid = true;
    }
  } else {
    restyleValidation(this, passwordExclaimation2El, redColor);
    isPassword2Valid = false;
  }
});

//form submission btn event listener
formSubmissionBtn.addEventListener("click", function (e) {
  e.preventDefault();
  submitRegistration();
});

function nameValidation(username) {
  const namePattern = /^(?=.{8,30}$)[a-zA-Z0-9._ ]+$/;
  return namePattern.test(username);
}

function emailValidation(userEmail) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(userEmail);
}

function passwordValidation(userPassword) {
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$/;
  return passwordPattern.test(userPassword);
}

function passwordMatch(password1, password2) {
  if (password1 === password2) {
    return true;
  } else return false;
}

// Change input box and exclaimation icon color, green or red
function restyleValidation(inputEl, exclaimEl, color, isValid = false) {
  inputEl.style.borderColor = color;
  if (isValid) {
    exclaimEl.classList.remove("fa-circle-exclamation");
    exclaimEl.classList.add("fa-check");
  } else {
    exclaimEl.classList.remove("fa-check");
    if (!exclaimEl.classList.contains("fa-circle-exclamation")) {
      exclaimEl.classList.add("fa-circle-exclamation");
    }
  }
  exclaimEl.style.color = color;
}

// validate each input value and change the color between green and red
// to indicate success or error
function validate(inputEl, exclaimEl, validationFunction) {
  if (inputEl.value) {
    if (validationFunction(inputEl.value)) {
      restyleValidation(inputEl, exclaimEl, greenColor, true);
      return true;
    }
  }
  restyleValidation(inputEl, exclaimEl, redColor);
  return false;
}

async function submitRegistration() {
  if (isNameValid && isEmailValid && isPassword1Valid && isPassword2Valid) {
    await register(storeFormData());
    renderFormAfterRegistration();
    window.location.replace("/");
  }
}

function storeFormData() {
  const user = {
    username: nameInputEl.value,
    email: emailInputEl.value,
    password: password2InputEl.value,
  };
  return user;
}

// Post request to register
async function register(newUser) {
  const url = "/register";
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries(newUser)) {
    data.append(key, value);
  }
  await fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded  ",
    }),
    body: data,
  });
}

// Change the original form html
function renderFormAfterRegistration() {
  const containerEl = document.querySelector(".signup-container");
  containerEl.innerHTML =
    "<h1>You have successfully registered!</h1><p>Your browser will redirect you!</p>";
}
