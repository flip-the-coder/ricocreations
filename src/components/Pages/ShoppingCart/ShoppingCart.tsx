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
    const { cartStore } = useStores();

    useEffect(() => {
        console.log(cartStore.cart);
    }, [cartStore.cart]);

    const handleRemoveItem = (itemId) => {
        cartStore.removeFromCart(itemId);
    };

    return (
        <CenteredContainer>
            {cartStore.cart.map((item) => (
                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}
            <CartSummary totalItems={cartStore.totalItems} totalPrice={cartStore.totalPrice} />
        </CenteredContainer>
    );
};

export default ShoppingCart;
