import ThankYouDisplay from './newsletter.mjs';
import { updateCartCount } from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';
import setupSignupForm from './createAccount.mjs';


loadHeaderFooter().then(() => {
    updateCartCount();
});

ThankYouDisplay();
setupSignupForm();