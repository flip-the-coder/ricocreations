import styled from 'styled-components';

export const CARD_PADDING = '0.25rem'; // Fixed to be a string

const DESCRIPTION_MAX_LINES = 3;

const MainContainer = styled.div``;

const ProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row on desktop */
    gap: 20px; /* Adjust as needed for spacing between cards */

    @media (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablet */
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr; /* 1 card per row on mobile */
    }
`;

const ProductContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: center;
    overflow: hidden;
    padding: ${CARD_PADDING};
    box-sizing: border-box;

    @media (max-width: 767px) {
        max-width: 100%;
    }

    @media (max-width: 480px) {
        max-width: 100%;
    }
`;

const ImagesContainer = styled.div`
    overflow: hidden;
    border-radius: 0.5rem;

    img {
        object-fit: cover;
        border-radius: 0.5rem;
        width: 100%;
        height: 100%;
    }

    .single-image {
        transition: transform 0.1s linear;

        &:hover {
            transform: scale(1.05);
        }
    }
`;

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
};
