import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    return items.map(item => {
        const price =
            item.FinalPrice ||
            item.ListPrice ||
            item.SuggestedRetailPrice ||
            (item.Colors && item.Colors[0] && item.Colors[0].FinalPrice) ||
            0;

        return {
            id: item.Id,
            name: item.Name || "Item",
            price: price,
            quantity: item.Quantity || 1
        };
    });
}

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
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const subtotal = document.querySelector(
            `${this.outputSelector} #subtotal`
        );
        const itemNumElement = document.querySelector(
            `${this.outputSelector} #num-items`
        );

        if (itemNumElement) {
            itemNumElement.textContent = this.list.length;
        }

        this.itemTotal = this.list.reduce((sum, item) => {
            const price =
                item.FinalPrice ||
                item.ListPrice ||
                item.SuggestedRetailPrice ||
                (item.Colors && item.Colors[0] && item.Colors[0].FinalPrice) ||
                0;

            return sum + price * (item.Quantity || 1);
        }, 0);

        if (subtotal) {
            subtotal.textContent = `₱${this.itemTotal.toFixed(2)}`;
        }
    }


    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const total = document.querySelector(`${this.outputSelector} #total`);

        if (tax) tax.textContent = `₱${this.tax.toFixed(2)}`;
        if (shipping) shipping.textContent = `₱${this.shipping.toFixed(2)}`;
        if (total) total.textContent = `₱${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.items = packageItems(this.list);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        };

        try {
            const response = await fetch(
                "https://wdd330-backend.onrender.com/checkout",
                options
            );
            const data = await response.json();
            console.log("Server response:", data);
            return data;
        } catch (err) {
            console.error("Checkout failed:", err);
        }
    }
}