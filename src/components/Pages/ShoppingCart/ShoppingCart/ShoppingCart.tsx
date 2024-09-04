import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useStores } from '../../../../hooks/useStores';

const ShoppingCart = ({ onRemoveItem }) => {
    const { cartStore } = useStores();
    const [items, setItems] = useState(cartStore.cart);

    useEffect(() => {
        setItems(cartStore.cart);
    }, [cartStore.cart]);

    return (
        <div className="shopping-cart">
            {items.map((item) => (
                <CartItem key={item.id} item={item} onRemove={onRemoveItem} />
            ))}
            <CartSummary />
        </div>
    );
};

export default ShoppingCart;
