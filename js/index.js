let elLogIn = document.querySelector(".login");
let elSignUp = document.querySelector(".signup");
let elGoHome = document.querySelector(".hero__btn");

elLogIn.addEventListener("click", () => {
  window.location.href = "../html/login.html";
});

elSignUp.addEventListener("click", () => {
  window.location.href = "../html/register.html";
});

elGoHome.addEventListener("click", () => {
    console.log("ishladi");
    
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../html/register.html";
    return;
  }
  try {
    let parts = token.split(".");
    let payload = parts[1];
    let decodedString = atob(payload);
    let decodedObject = JSON.parse(decodedString);
    console.log(decodedObject);

    if (decodedObject.role) {
      window.location.href = "../html/home.html";
    } else {
      window.location.href = "../html/register.html";
    }
  } catch (e) {
    window.location.href = "../html/register.html";
    console.log(e);
  }
});
