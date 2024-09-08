import { makeAutoObservable } from 'mobx';
import { Product } from '../models/Product';

export class CartStore {
    cart: Product[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadCartFromCookie();
    }

    addToCart(item: Product) {
        const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        this.saveCartToCookie();
    }

    removeFromCart(itemId: string) {
        const item = this.cart.find((item) => item.id === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                this.cart = this.cart.filter((item) => item.id !== itemId);
            }
            this.saveCartToCookie();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCartToCookie();
    }

    setCart(newCart: Product[]) {
        this.cart = newCart;
        this.saveCartToCookie();
    }

    updateItemQuantity(itemId: string, quantity: number) {
        const itemIndex = this.cart.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
            if (quantity > 0) {
                this.cart[itemIndex] = { ...this.cart[itemIndex], quantity };
            } else {
                this.removeFromCart(itemId);
            }
            this.saveCartToCookie();
        }
    }

    get totalItems() {
        return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
    }

    get totalPrice() {
        return this.cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    }

    saveCartToCookie() {
        const expires = 7;
        const date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
        const expiresStr = date.toUTCString();
        const encodedCart = encodeURIComponent(JSON.stringify(this.cart));
        document.cookie = `shoppingCart=${encodedCart}; expires=${expiresStr}; path=/`;
    }

    loadCartFromCookie() {
        const nameEQ = 'shoppingCart=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                const cookieValue = c.substring(nameEQ.length);
                const decodedValue = decodeURIComponent(cookieValue);
                try {
                    const parsedCart = JSON.parse(decodedValue) as Product[];
                    this.setCart(parsedCart);
                } catch (e) {
                    console.error('Failed to parse cart JSON from cookie:', e);
                }
                break;
            }
        }
    }
}
