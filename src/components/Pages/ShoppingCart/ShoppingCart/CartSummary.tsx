import React from 'react';
import { useStores } from '../../../../hooks/useStores';

const CartSummary = () => {
    const { cartStore } = useStores();

    return (
        <div className="cart-summary">
            <h2>Summary</h2>
            <p>Total Items: {cartStore.totalItems}</p>
            <p>Total Price: ${cartStore.totalPrice.toFixed(2)}</p>
        </div>
    );
};

export default CartSummary;
