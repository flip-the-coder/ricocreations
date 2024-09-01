import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Gallery from '../../ImageGallery/Gallery';
import styled from 'styled-components';
import { Product, products, ProductType, FilterOptions } from '../../../models/Product';
import CategoryFilter from './CategoryFilter/CategoryFilter';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductType>(ProductType.ALL);

  const handleCategoryChange = (category: ProductType) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === ProductType.ALL
      ? products
      : products.filter(product => product.type.includes(selectedCategory));

  return (
    <MainContainer>
      <CategoryFilter
        filterOptions={FilterOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {filteredProducts.map((product: Product) => (
        <ProductContainer key={product.id}>
          <ImageWrapper>
            <Gallery photos={product.photos} />
          </ImageWrapper>
          <h2>{product.name}</h2>
          <Description>{product.description}</Description>
          <p>Price: ${product.price.toFixed(2)}</p>
        </ProductContainer>
      ))}
    </MainContainer>
  );
};

export default observer(Home);

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 20px;

  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const ProductContainer = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: calc(33.333% - 20px);
  text-align: center;
  background: #fff;

  @media (max-width: 767px) {
    max-width: calc(50% - 20px);
    margin: 10px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    margin: 5px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
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
