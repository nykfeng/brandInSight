const signupForm = document.getElementById("signup-form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const message = document.getElementById("message");

import request from "./request.js";

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
  console.log(user);
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

// POst request to register
async function register(newUser) {
  const url = "/register";
  // axios({
  //   method: "POST",
  //   url: url,
  //   data: {
  //     newUser,
  //   },
  // })
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  // await fetch(url, {
  //   method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   mode: "cors", // no-cors, *cors, same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: "same-origin", // include, *same-origin, omit
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: "follow", // manual, *follow, error
  //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body:  JSON.stringify(newUser), // body data type must match "Content-Type" header
  // })
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  //   const formData = new FormData();
  //   console.log(`username is ${newUser.username}`);
  //   formData.append("username", newUser.username);
  //   formData.append("email", newUser.email);
  //   formData.append("password", newUser.password);
  //   console.log(formData);

  //   await fetch("/register", {
  //     method: "POST",
  //     headers: {
  //       //     "Content-Type": "application/json",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: newUser,
  //   })
  //     .then((data) => console.log(data.json()))
  //     .catch((err) => console.log(err));

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((data) => console.log(data.json()))
    .catch((err) => console.log(err));

  if (!response) {
    throw new Error(`Request failed with status `);
  }
  const data = await response.json();
  console.log(data);

  console.log("Request successful!");

  // ------------------------------------------
}

const getRegister = async function (url) {
  const res = await fetch(url);
  const data = res;
  // const data = await res.json();
  return data;
};

const sendRegister = async function (url) {
  const user = {
    username: "Tom",
    email: "tom@gmail.com",
    password: "12345Tom",
  };
  const response = await fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(user),
  });
  console.log(response);
};

const subBtnEl = document.querySelector(".sub-test");

subBtnEl.addEventListener("click", async function () {
  const data = await sendRegister("/register");
  console.log(data);
});

request.postReq("www.brandinsight.com/register", { username: "Tom", age: 16, email: "tom@gmail.com" });
