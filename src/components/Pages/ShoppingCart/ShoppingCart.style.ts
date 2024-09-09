import styled from 'styled-components';

// New Container with Pink Background
export const OuterContainer = styled.div`
    background-color: pink;
    min-height: 100vh;
    padding: 1.25rem; /* 20px */
    box-sizing: border-box;
`;

// Centered Container (remains unchanged)
export const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 1.25rem;
    box-sizing: border-box;
`;

export const CartItemContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 37.5rem; /* 600px */
    padding: 0.625rem; /* 10px */
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
`;

export const ImageContainer = styled.div`
    flex-shrink: 0;
    width: 3rem; /* 48px */
    height: 3rem; /* 48px */
    margin-right: 0.625rem; /* 10px */
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ProductDetails = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem; /* 16px */
    padding-right: 1rem; /* 16px */
`;

export const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem; /* 16px */
`;

export const QuantityPicker = styled.div`
    display: flex;
    align-items: center;
    button {
        padding: 0.3125rem 0.625rem; /* 5px 10px */
        margin: 0 0.3125rem; /* 5px */
    }
    input {
        width: 2.5rem; /* 40px */
        text-align: center;
    }
`;

export const RemoveButton = styled.button`
    margin-left: 1rem; /* 16px */
    background: red;
    color: white;
    border: none;
    padding: 0.3125rem 0.625rem; /* 5px 10px */
    cursor: pointer;
    font-size: 0.875rem; /* 14px */
`;

export const CartSummaryContainer = styled.div`
    margin: 20px 0;
    text-align: center; /* Centers the summary text */
`;

export const FormContainer = styled.div`
    width: 100%;
    max-width: 37.5rem; /* 600px */
    margin: 0 auto; /* Centers the form container */
    padding: 1.25rem; /* 20px */
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1); /* 10px shadow */
    background: #f9f9f9;
    border-radius: 0.5rem; /* 8px */
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.625rem 0; /* 10px */
    input {
        margin: 0.3125rem 0; /* 5px */
        padding: 0.625rem; /* 10px */
        border: 1px solid #ddd;
        border-radius: 0.25rem; /* 4px */
        font-size: 1rem; /* 16px */
    }
`;

export const Error = styled.div`
    color: red;
    margin: 0.625rem 0; /* 10px */
    text-align: center; /* Centers the error message */
`;

export const PlaceOrderButton = styled.button`
    background: blue;
    color: white;
    border: none;
    padding: 0.625rem; /* 10px */
    cursor: pointer;
    width: 100%;
    font-size: 1rem; /* 16px */
    border-radius: 0.25rem; /* 4px */
    margin-top: 1.25rem; /* 20px */
    transition: background-color 0.3s;

    &:hover {
        background-color: darkblue;
    }
`;
