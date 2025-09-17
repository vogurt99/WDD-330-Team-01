import { qs, getLocalStorage } from './utils.mjs';

export default function updateCartCount() {
    const numberOfItemsInCart = getLocalStorage('so-cart')?.length || 0;
    const cartCountElement = qs('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = numberOfItemsInCart;
    }
}
