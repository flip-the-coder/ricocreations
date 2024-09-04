import React from 'react';

const CartItem = ({ item, onRemove }) => {
    const handleRemove = () => {
        onRemove(item.id); // Pass the item id to the remove function
    };

    return (
        <div className="cart-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default CartItem;
