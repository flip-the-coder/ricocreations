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
    justify-content: space-between;
    padding: 0 10px 10px 10px;
    flex: 1;
    scroll-behavior: smooth;
    white-space: nowrap; /* Prevents line wrapping of child elements */
    overflow-x: auto; /* Enable horizontal scrolling */

    &::-webkit-scrollbar {
        display: none; /* Hide scrollbar for a cleaner look */
    }
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
    display: flex; /* Ensure buttons are inline within the flex container */
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
        width: 50px;
        height: 50px;
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
