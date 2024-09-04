// components/ShoppingCart.js
import React, { useEffect } from 'react';
import CartItem from './ShoppingCart/CartItem';
import CartSummary from './ShoppingCart/CartSummary';
import { useStores } from '../../../hooks/useStores';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

const ShoppingCart = () => {
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    const { cartStore } = useStores();

    useEffect(() => {
        setCookie('shoppingCart', JSON.stringify(cartStore.cart), 7); // Store cookie for 7 days
    }, [cartStore.cart]);

    const handleRemoveItem = (itemId) => {
        cartStore.removeFromCart(itemId);
    };

    return (
        <CenteredContainer>
            {cartStore.cart.map((item) => (
                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}
            <CartSummary />
        </CenteredContainer>
    );
};

export default ShoppingCart;
