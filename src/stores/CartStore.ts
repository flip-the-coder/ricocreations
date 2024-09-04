import { makeAutoObservable, observable, computed, action } from 'mobx';
import { Product } from '../models/Product';

export class CartStore {
    cart: Product[] = [];

    constructor() {
        makeAutoObservable(this, {
            cart: observable,
            totalItems: computed,
            totalPrice: computed,
            addToCart: action,
            removeFromCart: action,
            clearCart: action,
            loadCartFromCookie: action,
            saveCartToCookie: action
        });
        this.loadCartFromCookie(); // Load cart from cookie on initialization
    }

    addToCart(item: Product) {
        const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        this.saveCartToCookie(); // Save cart to cookie whenever an item is added
    }

    removeFromCart(itemId: string) {
        this.cart = this.cart.filter((item: Product) => item.id !== itemId);
        this.saveCartToCookie(); // Save cart to cookie whenever an item is removed
    }

    clearCart() {
        this.cart = [];
        this.saveCartToCookie(); // Save cart to cookie when clearing the cart
    }

    get totalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    get totalPrice() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    // Method to save the cart to a cookie
    saveCartToCookie() {
        const expires = 7; // Days until cookie expires
        document.cookie = `shoppingCart=${encodeURIComponent(JSON.stringify(this.cart))};expires=${new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
    }

    // Method to load the cart from a cookie
    loadCartFromCookie() {
        const nameEQ = 'shoppingCart=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) {
                try {
                    this.cart = JSON.parse(c.substring(nameEQ.length));
                } catch (e) {
                    console.error('Failed to parse cart from cookie:', e);
                }
                break;
            }
        }
    }
}
