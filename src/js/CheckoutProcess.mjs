import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((sum, item) => {
            return sum + item.FinalPrice * (item.Quantity || 1);
        }, 0);

        const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
        const items = document.querySelector(`${this.outputSelector} #num-items`);

        if (subtotal) subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;
        if (items) items.textContent = this.list.length;
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const ship = document.querySelector(`${this.outputSelector} #shipping`);
        const total = document.querySelector(`${this.outputSelector} #total`);

        if (tax) tax.textContent = `$${this.tax.toFixed(2)}`;
        if (ship) ship.textContent = `$${this.shipping.toFixed(2)}`;
        if (total) total.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
}
