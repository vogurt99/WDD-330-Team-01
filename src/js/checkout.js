import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();
order.calculateOrderTotal();

const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", order.calculateOrderTotal.bind(order));
}

const checkoutBtn = document.querySelector(".checkout-submit");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    order.checkout();
  });
}