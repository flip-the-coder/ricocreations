import React from 'react';

const CartSummary = ({ totalItems, totalPrice }) => {
    return (
        <div className="cart-summary">
            <h2>Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
    );
};

export default CartSummary;
