import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For sending requests
import {
    CenteredContainer,
    CartItemContainer,
    ImageContainer,
    ProductDetails,
    PriceContainer,
    QuantityPicker,
    RemoveButton,
    CartSummaryContainer,
    FormContainer,
    InputContainer,
    Error,
    PlaceOrderButton
} from './ShoppingCart.style'; // Import styled components from the new file

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => {
    return (
        <CartSummaryContainer>
            <h2>Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </CartSummaryContainer>
    );
};

const ShoppingCart = observer(() => {
    const { cartStore } = useStores();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        street: '',
        aptNumber: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [billingAddress, setBillingAddress] = useState({
        name: '',
        street: '',
        aptNumber: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [useBillingAddress, setUseBillingAddress] = useState<boolean>(false);
    const [paymentInfo, setPaymentInfo] = useState<{ cardNumber: string; expiryDate: string; cvv: string }>({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTotalItems(cartStore.totalItems);
        setTotalPrice(cartStore.totalPrice);
    }, [cartStore.totalItems, cartStore.totalPrice]);

    useEffect(() => {
        if (useBillingAddress) {
            setBillingAddress(shippingAddress);
        }
    }, [useBillingAddress, shippingAddress]);

    useEffect(() => {
        if (!useBillingAddress) {
            // Preserve billing address values when checkbox is unchecked
            setBillingAddress((prev) => ({
                ...prev,
                name: shippingAddress.name,
                street: shippingAddress.street,
                aptNumber: shippingAddress.aptNumber,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zipCode: shippingAddress.zipCode
            }));
        }
    }, [useBillingAddress]);

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

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            const orderDetails = {
                shippingAddress,
                paymentInfo,
                items: cartStore.cart,
                totalPrice
            };

            // Send order details to the server
            await axios.post('/api/orders', orderDetails);

            // Send confirmation emails (assuming backend handles this)
            await axios.post('/api/send-confirmation-email', {
                email: 'user@example.com', // Replace with actual user email
                orderDetails
            });

            // Clear the cart and redirect
            cartStore.clearCart();
            navigate('/order-confirmation'); // Redirect to order confirmation page
        } catch (error) {
            console.error('Error placing order:', error);
            setError('There was an error processing your order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'billing') => {
        const { name, value } = e.target;
        if (type === 'shipping') {
            setShippingAddress((prev) => ({ ...prev, [name]: value }));
        } else {
            setBillingAddress((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <CenteredContainer>
            {cartStore.cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartStore.cart.map((item) => (
                        <CartItemContainer key={item.id}>
                            <ImageContainer>
                                <img src={item.photos[0]} alt={item.name} />
                            </ImageContainer>
                            <ProductDetails>
                                <span>{item.name}</span>
                                <PriceContainer>
                                    <span>${item.price.toFixed(2)}</span>
                                    <QuantityPicker>
                                        <button
                                            aria-label="Decrease quantity"
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <div>{item?.quantity || 0}</div>
                                        <button
                                            aria-label="Increase quantity"
                                            onClick={() => handleIncreaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </QuantityPicker>
                                    <span>${(item.price * (item.quantity || 0)).toFixed(2)}</span>
                                </PriceContainer>
                            </ProductDetails>
                            <RemoveButton aria-label="Remove item" onClick={() => handleRemoveItem(item.id)}>
                                Remove
                            </RemoveButton>
                        </CartItemContainer>
                    ))}
                    <CartSummary totalItems={totalItems} totalPrice={totalPrice} />

                    <FormContainer>
                        <h2>Shipping Address</h2>
                        <InputContainer>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={shippingAddress.name}
                                onChange={(e) => handleAddressChange(e, 'shipping')}
                                aria-label="Shipping Name"
                            />
                            <input
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                value={shippingAddress.street}
                                onChange={(e) => handleAddressChange(e, 'shipping')}
                                aria-label="Shipping Street Address"
                            />
                            <input
                                type="text"
                                name="aptNumber"
                                placeholder="Apartment Number (optional)"
                                value={shippingAddress.aptNumber}
                                onChange={(e) => handleAddressChange(e, 'shipping')}
                                aria-label="Shipping Apartment Number"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={shippingAddress.city}
                                onChange={(e) => handleAddressChange(e, 'shipping')}
                                aria-label="Shipping City"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={shippingAddress.state}
                                onChange={(e) => handleAddressChange(e, 'shipping')}
                                aria-label="Shipping State"
                            />
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="Zip Code"
                                value={shippingAddress.zipCode}
                                onChange={(e) => handleAddressChange(e, 'shipping')}
                                aria-label="Shipping Zip Code"
                            />
                        </InputContainer>
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
                            <div>
                                <h2>Billing Address</h2>
                                <InputContainer>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={billingAddress.name}
                                        onChange={(e) => handleAddressChange(e, 'billing')}
                                        aria-label="Billing Name"
                                    />
                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Street Address"
                                        value={billingAddress.street}
                                        onChange={(e) => handleAddressChange(e, 'billing')}
                                        aria-label="Billing Street Address"
                                    />
                                    <input
                                        type="text"
                                        name="aptNumber"
                                        placeholder="Apartment Number (optional)"
                                        value={billingAddress.aptNumber}
                                        onChange={(e) => handleAddressChange(e, 'billing')}
                                        aria-label="Billing Apartment Number"
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={billingAddress.city}
                                        onChange={(e) => handleAddressChange(e, 'billing')}
                                        aria-label="Billing City"
                                    />
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={billingAddress.state}
                                        onChange={(e) => handleAddressChange(e, 'billing')}
                                        aria-label="Billing State"
                                    />
                                    <input
                                        type="text"
                                        name="zipCode"
                                        placeholder="Zip Code"
                                        value={billingAddress.zipCode}
                                        onChange={(e) => handleAddressChange(e, 'billing')}
                                        aria-label="Billing Zip Code"
                                    />
                                </InputContainer>
                            </div>
                        )}
                        <h2>Payment Information</h2>
                        <InputContainer>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={paymentInfo.cardNumber}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                aria-label="Card Number"
                            />
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="Expiry Date"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                                aria-label="Expiry Date"
                            />
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                aria-label="CVV"
                            />
                        </InputContainer>
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
