let elNewArrivalsList = document.querySelector(".new-arrivals__list");
let elNewArrivalsMoreBtn = document.querySelector(".new-arrivals__btn");
let noImg = "../assets/No-Image-Placeholder.svg";

try {
  let userToken = localStorage.getItem("token");

  let parts = userToken.split(".");

  let payload = parts[1];

  let decodedString = atob(payload);

  let decodedObject = JSON.parse(decodedString);

  if (!decodedObject.role) {
    throw new Error("Avva ro'yxatdan o'tishingiz kerak");
  }
} catch (e) {
  window.location.href = "../html/index.html";
  console.log(e);
}

elNewArrivalsMoreBtn.addEventListener("click", () => {
  try {
    fetch("https://shop-co-backend-1.onrender.com/api/products")
      .then((res) => {
        if (!res.status) {
          throw new Error("Res okey kelmadi");
        }
        return res.json();
      })
      .then((data) => renderProducts(data, elNewArrivalsList));
  } catch (e) {
    console.log("Error: " + e);
  }
});

try {
  fetch("https://shop-co-backend-1.onrender.com/api/products")
    .then((res) => {
      if (!res.status) {
        throw new Error("Res okey kelmadi");
      }
      return res.json();
    })
    .then((data) => renderInitialProduct(data, elNewArrivalsList));
} catch (e) {
  console.log("Error: " + e);
}

function renderInitialProduct(arr, parent) {
  for (let i = 0; i < 4; i++) {
    let avarageRate = 0;
    let countRate = 0;
    arr[i].comments.forEach(({ userRate }) => {
      countRate++;
      avarageRate += userRate;
    });
    if (countRate > 0) {
      avarageRate /= countRate;
    }
    let notPrice = ((arr[i].price * 100) / (100 - arr[i].discount)).toFixed(1);
    parent.innerHTML += `
      <li class="new-arrivals__item">
        <div class="new-item__box">
          <img
            src="${
              arr[i].images[0] && arr[i].images[0].trim() !== ""
                ? arr[i].images[0]
                : noImg
            }"
            alt="Product image"
            class="new-item__img"
          />
        </div>
        <h3 class="new-item__title">${arr[i].title}</h3>
        <span class="new-item__rate">****</span>
        <span class="new-item__rate-num">${avarageRate}</span>
        <div class="new-item__prices">
          <h3 class="new-item__price">$${arr[i].price}</h3>
          <h3 class="new-item__not-price">$${notPrice}</h3>
          <h5 class="new-item__dis-price">${arr[i].discount}%</h5>
        </div>
      </li>
    `;
  }
}

function renderProducts(arr, parent) {
  parent.innerHTML = "";

  arr.forEach(({ images, title, comments, price, discount }) => {
    let avarageRate = 0;
    let countRate = 0;
    comments.forEach(({ userRate }) => {
      countRate++;
      avarageRate += userRate;
    });
    if (countRate > 0) {
      avarageRate /= countRate;
    }
    let notPrice = ((price * 100) / (100 - discount)).toFixed(1);
    parent.innerHTML += `
      <li class="new-arrivals__item">
        <div class="new-item__box">
          <img
            src="${
              images[0] || noImg
            }"
            alt="Product image"
            class="new-item__img"
          />
        </div>
        <h3 class="new-item__title">${title}</h3>
        <span class="new-item__rate">****</span>
        <span class="new-item__rate-num">${avarageRate}</span>
        <div class="new-item__prices">
          <h3 class="new-item__price">$${price}</h3>
          <h3 class="new-item__not-price">$${notPrice}</h3>
          <h5 class="new-item__dis-price">${discount}%</h5>
        </div>
      </li>
    `;
  });
}
