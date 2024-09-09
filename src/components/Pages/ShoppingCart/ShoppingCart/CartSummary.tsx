import React from 'react';
import styled from 'styled-components';

const CartSummaryContainer = styled.div`
    margin-top: 1.25rem;
`;

const CartSummary = ({ totalItems, totalPrice }) => {
    return (
        <CartSummaryContainer>
            <h2>Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </CartSummaryContainer>
    );
};

export default CartSummary;
