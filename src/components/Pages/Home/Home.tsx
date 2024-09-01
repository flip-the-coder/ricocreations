import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Gallery from '../../ImageGallery/Gallery';
import styled from 'styled-components';
import { Product, products, ProductType, FilterOptions } from '../../../models/Product';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import { iOS, MEDIUM_DEVICE_WIDTH, SMALL_DEVICE_WIDTH } from '../../../utils/browserUtils';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<ProductType>(ProductType.ALL);

    const handleCategoryChange = (category: ProductType) => {
        setSelectedCategory(category);
    };

    const filteredProducts =
        selectedCategory === ProductType.ALL
            ? products
            : products.filter((product) => product.type.includes(selectedCategory));

    return (
        <MainContainer>
            <CategoryFilter
                filterOptions={FilterOptions}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            {filteredProducts.map((product: Product) => (
                <ProductContainer key={product.id}>
                    <ImagesContainer>
                        <Gallery photos={product.photos} />
                    </ImagesContainer>
                    <h2>{product.name}</h2>
                    <Description>{product.description}</Description>
                    <p>Price: ${product.price.toFixed(2)}</p>
                </ProductContainer>
            ))}
        </MainContainer>
    );
};

export default observer(Home);

export const CARD_PADDING = 0.25;

const ImagesContainer = styled.div`
    height: fit-content;
    width: 100%;
    padding: ${CARD_PADDING}rem 0 ${CARD_PADDING}rem ${CARD_PADDING}rem;
    border-radius: 0.25rem;

    img {
        display: flex;
        border-radius: 0.25rem;
        object-fit: contain;
        width: auto;
        max-width: 100%;
    }
`;
const MainContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;

        @media only screen and (max-width: ${SMALL_DEVICE_WIDTH + 1}px) and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
            width: auto !important;
        }

        @media only screen and (max-width: ${SMALL_DEVICE_WIDTH}px) {
            margin-top: ${iOS() ? '-6.25rem' : '-3.125rem'};
            width: auto !important;
            height: auto !important;
            overflow: hidden;
        }
    }
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

const Description = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 4.5em;
    line-height: 1.5em;
    margin: 10px 0;

    @media (max-width: 768px) {
        -webkit-line-clamp: 2;
        height: 3em;
    }
`;
