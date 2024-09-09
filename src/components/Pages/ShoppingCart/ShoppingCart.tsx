import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';
import CartSummary from './ShoppingCart/CartSummary';

const ShoppingCart = observer(() => {
    const { cartStore } = useStores();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        setTotalItems(cartStore.totalItems);
        setTotalPrice(cartStore.totalPrice);
    }, [cartStore.totalItems, cartStore.totalPrice]);

    const handleRemoveItem = (itemId: string) => {
        cartStore.removeFromCart(itemId);
    };

    const handleIncreaseQuantity = (itemId: string) => {
        const cartItem = cartStore.cart.find((item) => item.id === itemId);
        if (cartItem) {
            cartStore.updateItemQuantity(itemId, cartItem.quantity + 1);
        }
    };

    const handleDecreaseQuantity = (itemId: string) => {
        const cartItem = cartStore.cart.find((item) => item.id === itemId);
        if (cartItem) {
            if (cartItem.quantity > 1) {
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
                    <CartItemContainer key={item.id}>
                        <ImageContainer>
                            <img src={item.photos[0]} alt={item.name} />
                        </ImageContainer>
                        <ProductDetails>
                            <span>{item.name}</span>
                            <PriceContainer>
                                <span>${item.price.toFixed(2)}</span>
                                <QuantityPicker>
                                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                    <div>{item?.quantity || 0}</div>
                                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                </QuantityPicker>
                                <span>${(item.price * (item.quantity || 0)).toFixed(2)}</span>
                            </PriceContainer>
                        </ProductDetails>
                        <RemoveButton onClick={() => handleRemoveItem(item.id)}>Remove</RemoveButton>
                    </CartItemContainer>
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

const CartItemContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 37.5rem;
    padding: 0.625rem;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
`;

const ImageContainer = styled.div`
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    margin-right: 0.625rem;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProductDetails = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const QuantityPicker = styled.div`
    display: flex;
    align-items: center;
    button {
        padding: 0.3125rem 0.625rem;
        margin: 0 0.3125rem;
    }
    input {
        width: 2.5rem;
        text-align: center;
    }
`;

const RemoveButton = styled.button`
    margin-left: 1rem;
`;
