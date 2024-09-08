// CartItem.tsx
import React from 'react';
import styled from 'styled-components';
import { useStores } from '../../../../hooks/useStores';

const CartItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 37.5rem;
    padding: 0.625rem;
    border-bottom: 1px solid #ddd;
`;

const QuantityPicker = styled.div`
    display: flex;
    align-items: center;
    padding-top: 0.625rem; /* 10px = 0.625rem */
    justify-content: center;

    button {
        padding: 0.3125rem 0.625rem; /* 5px 10px = 0.3125rem 0.625rem */
        margin: 0 0.3125rem; /* 5px = 0.3125rem */
    }

    input {
        width: 2.5rem; /* 40px = 2.5rem */
        text-align: center;
    }
`;

const CartItem = ({ item, onRemove }) => {
    const { cartStore } = useStores();

    const handleQuantityChange = (delta) => {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 0) {
            cartStore.updateItemQuantity(item.id, newQuantity);
        }
    };

    const handleRemove = () => {
        cartStore.removeFromCart(item.id);
    };

    return (
        <CartItemContainer>
            <span>{item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <QuantityPicker>
                <button onClick={() => handleQuantityChange(-1)} disabled={item.quantity <= 0}>
                    -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleQuantityChange(1)}>+</button>
            </QuantityPicker>
            <button onClick={handleRemove}>Remove</button>
        </CartItemContainer>
    );
};

export default CartItem;
