const signupForm = document.getElementById("signup-form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const message = document.getElementById("message");

// import request from "./request.js";

let isValid = false;
let passwordsMatch = false;

// TESTING
console.log("Heyyyyy");

async function validateForm() {
  // Use HTML constraint API to check form validity
  isValid = signupForm.checkValidity();
  // If the form isn't valid
  if (!isValid) {
    // Style main message for an error
    message.textContent = "Please fill out all fields.";
    message.style.display = "block";

    await timer();
    message.style.display = "none";
    return;
  }
  // Check to see if both password fields match
  if (password1El.value === password2El.value) {
    // If they match, set value to true and borders to green
    passwordsMatch = true;
    password1El.style.borderColor = "green";
    password2El.style.borderColor = "green";
  } else {
    // If they don't match, border color of input to red, change message
    passwordsMatch = false;
    message.textContent = "Make sure passwords match.";
    message.style.display = "block";

    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";

    await timer();
    message.style.display = "none";

    password1El.style.borderColor = "inherit";
    password2El.style.borderColor = "inherit";

    return;
  }

  //TODO
  // We don't really need this, it will go to login
  // If form is valid and passwords match
  if (isValid && passwordsMatch) {
    // Style main message for success
    message.textContent = "Successfully Registered!";
    message.style.color = "green";
    message.style.borderColor = "green";
  }
}

async function timer(ms = 3000) {
  return new Promise((r) => setTimeout(r, ms));
}

async function storeFormData() {
  const user = {
    username: signupForm.name.value,
    email: signupForm.email.value,
    password: signupForm.password.value,
  };
  // Do something with user data
  await register(user);
}

async function processFormData(e) {
  e.preventDefault();
  // Validate Form
  validateForm();
  // Submit Form if Valid
  if (isValid && passwordsMatch) {
    await storeFormData();
  }
}

// Event Listener
signupForm.addEventListener("submit", processFormData);

// Post request to register
async function register(newUser) {
  const url = "/register";
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries(newUser)) {
    data.append(key, value);
  }
  await fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded  ",
    }),
    body: data,
  });
  // ------------------------------------------
}



