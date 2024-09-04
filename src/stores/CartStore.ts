import { action, computed, makeAutoObservable, observable } from 'mobx';
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
            setCart: action,
            saveCartToCookie: action,
            loadCartFromCookie: action
        });
        this.loadCartFromCookie(); // Load cart from cookie on initialization
    }

    // Add an item to the cart
    addToCart(item: Product) {
        try {
            const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ ...item, quantity: 1 });
            }
            this.saveCartToCookie(); // Save cart to cookie whenever an item is added
        } catch (e) {
            console.error('Failed to add item to cart:', e);
        }
    }

    // Remove an item from the cart
    removeFromCart(itemId: string) {
        try {
            const item = this.cart.find((item) => item.id === itemId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1; // Reduce quantity if more than 1
                } else {
                    this.cart = this.cart.filter((item) => item.id !== itemId); // Remove item if quantity is 1
                }
            }
            this.saveCartToCookie(); // Save cart to cookie whenever an item is removed
        } catch (e) {
            console.error('Failed to remove item from cart:', e);
        }
    }

    // Clear all items from the cart
    clearCart() {
        try {
            this.cart = [];
            this.saveCartToCookie(); // Save cart to cookie when clearing the cart
        } catch (e) {
            console.error('Failed to clear cart:', e);
        }
    }

    // Set the cart directly
    setCart(newCart: Product[]) {
        try {
            this.cart = newCart;
            this.saveCartToCookie(); // Save cart to cookie whenever the cart is directly set
        } catch (e) {
            console.error('Failed to set cart:', e);
        }
    }

    @action
    updateItemQuantity(itemId: string, quantity: number) {
        try {
            // Find the index of the item to be updated
            const itemIndex = this.cart.findIndex((item) => item.id === itemId);

            if (itemIndex !== -1) {
                if (quantity > 0) {
                    // Update the quantity of the item at the found index
                    this.cart[itemIndex] = { ...this.cart[itemIndex], quantity };
                } else {
                    // Remove the item if quantity is 0 or less
                    this.removeFromCart(itemId);
                }
                this.saveCartToCookie(); // Save cart to cookie after updating the quantity
            }
        } catch (e) {
            console.error('Failed to update item quantity:', e);
        }
    }

    // Calculate total number of items in the cart
    get totalItems() {
        try {
            return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
        } catch (e) {
            console.error('Failed to calculate total items:', e);
            return 0; // Return default value in case of error
        }
    }

    // Calculate total price of items in the cart
    get totalPrice() {
        try {
            return this.cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
        } catch (e) {
            console.error('Failed to calculate total price:', e);
            return 0; // Return default value in case of error
        }
    }

    // Method to save the cart to a cookie
    saveCartToCookie() {
        try {
            const expires = 7; // Days until cookie expires
            const date = new Date();
            date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
            const expiresStr = date.toUTCString();
            const encodedCart = encodeURIComponent(JSON.stringify(this.cart));
            document.cookie = `shoppingCart=${encodedCart}; expires=${expiresStr}; path=/`;
        } catch (e) {
            console.error('Failed to save cart to cookie:', e);
        }
    }

    // Method to load the cart from a cookie
    loadCartFromCookie() {
        try {
            const nameEQ = 'shoppingCart=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(nameEQ) === 0) {
                    const cookieValue = c.substring(nameEQ.length);
                    const decodedValue = decodeURIComponent(cookieValue);
                    if (decodedValue) {
                        try {
                            const parsedCart = JSON.parse(decodedValue);
                            console.log('Loaded cart from cookie:', parsedCart); // Debugging log
                            this.setCart(parsedCart);
                        } catch (e) {
                            console.error('Failed to parse cart JSON from cookie:', e);
                        }
                    }
                    break;
                }
            }
        } catch (e) {
            console.error('Failed to load cart from cookie:', e);
        }
    }
}
