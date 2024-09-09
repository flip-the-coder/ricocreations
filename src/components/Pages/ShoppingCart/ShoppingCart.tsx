import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
} from './ShoppingCart.style';

interface CartItemType {
    id: string;
    name: string;
    photos: string[];
    price: number;
    quantity: number;
}

interface AddressType {
    name: string;
    street: string;
    aptNumber?: string;
    city: string;
    state: string;
    zipCode: string;
}

interface PaymentInfoType {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
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

interface AddressFormProps {
    address: AddressType;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'billing') => void;
    type: 'shipping' | 'billing';
    title: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange, type, title }) => (
    <div>
        <h2>{title}</h2>
        <InputContainer>
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={(e) => onChange(e, type)}
            />
            <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={address.street}
                onChange={(e) => onChange(e, type)}
            />
            <input
                type="text"
                name="aptNumber"
                placeholder="Apt (optional)"
                value={address.aptNumber || ''}
                onChange={(e) => onChange(e, type)}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={(e) => onChange(e, type)}
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={(e) => onChange(e, type)}
            />
            <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) => onChange(e, type)}
            />
        </InputContainer>
    </div>
);

interface PaymentFormProps {
    paymentInfo: PaymentInfoType;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ paymentInfo, onChange }) => (
    <div>
        <h2>Payment Information</h2>
        <InputContainer>
            <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={onChange}
            />
            <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date"
                value={paymentInfo.expiryDate}
                onChange={onChange}
            />
            <input type="text" name="cvv" placeholder="CVV" value={paymentInfo.cvv} onChange={onChange} />
        </InputContainer>
    </div>
);

const CartSummary: React.FC<{ totalItems: number; totalPrice: number }> = ({ totalItems, totalPrice }) => (
    <CartSummaryContainer>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </CartSummaryContainer>
);

const ShoppingCart = observer(() => {
    const { cartStore } = useStores();
    const navigate = useNavigate();
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
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType>({ cardNumber: '', expiryDate: '', cvv: '' });
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

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'billing') => {
        const { name, value } = e.target;
        if (type === 'shipping') {
            setShippingAddress((prev) => ({ ...prev, [name]: value }));
        } else {
            setBillingAddress((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentInfo((prev) => ({ ...prev, [name]: value }));
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
            await axios.post('/api/orders', {
                cart: cartStore.cart,
                shippingAddress,
                billingAddress: useBillingAddress ? shippingAddress : billingAddress,
                paymentInfo
            });
            navigate('/order-confirmation');
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
                        <PaymentForm paymentInfo={paymentInfo} onChange={handlePaymentChange} />
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
