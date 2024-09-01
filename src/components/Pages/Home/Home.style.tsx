import styled from 'styled-components';

export const CARD_PADDING = '0.25rem'; // Fixed to be a string

const DESCRIPTION_MAX_LINES = 3;

const MainContainer = styled.div``;

const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap; /* Allows items to wrap to the next line */
    justify-content: space-between; /* Distributes space between items */
    gap: 20px; /* Adjust as needed for spacing between cards */

    @media (max-width: 767px) {
        justify-content: space-around; /* Adjust space distribution for smaller screens */
    }

    @media (max-width: 480px) {
        justify-content: center; /* Center cards on mobile */
    }

    & > * {
        flex: 1 1 calc(50% - 20px); /* 2 cards per row with a gap of 20px */

        @media (max-width: 767px) {
            flex: 1 1 calc(50% - 20px); /* 2 cards per row on tablet */
        }

        @media (max-width: 480px) {
            flex: 1 1 100%; /* 1 card per row on mobile */
        }
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
    ProductList
};
