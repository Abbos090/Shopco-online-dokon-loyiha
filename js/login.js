let elform = document.querySelector(".form");
let elMail = document.querySelector(".mail");
let elPassword = document.querySelector(".password");

let base_url = "https://shop-co-backend-1.onrender.com";

elform.addEventListener("submit", (e) => {
  e.preventDefault();

  let userRegister = {
    email: elMail.value.trim(),
    password: elPassword.value.trim(),
  };
  checkUser(userRegister);
});

function checkUser(obj) {
  fetch(`${base_url}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        
        if (data.message === "Invalid credentials") {
            alert("Ma'lumotlar xato, yoki ro'yxatdan o'tmagansiz")
        } else if (!data.token) {
            alert("Siz ro'yxatdan o'tmagansiz")
        } else if (data.user.role === "user") {
            window.location.href = "../html/home.html"
        } else if (data.user.role === "admin") {
            window.location.href = "../html/dashboard.html"
        } else {
            alert("Xatolik")
        }
    })
}
