import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import ThankYouDisplay from './newsletter.mjs';
import { qs } from './utils.mjs';
import updateCartCount from './cart-count.js';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData('tents');
const listElement = qs('.product-list');
const productList = new ProductList('tents', dataSource, listElement);

loadHeaderFooter().then(() => {
    updateCartCount();
});
productList.init();
ThankYouDisplay();