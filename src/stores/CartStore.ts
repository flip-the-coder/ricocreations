// stores/CartStore.js
import { makeAutoObservable } from 'mobx';
import { Product } from '../models/Product';

export class CartStore {
    cart: Product[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addToCart(item: Product) {
        console.log(item);
        const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
    }

    removeFromCart(itemId: string) {
        this.cart = this.cart.filter((item: Product) => item.id !== itemId);
    }

    clearCart() {
        this.cart = [];
    }

    get totalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    get totalPrice() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}
