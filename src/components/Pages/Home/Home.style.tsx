import styled from 'styled-components';
import { fontSizes } from '../../../SharedThemes';
import { MEDIUM_DEVICE_WIDTH, SMALL_DEVICE_WIDTH } from '../../../utils/browserUtils';
export const CARD_PADDING = '0.25rem'; // Fixed to be a string

const DESCRIPTION_MAX_LINES = 3;
const MainContainer = styled.div`
    display: flex;

    flex-direction: column;
    align-items: center;
`;

const ProductContainer = styled.div`
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: calc(33.333% - 10px);
    text-align: center;
    overflow: hidden;

    @media (max-width: 767px) {
        max-width: calc(50% - 20px);
        margin: 10px;
    }

    @media (max-width: 480px) {
        max-width: 100%;
        margin: 5px;
    }
`;

const ImagesContainer = styled.div`
    overflow: hidden;
    border-radius: 0.5rem;
    display: flex;

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
    Description
};
