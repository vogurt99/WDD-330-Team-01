import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { updateCartCount } from "./ShoppingCart.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
});

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
    const myForm = document.forms["checkout"];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {
      order.checkout();
    }
  });
}