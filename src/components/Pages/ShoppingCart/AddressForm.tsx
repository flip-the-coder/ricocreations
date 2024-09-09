// src/components/ShoppingCart/AddressForm.tsx

import React from 'react';
import { InputContainer } from './ShoppingCart.style';

export interface AddressType {
    name: string;
    street: string;
    aptNumber?: string;
    city: string;
    state: string;
    zipCode: string;
}

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

export default AddressForm;
