//***********************************/
//*        CHECKOUT APP
//***********************************/

// function createEventsForPlusMinus() {
//     const minusBtns = document.querySelectorAll(".fa-minus")
//     const plusBtns = document.querySelectorAll(".fa-plus")

//     minusBtns.forEach((minus) => {
//       minus.addEventListener("click", () => {
//         //? Eksilme islemleri
//       })
//     })

//     plusBtns.forEach((plus) => {
//       plus.addEventListener("click", () => {
//         //? Arttirma islemleri
//       })
//     })
//   }

//! constants
const SHIPPING_PRICE = 25.99;
const FREE_SHIPPING_LIMIT = 3000;
const TAX_RATE = 0.18;

const deleteProducts = document.querySelector(".delete-div .fa-trash-can");
const products = document.querySelector(".products");

//? DElete Products button event
deleteProducts.addEventListener("click", (e) => {
  if (confirm("Silmek istediğine emin misin?")) {
    products.textContent = "No product";
    products.classList.add("no-product");
    // document.querySelector(".delete-div").style.display = "none"; //*1.yöntem
    e.target.parentElement.style.display = "none"; //*2.yöntem

    //?silme alternatif
    // while (products.hasChildNodes()) {
    //     products.firstChild.remove();
    //   }
  }
});

products.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target.classList.contains("fa-minus")) {
    e.target.nextElementSibling.innerText > 1 &&
      e.target.nextElementSibling.innerText--;
    calculateProductPrice(e.target);
  } else if (e.target.classList.contains("fa-plus")) {
    // document.getElementById("quantity").innerText++
    e.target.previousElementSibling.innerText++;
    calculateProductPrice(e.target);
  } else if (e.target.classList.contains("fa-trash-can")) {
    e.target.closest(".product").remove();

    calculateProductPrice();
    // calculateProductPrice(e.target);
  } else {
    alert("diğer");
  }
});

const calculateProductPrice = (btn) => {
  const discountedPrice = btn
    .closest(".product-info")
    .querySelector("#discounted-price").textContent;

  const quantity = btn
    .closest(".buttons-div")
    .querySelector("#quantity").textContent;

  const productPrice = btn
    .closest(".buttons-div")
    .querySelector("#product-price");

  productPrice.textContent = (discountedPrice * quantity).toFixed(2);
  calculateTotalPrice();
};

const calculateTotalPrice = () => {
  const productPrices = document.querySelectorAll("#product-price");
  console.log(productPrices);

  productPrices.forEach((price) => console.log(price.textContent));

  const subtotal = [...productPrices].reduce(
    (sum, price) => sum + Number(price.textContent),
    0
  );

  const shippingPrice =
    subtotal >= FREE_SHIPPING_LIMIT || subtotal === 0 ? 0 : SHIPPING_PRICE;

  //? tax hesabı
  const taxPrice = subtotal * TAX_RATE;

  //? total değer

  const totalPrice = subtotal + shippingPrice + taxPrice;

  document.getElementById("selected-price").textContent = subtotal.toFixed(2);
  document.getElementById("shipping").textContent = shippingPrice.toFixed(2);
  document.getElementById("tax").textContent = taxPrice.toFixed(2);
  document.getElementById("total").textContent = totalPrice.toFixed(2);
  if (!totalPrice) {
    products.textContent = "No product";
    products.classList.add("no-product");
    document.querySelector(".delete-div").style.display = "none";
  }
};

window.addEventListener("load", () => {
  calculateTotalPrice();
});
