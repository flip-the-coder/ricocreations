// src/components/ShoppingCart/PaymentForm.tsx

import React from 'react';
import { InputContainer } from './ShoppingCart.style';

export interface PaymentInfoType {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

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

export default PaymentForm;
