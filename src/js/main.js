import ProductList from './ProductList.mjs';
import ThankYouDisplay from './newsletter.mjs';
import updateCartCount from './cart-count.js';
import { loadHeaderFooter } from './utils.mjs';


loadHeaderFooter().then(() => {
    updateCartCount();
});

ThankYouDisplay();