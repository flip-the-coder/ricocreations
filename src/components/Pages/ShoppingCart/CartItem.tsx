// src/components/ShoppingCart/CartItem.tsx

import React from 'react';
import {
    CartItemContainer,
    ImageContainer,
    ProductDetails,
    PriceContainer,
    QuantityPicker,
    RemoveButton
} from './ShoppingCart.style';

export interface CartItemType {
    id: string;
    name: string;
    photos: string[];
    price: number;
    quantity: number;
}

interface CartItemProps {
    item: CartItemType;
    onIncreaseQuantity: (itemId: string) => void;
    onDecreaseQuantity: (itemId: string) => void;
    onRemoveItem: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }) => (
    <CartItemContainer key={item.id}>
        <ImageContainer>
            <img src={item.photos[0]} alt={item.name} />
        </ImageContainer>
        <ProductDetails>
            <span>{item.name}</span>
            <PriceContainer>
                <span>${item.price.toFixed(2)}</span>
                <QuantityPicker>
                    <button onClick={() => onDecreaseQuantity(item.id)}>-</button>
                    <div>{item.quantity}</div>
                    <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
                </QuantityPicker>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
            </PriceContainer>
        </ProductDetails>
        <RemoveButton onClick={() => onRemoveItem(item.id)}>Remove</RemoveButton>
    </CartItemContainer>
);

export default CartItem;
