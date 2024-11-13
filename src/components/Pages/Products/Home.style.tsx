import styled from 'styled-components';

export const CARD_PADDING = '0.25rem'; // Keeping as a string for reuse

const DESCRIPTION_MAX_LINES = 3;

const MainContainer = styled.div``;

const QuantityPicker = styled.div`
    display: flex;
    align-items: center;
    padding-top: 0.625rem; /* 10px = 0.625rem */
    justify-content: center;

    button {
        padding: 0.3125rem 0.625rem; /* 5px 10px = 0.3125rem 0.625rem */
        margin: 0 0.3125rem; /* 5px = 0.3125rem */
    }

    input {
        width: 2.5rem; /* 40px = 2.5rem */
        text-align: center;
    }
`;

const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.25rem; /* 20px = 1.25rem */

    @media (max-width: 47.9375rem) {
        /* 767px = 47.9375rem */
        justify-content: space-around;
    }

    @media (max-width: 30rem) {
        /* 480px = 30rem */
        justify-content: center;
    }

    & > * {
        flex: 1 1 calc(50% - 1.25rem); /* Adjust to rem for 20px gap */

        @media (max-width: 47.9375rem) {
            flex: 1 1 calc(50% - 1.25rem);
        }

        @media (max-width: 30rem) {
            flex: 1 1 100%;
        }
    }
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 0.625rem; /* 10px = 0.625rem */
    text-align: center;
    overflow: hidden;
    padding: ${CARD_PADDING};
    box-sizing: border-box;

    @media (max-width: 47.9375rem) {
        max-width: 100%;
    }

    @media (max-width: 30rem) {
        max-width: 100%;
    }
`;

const ImagesContainer = styled.div``;

const Description = styled.div`
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #79736e;
    white-space: pre-wrap;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${DESCRIPTION_MAX_LINES};
    line-clamp: ${DESCRIPTION_MAX_LINES};
    -webkit-box-orient: vertical;
`;

export const HomeStyles = {
    MainContainer,
    ProductContainer,
    ImagesContainer,
    Description,
    ProductList,
    QuantityPicker
};
