import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, qs, loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./ShoppingCart.mjs";

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
  const total = cart.getCartTotal();
  qs(".cart-total").innerHTML += `$${total.toFixed(2)}`;
  qs(".cart-footer").classList.remove("hide");
}