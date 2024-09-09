// src/components/ShoppingCart/CartSummary.tsx

import React from 'react';
import { CartSummaryContainer } from './ShoppingCart.style';

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => (
    <CartSummaryContainer>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </CartSummaryContainer>
);

export default CartSummary;
