import React from 'react';
import styled from 'styled-components';
import { Filter, ProductType } from '../../../../models/Product';

interface CategoryFilterProps {
    filterOptions: Filter[];
    selectedCategory: ProductType;
    onCategoryChange: (category: ProductType) => void;
}

const Container = styled.div`
    display: flex;
    overflow-x: auto;
    padding: 10px;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    transition: background 0.3s, font-weight 0.3s;

    img {
        width: 60px;
        height: 60px;
    }

    &:hover {
        background: #f0f0f0;
    }

    ${({ isSelected }) =>
        isSelected &&
        `
        font-weight: bold;
        background: #e0e0e0;
    `}

    @media (max-width: 768px) {
        padding: 8px;
        margin-right: 8px;

        img {
            width: 40px;
            height: 40px;
        }
    }

    @media (max-width: 480px) {
        padding: 6px;
        margin-right: 6px;

        img {
            width: 30px;
            height: 30px;
        }
    }
`;

const CategoryFilter: React.FC<CategoryFilterProps> = ({ filterOptions, selectedCategory, onCategoryChange }) => {
    return (
        <Container>
            {filterOptions.map(({ photo, type }) => (
                <FilterButton key={type} isSelected={selectedCategory === type} onClick={() => onCategoryChange(type)}>
                    <img src={photo} alt={type} />
                    {type}
                </FilterButton>
            ))}
        </Container>
    );
};

export default CategoryFilter;
