import { getParam, loadHeaderFooter } from "/js/utils.mjs";
import ProductData from "/js/ProductData.mjs";
import ProductDetails from "/js/ProductDetails.mjs";
import { updateCartCount } from "./ShoppingCart.mjs";

const dataSource = new ProductData();
const productID = getParam("productid");
const product = new ProductDetails(productID, dataSource);
loadHeaderFooter().then(() => {
    updateCartCount();
});

product.init();