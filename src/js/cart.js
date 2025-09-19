// import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();

import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, qs, loadHeaderFooter } from "./utils.mjs";
import updateCartCount from "./cart-count.js";

loadHeaderFooter().then(() => {
  updateCartCount();
});

const cartItems = getLocalStorage("so-cart") || [];
const listElement = qs(".product-list");

const cart = new ShoppingCart(cartItems, listElement);

if (cartItems.length === 0) {
  listElement.innerHTML = "<li>Your cart is empty.</li>";
} else {
  cart.init();
}
