// for free user login
async function freeUserLogin() {
  const cred = {
    username: "testuser",
    password: "Tstu1234567",
  };
  const url = "/login";

  const data = new URLSearchParams();
  for (const [key, value] of Object.entries(cred)) {
    data.append(key, value);
  }
  console.log("data is ");
  console.log(data);

  await fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: data,
  });
}

const freeUserBtn = document.querySelector(".free-user-login");

freeUserBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  await freeUserLogin();
  window.location.href = "/home";
});
