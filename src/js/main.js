import ThankYouDisplay from './newsletter.mjs';
import updateCartCount from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';


loadHeaderFooter().then(() => {
    updateCartCount();
});

ThankYouDisplay();