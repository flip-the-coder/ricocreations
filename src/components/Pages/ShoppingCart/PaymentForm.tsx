import React, { useEffect } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line
import { payments } from '@square/web-sdk';

export const PaymentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
`;

export const PaymentStatusContainer = styled.div`
    color: #333;
    font-weight: bold;
    min-height: 20px;
`;

export const CardContainer = styled.div`
    width: 100%;
`;

export const PayButton = styled.button`
    background-color: #007aff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #005ecb;
    }
`;

const SquarePayment = () => {
    useEffect(() => {
        const initializeSquare = async () => {
            if (!window.Square) {
                console.error('Square SDK failed to load.');
                return;
            }

            const payments = window.Square.payments(
                'sandbox-sq0idb-6roOUPNm-nxghtGk9ZLYRw',
                'EAAAl4TqURzoxFNtTbcJDRvevoZMxe_mS7jl5swqtveK29ncoJ7Lt1dh8BQoYHtH'
            );

            const card = await payments.card();
            await card.attach('#card-container');

            const cardButton = document.getElementById('card-button');
            const statusContainer = document.getElementById('payment-status-container');

            if (cardButton) {
                cardButton.addEventListener('click', async () => {
                    if (!statusContainer) return;

                    try {
                        const result = await card.tokenize();
                        if (result.status === 'OK') {
                            console.log(`Payment token is ${result.token}`);
                            statusContainer.innerHTML = 'Payment Successful';
                        } else {
                            let errorMessage = `Tokenization failed with status: ${result.status}`;
                            if (result.errors) {
                                errorMessage += ` and errors: ${JSON.stringify(result.errors)}`;
                            }
                            throw new Error(errorMessage);
                        }
                    } catch (e) {
                        console.error(e);
                        statusContainer.innerHTML = 'Payment Failed';
                    }
                });
            }
        };

        initializeSquare();
    }, []);

    return (
        <PaymentFormContainer>
            <PaymentStatusContainer id="payment-status-container"></PaymentStatusContainer>
            <CardContainer id="card-container"></CardContainer>
            <PayButton id="card-button" type="button">
                Pay
            </PayButton>
        </PaymentFormContainer>
    );
};

export default SquarePayment;
