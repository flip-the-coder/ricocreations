import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';
import { CenteredContainer, FormContainer, InputContainer, Error, PlaceOrderButton } from './ShoppingCart.style';
import CartItem from './CartItem';
import AddressForm, { AddressType } from './AddressForm';
import PaymentForm from './PaymentForm';
import CartSummary from './CartSummary';
import squareApi from '../../../api/squareApi';

const ShoppingCart = observer(() => {
    const { cartStore } = useStores();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [shippingAddress, setShippingAddress] = useState<AddressType>({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [billingAddress, setBillingAddress] = useState<AddressType>({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [useBillingAddress, setUseBillingAddress] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTotalItems(cartStore.totalItems);
        setTotalPrice(cartStore.totalPrice);
    }, [cartStore.totalItems, cartStore.totalPrice]);

    useEffect(() => {
        if (useBillingAddress) {
            setBillingAddress({ ...shippingAddress });
        }
    }, [useBillingAddress, shippingAddress]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'billing') => {
        const { name, value } = e.target;
        if (type === 'shipping') {
            setShippingAddress((prev) => ({ ...prev, [name]: value }));
        } else {
            setBillingAddress((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRemoveItem = (itemId: string) => cartStore.removeFromCart(itemId);

    const handleIncreaseQuantity = (itemId: string) => {
        const cartItem = cartStore.cart.find((item) => item.id === itemId);
        if (cartItem) {
            cartStore.updateItemQuantity(itemId, cartItem.quantity + 1);
        }
    };

    const handleDecreaseQuantity = (itemId: string) => {
        const cartItem = cartStore.cart.find((item) => item.id === itemId);
        if (cartItem && cartItem.quantity > 1) {
            cartStore.updateItemQuantity(itemId, cartItem.quantity - 1);
        } else {
            cartStore.removeFromCart(itemId);
        }
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        try {
            const response = await squareApi.payments.sendPayment(
                totalPrice,
                'USD',
                'cnon:card-nonce-ok',
                '1a416e07-c431-499c-9cd0-1b24db0773fb'
            );

            console.log(response.data);
            // navigate('/order-confirmation');
        } catch (err) {
            setError('Error placing order');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <CenteredContainer>
            {cartStore.cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartStore.cart.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncreaseQuantity={handleIncreaseQuantity}
                            onDecreaseQuantity={handleDecreaseQuantity}
                            onRemoveItem={handleRemoveItem}
                        />
                    ))}
                    <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
                    <FormContainer>
                        <AddressForm
                            address={shippingAddress}
                            onChange={handleAddressChange}
                            type="shipping"
                            title="Shipping Address"
                        />
                        <InputContainer>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={useBillingAddress}
                                    onChange={() => setUseBillingAddress(!useBillingAddress)}
                                />
                                Use shipping address as billing address
                            </label>
                        </InputContainer>
                        {!useBillingAddress && (
                            <AddressForm
                                address={billingAddress}
                                onChange={handleAddressChange}
                                type="billing"
                                title="Billing Address"
                            />
                        )}
                        <PaymentForm />
                        {error && <Error>{error}</Error>}
                        <PlaceOrderButton onClick={handlePlaceOrder} disabled={isProcessing}>
                            {isProcessing ? 'Processing...' : 'Place Order'}
                        </PlaceOrderButton>
                    </FormContainer>
                </>
            )}
        </CenteredContainer>
    );
});

export default ShoppingCart;
