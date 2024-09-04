import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useStores } from '../../../hooks/useStores';

// Styled components
const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

const CartItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 600px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const QuantityInput = styled.input`
    width: 60px;
    text-align: center;
    margin: 0 10px;
`;

const CartSummaryContainer = styled.div`
    margin-top: 20px;
`;

// CartItem component
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    const { cartStore } = useStores();
    const [tempQuantity, setTempQuantity] = useState(item.quantity || 0);

    useEffect(() => {
        // Update the local state if the item quantity changes externally
        setTempQuantity(item.quantity || 0);
    }, [item.quantity]);

    const handleRemove = () => {
        onRemove(item.id);
    };

    useEffect(() => {
        const newQuantity = parseInt(tempQuantity, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            onUpdateQuantity(item.id, newQuantity);
        }
        //eslint-disable-next-line
    }, [tempQuantity]);

    const handleQuantityChange = (e) => {
        setTempQuantity(e.target.value);
    };

    return (
        <CartItemContainer>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <QuantityInput
                type="number"
                value={
                    cartStore.cart.find((c) => {
                        return c.id === item.id;
                    })?.quantity
                }
                onChange={handleQuantityChange}
                min="0"
            />
            <button onClick={handleRemove}>Remove</button>
        </CartItemContainer>
    );
};

// CartSummary component
const CartSummary = ({ totalItems, totalPrice }) => (
    <CartSummaryContainer>
        <h2>Summary</h2>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </CartSummaryContainer>
);

// Main ShoppingCart component
const ShoppingCart = () => {
    const { cartStore } = useStores();

    const setCookie = useCallback((name, value, days) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value ? encodeURIComponent(value) : '') + expires + '; path=/';
    }, []);

    const getCookie = useCallback((name) => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                const cookieValue = c.substring(nameEQ.length);
                try {
                    return JSON.parse(decodeURIComponent(cookieValue));
                } catch (e) {
                    console.error('Failed to parse cookie value as JSON:', cookieValue);
                    return null;
                }
            }
        }
        return null;
    }, []);

    useEffect(() => {
        // Load cart from cookie if available
        const cartFromCookie = getCookie('shoppingCart');
        if (cartFromCookie) {
            cartStore.setCart(cartFromCookie);
        }
    }, [cartStore, getCookie]);

    useEffect(() => {
        // Save cart to cookie when cartStore.cart changes
        setCookie('shoppingCart', JSON.stringify(cartStore.cart), 7);
    }, [cartStore.cart, setCookie]);

    const handleRemoveItem = (itemId) => {
        cartStore.removeFromCart(itemId);
        setCookie('shoppingCart', JSON.stringify(cartStore.cart), 7); // Update cookie after removing item
    };

    const handleUpdateQuantity = (itemId, quantity) => {
        cartStore.updateItemQuantity(itemId, quantity);
        setCookie('shoppingCart', JSON.stringify(cartStore.cart), 7); // Update cookie after updating quantity
    };

    // Calculate total items and price
    const totalItems = cartStore.cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartStore.cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CenteredContainer>
            {cartStore.cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartStore.cart.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        onUpdateQuantity={handleUpdateQuantity}
                    />
                ))
            )}
            <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
        </CenteredContainer>
    );
};

export default ShoppingCart;
