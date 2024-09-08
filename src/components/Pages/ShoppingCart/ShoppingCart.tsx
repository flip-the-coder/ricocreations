import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';
import CartSummary from './ShoppingCart/CartSummary'; // Ensure you import CartSummary

const ShoppingCart = observer(() => {
    const { cartStore } = useStores();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

    // Update totals based on cartStore changes
    useEffect(() => {
        setTotalItems(cartStore.totalItems);
        setTotalPrice(cartStore.totalPrice);
    }, [cartStore.totalItems, cartStore.totalPrice]); // Depend on specific properties

    const handleRemoveItem = (itemId: string) => {
        cartStore.removeFromCart(itemId);
    };

    const handleIncreaseQuantity = (itemId: string) => {
        const cartItem = cartStore.cart.find((item) => item.id === itemId);
        if (cartItem) {
            console.log(`Increasing quantity for item ${itemId}`); // Debug log
            cartStore.updateItemQuantity(itemId, cartItem.quantity + 1);
        }
    };

    const handleDecreaseQuantity = (itemId: string) => {
        const cartItem = cartStore.cart.find((item) => item.id === itemId);
        if (cartItem) {
            if (cartItem.quantity > 1) {
                console.log(`Decreasing quantity for item ${itemId}`); // Debug log
                cartStore.updateItemQuantity(itemId, cartItem.quantity - 1);
            } else {
                cartStore.removeFromCart(itemId);
            }
        }
    };

    return (
        <CenteredContainer>
            {cartStore.cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartStore.cart.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            maxWidth: '37.5rem',
                            padding: '0.625rem',
                            borderBottom: '1px solid #ddd'
                        }}
                    >
                        <span>{item.name}</span>
                        <span>${(item.price * (item.quantity || 0)).toFixed(2)}</span>
                        <QuantityPicker>
                            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                            <input type="number" value={item.quantity || 0} readOnly />
                            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                        </QuantityPicker>
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </div>
                ))
            )}
            <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
        </CenteredContainer>
    );
});

export default ShoppingCart;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 1.25rem;
    box-sizing: border-box;
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
