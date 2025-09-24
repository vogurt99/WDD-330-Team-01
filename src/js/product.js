import { getParam, loadHeaderFooter } from "/js/utils.mjs";
import ExternalServices from "/js/ExternalServices.mjs";
import ProductDetails from "/js/ProductDetails.mjs";
import { updateCartCount } from "./ShoppingCart.mjs";

const dataSource = new ExternalServices();
const productID = getParam("productid");
const product = new ProductDetails(productID, dataSource);
loadHeaderFooter().then(() => {
    updateCartCount();
});

product.init();