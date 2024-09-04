import React, { useEffect } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useStores } from '../../../../hooks/useStores';

const ShoppingCart = ({ items, onRemoveItem }) => {
    const { cartStore } = useStores();

    useEffect(() => {
        console.log(cartStore.cart);
    }, [cartStore.cart]);



    return (
        <div className="shopping-cart">
            {cartStore.cart.map((item) => (
                <CartItem key={item.id} item={item} onRemove={onRemoveItem} />
            ))}
            <CartSummary totalItems={cartStore.totalItems} totalPrice={cartStore.totalPrice} />
        </div>
    );
};

export default ShoppingCart;
