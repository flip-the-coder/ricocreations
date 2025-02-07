import { AxiosPromise } from 'axios';
import { Transport } from './Transport';

const payments = {
    sendPayment: (amount: number, currency: string, sourceId: string, idempotencyKey: string): AxiosPromise => {
        const paymentData = {
            amount_money: {
                amount: amount,
                currency: currency
            },
            idempotency_key: idempotencyKey,
            source_id: sourceId,
            accept_partial_authorization: true
        };
        const config = {
            headers: {
                'Square-Version': '2025-01-23',
                Authorization: 'Bearer EAAAl4TqURzoxFNtTbcJDRvevoZMxe_mS7jl5swqtveK29ncoJ7Lt1dh8BQoYHtH',
                'Content-Type': 'application/json'
            }
        };

        return Transport.post('https://connect.squareupsandbox.com/v2/payments', paymentData, undefined, config);
    }
};

const squareApi = {
    payments
};

export default squareApi;
