let elform = document.querySelector(".form");
let elFirstname = document.querySelector(".firstname");
let elLastname = document.querySelector(".lastname");
let elMail = document.querySelector(".mail");
let elPassword = document.querySelector(".password");

let base_url = "https://shop-co-backend-1.onrender.com";

elform.addEventListener("submit", (e) => {
  e.preventDefault();

  let userRegister = {
    firstName: elFirstname.value.trim(),
    lastName: elLastname.value.trim(),
    email: elMail.value.trim(),
    password: elPassword.value.trim(),
  };
  registerObj(userRegister);
});

function registerObj(obj) {
  fetch(`${base_url}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Email already in use") {
        alert("Email oldin ishlatilgan");
      } else if (data.message === "User registered successfully") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.token));
        window.location.href = "home.html";
      }
    });
}
